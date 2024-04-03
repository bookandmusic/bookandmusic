---
title: JS基础教程
category: 前端
tag: [js]
abbrlink: ec74d0f7
date: 2019-07-25 14:30:27
article: false
---

# JS基础教程

## JS简介

JavaScript是运行在浏览器端的脚本语言

JavaScript主要解决的是前端与用户交互的问题 是一种动态性、弱类型的语言;

他的解释器就在我们的浏览器中，是浏览器的一部分

这门语言对大小写敏感，并会忽略多余的空格，可以使用\进行代码换行，注释使用`//`或`/**/`

主要由三部分组成:

- ECMAScript:语言的语法和基本对象
- 文档对象模型Dom(Document Object Model):处理网页内容的方法和接口
- 浏览器对象模型Bom(BrowserObjectModel):与浏览器进行交互的方法和接口

> 前端三部分

HTML:页面的内容、结构

CSS:页面的表现形式、部分动画

JavaScript:页面的行为、交互、功能

> JavaScript 与 Java 是两种完全不同的语言，无论在概念上还是设计上。
> Java（由 Sun 发明）是更复杂的编程语言。
> ECMA-262 是 JavaScript 标准的官方名称。

JavaScript 由 Brendan Eich 发明。它于 1995 年出现在 Netscape 中（该浏览器已停止更新），并于 1997 年被 ECMA（一个标准协会）采纳。

**ECMAScript 版本**

JavaScript 已经由 ECMA（欧洲电脑制造商协会）通过 ECMAScript 实现语言的标准化。

|年份|名称|描述|
| :--: | :------------: | :---------------------------------------------------|
|1997|ECMAScript 1|第一个版本|
|1998|ECMAScript 2|版本变更|
|1999|ECMAScript 3|添加正则表达式<br>添加 try/catch|
||ECMAScript 4|放弃发布。|
|2009|ECMAScript 5|添加 "strict mode"，严格模式<br>添加 JSON 支持|
|2011|ECMAScript 5.1|版本变更|
|2015|ECMAScript 6|添加类和模块|
|2016|ECMAScript 7|增加指数运算符 (**)<br>增加 Array.prototype.includes|

> ECMAScript 6 也称为 ECMAScript 2015。
> ECMAScript 7 也称为 ECMAScript 2016。

## JS引入

行间事件:为某一个具体的元素标签赋予js内容

```html
<input type="button" value="按钮" onclick="alert('点我');">
```

嵌入引入:在文档页面通过Script标签嵌入

```html
<head>
  <title></title>
  <script type="text/javascript">
    alert("ok!");
  </script>
</head>
```

　　外部引入:定义单独js文件，通过script标签进行引入

```html
<script type="text/javascript" src="js/main.js"></script>
```

> alert函数用来展示一个提示框

## 定义变量

```javascript
var x = 1
var y = "2"
```

- 定义变量需要使用关键字:var
- 同时定义多个变量可以使用 ， 隔开

> 注意:javascript变量均为对象，每当声明一个变量，就相当于创建了一个对象

### 命名规则

1. 区分大小写
2. 首字符为字母、数字、下划线_、或美元符号$
3. 其他字符可以为字母、数字、下划线、美元符号

### 调试程序的方法

- alert:弹框
- console.log():浏览器控制台
- document.write():页面控制

## 数据类型

### 基本数据类型

`Number`:数字类型，可以带小数点，也可以不带

```javascript
var a = 1;
var b = 1.5;
```

`String`:字符串类型，可以使用单引号或双引号

```javascript
var a = "abc";
var b = "aaaa" + 1
```

`Boolean`:布尔类型，只能是true|false

```javascript
var a = true;
```

`undefined`:未定义类型

```javascript
var a;
```

`null`:空对象类型

```javascript
var a = null;
```

查看变量数据类型:

```javascript
var x = "abc";
alert(typeof x)
```

> 匈牙利命名规则

- 对象 o (Object):oPerson
- 数组 a (Array):aUsers
- 字符串 s (String):sAccount
- 整数 i (Integer):iScore
- 布尔值 b (Boolean):bIsLogin
- 浮点数 f (Float):fPrice
- 函数 f (Function):fEats
- 正则 re (RegExp):reIDCard

