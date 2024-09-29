---
created: 2023-08-03T13:22:32.000Z
article: false
order: 2
title: 线程池和进程池
updated: 2024-09-29T05:54:32.000Z
---
Python中已经有了threading模块，为什么还需要线程池呢，线程池又是什么东西呢？

在爬虫案例中，需要控制同时爬取的线程数，例子中创建了20个线程，而同时只允许3个线程在运行，但是20个线程都需要创建和销毁，线程的创建是需要消耗系统资源的，有没有更好的方案呢？其实只需要三个线程就行了，每个线程各分配一个任务，剩下的任务排队等待，当某个线程完成了任务的时候，排队任务就可以安排给这个线程继续执行。

这就是线程池的思想（当然没这么简单），但是自己编写线程池很难写的比较完美，还需要考虑复杂情况下的线程同步，很容易发生死锁。从Python3.2开始，标准库为我们提供了`concurrent.futures`模块，它提供了`ThreadPoolExecutor`和`ProcessPoolExecutor`两个类，实现了对`threading`和`multiprocessing`的进一步抽象。

这里主要关注线程池，不仅可以帮我们自动调度线程，还可以做到：

- 主线程可以获取某一个线程（或者任务的）的状态，以及返回值。
- 当一个线程完成的时候，主线程能够立即知道。
- 让多线程和多进程的编码接口一致。

## ThreadPoolExecutor

### submit

```python
from concurrent.futures import ThreadPoolExecutor
import time


# 参数times用来模拟网络请求时间
def get_html(times):
    time.sleep(times)
    print("get page {}s finished".format(times))
    return times


if __name__ == '__main__':
    executor = ThreadPoolExecutor(max_workers=2)
    # 通过submit函数提交执行的函数到线程池中，submit函数立即返回,不阻塞
    task1 = executor.submit(get_html, 3)
    task2 = executor.submit(get_html, 2)
    # done方法用于判断某个任务是否完成
    print(task1.done())
    # cancel方法用于取消某个任务，该任务没有放到线程池中才能被取消
    print(task2.cancel())
    print(task1.done())
    # result方法可以获取task的执行结果
    print(task1.result())
```

> 当创建的线程池大小为2时，即同一时刻允许两个线程运行

```python
# 执行结果
False
False
False
get page 2s finished
get page 3s finished
3
```

> 当创建的线程池大小为1时，即同一时刻只允许一个线程运行

```python
# 执行结果
False
True
False
get page 3s finished
3
```

- `ThreadPoolExecutor` 构造实例的时候，传入 `max_workers` 参数来设置线程中最多能同时运行的线程数目
- 使用 `submit` 函数来提交线程需要执行任务 (函数名和参数) 到线程池中，并返回该任务的句柄(类似于文件操作符)，注意 **​`submit()`​**​ ** 不是阻塞的，而是立即返回**。
- 通过 `submit` 函数返回的任务句柄, 能够使用 `done()` 方法判断该任务是否结束
- 使用 `result()` 方法可以获取任务的返回值，注意：**这个方法是阻塞的**

### as_completed

上面虽然提供了判断任务是否结束的方法，但是不能在主线程中一直判断，有时候我们是得知某个任务结束了，就去获取结果，而不是一直判断每个任务有没有结束。这是就可以使用 `as_completed` 方法一次取出所有任务的结果。

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time


# 参数times用来模拟网络请求时间
def get_html(times):
    time.sleep(times)
    print("get page {}s finished".format(times))
    return times


executor = ThreadPoolExecutor(max_workers=2)
times_list = [3, 2, 4]
all_task = [executor.submit(get_html, times) for times in times_list]
for future in as_completed(all_task):
    data = future.result()
    print("in main:get page {}s success".format(data))

```

> 执行结果为：

```python
get page 2s finished
in main:get page 2s success
get page 3s finished
in main:get page 3s success
get page 4s finished
in main:get page 4s success
```

### map

除了上面的 `as_completed` 方法, 还可以使用 `map` 方法，但是有一点不同, 使用 `map` 方法，不需提前使用 `submit` 方法，`map` 方法与 python 标准库中的 `map` 含义相同，都是将序列中的每个元素都执行同一个函数。

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time


# 参数times用来模拟网络请求时间
def get_html(times):
    time.sleep(times)
    print("get page {}s finished".format(times))
    return times


executor = ThreadPoolExecutor(max_workers=2)
times_list = [3, 2, 4]
for data in executor.map(get_html, times_list):
    print("in main:get page {}s success".format(data))
executor.shutdown()
```

上面的代码就是对 `times_list` 的每个元素都执行 `get_html` 函数，并分配各线程池。

> 执行结果为：

```python
get page 2s finished
get page 3s finished
in main:get page 3s success
in main:get page 2s success
get page 4s finished
in main:get page 4s success
```

可以看到执行结果与上面的 `as_completed` 方法的结果不同，输出顺序和 `times_list` 列表的顺序相同，就算 2s 的任务先执行完成，也会先打印出 `3s` 的任务先完成，再打印 `2s` 的任务完成。

### wait

`wait` 方法可以让主线程阻塞, 直到满足设定的要求。wait 方法接收 3 个参数：等待的任务序列、超时时间以及等待条件。等待条件 return_when 默认为 ALL_COMPLETED, 表明要等待所有的任务都结束。

