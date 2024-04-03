---
title: Redis客户端
url: /archives/5a593267
category: [Python]
tag: [redis]
abbrlink: 5a593267
date: 2022-04-10 15:27:20
updated: 2023-03-02 14:44:36
order: 6
article: false
---


使用 python 操作 redis，可以安装一个第三方库，名字就叫做 redis。它提供了一些接口，能够使我们更加方便的操作 redis。

## 安装

```shell
pip install redis
```

## 普通连接

python 操作 redis，需要通过一个 redis 连接对象来进行：

```python
In [1]: import redis

In [2]: conn = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

In [3]: conn.set('k11', 11)  # 操作成功，返回True。否则，返回False
Out[3]: True

In [4]: conn.get('k11')  # 返回的都是字符串
Out[4]: '11'
    
In [9]: conn.rpush('names', 1, 2, 3, 4)
Out[9]: 4

In [10]: conn.lrange('names', 0, -1)
Out[10]: ['1', '2', '3', '4']    
```

默认返回的所有响应都以字节的形式返回，但可以通过指定redis的参数 `decode_responses`来定制。

默认的编码是 utf-8，但这可以通过指定 redis 的`encoding`参数来定制。

注意，redis返回的所有数字都是字符串形式，如果想要得到数字，还需要进行转换。

**redis 库中的方法以及方法的参数与 redis-cli 的命令以及参数是一致的，方法名称对应命令，方法参数对应命令参数。**因此，学会了 redis-cli 的命令，就学会了 redis 库的使用。

## 连接池

连接池是一种提高性能的技术手段，它提前创建好一些连接并保存在池中。当有请求时，就从连接池中直接取出一个连接，用完再放回去。这样就免去了创建连接和销毁连接的过程。

```python
In [22]: pool = redis.ConnectionPool(host="localhost", port=6379, db=0, max_connections=100, decod    ...: e_responses=True)

In [23]: conn = redis.Redis(connection_pool=pool)

In [24]: conn.get('k11')  # 像普通连接一样使用即可
Out[24]: '11'
```

`max_connections`指的是请求池中的最大连接数，默认是 `2**31`。

## 管道

Redis 是一个使用客户端 - 服务器模型的 TCP 服务器，也被称为请求/响应协议。也就是说，redis 每次执行一个请求，需要经过以下步骤：

1. 客户端向服务器发送一个查询，然后从套接字读取数据，通常以阻塞的方式获取服务器的响应。
2. 服务器处理命令并将响应发送回客户端。

如果现在有一堆命令等待执行，发送完一个请求，等待响应再发送下一个请求…… 就会造成时间上的浪费。所以，我们希望能够一次就发送多条命令，以节省时间。而管道就能帮助我们实现这一需求。

**通过管道可以在无需等待请求被响应的情况下，发送下一个请求。**

Pipelines 是 Redis 基类的子类，它支持在单个请求中将多个命令缓冲到服务器。它们可用于通过减少客户端和服务器之间来回 TCP 数据包的数量来显着提高命令组的性能。

```python
In [1]: import redis

In [2]: pool = redis.ConnectionPool(host="localhost", port=6379, db=0, max_connections=100, decode   ...: _responses=True)

In [3]: conn = redis.Redis(connection_pool=pool)

In [4]: pipe = conn.pipeline()

In [6]: pipe.set('person1', '小红')  # 所有缓冲到管道中的命令都返回管道对象本身。
Out[6]: Pipeline<ConnectionPool<Connection<host=localhost,port=6379,db=0>>>

In [7]: pipe.set('person2', '小明')
Out[7]: Pipeline<ConnectionPool<Connection<host=localhost,port=6379,db=0>>>

In [8]: pipe.execute()
Out[8]: [True, True]

In [9]: conn.get('person1')
Out[9]: '小红'

In [10]: conn.get('person2')
Out[10]: '小明'
```

此外，默认情况下，管道还可以确保缓冲的命令作为一个组原子地执行。如果您想禁用管道的原子特性但仍想缓冲命令，也可以通过指定 `transaction=False` 来禁用事务。

```python
pipe = conn.pipeline(transaction=False)
```

**通过管道还可以对事务进行部分支持（不支持回滚）。**

当需要原子事务但需要先在 Redis 中检索值以在事务中使用时，会出现一个常见问题。例如，假设 INCR 命令不存在，我们需要在 Python 中构建 INCR 的原子版本。一种简单的实现方式是：可以先 GET 值，然后在 Python 中递增它，最后 SET 新值。

但是，这不是原子的，因为多个客户端可能同时执行此操作，每个客户端都从 GET 中获取相同的值。

输入 WATCH 命令。WATCH 提供了在开始操作之前监控一个或多个key的功能。如果其中任何一个键在该事务执行之前发生更改，则整个事务将被取消并引发 WatchError。

要实现我们自己的客户端 INCR 命令，我们可以这样做：

```python
import time

import redis

pool = redis.ConnectionPool(host='localhost', port=6379, db=0, max_connections=100, decode_responses=True)
conn = redis.Redis(connection_pool=pool)
with conn.pipeline() as pipe:
    while True:
        try:
            print("开始秒杀。。。")
            pipe.watch('count')  # WATCHing之后，管道将进入立即执行模式，直到我们告诉它再次开始缓冲命令
            time.sleep(5)
            n = pipe.get('count')  # 这允许我们获得序列的当前值
            pipe.multi()  # 现在，我们可以使用MULTI将管道恢复到缓冲模式
            if n and n.isdigit() and int(n) > 0:
                pipe.set('count', int(n) - 1)
                result = pipe.execute()  # 最后，执行管道
                print("秒杀成功")
            else:
                print("秒杀失败")
            # 如果在执行过程中没有引发WatchError，那么我们所做的一切都是原子性的。
            break
        except redis.WatchError:
            # 在我们开始WATCH 键 和管道执行之间，另一个客户端肯定已经更改了它。我们最好的办法就是再试一次。
            pass

```

请注意，由于管道必须在 WATCH 期间绑定到单个连接，因此必须小心确保通过调用 reset() 方法将连接返回到连接池。如果 Pipeline 用作上下文管理器（如上例所示），将自动调用 reset()。当然，您可以通过显式调用 reset() 以手动方式执行此操作：

```python
pipe = conn.pipeline()
while True:
    try:
        pipe.watch('count')
        result = pipe.get('count')
        print(result)
        pipe.execute()
        pipe.reset()
        break
    except redis.WatchError:
        continue
```

存在一种名为“transaction”的便捷方法，用于处理处理和重试监视错误的所有样板。它需要一个可调用的，它应该期望一个参数、一个管道对象和任意数量的键被 WATCHed。我们上面的客户端INCR命令可以这样写，这样更容易阅读：

```python
import time

import redis

pool = redis.ConnectionPool(host='localhost', port=6379, db=0, max_connections=100, decode_responses=True)
conn = redis.Redis(connection_pool=pool)


def count_decr(pipe):
    print("秒杀开始。。。")
    time.sleep(5)
    n = pipe.get('count')
    pipe.multi()  # 开启事务
    if n and n.isdigit() and int(n) > 0:
        return pipe.set('count', int(n) - 1)
    return False


result = conn.transaction(count_decr, 'count')
if result[0]:
    print("秒杀成功")
else:
    print("秒杀失败")

```

在`Redis.transaction` 的回调函数中，执行任何写入命令之前。必须执行`pipe.multi()`。

更加详细的说明，请参考官方文档：[传送门](https://redis.readthedocs.io/en/latest/)
