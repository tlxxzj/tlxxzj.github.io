---
title: Nginx反向代理Grafana
---

修改Nginx配置文件 /etc/nginx/nignx.conf
```nginx
events {
  worker_connections  1024;
}

http {
    # This is required to proxy Grafana Live WebSocket connections.
    map $http_upgrade $connection_upgrade  {
        default upgrade;
        '' close;
    }

    # fix net::ERR_CONTENT_LENGTH_MISMATCH 
    proxy_buffering off;

    upstream grafana {
        server <grafana ip>:3000;
    }

    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html index.htm;

        location / {
            proxy_pass http://grafana;
            proxy_set_header Host $host;
        }

        # Proxy Grafana Live WebSocket connections.
        location /api/live/ {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
            proxy_pass http://grafana;
        }
    }
}
```

重新加载 Nginx 配置
```bash
nginx -s reload
```