```python
from concurrent.futures import ThreadPoolExecutor, wait, ALL_COMPLETED, FIRST_COMPLETED
import time


# 参数times用来模拟网络请求时间
def get_html(times):
    time.sleep(times)
    print("get page {}s finished".format(times))
    return times


executor = ThreadPoolExecutor(max_workers=2)
time_list = [3, 2, 4]
all_task = [executor.submit(get_html, time) for time in time_list]
wait(all_task, return_when=ALL_COMPLETED)
print("main")

executor.shutdown()

```

> 执行结果为：

```python
get page 2s finished
get page 3s finished
get page 4s finished
main
```

可以看到运行结果中，确实是所有任务都完成了，主线程才打印出 `main`, 等待条件还可以设置为 `FIRST_COMPLETED`, 表示第一个任务完成就停止等待。

## ProcessPoolExecutor

ProcessPoolExecutor已经做到让多线程和多进程的编码接口一致，屏蔽底层差异。因此，两者的调用方法基本一致。

## 同步与异步

> 下文以`ProcessPoolExecutor`为例，说明不同的调用方法产生的执行效率差异；而`ThreadPoolExecutor`性质相似，不再单独说明

### 同步等待

提交任务，原地等待任务执行结束，拿到任务返回结果，再执行下一行代码，会导致任务串行执行。

优点：解耦合

缺点: 速度慢

```python
from concurrent.futures import ProcessPoolExecutor
import time, random, os


def task(name):
    n = random.randint(1, 3)
    time.sleep(n)
    print('%s %s is running' % (name, os.getpid()))
    return n


if __name__ == '__main__':
    p = ProcessPoolExecutor(4)  # 设置进程池内进程数

    s = 0
    start = time.time()
    for i in range(10):
        # 同步调用方式，调用和等值
        obj = p.submit(task, "进程pid：")  # 传参方式(任务名，参数),参数使用位置或者关键字参数
        res = obj.result()
        s += res
    p.shutdown(wait=True)  # 关闭进程池的入口，等待池内任务运行结束
    end = time.time()
    print(end - start, s, "主")

```

> 执行结果为：

```python
进程pid： 38873 is running
进程pid： 38874 is running
进程pid： 38875 is running
进程pid： 38876 is running
进程pid： 38873 is running
进程pid： 38874 is running
进程pid： 38875 is running
进程pid： 38876 is running
进程pid： 38873 is running
进程pid： 38874 is running
20.03743004798889 20 主
```

### 异步回调

缺点：存在耦合

优点：速度快

```python
from concurrent.futures import ProcessPoolExecutor
import time, random, os


def task(name):
    n = random.randint(1, 3)
    time.sleep(n)
    print('%s %s is running' % (name, os.getpid()))
    return n


def parse(future):
    results.append(future.result())


if __name__ == '__main__':
    p = ProcessPoolExecutor(4)  # 设置进程池内进程数
    results = []
    start = time.time()
    for i in range(10):
        obj = p.submit(task, "进程pid：")  # 传参方式(任务名，参数),参数使用位置或者关键字参数
        obj.add_done_callback(parse)  # 执行结束，异步执行回调函数
    p.shutdown(wait=True)  # 关闭进程池的入口，等待池内任务运行结束
    end = time.time()
    print(end - start, sum(results), "主")

```

> 执行结果为：

```python
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
进程pid： 39061 is running
7.007356882095337 23 主
```

> 当然， 在多任务的执行过程中，往往使用`map`函数会更加方便

```python
from concurrent.futures import ProcessPoolExecutor
import time, random, os


def task(name):
    n = random.randint(1, 3)
    time.sleep(n)
    print('%s %s is running' % (name, os.getpid()))
    return n


if __name__ == '__main__':
    results = []
    start = time.time()
    with ProcessPoolExecutor(4) as p:  # 使用上下文管理器，等待池内任务运行结束，自动关闭进程池
        obj = p.map(task, ["进程pid： "] * 10)
    end = time.time()
    print(end - start, sum(obj), "主")

```

> 执行结果为：

```python
进程pid：  39151 is running
进程pid：  39149 is running
进程pid：  39150 is running
进程pid：  39149 is running
进程pid：  39152 is running
进程pid：  39150 is running
进程pid：  39149 is running
进程pid：  39152 is running
进程pid：  39151 is running
进程pid：  39150 is running
4.018141269683838 15 主
```

## 小结

1. 线程不是越多越好，会涉及 cpu 上下文的切换（会把上一次的记录保存）。
2. 进程比线程消耗资源，进程相当于一个工厂，工厂里有很多人，里面的人共同享受着福利资源，，一个进程里默认只有一个主线程，比如：开启程序是进程，里面执行的是线程，线程只是一个进程创建多个人同时去工作。
3. 线程里有 GIL 全局解锁器：不允许 cpu 调度
4. 计算密度型适用于多进程
5. 线程：线程是计算机中工作的最小单元
6. 进程：默认有主线程 (帮工作) 可以多线程共存
7. 协程：一个线程，一个进程做多个任务, 使用进程中一个线程去做多个任务，微线程
8. GIL 全局解释器锁：保证同一时刻只有一个线程被 cpu 调度
