---

title: 内置函数
category: [Python]
tag: [内置函数]
abbrlink: e0f0b7e7
date: 2022-03-23 21:47:10
article: false
---

## 数字相关

### 数据类型

#### bool

　　将一个对象转换为对应的 True 或 False

```python
In [2]: bool(0)
Out[2]: False

In [3]: bool(-1)
Out[3]: True

In [4]: bool('')
Out[4]: False

In [5]: bool('a')
Out[5]: True

In [6]: bool([])
Out[6]: False

In [7]: bool([1, 2])
Out[7]: True
```

#### int

　　将一个字符串或数字转换为十进制的整数

```python
In [8]: int('123') # 将字符串转换为整数时，默认是十进制
Out[8]: 123

In [9]: int('0x123', 16)  # 将字符串转换为数字时，可以指明按照几进制转换
Out[9]: 291

In [10]: int('0o123', 8)
Out[10]: 83

In [11]: int('0b101', 2)
Out[11]: 5
    
In [12]: int('1.2')  # 只能转换整数组成的字符串，否则会抛出异常
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-12-b36c460efb9b> in <module>
----> 1 int('1.2')

ValueError: invalid literal for int() with base 10: '1.2'    

In [13]: int(3.6)   # 对浮点数进行转换时，相当于小数取整，不会四舍五入
Out[13]: 3

In [14]: int(0x123)  # 将其他进制的数字转换为十进制数字
Out[14]: 291

In [15]: int(0o123)
Out[15]: 83

In [16]: int(0b101)
Out[16]: 5        
```

#### float

　　将一个数字或字符串转换为浮点数

```python
In [17]: float(123)
Out[17]: 123.0

In [18]: float(0x123)
Out[18]: 291.0

In [19]: float(123.45)
Out[19]: 123.45

In [20]: float('123.45')
Out[20]: 123.45

In [21]: float('123')
Out[21]: 123.0
```

### 进制转换

#### bin

　　将其他进制数字转换为字符串格式的二进制数字

```python
In [24]: bin(0o11)
Out[24]: '0b1001'

In [25]: bin(11)
Out[25]: '0b1011'

In [26]: bin(0x11)
Out[26]: '0b10001'
```

#### oct

　　将其他进制的数字转换为字符串格式的八进制数字

```python
In [27]: oct(11)
Out[27]: '0o13'

In [28]: oct(0x11)
Out[28]: '0o21'

In [29]: oct(0b11)
Out[29]: '0o3'
```

#### hex

　　将其他进制的数字转换为字符串格式的十六进制数字

```python
In [31]: hex(11)
Out[31]: '0xb'

In [32]: hex(0o11)
Out[32]: '0x9'

In [33]: hex(0b11)
Out[33]: '0x3'
```

### 数学运算

#### abs

　　求一个数字的绝对值

```python
In [34]: abs(-1)
Out[34]: 1
```

#### divmod

　　求除法运算的商和余数

```python
In [35]: divmod(3, 2)
Out[35]: (1, 1)

In [36]: divmod(4, 2)
Out[36]: (2, 0)
```

#### round

　　求一个浮点数保留n位小数，四舍五入后的结果，默认是保留 0 位小数

```python
In [37]: round(3.45)
Out[37]: 3

In [38]: round(3.4673213123, 2)
Out[38]: 3.47
```

#### pow

　　求×的 y 次方，如果 2 存在，再对 z 取余

```python
In [39]: pow(2, 3)
Out[39]: 8

In [40]: pow(2, 3, 3)
Out[40]: 2
```

#### sum

　　对序列进行求和运算

```python
In [41]: sum((1, 2, 3))
Out[41]: 6

In [42]: sum ([1, 3, 5])
Out[42]: 9

In [43]: sum(range(1, 9, 2))
Out[43]: 16
```

#### max

　　返回多个参数或一个序列中的最大值

```python
In [44]: max(1, 3, 4)
Out[44]: 4

In [45]: max([2, 3, 5, 7])
Out[45]: 7

In [46]: max([len(s) for s in  ['hello', 'world', 'ni', 'hao']])
Out[46]: 5
```

#### min

　　返回多个参数或一个序列中的最大值

```python
In [47]: min(1, 3, 4)
Out[47]: 1

In [48]: min([2, 3, 5, 7])
Out[48]: 2

In [49]: min([len(s) for s in  ['hello', 'world', 'ni', 'hao']])
Out[49]: 2
```

