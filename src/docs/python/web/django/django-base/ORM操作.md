---
title: ORM操作
date: 2023-08-03T21:09:39Z
lastmod: 2023-08-03T21:09:39Z
article: false
order: 8
---

# ORM基本操作

## ORM基本操作

　　针对模型类的增删改查做简单介绍。

### 增

　　通过 ORM 操作，增加 对应记录的方式有两种：

#### 模型类对象操作

- 根据模型类创建对应的对象
- 调用对象的`save`方法，保存对象即可

```python
book = Book(btitle='昆仑', publish='北京大学出版社', price=89, bcomment=10000, bread=3000, bpub_date=date(2005,8,9), author_id=3)
book.save()
```

#### 模型类管理器操作

- 调用模型类对应的管理器的 `create`方法，即可创建对象

```python
Book.objects.create(btitle='沧海', publish='人民教育出版社', price=30, author_id=3);
```

### 删

　　通过 ORM 操作，删除 对应记录的方式有两种：

#### 模型类对象操作

- 使用`get`方法获取对应的模型类
- 调用对象的`delete`方法，删除对象即可

```python
book = Book.objects.get(id=13)  # 获取模型对象
book.delete() # 调用模型对象的delete方法删除
```

#### 模型类管理器操作

- 使用模型类的管理器 获取对应的查询集
- 调用查询集的 `delete` 方法删除对象

```python
book_set = Book.objects.filter(id=14)  # 获取对应的查询集
book_set.delete()  # 调用delete方法删除
```

### 改

　　通过 ORM 操作，修改 对应记录的方式有两种：

#### 模型类对象操作

- 修改模型类对象的属性
- 执行`save()`方法

```python
book = Book.objects.get(btitle='龙珠')
book.btitle = '《龙珠》'
book.save()
```

#### 模型类管理器操作

- 使用模型类的管理器 获取对应的查询集
- 调用查询集的 `update` 方法更新对象

```python
book_set = Book.objects.filter(btitle='龙珠')  # 通过管理器获取对应的查询集
book_set.update(btitle='《龙珠》')  # 调用 update方法更新对象
```

### 查

#### 基本查询

　　`get` 查询单一结果，如果不存在会抛出`模型类.DoesNotExist`异常

　　`all` 查询多个结果

　　`count` 查询结果数量

```python
from django.views import View
from django.http import JsonResponse
from .models import Book, Author


class BookView(View):

    def get(self, request):
        books = Book.objects.all()  # 获取所有图书

        if books.count() == 0:  # 获取查询结果的数量
            return JsonResponse([], safe=False)

        booksInfo = []  # 构造空列表， 存储所有图书信息

        for book in books:  # 遍历查询集
            try:
                author = Author.objects.get(id=book.author_id)  # 查询图书对应的作者信息
            except Exception as e:  # get 查询不到，会抛出异常
                # e:Author matching query does not exist.
                authorinfo = {}
            else:
                authorinfo = {
                    "name": author.name,
                    "age": author.age,
                    "gender": author.gender
                }

            bookinfo = {
                "id": book.id,
                "btitle": book.btitle,
                "publish": book.publish,
                "bcomment": book.bcomment,
                "bread": book.bread,
                "price": book.price,
                "author": authorinfo
            }
            booksInfo.append(bookinfo)

        return JsonResponse(booksInfo, safe=False)

```

#### 过滤查询

##### 语法构造

　　实现*SQL*中的*where*功能，包括

- **`filter`** 过滤出多个结果
- **`exclude`** 排除掉符合条件剩下的结果
- **`get`** 过滤单一结果

　　过滤条件的表达语法如下：

```python
属性名称__比较运算符=值
# 属性名称和比较运算符间使用两个下划线，所以属性名不能包括多个下划线
```

#### 比较运算符

##### 比较查询

- **`exact`**​**：表示判断相等。**
- **不等于的运算符，使用**​**`exclude()`**​**过滤器。**
- **`gt`** 大于 (*greater then*)
- **`gte`** 大于等于 (*greater then equal*)
- **`lt`** 小于 (*less then*)
- **`lte`** 小于等于 (*less then equal*)

　　**1. 查询编号为1的图书。**

```python
BookInfo.objects.filter(id__exact=1)
# 可简写为：
BookInfo.objects.filter(id=1)
```

　　**2. 查询图书 《三重门》**

```python
Book.objects.get(btitle__exact="三重门")  # 当图书不存在,会抛出异常
```

　　**3. 查询价格不是12.4 的图书**

```python
Books.objects.exclude(price__exact=12.4) # 排除 价格为12.4的图书之后，就是相反的结果
```

