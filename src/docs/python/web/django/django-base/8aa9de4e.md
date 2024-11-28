---
date: 2023-08-03 13:12:42
updated: 2024-10-08 15:25:44
article: false
order: 4
title: 响应
---
> 视图在接收请求并处理后，必须返回`HttpResponse`对象或子对象。`HttpRequest`对象由`Django`创建，`HttpResponse`对象由开发人员创建。

## `HttpResponse`

可以使用`django.http.HttpResponse`来构造响应对象。

```python
HttpResponse(content=响应体, content_type=响应体数据类型, status=状态码)
```

也可通过`HttpResponse`对象属性来设置响应体、状态码：

- `content`：表示返回的内容。
- `status_code`：返回的HTTP响应状态码。

### content-type

Content-Type（内容类型），一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。

Content-Type 标头告诉客户端实际返回的内容的内容类型。

语法格式：

```html
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

常见的媒体格式类型如下：

- `text/html` ： HTML格式
- `text/plain` ：纯文本格式
- `text/xml` ： XML格式
- `image/gif` ：gif图片格式
- `image/jpeg` ：jpg图片格式
- `image/png`：png图片格式

以application开头的媒体格式类型：

- `application/xhtml+xml` ：XHTML格式
- `application/xml`： XML数据格式
- `application/atom+xml` ：Atom XML聚合格式
- `application/json`： JSON数据格式
- `application/pdf`：pdf格式
- `application/msword` ： Word文档格式
- `application/octet-stream` ： 二进制流数据（如常见的文件下载）
- `application/x-www-form-urlencoded` ： `<form encType="">`中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

另外一种常见的媒体格式是上传文件之时使用的：

- `multipart/form-data` ： 需要在表单中进行文件上传时，就需要使用该格式

### status code

- `200 OK - [GET]`：（成功）服务器成功返回用户请求的数据
- `201 CREATED - [POST/PUT/PATCH]`：（已建立）用户新建或修改数据成功
- `204 NO CONTENT - [DELETE]`：(无内容) 用户删除数据成功
- `400 INVALID REQUEST - [POST/PUT/PATCH]`：(坏请求) 用户发出的请求有错误，服务器没有进行新建或修改数据的操作
- `401 Unauthorized - [*]`:  (未授权) 表示用户没有权限（令牌、用户名、密码错误）
- `403 Forbidden - [*]`:  （禁止）表示用户得到授权（与401错误相对），但是访问是被禁止的
- `404 NOT FOUND - [*]`：（未找到）用户发出的请求针对的是不存在的记录，服务器没有进行操作
- `405 Method not allowed`: （方法不被允许）不支持该Request的方法
- `500 INTERNAL SERVER ERROR - [*]`：(服务器内部错误）服务器发生错误，用户将无法判断发出的请求是否成功

## HttpResponse子类

*Django*还提供了一系列`HttpResponse`的子类，可以快速设置状态码

- `HttpResponseRedirect` 301
- `HttpResponsePermanentRedirect` 302
- `HttpResponseNotModified` 304
- `HttpResponseBadRequest` 400
- `HttpResponseNotFound` 404
- `HttpResponseForbidden` 403
- `HttpResponseNotAllowed` 405
- `HttpResponseGone` 410
- `HttpResponseServerError` 500

## JsonResponse

若要返回`json`数据，可以使用`JsonResponse`来构造响应对象，作用：

- 帮助我们将数据转换为`json`字符串
- 设置响应头`Content-Type`为 `application/json`

```python
from django.http import JsonResponse

def demo_view(request):
    return JsonResponse({'city': 'beijing', 'subject': 'python'})
```

## 重定向

Django2.0 新增了在 urls.py 中 `app_name` 来指定 namespace。

我们可以通过 `reverse` 函数来反向获取 url，从而实现重定向。

reverse语法

```python
reverse("<namespace>:<url-name>", kwargs={"<kwarg>": "<val>"})
```

现在我们仍然可以用 reverse 函数和模板中的 url 获取 URL

```python
reverse("users:index")
reverse("users:detail", kwargs={"uid": 2020})
{% url "users:index" %}
{% url "users:detail" uid=2020 %}
```

### 路由定义

在项目的总路由中，可以通过指定namespace来确定应用

```python
from django.urls import path, include


urlpatterns = [
    path('users/', include(('users.urls', 'userss')))
]
```

更进一步,把 namespace 定义到被 include 的  子路由`users/urls.py` 中去使用 app_name 定义名称空间

```python
from django.urls import re_path, path
from users.views import RegisterView, LoginView, DetailView, IndexView

app_name = 'users'

urlpatterns = [
  path('detail/<int:uid>/', DetailView.as_view(), name="detail"),
  path("", IndexView, name="index")
]
```

### 视图实现

```python
from django.http.response import HttpResponse
from django.shortcuts import redirect


def book_list(request):
    return HttpResponse("图书列表页")


def index(request):
    return redirect('books:bookList')  # redirect(reverse('books:bookList'))
```