## 数据结构

### 序列数据

#### list

　　创建列表或将序列数据转换为列表

```python
In [1]: list()
Out[1]: []

In [2]: list('abc')
Out[2]: ['a', 'b', 'c']

In [3]: list((1, 2, 3))
Out[3]: [1, 2, 3]

In [4]: list({'a': 1,'b': 2})
Out[4]: ['a', 'b']

In [5]: list({'a': 1,'b': 2}.values())
Out[5]: [1, 2]

In [6]: list({'a': 1,'b': 2}.items())
Out[6]: [('a', 1), ('b', 2)]
```

#### tuple

　　创建元组对象或将序列数据转换为元组，但元组是不可变数据类型，创建空元组毫无意义

```python
In [7]: tuple('abc')
Out[7]: ('a', 'b', 'c')

In [9]: tuple([1, 2, 3])
Out[9]: (1, 2, 3)

In [10]: tuple({'a': 1,'b': 2}.values())
Out[10]: (1, 2)

In [11]: tuple({'a': 1,'b': 2}.items())
Out[11]: (('a', 1), ('b', 2))
```

#### dict

　　创建字典对象

```python
In [12]: dict()
Out[12]: {}

In [13]: dict(a=1, b=2)
Out[13]: {'a': 1, 'b': 2}

In [15]: dict((('a', 1), ('b', 2)))
Out[15]: {'a': 1, 'b': 2}

In [17]: dict(zip(['a', 'b'], [1, 2]))
Out[17]: {'a': 1, 'b': 2}
```

#### set

　　创建一个无序不重复元素集，可进行关系测试、消除重复元素，还可以计算交集、差集、并集等

```python
In [18]: set()  # 空集合，{}是空字典
Out[18]: set()

In [19]: set([1, 2, 3, 1, 4])  # 将序列数据转换为集合，并去重
Out[19]: {1, 2, 3, 4}

In [20]: {1, 2, 3} | {2, 3, 6}  # 并集
Out[20]: {1, 2, 3, 6}

In [21]: {1, 2, 3} & {2, 3, 6}  # 交集
Out[21]: {2, 3}

In [22]: {1, 2, 3} - {2, 3, 6}  # 差集
Out[22]: {1}

In [23]: {1, 2, 3} ^ {2, 3, 6}  # 对称差集
Out[23]: {1, 6}
```

#### frozenset

　　返回一个不可修改的集合，不能再添加、更新、删除元素

```python
In [24]: frozenset([1, 2, 1, 3, 2, 6])
Out[24]: frozenset({1, 2, 3, 6})
```

#### range

　　得到的是一个可迭代对象（类型是对象），而不是列表类型。

```python
In [138]: range(3)  # start、end、step，得到一个从start开始，不包含end，间隔为step的序列
Out[138]: range(0, 3)

In [139]: list(range(1, 4, 1))
Out[139]: [1, 2, 3]

In [140]: list(range(9, 0, -2))
Out[140]: [9, 7, 5, 3, 1]
```

### 字符串

#### str

　　将其他对象转换为字符串格式

```python
In [25]: str([1, 2])
Out[25]: '[1, 2]'

In [26]: str(0x123)
Out[26]: '291'

In [27]: str(123)
Out[27]: '123'

In [28]: class Stu:
    ...:     def __init__(self, name, age):
    ...:         self.name = name
    ...:         self.age = age
    ...:         
    ...:     def __str__(self):
    ...:         return f'{self.name}:{self.age}'
    ...:

In [29]: stu = Stu('小米', 10)  # 对象的str转换实际是调用对象的魔法方法__str__

In [30]: str(stu)
Out[30]: '小米:10'
```

#### bytes

　　将字符串转换为字节类型，或得到一个长度为n的字节数组

```python
In [31]: bytes('he1lo', 'utf8') # 转换字符串，必须指定编码方式
Out[31]: b'he1lo'

In [32]: bytes('中国', 'utf8')
Out[32]: b'\xe4\xb8\xad\xe5\x9b\xbd'

In [33]: "中国".encode("utf8")
Out[33]: b'\xe4\xb8\xad\xe5\x9b\xbd'

In [34]: bytes(1)  # 得到一个长度为 1 的初始化数组，值默认是 0
Out[34]: b'\x00'

In [35]: bytes(1)[0]
Out[35]: 0    
```

#### bytearray