　　**4. 查询编号大于3的图书**

```python
BookInfo.objects.filter(id__gt=3)
```

　　**5. 查询编号不等于3的图书**

```python
BookInfo.objects.exclude(id=3)
```

##### 模糊查询

- **`contains`**​**：模糊查询是否包含**
- **`startswith`**：**以指定值开头**
- **`endswith`**​**：以指定值结尾**

> 说明：如果要包含`%`无需转义，直接写即可。

　　**1. 查询书名包含'传'的图书**

```python
BookInfo.objects.filter(btitle__contains='传')
```

　　**2. 查询书名以'三'开头的图书**

```python
Book.objects.filter(btitle__startswith="三")
```

　　**3. 查询书名以'门'结尾的图书**

```python
Book.objects.filter(btitle__endswith="门")
```

> **以上运算符都区分大小写，在这些运算符前加上i表示不区分大小写，如**​**`iexact`**​**、**​**`icontains`**​**、**​**`istartswith`**​**、**​**`iendswith`**​**.**

##### 空查询

- **`isnull`**​**：是否为**​**`null`**​**。**

　　**1. 查询书名不为空的图书**。

```python
BookInfo.objects.filter(btitle__isnull=False)
```

##### 范围查询

- **`in`**​**：是否包含在范围内。**

　　**1. 查询编号为1或3或5的图书**

```python
BookInfo.objects.filter(id__in=[1, 3, 5])
```

##### 日期查询

- **`year`**​**、**​**`month`**​**、**​**`day`**​**、**​**`week_day`**​**、**​**`hour`**​**、**​**`minute`**​**、**​**`second`**​**：对日期时间类型的属性进行运算。**
- 比较具体的时间， 需要利用 **`datetime`**模块中的 **`date`**和 **`datetime`** 方法，自定义时间

　　**1.查询1980年发表的图书**

```python
BookInfo.objects.filter(bpub_date__year=1980)
```

　　**2. 查询2000之后出版的图书**

```python
Book.objects.filter(bpub_date__year__gt=2000)
```

　　**3. 查询5月之后出版的图书**

```python
Book.objects.filter(bpub_date__month__gt=5)
```

　　**4.查询2005年4月5日后发表的图书**

```python
from datetime import date, datetime

Book.objects.filter(bpub_date__lt=date(2005,4,5)) # 注意：比较具体的时间，需要自己构建时间
```

#### F对象和Q对象

##### 属性 VS 属性

> 之前的查询都是对象的属性与常量值比较，两个属性怎么比较呢？
>
> - 使用**F对象**，被定义在`django.db.models`中。
> - 可以在**F对象**上使用算数运算。

　　**语法如下：**

```python
from django.db.models import F


F('属性名')  # 注意：属性名是字符串形式
```

　　**1. 查询阅读量大于评论量的图书**

```python
Book.objects.filter(bread__gt=F('bcomment'))
```

　　**2. 查询阅读量是评论量2倍的图书**

```python
Book.objects.filter(bread=F('bcomment')*2)
```

　　**3. 查询阅读量比评论量多100的图书**

```python
Book.objects.filter(bread=F('bcomment')+100)
```

##### 逻辑运算

> - 多个过滤器逐个调用表示逻辑与`and`关系，同sql语句中where部分的and关键字。
> - 如果需要实现逻辑或`or`的查询，需要使用**Q对象**结合**逻辑运算符**，**Q对象**被义在`django.db.models`中。
> - Q对象可以使用`&`、`|`连接，`&`表示逻辑与，`|`表示逻辑或。

　　**语法如下：**

```python
from django.db.models import Q


Q(属性名__运算符=值)  # 注意： 属性名不是字符串，不能加引号
```

　　**1 查询id阅读量大于20且id小于3的图书**

```python
Book.objects.filter(bcomment__gt=20).filter(id__lt=3)  # 多个过滤器连续操作

Book.objects.filter( Q(bcomment__gt=20) & Q(id__lt=3) )  # 使用Q对象和逻辑运算符
```

　　**2 查询阅读量大于20，或编号小于3的图书**

```python
Book.objects.filter( Q(bcomment__gt=20) | Q(id__lt=3) )  # 只能使用Q对象
```

#### 聚合查询

> 使用`aggregate()`过滤器调用聚合函数。
>
> 聚合函数被定义在`django.db.models`中

- **`Avg`** 平均
- **`Count`** 数量
- **`Max`** 最大
- **`Min`** 最小
- **`Sum`** 求和

　　**语法如下：**