### 类型转换

转换为字符串:`toString`，支持`Boolean`、`Number`、`String`三种主要类型

```javascript
var x = 1;
var y = "abc";
var z = true;
alert(x.toString()) // "1"
alert(y.toString()) // "abc"
alert(z.toString()) // "true"
```

转换为数字:`parseInt`、`parseFloat`，将只含有数字的字符串变为整形或浮点型，其他类型返回NaN

```javascript
var x = "123"
alert(parseInt(x)) //123
alert(parseFloat(x)) //123

var y = "123.01"
alert(parseInt(y)) //123
alert(parseFloat(y)) //123.01

var z = "123aa"
alert(parseInt(z)) //123
alert(parseFloat(z)) //123

var a="012.23a"
alert(parseInt(a)) //12,不能识别八进制
alert(parseFloat(a)) //12.23,不能识别八进制

var b = "0xff"
alert(parseInt(b)) //255,可以直接识别十六进制
alert(parseFloat(b)) //0,不能识别,得到0
```

> **注意**：

`parseInt`

- 转换的字符串应该是十进制
- 八进制,该方法会忽略前导0，八进制数字020会被解析为20
- 十六进制数字0xFF，会返回对应的十进制数字
- 其他不合法数据，会返回NaN

`parseFloat`

- 转换的包含浮点数的字符串应该是十进制
- 八进制,该方法会忽略前导0,八进制数字020会被解析为20
- 十六进制数字0xFF，会返回0，
- 其他不合法数据，会返回NaN

### 强制类型转换

`Boolean`:当要转换的值是至少有一个字符的字符串;

- 非 0 数字或对象时，Boolean() 函数将返回 true。
- 如果该值是空字符串、数字 0、undefined 或 null，它将返回 false。

```javascript
alert(Boolean(0)) // false
alert(Boolean(1)) // true
alert(Boolean("1")) // true
alert(Boolean("1a")) // true
```

`Number`:换与 `parseInt`和 `parseFloat` 方法的处理方式相似，只是它转换的是整个值，而不是部分值。

```javascript
alert(Number(false)) // 0
alert(Number(true)) // 1
alert(Number(undefined)) // NaN
alert(Number(null)) // 0
alert(Number("1.2")) // 1.2
alert(Number("12")) // 12
alert(Number("12ab")) // NaN
alert(Number("1.2.3")) // NaN
alert(Number(new object())) // NaN
alert(Number(50)) // 50
```

### 复合类型

`Array`:数组，索引从0开始

```javascript
var people = ['张三','李四','王五'];
var people = new Array('张三','李四','王五'); 
var people = new Array();
people[0] = "张三"
people[1] = "李四"
people[2] = "王五"
```

`Object`:对象，就像是字典，定义时key值不需要设置类型

```javascript
var person = { name: "张三",
age: 18,
	sex: "male",
};
/*对象有两种访问方式:*/ 
person["name"] 
person.name
```

```javascript
var person = new Object(); 
person.name = "张三"; 
person.age = 17;
```

## 运算符

### 算术运运算符

> `y=5`

|运算符|描述|示例|结果|
| :----: | :--: | :--: | :--: |
|`+`|加|`x=y+2`|`x=7`|
|`-`|减|`x=y-2`|`x=3`|
|`*`|乘|`x=y*2`|`x=10`|
|`/`|除|`x=y/2`|`x=2.5`|
|`%`|取余|`x=y%2`|`x=1`|
|`++`|累加|`x=++y`|`x=6`|
|`--`|递减|`x=--y`|`x=4`|

### 赋值运算符

> `x=10`,`y=5`

|运算符|示例|等价于|结果|
| :----: | :--: | :----: | :--: |
|`=`|`x=y`||`x=5`|
|`+=`|`x+=y`|`x=x+y`|`x=15`|
|`-=`|`x-=y`|`x=x-y`|`x=5`|
|`*=`|`x*=y`|`x=x*y`|`x=50`|
|`/=`|`x/=y`|`x=x/y`|`x=2`|
|`%=`|`x%=y`|`x=x%y`|`x=0`|

> 注意:数字与字符串相加，结果将成为字符串