　　得到一个字节数组，数组中元素是可变的，并且每个元素的范围是`[0, 256)`，因为每个字节 8 个 bit

```python
In [36]: bytearray([1, 2, 16])
Out[36]: bytearray(b'\x01\x02\x10')

In [37]: bytearray([1, 2, 16])[2]
Out[37]: 16

In [38]: a = bytearray(3)

In [39]: a[1] = 3

In [40]: a
Out[40]: bytearray(b'\x00\x03\x00')

In [42]: bytearray("中国", "utf8")
Out[42]: bytearray(b'\xe4\xb8\xad\xe5\x9b\xbd')

In [43]: b'\xe4\xb8\xad'.decode("utf8")
Out[43]: '中'
```

#### ord

　　得到 ASCII 字符对应的十进制编码

```python
In [46]: ord('a')
Out[46]: 97

In [47]: ord('&')
Out[47]: 38
```

#### chr

　　得到ASCII码对应的ASCII字符

```python 
In [48]: chr(90)
Out[48]: 'Z'

In [50]: chr(63)
Out[50]: '?'
```

#### ascii

　　返回一个对象的字符串格式，如果参数中存在非 ascii 字符，会用 `\u`, `\x` 替代

```python
In [65]: ascii([1, 2])
Out[65]: '[1, 2]'

In [66]: ascii('?')
Out[66]: "'?'"

In [69]: ascii('中国')
Out[69]: "'\\u4e2d\\u56fd'"

In [71]: ascii('中国')[1:-1].encode().decode("unicode_escape")
Out[71]: '中国'    
```

#### repr

　　返回一个对象的字符串形式

```python
In [72]: repr([1, 2])
Out[72]: '[1, 2]'

In [73]: repr('?')
Out[73]: "'?'"

In [74]: repr('中国')
Out[74]: "'中国'"

In [78]: class Stu:
    ...:     def __init__(self, name, age):
    ...:         self.name = name
    ...:         self.age = age
    ...:
    ...:     def __repr__(self):
    ...:         return f'{self.name}:{self.age}'
    ...:

In [79]: stu = Stu('小米', 10)

In [80]: repr(stu)  # 对象的repr转换实际是调用对象的魔法方法__repr__
Out[80]: '小米:10'    
```

### 工具方法

#### iter

　　根据可迭代对象，得到迭代器对象，所谓的迭代器就是具备`__iter__` 和 `__next__` 的魔法方法

```python
In [1]: a = [1, 4, 2, 7, 5]

In [2]: iter(a)  # iter 函数实际就是可迭代对象的 __iter__方法，该方法必须返回一个选代器对象
Out[2]: <list_iterator at 0x110e89190>
```

#### next

　　将迭代器对象中的值依次取出，如果超出范围，则抛出 Stoplteration 异常

```python
In [3]: a = [1, 4]

In [4]: a1 = iter(a)

In [5]: next(a1)
Out[5]: 1

In [6]: next(a1)
Out[6]: 4

In [8]: class NumberIterator:
   ...:     def __init__(self, n):
   ...:         self.n = n
   ...:         self.i = 0
   ...:
   ...:     def __iter__(self):
   ...:         return self
   ...:
   ...:     def __next__(self):
   ...:         self.i += 1
   ...:         if self.i <= self.n:
   ...:             return self.i
   ...:         else:
   ...:             raise StopIteration
   ...:

In [9]: n1 = NumberIterator(2)

In [10]: iter(n1)  # 可以头看出 n1 对象的迭代器就是自身
Out[10]: <__main__.NumberIterator at 0x112028a10>

In [11]: next(n1)
Out[11]: 1

In [12]: next(n1)
Out[12]: 2

In [13]: next(n1)  # next函数实际就是迭代器对象中的__ne×t__方法，该方法每次返回一个元素，超出则出异常
---------------------------------------------------------------------------
StopIteration                             Traceback (most recent call last)
<ipython-input-13-0a519fb1830a> in <module>
----> 1 next(n1)

<ipython-input-8-7d9ffefa180b> in __next__(self)
     12             return self.i
     13         else:
---> 14             raise StopIteration
     15

StopIteration:    
```

#### len

　　得到对象的长度

