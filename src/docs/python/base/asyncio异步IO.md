---
title: asyncio异步IO
category: [Python]
tag: [异步, 并发, 协程]
abbrlink: d63fc672
date: 2021-10-31 11:35:15
article: false
---

asyncio 是用来编写 并发 代码的库，使用 async/await 语法。

asyncio 被用作多个提供高性能 Python 异步框架的基础，包括网络和网站服务，数据库连接库，分布式任务队列等等。

asyncio 往往是构建 IO 密集型和高层级 结构化 网络代码的最佳选择。

asyncio 提供一组 高层级 API 用于:

-   并发地 运行 Python 协程 并对其执行过程实现完全控制;

-   执行 网络 IO 和 IPC;

-   控制 子进程;

-   通过 队列 实现分布式任务;

-   同步 并发代码;

此外，还有一些 低层级 API 以支持 库和框架的开发者 实现:

-   创建和管理 事件循环，以提供异步 API 用于 网络化, 运行 子进程，处理 OS 信号 等等;

-   使用 transports 实现高效率协议;

-   通过 async/await 语法 桥接 基于回调的库和代码。

## 入口函数

使用 `async/await` 语法声明的协程，是编写asyncio应用程序的首选方式。

要真正运行一个协程，asyncio 提供了以下主要机制:

### asyncio.run

`asyncio.run(coro, *, debug=False)`:执行 coroutine *coro* 并返回结果。

此函数运行传入的协程，负责管理 asyncio 事件循环并 *完结异步生成器*。

当有其他 asyncio 事件循环在同一线程中运行时，此函数不能被调用。

如果 *debug* 为 `True`，事件循环将以调试模式运行。

此函数总是会创建一个新的事件循环并在结束时关闭之。它应当被用作 asyncio 程序的主入口点，理想情况下应当只被调用一次。

```python
In [1]: import asyncio

In [2]: async def main():
   ...:     return 42
   ...: 

In [3]: asyncio.run(main())
Out[3]: 42
```

请注意，简单地调用协程不会安排它被执行：

```python
In [4]: main()
Out[4]: <coroutine object main at 0x7f5c0bbd2540>
```

## 可等待对象

如果一个对象可以在`await`表达式中使用，我们就说它是一个**可等待对象(awaitable)** 。许多asyncio APIs被设计为接收可等待对象作为参数。

*可等待*对象 主要分为三种类型： **coroutines**、**Tasks**和**Futures**。

### coroutine

python的协程就是一个可等待对象。所谓的协程指的是：

- 协程函数：一个`async def`定义的函数；
- 协程对象：调用 协程函数返回的对象。

```python
import asyncio
import time


async def time_sleep():
    r = await asyncio.sleep(1, 10)
    return r


async def main():
    result = await time_sleep()
    print(result)


if __name__ == '__main__':
    t = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t)
```

### Task

`asyncio.create_task(coro)`、`asyncio.ensure_future(coro)`：将 *coro* 协程 打包为一个 `Task` 排入日程准备执行，返回 Task 对象。

```python
import asyncio
import time


async def time_sleep():
    r = await asyncio.sleep(1, 10)
    return r


async def main():
    task = asyncio.create_task(time_sleep())
    await task
    print(task.result())


if __name__ == '__main__':
    t = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t)
```

以下演示Task对象的一些常用属性和方法：

```python
import asyncio


async def say_after(delay, what):
    await asyncio.sleep(delay)
    return f'{what}{delay}'


async def main():
    # In Python 3.7+
    task1 = asyncio.create_task(say_after(1, 'hello'))
    # This works in all Python versions but is less readable
    task2 = asyncio.ensure_future(say_after(2, 'world'))

    task1.cancel()  # 请求取消 Task 对象

    try:
        await task1
    except asyncio.CancelledError:
        print("main(): cancel_me is cancelled now")
    await task2
    print(f'task1 cancel:{task1.cancelled()}')  # 判断 Task 对象是否取消，取消则返回True，否则返回False
    print(f'task2 end:{task2.done()}')  # 如果 Task 对象 已完成 则返回 True
    print(f'task2 result: {task2.result()}')  # 返回 Task 任务的执行结果


asyncio.run(main())
```

预期的输出:

```python
main(): cancel_me is cancelled now
task1 cancel:True
task2 end:True
task2 result: world2
```

`asyncio.current_task(loop=None)`:返回当前运行的 `Task` 实例，如果没有正在运行的任务则返回 `None`。

`asyncio.all_tasks(loop=None)`: 返回事件循环所运行的未完成的 `Task` 对象的集合。

如果 *loop* 为 `None`，则会使用 `get_running_loop()` 获取当前事件循环。

