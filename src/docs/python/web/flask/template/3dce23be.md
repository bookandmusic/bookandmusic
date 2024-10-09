---
created: 2023-08-03T13:09:28.000Z
updated: 2024-10-08T15:05:30.000Z
article: false
order: 2
title: 请求与响应
---
## 请求

> 视图处理过程中，都是接收请求，处理逻辑，返回响应

### 请求属性

```python
request.method # 这个是用来专门获取用户端的请求方法的
request.user_agent  # 这个是用来获取用户是使用什么东西来请求的
request.referrer # 这个是用来获取用户在请求之前所在的url
request.host  # 主机的ip地址
request.path  # 当前视图的请求地址，不包含 查询字符串参数
request.full_path # 包含查询字符串参数的完整路径
request.user_agent # 客户端的身份标识
request.headers  # 请求头信息
request.data # 请求体内容
request.referrer  # 上一页的地址
request.remote_addr  # 服务器ip地址
request.environ # 服务器的配置环境信息
```

### 请求参数

#### 路由参数

通过把 URL 的一部分标记为 `<variable_name>` 就可以在 URL 中添加变量。标记的 部分会作为关键字参数传递给函数。通过使用 `<converter:variable_name>` ，可以 选择性的加上一个转换器，为变量指定规则。请看下面的例子:

```python
from markupsafe import escape

@app.route('/user/<username>/')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % escape(username)

@app.route('/post/<int:post_id>/')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>/')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
```

转换器类型：

|类型|功能|
| ----| -----------------------------------|
|`int`|接受正整数|
|`float`|接受正浮点数|
|`path`|类似 `string` ，但可以包含斜杠|
|`uuid`|接受 UUID 字符串|
|`string`|（缺省值） 接受任何不包含斜杠的文本|

#### 查询字符串

> 一般是 `GET`请求发送的参数， 类似 `/goods/?page=1&size=2`

```python
from flask import request, Flask

app = Flask(__name__)


# GET /goods/?page=xx&size=xx
@app.route('/goods/')
def goods():
    page = request.args.get('page', 1)
    size = request.args.get('size', 2)
    return '商品列表页：第{}页，每页{}条'.format(page, size)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, debug=True)
```

#### 表单参数

> 一般是 `POST`、`PUT`请求提交的数据，在请求体中存在

```python
from flask import request, Flask

app = Flask(__name__)


# POST /goods/  表单参数
@app.route('/goods/', methods=['POST'])
def goods():
    name = request.form.get('name')
    price = request.form.get('price')
    return '添加的商品为：{}:{}元'.format(name, price)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, debug=True)
```

#### Json字符串

> 一般是 `POST`、`PUT`请求提交的数据，在请求体中存在

`request.json` 属性，只能接收处理json格式的数据，得到字典; 如果传参不是json格式，得到`None`

```python
data = request.json # 字典、None

name = data.get('name')from flask import request, Flask

app = Flask(__name__)


# POST /goods/  表单参数
@app.route('/goods/', methods=['POST'])
def goods():
    data = request.json
    if data:
        name = data.get('name')
        price = data.get('price')

        return '添加的商品为：{}:{}元'.format(name, price)
    else:
        return "缺少必要参数", 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, debug=True)
```

`request.get_json()` 方法， 只能接收处理json格式的数据，得到字典; 如果传参不是json格式，得到`None`

```python
data = request.get_json()
```

`request.data` 属性，可以处理所有的非表单数据，但是，如果传递的是 json字符串，需要使用 `json.loads()`解析，得到字典数据

```python
import json

from flask import request, Flask

app = Flask(__name__)


# POST /goods/  表单参数
@app.route('/goods/', methods=['POST'])
def goods():
    data = request.data
    goods_data = json.loads(data)

    if goods_data:
        name = goods_data.get('name')
        price = goods_data.get('price')

        return '添加的商品为：{}:{}元'.format(name, price)
    else:
        return "缺少必要参数", 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, debug=True)
```

`request.get_data()`方法，可以处理所有的非表单数据，但是，如果传递的是 json字符串，需要使用 `json.loads()`解析，得到字典数据