```python
In [14]: len('abc')
Out[14]: 3

In [15]: len([1, 2, 3])
Out[15]: 3

In [16]: len(range(2, 10, 3))
Out[16]: 3

In [17]: class NumberIterator:
    ...:     def __init__(self, n):
    ...:         self.n = n
    ...:         self.i = 0
    ...:
    ...:     def __iter__(self):
    ...:         return self
    ...:
    ...:     def __next__(self):
    ...:         self.i += 1
    ...:         if self.i <= self.n:
    ...:             return self.i
    ...:         else:
    ...:             raise StopIteration
    ...:
    ...:     def __len__(self):
    ...:         return self.n
    ...:

In [18]: n1 = NumberIterator(3)

In [19]: list(n1)
Out[19]: [1, 2, 3]

In [20]: len(n1)  # len函数实际是调用对象的魔法方法__len__
Out[20]: 3    
```

#### slice

　　将对象进行切片操作

```python
In [21]: a = [1, 3, 2, 6, 5]

In [22]: a[slice(1, 3)]
Out[22]: [3, 2]

In [23]: a[1:3]
Out[23]: [3, 2]

In [24]: a[slice(None, None, -1)]
Out[24]: [5, 6, 2, 3, 1]

In [25]: a[::-1]
Out[25]: [5, 6, 2, 3, 1]
```

#### enumerate

　　将可迭代对象组合为索引序列

```python
In [26]: enumerate([1, 2, 3])
Out[26]: <enumerate at 0x111e50730>

In [27]: list(enumerate([1, 2, 3]))
Out[27]: [(0, 1), (1, 2), (2, 3)]

In [28]: list(enumerate({'a': 1, 'b': 2, 'c': 3}.items()))
Out[28]: [(0, ('a', 1)), (1, ('b', 2)), (2, ('c', 3))]

In [29]: list(enumerate('abvc', 1))  # 还可以指定开始索引
Out[29]: [(1, 'a'), (2, 'b'), (3, 'v'), (4, 'c')]
```

#### all

　　判断可送代对象的所有元素是否都为真

```python
In [30]: all([1, 2, 0])
Out[30]: False

In [31]: all([1, 2, None]) 
Out[31]: False

In [32]: all([1, 2, ''])
Out[32]: False

# 当可选代对象本身没有任何元素时，结果可不是假，而是真
In [33]: all([])  # 空列表
Out[33]: True

In [35]: all(())  # 空元组
Out[35]: True

In [36]: all({})  # 空字典
Out[36]: True

In [37]: all(set())  # 空集合
Out[37]: True

In [38]: all(range(10, 5))  # 空可迭代对象
Out[38]: True    
```

#### any

　　判断可迭代对像是否至少存在一个为真的元素

```python
In [39]: any([])
Out[39]: False

In [40]: any([1, 3, 2])
Out[40]: True

In [41]: any(['', None, 0])
Out[41]: False

In [42]: any([1, 2, None])
Out[42]: True
```

#### sorted

　　对所有可迭代对象进行排序操作，得到一个新列表

```python
In [43]: sorted('abdescas')
Out[43]: ['a', 'a', 'b', 'c', 'd', 'e', 's', 's']

In [44]: sorted((3, 1, 7, 3, 2, 5))
Out[44]: [1, 2, 3, 3, 5, 7]

In [45]: sorted([{"name": "Alice", "age": 23}, {"name": "Bob", "age": 213}, {"name": "Lucy", "age": 20}], key=lambda x: x["age"])
Out[45]:
[{'name': 'Lucy', 'age': 20},
 {'name': 'Alice', 'age': 23},
 {'name': 'Bob', 'age': 213}]

In [46]: sorted([('a', 1), ('b', 3), ('c', 0)], key=lambda x: x[1], reverse=True)
Out[46]: [('b', 3), ('a', 1), ('c', 0)]
```

> sorted 和 sort 区别

- sorted函数对所有可迭代对象都有效，结果是一个新的列表，也就是原对象没有改变
- sort 方法是 list 独有的方法，是对列表本身进行排序，也就是原列表进行了改变

#### reversed

　　将对象(字符串、列表、元组、range)进行顺序反转，得到一个迭代器对象