```python
import asyncio


async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(asyncio.current_task()) 
    return f'{what}{delay}'


async def main():
    task1 = asyncio.create_task(say_after(1, 'hello'))
    task2 = asyncio.create_task(say_after(2, 'world'))

    print(asyncio.all_tasks()) 
    await task1
    await task2


asyncio.run(main())

```

预期的输出:

```python
{
    <Task pending coro=<say_after() running at /Users/lsf/PycharmProjects/pythonProject/demo.py:4>>, 
    <Task pending coro=<say_after() running at /Users/lsf/PycharmProjects/pythonProject/demo.py:4>>, 
    <Task pending coro=<main() running at /Users/lsf/PycharmProjects/pythonProject/demo.py:16> cb=[_run_until_complete_cb() at /usr/local/opt/python@3.7/Frameworks/Python.framework/Versions/3.7/lib/python3.7/asyncio/base_events.py:157]>
}
<Task pending coro=<say_after() running at /Users/lsf/PycharmProjects/pythonProject/demo.py:6> cb=[<TaskWakeupMethWrapper object at 0x109b65e10>()]>
<Task pending coro=<say_after() running at /Users/lsf/PycharmProjects/pythonProject/demo.py:6> cb=[<TaskWakeupMethWrapper object at 0x109b4c4d0>()]>

```

### Future

*Future* 对象 被用于连接 **低级回调代码** 和高级的 `async/await` 代码。

```python
import asyncio
import time


async def set_after(fut, delay, value):
    # Sleep for *delay* seconds.
    await asyncio.sleep(delay)

    # Set *value* as a result of *fut* Future.
    fut.set_result(value)


async def main():
    # Get the current event loop.
    loop = asyncio.get_running_loop()

    # Create a new Future object.
    fut = loop.create_future()

    # Run "set_after()" coroutine in a parallel Task.
    # We are using the low-level "loop.create_task()" API here because
    # we already have a reference to the event loop at hand.
    # Otherwise we could have just used "asyncio.create_task()".
    loop.create_task(
        set_after(fut, 1, 10)
    )

    # Wait until *fut* has a result (1 second) and print it.
    print(await fut)


if __name__ == '__main__':
    t = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t)
```

## 多任务并发

在多个异步任务调用时，如果直接await协程对象，实际的执行逻辑是串行执行。

```python
import asyncio
import time


async def time_sleep(i):
    r = await asyncio.sleep(1, result=i)

    return r


async def main():
    results = []
    for i in range(10):
        r = await time_sleep(i)
        results.append(r)

    print(results)


if __name__ == "__main__":
    t1 = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t1)

```

结果为：

```terminal
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
10.040742874145508
```

### asyncio.create_task

task对象设计之初，就是用来“并行的”调度协程。

```python
import asyncio
import time


async def time_sleep(i):
    r = await asyncio.sleep(1, result=i)
    return r


async def main():
    coros = [asyncio.create_task(time_sleep(i)) for i in range(10)]
    results = [await coro for coro in coros]
    print(results)

    results2 = [coro.result() for coro in coros]
    print(results2)


if __name__ == "__main__":
    t1 = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t1)

```

结果为：

```terminal
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
1.0065491199493408
```

### asyncio.gather

*并发* 运行*aws*序列中的可等待对象。如果所有可等待对象都成功完成，结果将是一个由所有返回值聚合而成的列表。结果值的顺序与 *aws* 中可等待对象的顺序一致。

```python
import asyncio
import time


async def time_sleep(i):
    r = await asyncio.sleep(1, result=i)
    return r


async def main():
    coros = [time_sleep(i) for i in range(10)]
    results = await asyncio.gather(*coros)
    print(results)


if __name__ == "__main__":
    t1 = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t1)

```

结果为：

```terminal
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
1.002351999282837
```

### asyncio.as_completed

并发地运行 *aws* 可迭代对象中的 可等待对象。 返回一个协程的迭代器。 所返回的每个协程可被等待以从剩余的可等待对象的可迭代对象中获得最早的下一个结果。

```python
import asyncio
import time


async def say_after(delay, what):
    return await asyncio.sleep(delay, result=what)


async def main():

    coros = [say_after(1, i) for i in range(10)]
    futures = asyncio.as_completed(coros)
    results = [await future for future in futures]
    print(results)


if __name__ == "__main__":
    t1 = time.time()
    asyncio.run(main())
    t2 = time.time()
    print(t2 - t1)
```

## 超时等待

### asyncio.sleep

 `asyncio.sleep(delay, result=None, *, loop=None)`: 阻塞 *delay* 指定的秒数。如果指定了 *result*，则当协程完成时将其返回给调用者。

`sleep()` 总是会挂起当前任务，以允许其他任务运行。

