---
title: 使用RKE安装Kubernetes
---

RKE 是一个快速的，多功能的 Kubernetes 安装工具。

## 安装软件和配置先决条件
请检查节点是否满足这些要求。


### 系统配置

#### Hostname和MAC地址唯一
使用以下命令查看Hostname和MAC地址
```bash
cat /etc/hostname

ip link
```

#### 启用IPV4流量转发
执行以下命令
```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# sysctl params required by setup, params persist across reboots
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# Apply sysctl params without reboot
sudo sysctl --system
```

通过运行以下命令验证 br_netfilter, overlay 模块是否已加载
```bash
lsmod | grep br_netfilter
lsmod | grep overlay
```

通过运行以下命令验证 net.bridge.bridge-nf-call-iptables, net.bridge.bridge-nf-call-ip6tables, net.ipv4.ip_forward系统变量已设置为1
```bash
sysctl net.bridge.bridge-nf-call-iptables net.bridge.bridge-nf-call-ip6tables net.ipv4.ip_forward
```

#### 关闭SELinux
执行以下命令
```
setenforce 0
sed -i 's/enforcing/disabled/' /etc/selinux/config
```

#### 关闭防火墙
Ubuntu执行以下命令
```bash
ufw disable
```
Centos执行以下命令
```bash
systemctl stop firewalld
systemctl disable firewalld
```

#### 禁用交换分区
执行以下命令
```
swapoff -a 
sed -ri 's/.*swap.*/#&/' /etc/fstab
```

#### 创建rke用户
```bash
useradd -m rke

#设置密码
passwd rke
```

### 安装软件


#### Docker
参考文档：https://docs.docker.com/engine/install
执行以下命令
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh ./get-docker.sh

systemctl enable docker
systemctl start docker
```

执行以下命令验证Docker是否已正确安装
```bash
systemctl status docker
docker version
docker run hello-world
```

创建docker用户组
```bash
groupadd docker
```

添加rke用户至docker用户组
```bash
usermod -aG docker rke
```

激活对用户组的修改
```bash
newgrp docker
```

验证rke用户是否可执行docker命令
```bash
su rke
docker run hello-world
```


#### Chrony
使用Chrony同步服务器时间
执行以下命令安装
```bash
apt install chrony
systemctl enable chronyd
systemctl start chronyd
```

验证
```bash
chronyc activity
```

### 主节点配置
以下操作，选择一台主节点即可。

#### 生成SSH证书
执行以下命令会在当前目录生成两个文件：rke_key, rke_key.pub
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -P " your passphrase" -f rke_key
```

#### 拷贝SSH证书至所有节点
```bash
ssh-copy-id -i rke_key.pub rke@node1
ssh-copy-id -i rke_key.pub rke@node2
ssh-copy-id -i rke_key.pub rke@node3
...
```

#### 验证SSH证书是否可用
```bash
ssh -t  -i rke_key rke@node1 "hostname"
```

#### 安装RKE
下载二进制安装包，RKE版本发布页面：https://github.com/rancher/rke/releases 
```bash
# Linux
curl https://github.com/rancher/rke/releases/download/v1.4.17/rke_linux-amd64
```

把二进制文件重命名为rke
```
# Linux
mv rke_linux-amd64 rke

# MacOS
mv rke_darwin-amd64 rke

# Windows PowerShell
mv rke_windows-amd64.exe rke.exe
```

添加可执行权限
```bash
chmod +x rke
```

把rke移动到Linux可以执行命令目录下
```bash
mv rke /usr/local/bin/rke
```

执行以下命令验证
```bash
rke --version
```