```python
In [47]: reversed('abc')
Out[47]: <reversed at 0x1120ba350>

In [48]: list(reversed('abc'))
Out[48]: ['c', 'b', 'a']

In [49]: reversed([3, 1, 2])
Out[49]: <list_reverseiterator at 0x1120ba290>

In [50]: list(reversed([3, 1, 2]))
Out[50]: [2, 1, 3]

In [51]: class NumberIterator:
    ...:     def __init__(self, n):
    ...:         self.n = n
    ...:         self.i = 0
    ...:
    ...:     def __iter__(self):
    ...:         return self
    ...:
    ...:     def __next__(self):
    ...:         self.i += 1
    ...:         if self.i <= self.n:
    ...:             return self.i
    ...:         else:
    ...:             raise StopIteration
    ...:
    ...:     def __reversed__(self):
    ...:         for i in range(self.n, 0, -1):
    ...:             yield i
    ...:

In [52]: n1 = NumberIterator(5)

In [53]: list(n1)
Out[53]: [1, 2, 3, 4, 5]

In [54]: list(reversed(n1))  # reversedl函数实际是调用对象的__reversed__魔法方法
Out[54]: [5, 4, 3, 2, 1]

In [55]: class NumberIterator:
    ...:     def __init__(self, n):
    ...:         self.n = n
    ...:         self.i = 0
    ...:
    ...:     def __iter__(self):
    ...:         return self
    ...:
    ...:     def __next__(self):
    ...:         self.i += 1
    ...:         if self.i <= self.n:
    ...:             return self.i
    ...:         else:
    ...:             raise StopIteration
    ...:
    ...:     def __len__(self):
    ...:         return self.n
    ...:     def __getitem__(self, item):
    ...:         return item + 1
    ...:

In [56]: n1 = NumberIterator(5)

In [57]: list(n1)
Out[57]: [1, 2, 3, 4, 5]

In [58]: list(reversed(n1))  # 当对象没有__reversed__方法时，reversed函数会通过__len__和__getitem__方法来倒序
Out[58]: [5, 4, 3, 2, 1]    
```

#### filter

　　按照条件函数的返回值对序列进行过滤，过滤掉返回值为假的元素，得到新的序列

```python
In [61]: filter(lambda x: x % 2, [1, 3, 2, 5, 8])
Out[61]: <filter at 0x112570610>

In [62]: list(filter(lambda x: x % 2, [1, 3, 2, 5, 8]))
Out[62]: [1, 3, 5]
```

#### map

　　会根据函数对序列中的每个元素进行映射

```python
In [59]: map(lambda x: abs(x), [-1, 2, -4, 3, 9])
Out[59]: <map at 0x110eb3e90>

In [60]: list(map(lambda x: abs(x), [-1, 2, -4, 3, 9]))
Out[60]: [1, 2, 4, 3, 9]
```

#### zip

　　将可迭代对象元素打包为一个个元组，得到新的迭代器对象

```python
In [63]: zip([1, 2, 3], [4, 5, 6])
Out[63]: <zip at 0x1122b2a00>

In [64]: list(zip([1, 2, 3], [4, 5, 6]))
Out[64]: [(1, 4), (2, 5), (3, 6)]

In [65]: list(zip([1, 2, 3], [4, 5]))  # 可迭代对象长度不一时，以最短的可选代对象为标准进行组合
Out[65]: [(1, 4), (2, 5)]    
```

## 代码执行

### 环境变量

#### locals

　　以字典类型返回当前环境的所有局部变量

```python
In [66]: def person():
    ...:     name = "Alice"
    ...:     age = 23
    ...:     children = ["Bob", "Halen"]
    ...:     return locals()
    ...:

In [67]: person()
Out[67]: {'name': 'Alice', 'age': 23, 'children': ['Bob', 'Halen']}
```

#### globals

　　以字典类型返回当前环境的所有全局变量

```python
In [68]: def person():
    ...:     global name, age
    ...:     name = "Alice"
    ...:     age = 23
    ...:     children = ["Bob", "Halen"]
    ...:     return locals()
    ...:

In [69]: person()
Out[69]: {'children': ['Bob', 'Halen']}
```

#### vars

　　返回对象object的属性和属性值的字典对象。

```python
In [14]: class A:
    ...:     a = 1
    ...:     b = 2
    ...:

In [15]: vars(A)
Out[15]:
mappingproxy({'__module__': '__main__',
              'a': 1,
              'b': 2,
              '__dict__': <attribute '__dict__' of 'A' objects>,
              '__weakref__': <attribute '__weakref__' of 'A' objects>,
              '__doc__': None})

In [16]: a = A()

In [17]: vars(a)  # 实例对象a没有属性，得到空字典
Out[17]: {}
    
In [19]: def test():
    ...:     a = 1
    ...:     b = 2
    ...:     print(vars())  # vars没有传参，则会获取当前调用位置的属性和属性值,类似locals
    ...:

In [20]: test()
{'a': 1, 'b': 2}    
```

