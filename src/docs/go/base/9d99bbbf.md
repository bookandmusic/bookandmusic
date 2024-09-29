---
created: 2023-06-17T11:50:51.000Z
article: false
order: 8
title: 结构体
updated: 2024-09-29T06:14:50.000Z
---
Go中没有“类”的概念，Golang中的结构体和其他语言中的类有点相似。和其他面向对象语言中的类相比，Go中的结构体具有更高的扩展性和灵活性。

Go中的基础数据类型可以装示一些事物的基本属性，但是当我们想表达一个事物的全部或部分属性时，这时候再用单一的基本数据类型就无法满足需求了，Golang提供了一种自定义数据类型，可以封装多个基本数据类型，这种数据类型叫结构体，英文名称struct。也就是我们可以通过struct来定义自己的类型了。

## Type关键字

Golang中通过type关键词定义一个结构体，需要注意的是，数组和结构体都是值类型

### 自定义类型

在Go语言中有一些基本的数据类型，如string、整型、浮点型、布尔等数据类型，Go语言中可以使用type关键字来定义自定义类型。

```go
type myInt int
```

上面代码表示：将mylnt定义为int类型，通过type关键字的定义，mylnt就是一种新的类型，它具有int的特性。

示例：如下所示，我们定义了一个myInt类型和myFn方法类型

```go
package main

import (
    "fmt"
)

type myInt int
type myFn func(myInt, myInt) myInt

func fun(x myInt, y myInt) myInt {
    return x + y
}

func main() {
    var fn myFn = fun
    result := fn(1, 2)
    fmt.Printf("%T\n", fn)     // OutPut: main.myFn
    fmt.Printf("%T\n", result) // OutPut: main.myInt
    fmt.Println(result)        // OutPut: 3
}
```

### 类型别名

Golang1.9版本以后添加的新功能

类型别名规定：TypeAlias只是Type的别名，本质上TypeAlias与Type是同一个类型。就像一个孩子小时候有大名、小名、英文名，但这些名字都指的是他本人

```go
type TypeAlias = Type
```

我们之前见过的rune 和 byte 就是类型别名，他们的底层代码如下

```go
type byte = uint8
type rune = int32
```

**类型别名**与**类型定义**表面上看只有一个等号的差异，我们通过下面的这段代码来理解它们之间的区别。

```go
package main

import (
    "fmt"
)

type myInt = int
type myFn = func(myInt, myInt) myInt

func fun(x myInt, y myInt) myInt {
    return x + y
}

func main() {
    var fn myFn = fun
    result := fn(1, 2)
    fmt.Printf("%T\n", fn)     // OutPut: func(int, int) int
    fmt.Printf("%T\n", result) // OutPut: int
    fmt.Println(result)        // OutPut: 3
}
```

​`myInt`​和`myFn`​类型只会在代码中存在，编译完成时并不会有`MyInt`​和`myFn`​类型。

**总结**

1. 类型定义:`type 类型名 类型`​ , 自定义类型和原类型是两种不同的类型, **会创建新类型**
2. 类型别名:`type 类型名 = 类型`​ , 类型别名和原类型一样, **没有创建新类型**

## 结构体定义和初始化

使用type  和 struct关键字来定义结构体，具体代码格式如下所示：

```go
package main

import (
    "fmt"
)

/*
定义一个人结构体
*/
type Person struct {
    name string
}

func main() {
    // 1. 实例化结构体,得到结构体值
    var person Person
    person.name = "p1"
    fmt.Printf("%#v\n", person) // Output: main.Person{name:"p1"}

    // 2. 通过new关键字来实例化结构体，得到结构体地址
    var person2 = new(Person)
    person2.name = "p2"
    fmt.Printf("%#v\n", *person2) // Output: main.Person{name:"p2"}

    // 3. &对结构体进行取地址操作，相当于对该结构体类型进行了一次new实例化操作
    var person3 = &Person{}
    person3.name = "p2"
    fmt.Printf("%#v\n", *person3) // Output: main.Person{name:"p3"}

    // 4. 键值对的方式来实例化结构体
    var person4 = Person{
        name: "p4",
    }
    fmt.Printf("%#v\n", person4) // Output: main.Person{name:"p4"}

    // 5. 键值对的方式来实例化结构体,得到结构体地址
    var person5 = &Person{
        name: "p5",
    }
    fmt.Printf("%#v\n", *person5) // Output: main.Person{name:"p5"}

    // 6. 简写结构体里面的key
    var person6 = &Person{
        "p6",
    }
    fmt.Printf("%#v\n", *person6) // Output: main.Person{name:"p6"}
}
```

> 注意：结构体首字母可以大写也可以小写，大写表示这个结构体是公有的，在其它的包里面也可以使用，小写表示结构体属于私有的，在其它地方不能使用

## 结构体方法和接收者

在go语言中，没有类的概念但是可以给类型（结构体，自定义类型）定义方法。所谓方法就是定义了接收者的函数。接收者的概念就类似于其他语言中的this 或者self。

方法的定义格式如下：

```go
func (接收者变量 接收者类型) 方法名(参数列表)(返回参数) {
    函数体
}
```