### 比较运算符

> `x=5`

|运算符|描述|示例|
| :----: | :-------------| :--------|
|`==`|等于|`x==8` 为 `false`|
|`===`|全等(值和类型)|`x===5` 为 `true`;`x==="5"` 为 `false`|
|`!=`|不等于|`x!=8` 为 `true`|
|`>`|大于|`x>8` 为 `false`|
|`<`|小于|`x<8` 为 `true`|
|`>=`|大于或等于|`x>=8` 为 `false`|
|`<=`|小于或小于|`x<=8` 为 `true`|

### 逻辑运算符

> `x=7`,`y=2`

| 运算符 | 描述 | 示例 |
| ------ | ---- | ---- |
| `&&`   | and | `(x < 10 && y > 1)` : `true` |
| `｜｜` | or | `(x == 5 ｜｜ y == 5)` : `false` |
| `!` | not | `!(x == y)` : `true` |

### 条件运算符

```javascript
var NumCheck = 0;
var Dis = (NumCheck==0) ? "是数字0":"不是数字0";
```

> 变量`NumCheck`是0，则Dis的值为:"是数字0";反之为:"不是数字0"

## 条件语句

### if语句

```javascript
var a = 0

if(a==0){
  alert("0");
}
else if(a<0){
  alert("负数");
}
else{
  alert("正数");
}
```

### switch语句

```javascript
var day = new Date().getDay()

switch (day) {
  case 0:
    alert("星期日")
    break
  case 1:
    alert("星期一")
    break
  case 2:
    alert("星期二")
    break
  case 3:
    alert("星期三")
    break
  case 4:
    alert("星期四")
    break
  case 5:
    alert("星期五")
    break
  case 6:
    alert("星期六")
    break
}
```

## 循环语句

### for循环语句

> for循环数字

```javascript
for (var i = 0; i < 10; i++) {
  console.log(i)
}
// for(起点数据; 判断条件; 数据递增或递减){}
```

```javascript
var i = 0
for (; i < 10; i++) {
  console.log(i)
}
// 如果循环起始值已经被设置，可以在开头省略
```

```javascript
for (var i = 0; ; i++) {
  console.log(i)
  if (i == 5) {
    break
  }
}
// 当没有第二个语句时，必须在循环内提供break，否则循环则无法停下来，可能令浏览器崩溃
```

```javascript
for (var i = 1; i < 10;) {
  console.log(i)
  i *= 2
}
// 如果没有提供第三个语句，可以在for循环中实现数值的变化
```

> for循环对象

```javascript
var x = "abcdef"  // 0,1,2,3,4,5
var y = [1, 2, 3, 4, "5"] // 0,1,2,3,4
var z = { //  name,age,gender
  name: "张三", age: 16, gender: "男",
}
for (obj in z) {
  // 直接循环遍历，得到的是下标,而不是对应的值
  console.log(obj + ":" + z[obj]);
}
```

### while循环语句

> while循环

```javascript
var i = 0

while (i < 10) {
  console.log(i)
  i += 2
}
```

> `do/while`循环

```javascript
var i = 0

do {
  console.log(i)
  i += 2
} while (i < 10)
```

> **注意** :
> do/while 循环是 while 循环的变体 该循环首先会执行一次循环代码块，然后检查循环条件是否为真 然后如果条件为真的话，就会重复这个循环

## 函数

### 函数语法

包裹在花括号中的代码块，前面使用了关键词 `function`

```javascript
function func(arg1, arg2) {
  alert("函数被执行")
  // 执行代码
  return 1; // return是可选的，并且可以不写返回值，单纯只做函数终止
}
// 函数名 func
// 参数 arg1,arg2,... 
// 返回值 return 1 
func() // 函数执行
```

### 变量作用域

**局部变量**

- 在 JavaScript 函数内部声明的变量(使用 var)是局部变量
- 只能在函数内部访问它,该变量的作用域是局部的
- 生命周期:局部变量会在函数运行以后被删除 (生命期从它们被声明的时间开始)

**全局变量**

- 在函数外声明的变量是全局变量
- 网页上的所有脚本和函数都能访问它
- 生命周期:全局变量会在页面关闭后被删除 (生命期从它们被声明的时间开始)