```python
from django.db.models import Sum, Max, Min, Count, Avg

Sum('属性名')  # 注意：属性名是字符串形式 
```

　　**1. 查询所有图书的平均阅读量**

```python
Book.objects.aggregate(Avg('bcomment')) 
# {'bcomment__avg': 77.2}
# 注意aggregate的返回值是一个字典类型，格式如下：
# {'属性名__聚合类小写': 值}
```

　　**2. 查询所有图书的数量**

```python
Book.objects.aggregate(Count('id'))  # 返回值也是一个字典格式， {'id__count': 5}

Book.objects.count()  # 使用count时一般不使用aggregate()过滤器, 注意：count函数的返回值是一个数字。
```

#### 分组查询

　　分组查询一般会用到聚合函数，所以使用前要先从 `django.db.models` 引入 `Avg`,`Max`,`Min`,`Count`,`Sum`（首字母大写）

```python
from django.db.models import Avg,Max,Min,Count,Sum  #   引入函数
```

　　**返回值：**

- 分组后，用 `values` 取值，则返回值是 `QuerySet` ,数据类型里面为一个个字典；
- 分组后，用 `values_list` 取值，则返回值是 `QuerySet` ,数据类型里面为一个个元组。

　　MySQL 中的 `limit` 相当于 ORM 中的 `QuerySet` 数据类型的切片。

　　**注意：**

　　`annotate` 里面放聚合函数。

> `values`函数放在 `annotate`函数之前，指明 按照什么字段分组
>
> `values`函数放在 `annotate`函数之后，指明 从分组结果中，取出哪些数据

　　**1.查询每个作者的图书数量**

```python
source = Book.objects.vaues('author__id').annotate(total=Sum('name')).values('author__name', 'total')
```

#### 关联查询

> `key`:正向查询按字段,反向查询按表明小写

##### 关联查询

###### 一对多

> 通过 关联的 **一**  查询  **多**，如： `一个作者 ====> 多本图书`， 查询**作者**对应的**图书信息**

　　**语法如下：**

```python
一对应的模型类对象.多对应的模型类名小写_set
```

　　**1. 查询 id为1的作者的所有图书**

```python
author = Author.objects.get(id=1)  # 得到作者的模型类对象

author.book_set.all()  # 图书的 模型类名小写 + set ,然后 通过 all方法，得到 查询集
```

###### 多对一

> 通过 关联的 **多**  查询  **一**，如： `多本 图书 ====> 一个作者`， 查询 **图书** 对应的 **作者信息**

　　**语法如下：**

```python
多对应的模型类对象.多对应的模型类中的关系类属性名

多对应的模型类对象.关联类属性_id
```

　　**1. 查询id为1的图书的作者信息**

```python
book = Book.objects.get(id=1)  # 得到图书 模型类对象

book.author # 对应的模型属性， 得到 作者对象

book.author_id  # 对应的模型属性_id, 得到 作者的id
```

##### 关联过滤查询

###### 一对多

> 通过 关联的 **多** 的`条件` 查询  **一**，如： `一个作者 ====> 多本图书`， 根据**图书的条件** 查询 **作者信息**

　　**语法如下：**

```python
关联模型类名小写__属性名__条件运算符=值
```

　　**1. 查询名称包含'Django'的图书作者**

```python
Author.objects.filter(book__btitle__contains='Django')
```

　　**2. 查询 阅读量大于500 的图书作者**

```python
Author.objects.filter(book__bread__gt=200)
```

###### 多对一

> 通过 关联的 **一** 的`条件` 查询  **多**，如： `一个作者 ====> 多本图书`， 根据**作者的条件** 查询 **图书信息**

　　**语法如下：**

```
模型类关联属性名__模型类属性名__条件运算符=值
```

　　**1. 查询 作者韩寒 的图书**

```python
Book.objects.filter(author__name='韩寒')
```

　　**2. 查询 作者id是1， 3， 4的图书**

```python
Book.objects.filter(author__id__in=[1, 3, 4])
```

## ORM高级操作

　　本文主要针对的是模型类查询中的高级操作(如：聚合、分组等)做简单介绍。

### 模型类

