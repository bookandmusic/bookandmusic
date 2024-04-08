---
title: python中的callable概念
category: [Python]
tag: []
date: 2022-03-25 06:40:37
---

# python中的callable概念


## 是类还是函数

　　几乎所有的教程都告诉你 int() 是 python 的内置函数，然而当你看到 int 的定义，发现它竟然是类

```python
class int(object):
    pass
```

　　不只是 int(), 还有 float()， bool()， str()，很多你以为是函数但实际上却是类，但是呢，当你使用它们时完全察觉不出它们有什么不同，本文不是要和你讨论类和函数，而是要讨论学习 callable

## 什么是 callable

　　一个可 callable 的对象是指可以被调用执行的对象，并且可以传入参数， 用另一个简单的描述方式，只要可以在一个对象的后面使用小括号来执行代码，那么这个对象就是 callable 对象。下面列举 callable 对象的种类：

1. 函数
2. 类
3. 类里的函数
4. 实现了__call__方法的实例对象

### 函数

```python
def test():
    print('ok')

print(callable(test))   # True
test()  # ok
```

　　函数是 python 里的一等公民，函数是可调用对象，使用 callable 函数可以证明这一点

### 类

```python
class Stu(object):
    def __init__(self, name):
        self.name = name


print(callable(Stu))     # True
print(Stu('小明').name)   # 小明
```

　　在其他编程语言里，类与函数可以说是两个完全不搭的东西，但在 python 里，都是可调用对象

### 类里的方法

　　类里的方法也是用 def 定义的，本质上也是函数

```python
from inspect import isfunction, ismethod


class Stu(object):
    def __init__(self, name):
        self.name = name

    def run(self):
        print('{name} is running'.format(name=self.name))

print(isfunction(Stu.run))     # True
stu = Stu("小明")
stu.run()        # 小明 is running
```

　　使用 isfunction 函数可以判断一个对象是否是函数，run 方法也是可调用对象

### 实现了`__call__`方法的实例对象

```python
class Stu(object):

    def __init__(self, name):
        self.name = name

    def __call__(self, *args, **kwargs):
        self.run()

    def run(self):
        print('{name} is running'.format(name=self.name))

stu = Stu('小明')
print(callable(stu))    # True
stu()                   # 小明 is running
```

　　当你执行 `stu()` 时，与调用一个函数有着完全一致的体验，如果不告诉你 stu 是一个类的实例对象，你还以为 stu 就是一个函数。