```python
 data = request.get_data()
```

> `request.json`、`request.get_json()` 只能处理，已经声明过参数类型为 `json`格式的数据
>
> `request.data`、`request.get_data()`  既能处理普通文本数据; 也能处理 `json`数据,但是需要解析

#### 文件上传

> 一般是 `POST`、`PUT`请求提交

```python
import os
from flask import Flask, request
from werkzeug.utils import secure_filename

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'upload')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload/', methods=['POST'])
def upload_file():
    file = request.files.get('img')

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return '上传成功'
    else:
        return "请选择合法文件", 400


if __name__ == '__main__':
    app.run()
```

**文件名校验**

> `secure_filename()`函数到底是有什么用？有一条原 则是**“永远不要信任用户输入”**。这条原则同样适用于已上传文件的文件名。所有提 交的表单数据可能是伪造的，文件名也可以是危险的。此时要谨记：**在把文件保存到 文件系统之前总是要使用这个函数对文件名进行安检**。

**问题**

用`secure_filename`获取中文文件名时,中文会被省略。

**原因**

`secure_filename()`函数只返回ASCII字符，非ASCII字符会被过滤掉。

**解决方案**

使用第三方库（`pypinyin`)，将中文名转换成拼音

```python
from pypinyin import lazy_pinyin

filename = secure_filename(''.join(lazy_pinyin(file.filename)))
```

使用`uuid`模块重命名文件名

`python`的`uuid`模块提供`UUID`类和函数`uuid1()`, `uuid3()`, `uuid4()`, uuid5() 来生成1, 3, 4, 5各个版本的UUID ( 需要注意的是: python中没有`uuid2()`这个函数)。

```python
uuid.uuid1([node[, clock_seq]])  # 基于时间戳
#  使用主机ID, 序列号, 和当前时间来生成UUID, 可保证全球范围的唯一性. 但由于使用该方法生成的UUID中包含有主机的网络地址, 因此可能危及隐私.
# 该函数有两个参数, 如果 node 参数未指定, 系统将会自动调用 getnode() 函数来获取主机的硬件地址. 如果 clock_seq  参数未指定系统会使用一个随机产生的14位序列号来代替. 
>>> uuid.uuid1()
UUID('de938d50-b71f-11eb-be01-acbc3299bbc1')


uuid.uuid3(namespace, name) # 基于名字的MD5散列值
# 通过计算命名空间和名字的MD5散列值来生成UUID
# 可以保证同一命名空间中不同名字的唯一性和不同命名空间的唯一性, 但同一命名空间的同一名字生成的UUID相同.
>>> uuid.uuid3(uuid.NAMESPACE_DNS, '瀑布.jpg')
UUID('8e42e906-e070-3b6b-b84c-8ef58b3870a8')


uuid.uuid4() #  基于随机数
# 通过随机数来生成UUID. 使用的是伪随机数有一定的重复概率.
>>> uuid.uuid4()
UUID('ec40448a-bf0d-4248-abce-9b737eb3bcbb')

uuid.uuid5(namespace, name)# 基于名字的SHA-1散列值
# 通过计算命名空间和名字的SHA-1散列值来生成UUID, 算法与 uuid.uuid3() 相同
>>> uuid.uuid5(uuid.NAMESPACE_DNS, '瀑布.jpg')
UUID('a0d8cf44-9288-5961-b9f3-b1e5608c41d9')
```

不使用`secure_filename()`函数进行文件名检测（不推荐）

自定义工具（耗时）

## 响应

> 视图函数的返回值会自动转换为一个响应对象。

### 模板相关

#### 字符串响应

如果返回值是一个字符串，那么会被 转换为一个包含作为响应体的字符串、一个 `200 OK` 出错代码 和一个 *text/html* 类型的响应对象。

```python
@app.route('/')
def index():
    return 'index'

# 请求该视图时，会默认返回一个 显示 'index' 的html页面
```

#### 模板响应

使用 `render_template()` 方法可以渲染模板，你只要提供模板名称和需要 作为参数传递给模板的变量就行了。

`app.py`