### 内存相关

#### id

　　得到对象的内存地址

```python
In [70]: a = [1, 2, [3, 4]]

In [71]: b = [1, 2, [3, 4]]

In [72]: id(a[2])
Out[72]: 4597552464

In [73]: id(b[2])
Out[73]: 4595266576

In [74]: id(a[2][0])
Out[74]: 4544303568

In [75]: id(b[2][0])
Out[75]: 4544303568
    
#不可变元素并不是一份新数据，而是对已有数据的引用，也就是说列婊中存储的实际是元素的引用地址
# 可变元素即使相同，也不是同一份数据，而是创建了一份新数据    
```

#### hash

　　获取对象的 hash 值

```python
In [76]: hash('10')
Out[76]: -7228238375393645902

In [77]: hash('19')
Out[77]: 7324650985040354003

In [78]: hash('10') & (2 ** 64 - 1)  # 当hash值是负数时，可以与最大值进行与操作
Out[78]: 11218505698315905714
```

### 执行字符串

#### evel

　　执行一个字符串表达式，返回结果

```python
In [79]: eval('{"a": 1, "b": 2}')
Out[79]: {'a': 1, 'b': 2}

In [80]: eval('[1,2,3,4]')
Out[80]: [1, 2, 3, 4]

In [81]: eval('1+2')
Out[81]: 3

In [82]: eval('1 + 2 > 4')
Out[82]: False    
```

#### exec

　　执行字符串或文件中的代码，返回值永远是 None，但是如果存在变量赋值，则会将变量存到locals的字典中

```python
In [84]: def test():
    ...:     temp = locals()  # 如果想要获取 exec 执行完的变量，则需要将locals字典获取值提前
    ...:     exec('b=3')
    ...:     b = temp['b']
    ...:     print(b)
    ...:

In [85]: test()
3

```

#### compile

　　将字符串编译为字节代码

```python
In [87]: s1 = compile('1+1', 'two_sum', 'eval')  # 字符串源码、文件名字、执行模式

In [88]: s1
Out[88]: <code object <module> at 0x1128a40c0, file "two_sum", line 1>

In [89]: exec(s1)  # 执行字节代码的模式不限制

In [90]: eval(s1)
Out[90]: 2

In [92]: s2 = compile('a=0\nwhile a <10: a+=1', '', 'exec')

In [93]: exec(s2)

In [94]: locals().get('a') # 因为此时并没有把变量a的值重新赋值给变量a，就无所谓locals 的位置
Out[94]: 10

In [95]: s3 = compile('1+1', '', 'single')  # single模式，可以编译两类字符串代码

In [96]: exec(s3)
Out[96]: 2    
```

> evel：字符串中不能存在变量赋值，一般只用来计算
>
> exec：字符串中可以进行赋值运算，也可以执行复杂的逻辑

### 对象处理

#### help

　　返回对象的帮助文档

```python
In [97]: help(list.append)
Help on method_descriptor:

append(self, object, /)
    Append object to the end of the list.    

In [98]: def f():
    ...:     """测试函数"""
    ...:     pass
    ...:

In [99]: help(f)
Help on function f in module __main__:

f()
    测试函数
```

#### print

　　用于打印输出，最常见的一个函数。

> print在Python3.x是一个函数，但在Python2.x版本不是一个函数，只是一个关键字。

```python
In [1]: f = open('1.txt', 'w')

In [2]: cat 1.txt

# 指定print输出时，以 , 分割元素，以 . 结尾    
In [3]: print('hello', 'world', sep=',', end='.')
hello,world.
In [4]: print('hello', 'world')  # 默认以空格分割，结尾无字符
hello world

# 指定输出到文件，但是默认不会刷新缓存区，因此，文件中无内容
In [5]: print('hello', 'world', sep=',', end='.', file=f)

In [6]: cat 1.txt

# 在输出到文件时，同时刷新缓存区，因为文件中出现内容
In [7]: print('hello', 'world', sep=',', end='.', file=f, flush=True)

In [8]: cat 1.txt
hello,world.hello,world.
```

#### dir

　　查看对象的所有属性和方法