**其中**

- 接收者变量：接收者中的参数变量名在命名时，官方建议使用接收者类型名的第一个小写字母，而不是self、this之类的命名。例如，Person类型的接收者变量应该命名为p，Connector类型的接收者变量应该命名为c等。、
- 接收者类型：接收者类型和参数类似，可以是指针类型和非指针类型。
  - 非指针类型：表示不修改结构体的内容
  - 指针类型：表示修改结构体中的内容
- 方法名、参数列表、返回参数：具体格式与函数定义相同

示例所示：

```go
package main

import "fmt"

/**
定义一个人结构体
*/
type Person struct {
    name string
    age  int
    sex  string
}

// 定义一个结构体方法
func (p Person) PrintInfo() {
    fmt.Print(" 姓名: ", p.name)
    fmt.Print(" 年龄: ", p.age)
    fmt.Print(" 性别: ", p.sex)
    fmt.Println()
}
func (p *Person) SetInfo(name string, age int, sex string) {
    p.name = name
    p.age = age
    p.sex = sex
}

func main() {
    var person = Person{
        "张三",
        18,
        "女",
    }
    person.PrintInfo()
    person.SetInfo("李四", 18, "男")
    person.PrintInfo()
}
```

运行结果为：

```bash
 姓名: 张三 年龄: 18 性别: 女
 姓名: 李四 年龄: 18 性别: 男
```

注意，因为结构体是值类型，所以我们修改的时候，传入的指针

```go
func (p *Person) SetInfo(name string, age int, sex string)  {
	p.name = name
	p.age = age
	p.sex = sex
}
```

## 给任意类型添加方法

在Go语言中，接收者的类型可以是任何类型，不仅仅是结构体，任何类型都可以拥有方法。

举个例子，我们基于内置的int类型使用type关键字可以定义新的自定义类型，然后为我们的自定义类型添加方法。

```go
package main

import (
    "fmt"
)

type myInt int

func (m myInt) PrintInfo() {
    fmt.Println("我是自定义类型里面的自定义方法")
}
func main() {
    var a myInt = 10
    fmt.Printf("%v %T \n", a, a)
    a.PrintInfo()
}

```

## 结构体的匿名字段

结构体允许其成员字段在声明时没有字段名而只有类型，这种没有名字的字段就被称为匿名字段

匿名字段默认采用类型名作为字段名，结构体要求字段名称必须唯一，因此一个结构体中同种类型的匿名字段只能一个

```go
package main

import (
    "fmt"
)

/*
  定义一个人结构体
*/
type Person struct {
    string
    int
}

func main() {
    // 结构体的匿名字段
    var person = Person{
        "张三",
        18,
    }

    fmt.Printf("%#v\n", person)
}
```

结构体的字段类型可以是：基本数据类型，也可以是切片、Map 以及结构体

如果结构体的字段类型是：指针、slice、和 map 等零值是`nil`​(即还没有分配空间)的类型

使用这样的字段，需要先`make`​，才能使用

```go
package main

import (
    "fmt"
)

/**
定义一个人结构体
*/
type Person struct {
    name     string
    age      int
    hobby    []string
    mapValue map[string]string
}

func main() {
    // 结构体的匿名字段
    var person = Person{}
    person.name = "张三"
    person.age = 10

    // 给切片申请内存空间
    person.hobby = make([]string, 4)
    person.hobby[0] = "睡觉"
    person.hobby[1] = "吃饭"
    person.hobby[2] = "打豆豆"

    // 给map申请存储空间
    person.mapValue = make(map[string]string)
    person.mapValue["address"] = "北京"
    person.mapValue["phone"] = "123456789"

    // 加入#打印完整信息
    fmt.Printf("%#v", person) 
    // Output: main.Person{name:"张三", age:10, hobby:[]string{"睡觉", "吃饭", "打豆豆", ""}, mapValue:map[string]string{"address":"北京", "phone":"123456789"}}
}

```

## 结构体嵌套

同时我们还支持结构体的嵌套，如下所示

```go
package main

import (
    "fmt"
)

// 用户结构体
type User struct {
    userName string
    password string
    sex      string
    age      int
    address  Address // User结构体嵌套Address结构体
}

// 收货地址结构体
type Address struct {
    name  string
    phone string
    city  string
}

func main() {

    user := User{
        "zhangsan",
        "123456",
        "man",
        18,
        Address{
            "张三",
            "17311111111",
            "北京市",
        },
    }

    fmt.Printf("%#v\n", user)
    // Output: main.User{userName:"zhangsan", password:"123456", sex:"man", age:18, address:main.Address{name:"张三", phone:"17311111111", city:"北京市"}}
}

```

## 结构体的继承

结构体的继承，其实就类似于结构体的嵌套，只不过使用的是匿名字段

如下所示，我们定义了两个结构体，分别是Animal 和 Dog，其中每个结构体都有各自的方法，然后通过Dog结构体 继承于 Animal结构体