局部变量如果希望变为全局变量,可以使用`windows.var = ​`的形式赋予给当前窗口

```javascript
{
  var x = 1;
  window.x = x;
};
```

### 函数解析过程

1. 预编译:function函数提前，并将var定义的变量声明提前，先暂时赋值为undefined
2. 执行

   ```javascript
   func() // 弹出提示
   alert(iNum) // undefined
   alert(abc) // 出错
   function func() {
       alert("这个是函数")
   }
   var iNum = 1
   ```

### 匿名函数(函数表达式)

顾名思义，匿名函数就是没有实际名字的函数。然而，正因为他们没有“名字”，我们也没有办法找到他们

要调用一个函数，我们必须要有方法定位它，引用它。所以，我们会需要帮它找一个名字

```javascript
var k = function () {
  console.log("函数执行")
}

k()
```

### 封闭函数

封闭函数是javascript中匿名函数的另外一种写法，创建一个一开始就执行而不用命名的函数。

使用`()`将匿名函数括起来，然后后面再加一对小括号（包含参数列表）

```javascript
(function(a,b){
  return a+b
})(1,2)
```

很多人或许会奇怪，为什么这种方法能成功调用呢？觉得这个应用奇怪的人就看一下我以下这段解释吧。

大家知道小括号的作用吗？小括号能把我们的表达式组合分块，并且每一块，也就是每一对小括号，都有一个返回值。这个返回值实际上也就是小括号中表达式的返回值。所以，当我们用一对小括号把匿名函数括起来的时候，实际上小括号对返回的，就是一个匿名函数的Function对象。因此，小括号对加上匿名函数就如同有名字的函数般被我们取得它的引用位置了。所以如果在这个引用变量后面再加上参数列表，就会实现普通函数的调用形式。

还可以在函数定义前加上"~"或者"!"符号来定义匿名函数

```javascript
!function(a,b){
  alert(a+b)
}(1,2)
```

## 操作页面元素

### 获取页面元素

通过页面元素ID值进行获取:document.getElementById(''),获取到的是一个HTML对象，可以赋值给一个变量

> 注意:获取对应元素时，首先要确定页面已经生成所需元素

通常我们将javascript代码写到页面最下面;

或通过使用`windows.onload()`事件判断是否已经生成页面。

```html
<body>
  <div id="app">

  </div>

  <script>
    var sp = document.getElementById("app")
    console.log(sp) //此时sp即是获取到的页面元素
  </script>
</body>
```

### 读写页面元素

可以通过id方式获取到对应页面内的元素，就可以对元素的属性进行操作，包括对属性的读和写

读取元素属性:元素.属性

```html
<p style="color: red" id="app"> 这是一段红色的文字 </p>

<script>
  var sp = document.getElementById("app")
  console.log(sp.id)
  console.log(sp.style)
  console.log(sp.style.color)
</script>
```

修改元素属性:元素.属性 = xxx

```html
<p id="aaa" style="color: red;">这是一段待获取的文字</p>
<button onclick="blue_font()">按钮</button>
<script>
  function blue_font() {
    var oP = document.getElementById('aaa'); 
    oP.style.color = "blue";
    // 修改字体样式属性中的字体颜色为蓝色
  }
</script>
```

```html
<p id="aaa" style="color: red;">这是一段待获取的文字</p>
<button id="Button">按钮</button>
<script>
  var oButton = document.getElementById('Button');
  oButton.onclick = function () {
    var oP = document.getElementById('aaa');
    oP.style.color = "blue";
    // 修改字体样式属性中的字体颜色为蓝色
  }
</script>
```

读取或写入标签包裹的内容(读取或修改标签文本内容):innerHTML/innerText

```html
<div id="app"></div>
<div id="app2"></div>

<script>
  document.getElementById("app").innerHTML= "<h1>hello</h1>"
  document.getElementById("app2").innerText = "<h1>hello</h1>"
</script>
```

## Js事件及属性

下面是一个属性列表，这些属性可插入 HTML 标签来定义事件动作。