```python
import os
from flask import Flask, render_template

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, template_folder=os.path.join(BASE_DIR, 'templates'))


@app.route('/hello/<username>/')
@app.route('/hello/')
def index(username=None):
    print(username)
    return render_template('index.html', username=username)


if __name__ == '__main__':
    app.run()
```

`templates/index.html`

```jinja2
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% if username %}
    <h1>hello {{ username }}</h1>
{% else %}
    <h1>hello Flask</h1>
{% endif %}
</body>
</html>
```

#### 重定向

`redirect(location, code=302, Response=None)`： 返回响应对象（WSGI 应用程序），如果被调用，该对象将客户端重定向到目标位置。支持代码为 301、302、303、305、307 和 308。

```python
from flask import abort, redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    return '登录页面'
```

> `url_for()` 函数用于构建指定函数的 URL。它把函数名称作为第一个 参数。它可以接受任意个关键字参数，每个关键字参数对应 URL 中的变量。未知变量 将添加到 URL 中作为查询参数。

例如，这里我们使用 `test_request_context()`方法来尝试使用 `url_for()` 。 `test_request_context()` 告诉 Flask 正在处理一个请求。

```python
from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def index():
    return 'index'

@app.route('/login')
def login():
    return 'login'

@app.route('/user/<username>')
def profile(username):
    return '{}\'s profile'.format(escape(username))

with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))

```

输出结果：

```python
/
/login
/login?next=/
/user/John%20Doe
```

### 数据相关

#### 元组

如果返回的是一个元组，那么元组中的项目可以提供额外的信息。元组中必须至少 包含一个项目，且项目应当由 `(response, status)` 、 `(response, headers)` 或者 `(response, status, headers)` 组成。 `status` 的值会重载状态代码， `headers` 是一个由额外头部值组成的列表 或字典。

```python
from flask import Flask
import json


@app.route("/user/")
def user():
    json_dict = {
        "name": "xiaoming",
        "user_info": {"age": 28}
    }
    data = json.dumps(json_dict)
    return data, 200, {"ContentType": "application/json"}
```

#### Json

JSON 格式的响应是常见的，用 Flask 写这样的 API 是很容易上手的。如果从视图 返回一个 `dict` ，那么它会被转换为一个 JSON 响应。

```python
@app.route("/user/")
def user():
    json_dict = {
        "name": "XiaoMing",
        "age": 28
    }
    return json_dict, 200
```

如果 `dict` 还不能满足需求，还需要创建其他类型的 JSON 格式响应，可以使用 [`jsonify()`](https://dormousehole.readthedocs.io/en/latest/api.html#flask.json.jsonify) 函数。该函数会序列化任何支持的 JSON 数据类型。

```python
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/user/")
def user():
    return jsonify([{
        "name": "XiaoMing",
        "age": 28
    }, {
        "name": "XiaoHong",
        "age": 26
    }, {
        "name": "XiaoQiang",
        "age": 30
    }]), 200


if __name__ == '__main__':
    app.run()

```

#### 小结

> `jsonify()`将字典对象转化为*json*字符串，`Content-Type: application/json`；
>
> `json.dumps()`将字典对象转化为*json*字符串 , `Content-Type: text/html`

### 自定义响应

我们可以使用*Flask*提供的`make_response` 方法来自定义自己的`response`对象

#### 返回数据

```python
@app.route('/user/')
def hello():
    data = json.dumps({'name': "XiaoHong", 'age': 28})

    headers = {
        'content-type': 'application/json'
    }

    response = make_response(data, 200)
    response.headers = headers
    return response
```

> 此时，通过`make_response()`方法生成响应对象，然后修改响应头信息，因此，返回数据的 类型就是 `application/json`，而不是 `text/html`

#### 返回页面

> `make_response` 想要返回页面，不能直接写做：`make_response('模板名')`，必须用`render_template('模板名')`形式; 同样,状态码即可以在方法中设置，也可以在返回时设置

```python

from flask import make_response
 
@app.route('/index/')
def make_response_function():
    temp = render_template('index.html')
    response = make_response(temp)
    return response, 200
```
