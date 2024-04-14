---
title: Django在生产模式下提供静态资源
---

## 在settings.py中配置静态文件根路径
```python
STATIC_ROOT = str(BASE_DIR / 'static')
STATIC_URL = '/static/'
```

## 在urls.py中添加静态资源路由
```python
from django.conf import settings
from django.urls import re_path
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT})
]
```

## 收集静态资源文件
```bash
python manage.py collectstatic
```

## 运行
```bash
python manage.py runserver
```
