---
title: 超时退出
category: [Python]
tag: []
abbrlink: a48fc9
date: 2021-03-08 22:38:26
article: false
---

最近在项目中调用第三方接口时候，经常会出现请求超时的情况，或者参数的问题导致调用异代码异常。针对超时异常，查询了python 相关文档，没有并发现完善的包来根据用户自定义
的时间来抛出超时异常的模块。所以自己干脆自己来实现一个自定义的超时异常。

## 基于 signal模块实现

signal包负责在Python程序内部处理信号，典型的操作包括预设信号处理函数，暂 停并等待信号，以及定时发出SIGALRM等。要注意，signal包主要是针对UNIX平台(比如Linux, MAC OS)，而Windows内核中由于对信号机制的支持不充分，所以在Windows上的Python不能发挥信号系统的功能。 

```python
import functools
import time
import signal


def time_out(interval, callback=None):
    def decorator(func):
        @functools.wraps(func)
        def handler(signum, frame):
            raise TimeoutError(f"run {func.__name__} timeout")

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                signal.signal(signal.SIGALRM, handler)
                signal.alarm(interval)  # interval秒后向进程发送SIGALRM信号
                result = func(*args, **kwargs)
                signal.alarm(0)  # 函数在规定时间执行完后关闭alarm闹钟
                return result
            except TimeoutError as e:
                return callback(e) if callback else e

        return wrapper

    return decorator


def timeout_callback(e):
    print(e)


@time_out(2, timeout_callback)
def task1():
    print("task1 start")
    time.sleep(3)
    print("task1 end")


@time_out(2, timeout_callback)
def task2():
    print("task2 start")
    time.sleep(1)
    print("task2 end")


if __name__ == "__main__":
    task1()
    task2()

```

结果如下：

```python
task1 start
run task1 timeout
task2 start
task2 end
```



## 基于子线程阻塞实现

原理：将要调用的功能函数放入子线程，通过设定主线程的阻塞等待时间，超时则主线程并不会等待子线程的执行。主线程退出，子线程就不存在了。
核心就是在主线程中添加 join()方法，用于等待线程结束。join()的作用是，在子线程完成运行之前，这个子线程的父线程将会被一直阻塞.


```python
import functools
import time
import threading


class MyThread(threading.Thread):
    def run(self):
        self.result = None
        try:
            if self._target:
                self.result = self._target(*self._args, **self._kwargs)
        finally:
            del self._target, self._args, self._kwargs


def time_out(interval, callback=None):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            t = MyThread(target=func, args=args, kwargs=kwargs)
            t.setDaemon(True)  # 设置主线程为守护线程，一旦主线程结束，子线程立刻结束
            t.start()
            t.join(interval)  # 主线程阻塞等待interval秒
            if t.is_alive():
                return threading.Timer(0, callback,
                                       args=(f"run {func.__name__} timeout",)).start() if callback else None  # 立即执行回调函数
            else:
                return t.result

        return wrapper

    return decorator


def timeout_callback(e):
    print(e)


@time_out(2, timeout_callback)
def task1():
    print("task1 start")
    time.sleep(3)
    print("task1 end")


@time_out(2, timeout_callback)
def task2():
    print("task2 start")
    time.sleep(1)
    print("task2 end")


if __name__ == '__main__':
    task1()
    task2()
```

结果如下：

```python
task1 start
run task1 timeout
task2 start
task2 end
```

## 基于协程gevent实现

```python
import functools
import time


def time_out(interval, callback=None):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            ########## 该部分必选在requests之前导入
            import gevent
            from gevent import monkey
            monkey.patch_all()
            ##########

            try:
                gevent.with_timeout(interval, func, *args, **kwargs)
            except gevent.timeout.Timeout as e:
                callback(f"{func.__name__} 执行时间大于 {e}") if callback else None

        return wrapper

    return decorator


def timeout_callback(e):
    print(e)


@time_out(2, timeout_callback)
def task1():
    print("task1 start")
    time.sleep(3)
    print("task1 end")


@time_out(2, timeout_callback)
def task2():
    print("task2 start")
    time.sleep(1)
    print("task2 end")


if __name__ == '__main__':
    task1()
    task2()

```

结果如下：

```python
task1 start
task1 执行时间大于 2 seconds
task2 start
task2 end
```