```go
package main

import "fmt"

// 定义父结构体
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

func (p Person) showInfo() {
    fmt.Printf("%s.%s的年龄是%d", p.LastName, p.FirstName, p.Age)
}

// 定义子结构体，嵌套父结构体
type Student struct {
    Person // 嵌套 Person 结构体
    School string
    Grade  int
}

func main() {
    // 创建子结构体对象
    student := Student{
        Person: Person{
            FirstName: "Alice",
            LastName:  "Smith",
            Age:       18,
        },
        School: "ABC School",
        Grade:  12,
    }

    // 访问继承的属性
    fmt.Println("Student:", student.FirstName, student.LastName)
    fmt.Println("Age:", student.Age)
    fmt.Println("School:", student.School)
    fmt.Println("Grade:", student.Grade)

    // 调用继承的方法
    student.showInfo()
}
```

## Go中的结构体和Json相互转换

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。RESTfull Api返回的数据都是json数据。

```json
{
    "name": "张三",
    "age": 15
}
```

比如要给App或者小程序提供Api接口数据，这个时候就需要涉及到结构体和Json之间的相互转换  
序列化是指把结构体数据转化成JSON格式的字符串，反序列化是指把JSON数据转化成Golang中的结构体对象

Go中的序列化和反序列化主要通过`encoding/json`​包中的 `json.Marshal()`​ 和 `json.Unmarshal()`​

```go
package main

import (
    "encoding/json"
    "fmt"
)

// 定义一个学生结构体，注意结构体的首字母必须大写，代表公有，否则将无法转换
type Student struct {
    ID     string
    Gender string
    Name   string
    Sno    string
}

func main() {
    var s1 = Student{
        ID:     "12",
        Gender: "男",
        Name:   "李四",
        Sno:    "s001",
    }
    // 结构体转换成Json（返回的是byte类型的切片）
    jsonByte, _ := json.Marshal(s1)
    jsonStr := string(jsonByte)
    fmt.Printf("%s\n", jsonStr)
    // Output: {"ID":"12","Gender":"男","Name":"李四","Sno":"s001"}

    // Json字符串转换成结构体
    var str = `{"ID":"12","Gender":"男","Name":"李四","Sno":"s001"}`
    var s2 = Student{}
    // 第一个是需要传入byte类型的数据，第二参数需要传入转换的地址
    err := json.Unmarshal([]byte(str), &s2)
    if err != nil {
        fmt.Printf("转换失败 \n")
    } else {
        fmt.Printf("%#v \n", s2)
        // Output: main.Student{ID:"12", Gender:"男", Name:"李四", Sno:"s001"}
    }
}
```

> 想要实现结构体转换成字符串，必须保证结构体中的字段是公有的，也就是首字母必须是大写的，这样才能够实现结构体 到 Json字符串的转换。

## 结构体标签Tag

Tag是结构体的元信息，可以在运行的时候通过反射的机制读取出来。Tag在结构体字段的后方定义，由一对反引号包裹起来，具体的格式如下：

```json
key1："value1" key2："value2"
```

结构体tag由一个或多个键值对组成。键与值使用冒号分隔，值用双引号括起来。

同一个结构体字段可以设置多个键值对tag，不同的键值对之间使用空格分隔。

如下所示，我们通过tag标签，来转换字符串的key

```go
package main

import (
    "encoding/json"
    "encoding/xml"
    "fmt"
)

type Person struct {
    Name    string `json:"name" xml:"full_name"`
    Age     int    `json:"age" xml:"age"`
    Country string `json:"country" xml:"birth_country"`
}

func main() {
    // JSON 序列化
    p := Person{
        Name:    "Alice",
        Age:     30,
        Country: "USA",
    }

    // JSON 序列化
    jsonData, err := json.MarshalIndent(p, "", "    ")
    if err != nil {
        fmt.Println("JSON Marshal Error:", err)
        return
    }
    fmt.Println("JSON Data:")
    fmt.Println(string(jsonData))

    // JSON 反序列化
    var p2 Person
    err = json.Unmarshal(jsonData, &p2)
    if err != nil {
        fmt.Println("JSON Unmarshal Error:", err)
        return
    }
    fmt.Printf("JSON Unmarshaled Data: %+v\n\n", p2)

    // XML 序列化
    xmlData, err := xml.MarshalIndent(p, "", "    ")
    if err != nil {
        fmt.Println("XML Marshal Error:", err)
        return
    }
    fmt.Println("XML Data:")
    fmt.Println(string(xmlData))

    // XML 反序列化
    var p3 Person
    err = xml.Unmarshal(xmlData, &p3)
    if err != nil {
        fmt.Println("XML Unmarshal Error:", err)
        return
    }
    fmt.Printf("XML Unmarshaled Data: %+v\n", p3)
}
```

首先定义了 `Person`​ 结构体，然后分别进行了 JSON 和 XML 的序列化和反序列化操作。

输出结果：

```plaintext
JSON Data:
{
    "name": "Alice",
    "age": 30,
    "country": "USA"
}
JSON Unmarshaled Data: {Name:Alice Age:30 Country:USA}

XML Data:
<Person>
    <full_name>Alice</full_name>
    <age>30</age>
    <birth_country>USA</birth_country>
</Person>
XML Unmarshaled Data: {Name:Alice Age:30 Country:USA}
```

‍