以下协程示例运行 5 秒，每秒显示一次当前日期:

```python
import asyncio
import datetime


async def get_current_time():
    while True:
        print(datetime.datetime.now())
        await asyncio.sleep(5)


if __name__ == "__main__":
    asyncio.run(get_current_time())
```

### asyncio.wait_for

`asyncio.wait_for(aw, timeout, *, loop=None)`：等待 *aw* **可等待对象** 完成，指定 timeout 秒数后超时。

*timeout* 可以为 `None`，也可以为 float 或 int 型数值表示的等待秒数。如果 *timeout* 为 `None`，则等待直到完成。

如果发生超时，任务将取消并引发 `asyncio.TimeoutError`。

```python
import asyncio


async def eternity():
    # Sleep for one hour
    await asyncio.sleep(3600)
    print('yay!')


async def main():
    # Wait for at most 1 second
    try:
        await asyncio.wait_for(eternity(), timeout=1.0)
    except asyncio.TimeoutError:
        print('timeout!')


asyncio.run(main())
```

### asyncio.wait

`asyncio.wait(aws, *, loop=None, timeout=None, return_when=ALL_COMPLETED)`：并发运行 *aws* 指定的 可等待对象 并阻塞线程直到满足 *return_when* 指定的条件。

返回两个 Task/Future 集合: `(done, pending)`。

用法:

```
done, pending = await asyncio.wait(aws)
```

如指定 *timeout* (float 或 int 类型) 则它将被用于控制返回之前等待的最长秒数。

请注意此函数不会引发 `asyncio.TimeoutError`。当超时发生时，未完成的 Future 或 Task 将在指定秒数后被返回。

*return_when* 指定此函数应在何时返回。它必须为以下常数之一:

| 常数                | 描述                                                      |
|:------------------|:--------------------------------------------------------|
| `FIRST_COMPLETED` | 函数将在任意可等待对象结束或取消时返回。                                    |
| `FIRST_EXCEPTION` | 函数将在任意可等待对象因引发异常而结束时返回。当没有引发任何异常时它就相当于 `ALL_COMPLETED`。 |
| `ALL_COMPLETED`   | 函数将在所有可等待对象结束或取消时返回。                                    |

与 `wait_for()` 不同，`wait()` 在超时发生时不会取消可等待对象。

```python
import asyncio


async def say_after(delay, what):
    await asyncio.sleep(delay)
    return f'{what}{delay}'


async def main():
    task1 = asyncio.create_task(say_after(2, 'hello'))
    task2 = asyncio.create_task(say_after(4, 'world'))

    done, pending = await asyncio.wait([task2, task1], timeout=3)
    print(done)
    print(pending)
    if task1 not in pending:
        print(f'task1 result: {task1.result()}')
    if task2 in done:
        print(f'task2 result: {task2.result()}')

    await asyncio.wait(pending)
    print("task2 end")
    print(f'task2 result: {task2.result()}')


asyncio.run(main())
```

预期的输出:

```python
{<Task finished coro=<say_after() done, defined at /Users/lsf/PycharmProjects/pythonProject/demo.py:4> result='hello2'>}
{<Task pending coro=<say_after() running at /Users/lsf/PycharmProjects/pythonProject/demo.py:5> wait_for=<Future pending cb=[<TaskWakeupMethWrapper object at 0x10e72f150>()]>>}
task1 result: hello2
task2 end
task2 result: world4
```

## 案例

爬取某个平台下的所有图片的时候，我们需要下载图片，如果你一个个地下载会出现这样的情况：

1.  **如果某个请求堵塞，整个队列都会被堵塞**
2.  **如果是小文件，单线程下载太慢**

这时候异步下载就派上用场了，**在你请求第一个图片获得数据的时候，它会切换请求第二个图片或其他图片，等第一个图片获得所有数据后再切换回来**。从而实现多线程批量下载的功能，速度超快，下载超清大图用这个方法可以一秒一张。

```python
async def download_img(session, url):
    name = url.split('/')[-1]

    img = await session.get(url)

    imgcode = await img.read()

    with open("img/" + str(name), 'wb') as f:
        f.write(imgcode)

    return str(url)


async def download_all_img(URL):
    async with aiohttp.ClientSession() as session:
        tasks = [asyncio.create_task(download_img(session, url)) for url in URL]
        all_results = await asyncio.gather(*tasks)


async def main():
    url = [
        'https://pic1.win4000.com/wallpaper/2018-09-11/5b9784aa5ec31.jpg',
        'https://pic1.win4000.com/wallpaper/2018-09-11/5b9784aaef17f.jpg',
    ]
    await asyncio.create_task(download_all_img(url))


if __name__ == '__main__':
    asyncio.run(main())

`````