```python
In [110]: class A:
     ...:     n = 100
     ...:     def __init__(self):
     ...:         self.a = 10
     ...:     def add(self):
     ...:         if self.a < self.n:
     ...:             self.a += 1
     ...:

In [111]: a = A()

In [112]: dir(a)
Out[112]:
['__doc__', '__init__', '__module__', 'add', 'n']
```

#### type

　　type()函数如果你只有第一个参数则返回对象的类型，三个参数返回新的类型对象。

```python
In [9]: type(1)
Out[9]: int

In [10]: class A():
    ...:     a = 1
    ...:
        
In [12]: B = type('B', (A,), {'b': 2})  # 继承父类A，创建子类B

In [13]: getattr(B, 'b')
Out[13]: 2

In [14]: getattr(B, 'a')
Out[14]: 1
        
```

#### isinstance

　　判断一个对象是否是一个已知的类型。

```python
In [15]: a = 2

In [16]: isinstance(a, int)
Out[16]: True

In [17]: isinstance(a, str)
Out[17]: False

In [18]: isinstance(a, (int, str, bool))
Out[18]: True
```

> type不会认为子类是一种父类类型，不考虑继承关系。
>
> isinstance会认为子类是一种父类类型，考虑继承关系。

　　**如果要判断两个类型是否相同推荐使用isinstance()**。

#### issubclass

　　判断参数class是否是类型参数classinfo的子类。

```python
In [1]: class A:
   ...:     pass
   ...:

In [2]: class B:
   ...:     pass
   ...:

In [3]: class C(A):
   ...:     pass
   ...:

In [4]: a = A()

In [5]: b = B()

In [6]: c = C()

In [7]: type(c) == type(b)
Out[7]: False

In [8]: type(c) == type(a)
Out[8]: False

In [9]: isinstance(c, C)
Out[9]: True

In [10]: isinstance(c, B)
Out[10]: False

In [11]: isinstance(c, A)
Out[11]: True

In [12]: issubclass(C, B)
Out[12]: False

In [13]: issubclass(C, A)
Out[13]: True
```

#### callable

　　检查一个对象是否可调用。返回 True，对像仍有可能调用失败；但是返回 Fasle，一定不会调用成功。对于函数、方法、lambda 表达式、类以及实现了`__call__`的实例对像，返回都是 True。**所谓的可调用简单说就是对象后面可以使用**​**`()`**​**执行代码**。

```python
In [101]: callable(list)
Out[101]: True

In [102]: class A:
     ...:     pass
     ...:

In [103]: a = A()

In [104]: callable(A)
Out[104]: True

In [105]: callable(a)
Out[105]: False

In [106]: class A:
     ...:     def __call__(self):
     ...:         print("work ...")
     ...:

In [107]: a = A()

In [108]: callable(a)
Out[108]: True

In [109]: a()  # 实例对象可以加()执行
work ...
```

### 反射机制

> 反射就是通过字符串的形式在对象中操作(查找、添加、删除、获取)成员，一种基于字符串的事件驱动。

#### hasattr

　　判断对象是否存在某个成员

```python
In [113]: hasattr(a, 'add')
Out[113]: True

In [114]: hasattr(a, 'add2')
Out[114]: False

```

#### getattr

　　获得对象的某个成员

```python
In [115]: add = getattr(a, 'add')

In [116]: add
Out[116]: <bound method A.add of <__main__.A object at 0x1127c2fd0>>

In [117]: getattr(a, 'a')
Out[117]: 10  
    
In [118]: add()

In [119]: getattr(a, 'a')
Out[119]: 11

In [120]: getattr(a, 'a2', 'not found')
Out[120]: 'not found'  # 不存在，会得到默认值   
```

#### setattr

　　修改或添加对象的某个成员

```python
In [126]: def sub(self):
     ...:     if self.a > 0:
     ...:         self.a -= 1
     ...:

In [128]: getattr(a, 'a')
Out[128]: 11

In [129]: setattr(a, 'sub', sub)

In [130]: a.sub(a)  # 调用动态添加的方法，需要主动传递实例对象

In [131]: getattr(a, 'a')
Out[131]: 10

In [132]: setattr(a, 'a', 5)

In [133]: getattr(a, 'a')
Out[133]: 5
```

#### delattr

　　删除对象的某个成员

```python
In [134]: setattr(a, 'a2', 'a2')

In [135]: getattr(a, 'a2')
Out[135]: 'a2'

In [136]: delattr(a, 'a2')

In [137]: hasattr(a, 'a2')
Out[137]: False
```