|属性|当以下情况发生时，出现此事件|
| :----------: | :-----------------------------------------|
|onblur|使用在表单元素中，当元素失去焦点的时候执行|
|onchange|使用在表单元素中，当某些东西改变是执行|
|onclick|鼠标点击一个元素时执行|
|ondblclick|鼠标双击一个元素时执行|
|onfocus|使用在表单元素中，当元素获得焦点时执行|
|onkeydown|按下某个按键时执行|
|onkeypress|按下和释放某个按键时执行|
|onkeyup|释放某个按键时执行|
|onload|在body标签中使用，载入页面的时候执行|
|onmousedown|按下鼠标按键时执行|
|onmousemove|鼠标光标在元素上移动时执行|
|onmouseout|鼠标光标移开元素时执行|
|onmouseover|鼠标光标移到元素上时执行|
|onmouseup|当释放鼠标按键时执行|
|onreset|用在表单元素中，当表单重置时执行|
|onselect|用在表单元素中，当元素被选择时执行|
|onsubmit|用在表单元素中，当表单提交时执行|
|onunload|用在body标签中，当关闭页面时执行|
|onmonsewheel|鼠标光标在元素上，鼠标滑轮滑动时执行|

> 事件示例

```html
<p id="p1">这是一段文字</p>
<p id="p2" onmouseout="func()" onmouseover="func()">这是一段文字</p>

<script>
  // 定义函数f1
  f1 = function () {
    var op = document.getElementById("p1")
    op.onmouseover = function () {
      op.style.color = "red"
    }
    op.onmouseout = function () {
      op.style.color = "green"
    }
  }
  f1() // 执行函数f1

  function func() {
    var op = document.getElementById("p2")
    if (op.style.color == "red") {
      op.style.color = "green"
    }
    else {
      op.style.color = "red"
    }
  }
</script>
```

## 定时器

> 作用:定时调用函数 制作动画

### 反复执行定时器

`setInterval(code, millisec)`:反复执行的定时器

- code: 必须参数，要调用的函数或要执行的代码串
- millisec: 必须参数，执行code任务所需要的事件间隔，以毫秒计

`clearInterval(setInterval_obj)`:关闭反复执行的定时器

> 跑马灯

```html
<p id="p1">hello</p>
<input type="button" value="开启" id="btn1">
<input type="button" value="关闭" id="btn2">

<script>
  let sT
  let op = document.getElementById("p1")
  function loop() {
    var txt = op.innerText // 获取元素对应的文本内容
    op.innerText = txt.substr(1) + txt[0] //拼接为新的字符串,并重新赋值回去
  }
  btn1.onclick = function () {
    //定时器不存在,创建新的定时器
    if (!sT) {
      sT = setInterval(loop, 500)
    }
    //否则,弹出提示
    else {
      alert("已经开启")
    }
  }

  btn2.onclick = function () {
    // 定时器存在,关闭定时器,并重新置为null
    if (sT) {
      clearInterval(sT)
      sT = null
    }
    //否则,弹出提示
    else {
      alert("已经关闭")
    }
  }

</script>
```

### 等待执行定时器

`setTimeout(code, millisec)`:定义只执行一次的等待定时器

- code: 必须参数，要调用的函数或要执行的代码串
- millisec: 必须参数，执行code任务所需要的事件间隔，以毫秒计

`clearTimeout(setTimeout_obj)`:关闭只执行一次的等待计时器

> 文本定时关闭

```html
<p id="p1">hello</p>
<input type="button" value="切换显示" id="btn1">
<input type="button" value="清除定时器" id="btn2">

<script>
  let sT
  let op = document.getElementById("p1")
  function loop() {
    //文本为空,重新显示文本
    if (op.innerText == "") {
      op.innerText = "hello"
    }
    else {
      op.innerText = ""
    }
  }
  btn1.onclick = function () {
    //定时器不存在,创建新的定时器
    if (!sT) {
      sT = setTimeout(loop, 1500)
    }
    //否则,弹出提示
    else {
      alert("已经开启定时器")
    }
  }

  btn2.onclick = function () {
    // 定时器存在,关闭定时器,并重新置为null
    if (sT) {
      clearTimeout(sT)
      sT = null
    }
    //否则,弹出提示
    else {
      alert("已经清除定时器")
    }
  }

</script>
```