```python
# 品牌
class Brand(models.Model):
    name = models.CharField(max_length=20, verbose_name='品牌名')

    class Meta:
        db_table = 'tb_brand'


# 分类
class Cate(models.Model):
    name = models.CharField(max_length=20, verbose_name='分类名')

    class Meta:
        db_table = 'tb_cate'


# 商品表： id、name、price、history、stock、 sales
class Goods(models.Model):
    cate = models.ForeignKey(null=True, to=Cate, on_delete=models.CASCADE, verbose_name='分类')
    brand = models.ForeignKey(null=True, to=Brand, on_delete=models.CASCADE, verbose_name='品牌')
    name = models.CharField(max_length=20, verbose_name='商品名')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='价格')
    history = models.IntegerField(default=0, verbose_name='浏览量')
    stock = models.IntegerField(default=0, verbose_name='库存')
    sales = models.IntegerField(default=0, verbose_name='销量')

    class Meta:
        db_table = 'tb_goods'

# 订单：订单id、创建时间、更新时间、用户、总数、总价、实付金额、订单状态
class Order(models.Model):
    status_choices = (
        (0, '未支付'),
        (1, '未收货'),
        (2, '未评价'),
        (3, '已完成'),
    )
    order_id = models.CharField(max_length=64, verbose_name='订单号', primary_key=True)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='用户')
    total = models.IntegerField(default=0, verbose_name='商品总数')
    total_amount = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name='商品总价')
    pay_amount = models.DecimalField(default=0, max_digits=10, decimal_places=2, verbose_name='实付金额')
    status = models.SmallIntegerField(choices=status_choices, verbose_name='订单状态')

    class Meta:
        db_table = 'tb_order'


# 订单商品表：id、 name、price、num、goods_id(外键)、order_id(外键)、amount
class OrderGoods(models.Model):
    order = models.ForeignKey(to=Order, related_name='order_goods', on_delete=models.CASCADE, verbose_name='订单')
    goods = models.ForeignKey(to=Goods, related_name='orders', on_delete=models.CASCADE, verbose_name='商品')
    name = models.CharField(max_length=20, verbose_name='商品名')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='价格')
    num = models.IntegerField(verbose_name='数量')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='小计')

    class Meta:
        db_table = 'tb_order_goods'

```

### 查询

#### 聚合

　　聚合查询函数是对一组值执行计算，并返回单个值。

　　Django 使用聚合查询前要先从 `django.db.models` 引入 `Avg`、`Max`、`Min`、`Count`、`Sum`（首字母大写）。

```python
from django.db.models import Avg,Max,Min,Count,Sum  #   引入函数
```

　　聚合查询返回值的数据类型是字典。

```python
aggregate(别名 = 聚合函数名("属性名称"))
```

1. 查询所有订单的总价

```python
Order.objects.aggregate(sum=Sum("total_amount"))
```

2. 查询所有商品的平均价格

```python
Goods.objects.aggregate(avg=Avg("price"))
```

#### 分组

　　分组查询一般会用到聚合函数，所以使用前要先从 `django.db.models` 引入 `Avg`,`Max`,`Min`,`Count`,`Sum`（首字母大写）

```python
from django.db.models import Avg,Max,Min,Count,Sum  #   引入函数
```

　　**返回值:**

- 分组后，用 `values` 取值，则返回值是 `QuerySet` ,数据类型里面为一个个字典；
- 分组后，用 `values_list` 取值，则返回值是 `QuerySet` ,数据类型里面为一个个元组。

　　MySQL 中的 `limit` 相当于 ORM 中的 `QuerySet` 数据类型的切片。

　　**注意:**

　　`annotate` 里面放聚合函数。

- **`values`**  或者  **`values_list`** 放在 annotate 前面 :values 或者 values_list 是声明以什么字段分组，annotate 执行分组。
- **`values`** 或者 **`values_list`** 放在annotate后面：annotate 表示直接以当前表的pk执行分组，values 或者 values_list 表示查询哪些字段， 并且要将 annotate 里的聚合函数起别名，在 values 或者 values_list 里写其别名。

1. 查询每天的订单量、销售额

```python
Order.objects.\
annotate(day=TruncDay('create_time')).\  # 将订单对象，添加一个新字段
# 按照日期分组，然后对 分组结果 进行聚合计算
values('day').annotate(total=Count('id'),sum=Sum('total_amount')).\
# 从聚合结果中，查询哪些字段
values('day', 'total', 'sum')
```

2. 查询每天商品的销售额

```python
OrderGoods.objects.annotate(day=TruncDay('order__create_time')).values('day').annotate(sum=Sum('amount')).values('day', 'sum')
```

3. 查询每个品牌商品的销售额

```python
OrderGoods.objects.values('goods__brand__name').annotate(sum=Sum('amount'))
```

4. 查询每类商品的销售额

```python
OrderGoods.objects.values('goods__cate__name').annotate(sum=Sum('amount'))
```

5. 查询每天用户新增量

```python
User.objects.annotate(day=TruncDay('date_joined')).values('day').annotate(n=Count('id'))
```
