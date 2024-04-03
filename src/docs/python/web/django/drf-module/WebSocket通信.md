---
title: WebSocket通信
date: 2023-08-03T21:13:05Z
lastmod: 2023-08-03T21:13:05Z
article: false
order: 4
---

# WebSocket通信

　　在这篇文章中，将在 Django 应用程序中启用 WebSocket，而无需安装第三方应用程序。

　　Django 从 3.0 版本开始引入了 ASGI 接口，并在 3.1 版本中引入了异步视图。我们的解决方案将基于异步视图。

　　在本教程中，我们将使用 Python 3.7 和 Django 3.2。

# WebSocket ASGI 接口介绍

　　ASGI 是为我们服务多年的旧 WSGI 协议的替代协议，它将在未来 2-3 年内成为 Python Web 框架中的事实标准。

　　那么，WebSocket 在这种情况下是如何工作的呢？

　　WebSocket 客户端和服务器应用程序之间的通信是基于事件的。

　　[ASGI 规范](https://asgi.readthedocs.io/en/latest/specs/www.html#websocket)定义了两种类型的事件：发送和接收。

　　**接收事件：**  这些是客户端发送到服务器应用程序的事件：

1. `websocket.connect` 当客户端尝试与我们的应用程序建立连接时发送
2. `websocket.receive` 当客户端向我们的应用发送数据时发送
3. `websocket.disconnect` 告诉我们客户端已断开连接。

　　**发送事件：**  是由服务器应用程序发送到客户端（例如浏览器）：

1. `websocket.accept`— 如果我们想允许连接，我们会将此事件发送回客户端
2. `websocket.send`— 通过这个事件，我们将数据推送到客户端
3. `websocket.close`当我们想要中止连接时由应用程序发出。

　　现在，我们知道该派对的所有参与者，现在是谈论他们的顺序的时候了。

- 当浏览器打开连接时，ASGI 协议服务器向我们发送`websocket.connect`事件。
- 服务器应用程序必须根据我们的逻辑根据我们的逻辑来响应它。很简单：

  - 如果服务器允许客户端连接，则发出`websocket.accept`事件；
  - 服务器可能想要取消连接，例如，如果用户没有连接权限或未登录， 则发出`websocket.close`取消连接；
  - 假设在接下来的步骤中允许连接。
- 接受连接后，应用程序就可以使用`websocket.send`和`websocket.receive`事件通过该套接字发送和接收数据了。
- 最后，当浏览器离开或刷新页面时，`websocket.disconnect`会向应用程序发送 a。
- 作为开发人员，您仍然可以控制连接，并且可以随时通过发送`websocket.close`事件来中止连接。

　　这是对 ASGI 如何处理 WebSockets 的简要描述。它不限于 Django，它适用于任何其他兼容 ASGI 的 Web 框架，如[FastAPI](https://fastapi.tiangolo.com/)。

# django集成

　　假设已经存在一个项目 `AsymcWeb`，且存在一个应用程序 `asynctask`，项目还集成了celery模块。

```shell
pip install celery redis django websockets uvicorn
```

## WebSocket连接类

　　WebSocket 连接的作用类似于之前在Django中使用的HTTP请求对象。该连接将封装请求信息以及帮助您接收和发送数据的方法。此连接将作为 WebSocket 视图函数的第一个参数传递。

　　为了方便之后的编程，我们还将在类中枚举所有可能的 WebSocket 事件，添加`Headers`类以访问请求标头，并`QueryParams`从查询字符串中获取变量。

　　`AsymcWeb/websocket/connection.py`

```python
import json
import typing as t
from urllib import parse


class State:
    CONNECTING = 1
    CONNECTED = 2
    DISCONNECTED = 3


class SendEvent:
    """Lists events that application can send.
    ACCEPT - Sent by the application when it wishes to accept an incoming connection.
    SEND - Sent by the application to send a data message to the client.
    CLOSE - Sent by the application to tell the server to close the connection.
        If this is sent before the socket is accepted, the server must close
        the connection with a HTTP 403 error code (Forbidden), and not complete
        the WebSocket handshake; this may present on some browsers as
        a different WebSocket error code (such as 1006, Abnormal Closure).
    """

    ACCEPT = "websocket.accept"
    SEND = "websocket.send"
    CLOSE = "websocket.close"


class ReceiveEvent:
    """Enumerates events that application can receive from protocol server.
    CONNECT - Sent to the application when the client initially
        opens  a connection and is about to finish the WebSocket handshake.
        This message must be responded to with either an Accept message or a Close message
        before the socket will pass websocket.receive messages.
    RECEIVE - Sent to the application when a data message is received from the client.
    DISCONNECT - Sent to the application when either connection to the client is lost,
        either from the client closing the connection,
        the server closing the connection, or loss of the socket.
    """

    CONNECT = "websocket.connect"
    RECEIVE = "websocket.receive"
    DISCONNECT = "websocket.disconnect"


class Headers:
    def __init__(self, scope):
        self._scope = scope

    def keys(self):
        return [header[0].decode() for header in self._scope["headers"]]

    def as_dict(self) -> dict:
        return {h[0].decode(): h[1].decode() for h in self._scope["headers"]}

    def __getitem__(self, item: str) -> str:
        return self.as_dict()[item.lower()]

    def __repr__(self) -> str:
        return str(dict(self))


class QueryParams:
    def __init__(self, query_string: str):
        self._dict = dict(parse.parse_qsl(query_string))

    def keys(self):
        return self._dict.keys()

    def get(self, item, default=None):
        return self._dict.get(item, default)

    def __getitem__(self, item: str):
        return self._dict[item]

    def __repr__(self) -> str:
        return str(dict(self))


class WebSocket:
    def __init__(self, scope, receive, send):
        self._scope = scope
        self._receive = receive
        self._send = send
        self._client_state = State.CONNECTING
        self._app_state = State.CONNECTING

    @property
    def headers(self):
        return Headers(self._scope)

    @property
    def scheme(self):
        return self._scope["scheme"]

    @property
    def path(self):
        return self._scope["path"]

    @property
    def query_params(self):
        return QueryParams(self._scope["query_string"].decode())

    @property
    def query_string(self) -> str:
        return self._scope["query_string"]

    @property
    def scope(self):
        return self._scope

    async def accept(self, subprotocol: str = None):
        """Accept connection.
        :param subprotocol: The subprotocol the server wishes to accept.
        :type subprotocol: str, optional
        """
        if self._client_state == State.CONNECTING:
            await self.receive()
        await self.send({"type": SendEvent.ACCEPT, "subprotocol": subprotocol})

    async def close(self, code: int = 1000):
        await self.send({"type": SendEvent.CLOSE, "code": code})

    async def send(self, message: t.Mapping):
        if self._app_state == State.DISCONNECTED:
            raise RuntimeError("WebSocket is disconnected.")

        if self._app_state == State.CONNECTING:
            assert message["type"] in {SendEvent.ACCEPT, SendEvent.CLOSE}, (
                    'Could not write event "%s" into socket in connecting state.'
                    % message["type"]
            )
            if message["type"] == SendEvent.CLOSE:
                self._app_state = State.DISCONNECTED
            else:
                self._app_state = State.CONNECTED

        elif self._app_state == State.CONNECTED:
            assert message["type"] in {SendEvent.SEND, SendEvent.CLOSE}, (
                    'Connected socket can send "%s" and "%s" events, not "%s"'
                    % (SendEvent.SEND, SendEvent.CLOSE, message["type"])
            )
            if message["type"] == SendEvent.CLOSE:
                self._app_state = State.DISCONNECTED

        await self._send(message)

    async def receive(self):
        if self._client_state == State.DISCONNECTED:
            raise RuntimeError("WebSocket is disconnected.")

        message = await self._receive()

        if self._client_state == State.CONNECTING:
            assert message["type"] == ReceiveEvent.CONNECT, (
                    'WebSocket is in connecting state but received "%s" event'
                    % message["type"]
            )
            self._client_state = State.CONNECTED

        elif self._client_state == State.CONNECTED:
            assert message["type"] in {ReceiveEvent.RECEIVE, ReceiveEvent.DISCONNECT}, (
                    'WebSocket is connected but received invalid event "%s".'
                    % message["type"]
            )
            if message["type"] == ReceiveEvent.DISCONNECT:
                self._client_state = State.DISCONNECTED

        return message

    async def receive_json(self) -> t.Any:
        message = await self.receive()
        self._test_if_can_receive(message)
        return json.loads(message["text"])

    async def receive_jsonb(self) -> t.Any:
        message = await self.receive()
        self._test_if_can_receive(message)
        return json.loads(message["bytes"].decode())

    async def receive_text(self) -> str:
        message = await self.receive()
        self._test_if_can_receive(message)
        return message["text"]

    async def receive_bytes(self) -> bytes:
        message = await self.receive()
        self._test_if_can_receive(message)
        return message["bytes"]

    async def send_json(self, data: t.Any, **dump_kwargs):
        data = json.dumps(data, **dump_kwargs)
        await self.send({"type": SendEvent.SEND, "text": data})

    async def send_jsonb(self, data: t.Any, **dump_kwargs):
        data = json.dumps(data, **dump_kwargs)
        await self.send({"type": SendEvent.SEND, "bytes": data.encode()})

    async def send_text(self, text: str):
        await self.send({"type": SendEvent.SEND, "text": text})

    async def send_bytes(self, text: t.Union[str, bytes]):
        if isinstance(text, str):
            text = text.encode()
        await self.send({"type": SendEvent.SEND, "bytes": text})

    def _test_if_can_receive(self, message: t.Mapping):
        assert message["type"] == ReceiveEvent.RECEIVE, (
                'Invalid message type "%s". Was connection accepted?' % message["type"]
        )

```

## Application扩展

　　创建一个新的 Django 项目时，项目中已经存在了一个名为`asgi.py`的文件。在这个文件中存在一个 ASGI 应用程序。注意：这是我们将要启动项目所使用的应用程序，而不是在`wsgi.py`中的同步应用程序。

　　但是，此时的ASGI应用程序只能处理一般的HTTP请求，并不支持websocket协议，我们还需要自定义装饰器，对这个ASGI应用程序进行扩展，使其支持websocket协议。

### websocket装饰器

　　`AsymcWeb/websocket/websocket.py`

```python
from django.urls import resolve
from AsyncWeb.websocket.connection import WebSocket


def websockets(app):
    async def asgi(scope, receive, send):
        if scope["type"] == "websocket":
            match = resolve(scope["raw_path"])
            await match.func(WebSocket(scope, receive, send), *match.args, **match.kwargs)
            return
        await app(scope, receive, send)
    return asgi

```

　　在装饰器中，我们检查请求类型是否为`websocket`，如果是，我们调用 Django 的 URL 解析器来获取可调度的视图函数。顺便说一句，如果解析器找不到与 URL 匹配的视图，则会引发 404 错误。

### ASGI应用程序

　　`AsymcWeb/asgi.py`

```python
import os

import django
from django.core.asgi import get_asgi_application

from AsyncWeb.websocket.websocket import websockets

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "AsyncWeb.settings")
django.setup()

application = get_asgi_application()
application = websockets(application)
```

　　之后，每个请求都会被我们的装饰器中捕获并测试其类型。如果类型是`websocket`，则装饰器将尝试解析并调用视图函数。

## WebSocket视图

　　在视图中，我们实现了一个功能：

- 接收客户端发送的参数，解析校验；
- 如果参数无问题，返回客户端信息，通知任务开始；
- 然后调用celery执行对应的任务
- 异步等待celery执行完成任务，接收回调结果
- 将结果返回给客户端，关闭连接

```python
import asyncio
from json import JSONDecodeError

from AsyncWeb.websocket.connection import WebSocket
from .tasks import test_task


async def async_task_view(socket: WebSocket):
    await socket.accept()  # 接收客户端发送的请求

    # 校验接收的参数是否为json字符串
    try:
        params = await socket.receive_json()
    except JSONDecodeError:
        await socket.send_json({'msg': "参数格式有误", 'flag': False})
        return
    if params and not isinstance(params, dict):
        await socket.send_json({'msg': "参数格式有误", 'flag': False})
        return
    # 校验任务id是否存在
    task_id = params.get('task_id')
    if not task_id:
        await socket.send_json({'msg': "缺少必要参数", 'flag': False})
        return

    # 返回任务开始信息
    await socket.send_json({'msg': f"任务{task_id}正在执行。。。", 'flag': True})

    # 将任务发送到celery异步任务队列中
    result = test_task.delay(task_id)

    # 校验celery中的任务是否执行完成
    while not result.ready():
        await asyncio.sleep(0.1)

    # 获取任务结果
    r = result.get()

    # 最后，返回任务执行结果
    await socket.send_json({'msg': "success", 'flag': True, "data": {'result': r}})
```

## 配置路由

　　为了和普通的视图进行区分，我们给path起了一个别名

```python
from django.contrib import admin
from django.urls import path

from asynctask import views

websocket = path
urlpatterns = [
    path('admin/', admin.site.urls),
    websocket("async_task/", views.async_task_view),
]
```

## 启动服务

　　Django 的`runserver`命令不会使用定义在`asgi.py`文件中的application。因此，我们需要使用第三方的应用服务器，在这，我们使用[Uvicorn](https://www.uvicorn.org/)。

　　安装后启动服务器，将 ASGI 应用程序作为第一个位置参数：

```bash
uvicorn AsyncWeb.asgi:application --reload --debug
```

## 测试

　　使用快捷键F12，在浏览器中打开调试模式：

　　在控制台创建一个websocket对象：

```javascript
socket = new WebSocket("ws://127.0.0.1:8000/async_task/")
```

　　然后给服务器程序发送信息：

```javascript
socket.send('{"task_id":1}')
```

　　在Network中可以看到本次请求信息

|data|length|Time|
| :---| :-----| :-----------|
|`{"task_id":2}`|13|16:06:38.087|
|`{msg: "任务2正在执行。。。", flag: true}`|80|16:06:38.088|
|`{msg: "success", flag: true, data: {result: 2}}`|55|16:08:21.485|
