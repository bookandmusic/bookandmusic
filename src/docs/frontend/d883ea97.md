---
title: Vue基础教程
category: 前端
tag: [vue]
abbrlink: 1ca158a7
article: false
---

# Vue基础教程

## 初识Vue.js

### 简介

- Vue.js是前端三大新框架:Angular.js、React.js、Vue.js之一，Vue.js目前的使用和关注程度在三大框架中稍微胜出，并且它的热度还在递增
- Vue的核心库只关注视图层，Vue的目标是通过尽可能简单的 API 实现响应的数据绑定，在这一点上Vue.js类似于后台的模板语言
- Vue也可以将界面拆分成一个个的组件，通过组件来构建界面，然后用自动化工具来生成单页面(SPA - single page application)系统
- Vue.js使用文档已经写的很完备和详细了，通过以下地址可以查看: [官方中文文档](https://cn.vuejs.org/v2/guide/%20)

### 安装

> 独立版本

我们可以在 Vue.js 的官网上直接下载 vue.min.js 并用 `<script>` 标签引入:[下载Vue.js](https://cn.vuejs.org/js/vue.js)

> NPM 方法

由于 npm 安装速度慢，因此可以将默认镜像修改为淘宝的镜像。

```shell
npm config set registry https://registry.npm.taobao.org/
```

检查是否修改成功

```shell
npm config get registry
```

npm 版本需要大于 3.0，如果低于此版本需要升级它：

```shell
sudo npm install -g npm
```

设置安装包路径

```shell
npm config set cache "~/nodejs/node_cache"
```

设置模块安装路径？

```shell
npm config set prefix "~/nodejs/node_global"
# 之后使用命令安装的模块存储在~/nodejs/node_global/node_modules里 
```

使用nmp安装vue:

```shell
npm install vue -g
```

安装vue命令行工具

```shell
npm install vue-cli -g
```

## 插值表达式

每个vue应用都是通过实例化一个新的vue对象开始的

创建第一个模板语法:

```vue
<div id="content">
  {{ message }}
  <!-- 这个也叫做插值表达式 -->
</div>
<script src="https://cn.vuejs.org/js/vue.js"></script>
<script>
  var vm = new Vue({ // vm这个变量不允许使用连字符，可以使用下划线，比如vm-data是不允许的 
    el: "#content",
    // 对应document中的一个标签，当vue对象创建后，这个标签内的区域就被接管 
    data: {
      message: "这是vue里的变量"
    }
  })
</script>
```

当一个vue实例被创建时，vue的响应式系统中加入了对其data对象中能找到的所有属性

当这些属性值被改变时，视图也会发生相应，并将对应属性更新为新的值

也可以通过定义函数来改变实例中data对象中的数据，数据改变，视图中的数据也将改变

```vue
<div id='app'>
  <p @click="rever_str"> {{ msg }} </p>
</div>
<script src="https://cn.vuejs.org/js/vue.js"></script>
<script>
  var vm = new Vue({
    el: '#app',
    data() {
      return {
        msg: 'hello',
      }
    },
    methods: {
      rever_str: function () {
        console.log(this.msg)
        this.msg = this.msg.split("").reverse().join("")
      }
    },
  })
</script>
```

## 内容绑定

### v-text

将内容按照文本格式进行插入，但会覆盖原有标签内的内容，不会有加载的闪烁问题

```vue
<div id="app">
  <h2 v-text="msg">+*****+</h2>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data:{
      msg: "hello",
    },
  })
</script>
```

### v-clock

解决加载时的闪烁问题,这个指令可以隐藏未编译的标签直到实例准备完毕

```vue
<div id="app">
  <p v-clock>
    {{msg}}
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "hello"
    }
  })
</script>
```

在上面的代码中，如果网速够慢的情况下，页面首先加载显示出的内容是`{{ message }}`

解决办法:通过 v-clock 指令，在使用到模板变量的标签上写入，并设置一个 v-clock 的类样式

```vue
<style>
  [v-clock] {
    display: none;
  }
</style>

<div id="app">
  <p v-clock>
    {{msg}}
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "hello"
    }
  })
</script>
```

### v-html

将内容按照html格式进行插入

> 注意:在网站上动态渲染任意 HTML 是非常危险的，因为容易导致XSS攻击。只在可信内容上使用 v- html ，永不用在用户提交的内容上

```vue
<div id="app">
  <p v-html="msg"></p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "<h2>hello</h2>",
    }
  })

</script>
```

## 事件绑定

要理解事件绑定，就得先了解事件。

浏览器是事件驱动型的，根据用户的行为触发不同的事件，根据事件执行相应的操作。

### 事件类型

我们较为熟悉的事件有三大类型：

#### 鼠标键盘事件

|鼠标键盘事件|事件介绍|
| :-----------| :-----------------------|
|onclick|鼠标点击某个对象|
|ondbclick|鼠标双击某个对象|
|onmousedown|某个鼠标按键被按下|
|onmouseup|某个鼠标按键被松开|
|onmousemove|鼠标被移动|
|onmouseover|鼠标被移到某元素之上|
|onmouseout|鼠标从某元素移开|
|onkeypress|某个键盘的键被按下或按住|
|onkeydown|某个键盘的键被按下|
|onkeyup|某个键盘的键被松开|

#### 页面事件

|页面事件|事件介绍|
| :-------| :-----------------------------|
|onload|某个页面或图像被完成加载|
|onunload|用户退出页面|
|onresize|窗口或框架被调整尺寸|
|onerror|当加载文档或图像时发生某个错误|
|onabort|图像加载被中断|

#### 表单相关事件

|表单相关事件|事件介绍|
| :-----------| :---------------|
|onblur|元素失去焦点|
|onfocus|元素获得焦点|
|onchange|用户改变域的内容|
|onreset|重置按钮被点击|
|onsubmit|提交按钮被点击|
|onselect|文本被选定|

> 需要注意的是事件处理程序中的变量`event`保留着事件对象的信息，包括比如`click`事件，事件属性里有点击位置相对于浏览器，以及页面的坐标信息，事件的类型（`click`）,触发事件的DOM节点信息等;可以将`evenet`作为参数传递，在函数内部获取具体的evenet对象信息。

### v-on

在Vue.js中`v-on`指令用来监听`DOM`事件，并在触发事件时运行一些`JavaScript`代码;当然`v-on`也可以简写为`@`

```vue
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <title>事件绑定</title>
    <script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>
</head>

<body>

    <div id='app'>
        <button v-on:click='func'> 显示 </button>
        <h1> {{msg}} </h1>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    msg: '',
                }
            },
            methods: {
                func() {
                    this.msg = '这是一个大大的H1'
                }
            },
        })
    </script>
</body>

</html>
```

### 事件修饰符

> `Vue.js` 为 `v-on` 提供了事件修饰符来处理 `DOM` 事件细节;`Vue.js`通过由点(`.`)表示的指令后缀来调用修饰符。

#### 事件修饰符分类

Vue.js提供的事件修饰符主要针对两类情况:

- 冒泡机制修饰符

  - `.stop`
  - `.capture`
  - `.self`
- 事件本身修饰符

  - `.prevent`
  - `.once`

#### 冒泡机制修饰符

> 事件冒泡

`DOM`中，树状结构决定了子元素肯定在父元素里，所以点击子元素，就同时点击了子元素和父元素，以及父元素的父元素，以此类推，当然最终的根节点都是文档，以及`window`。

试想，当一个子元素被点击的时候，不仅仅这个元素本身被点击了，因为这个元素也在其上一级父元素中(属于父级元素的地盘)，所以相当于其父元素也被点击了，以此类推，一层一层往外推，最终整个文档也是被点击了，如果每个层级的节点元素都绑定了`click`事件，那么每个节点的`click`事件函数都会被执行。举个形象的例子，一个村里的人被打了（`click`），首先就要按照村里的规矩处理，同时这个村属于某个乡镇，当然也是相当于这个乡镇的人被打了，那么也要按照这个乡镇的规矩处理，以此一层一层往上报。这个例子不准确的地方就是，现实中一个人因为一个事件只会被处理一次，不会因为同一件事情多次处理。

> 冒泡带来的烦恼

当上层（以及上上层，直至`body`元素）父级有子元素同样的方法，但你子元素的事件后，所有父级元素的同名函数也会从下到上，由里往外，挨个执行，但是大多数情况下，我们只希望子当事元素事件执行，不希望层层执行，这就要想办法阻止这种冒泡的情况发生。比如我们点击`Child Span`的时候只显示 `Child Span`的内容。结合刚刚的例子就是，村里发生了打人事件，在村里解决了，就没必要一层一层往上报，在层层处理了。

在Vue.js中针对Js事件本身的冒泡机制提供一些事件修饰符以便使用

`.stop`: 阻止冒泡事件

```html
<!DOCTYPE html>
<html lang="zh-CN">

  <head>
    <meta charset="UTF-8">
    <title>冒泡机制</title>
    <script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>
    <style>
      #outer {
        width: 400px;
        height: 200px;
        background-color: aqua;
        position: absolute;
      }

      #inner {
        width: 200px;
        height: 100px;
        background-color: darkcyan;
        margin: 50px auto;
      }

      #btn {
        width: 40px;
        height: 30px;
        background-color: gold;
        margin: 35px 80px;
      }
    </style>
  </head>

  <body>
    <div id='app'>
      <div id="outer" @click='outer'>
        <div id="inner" @click='inner'>
          <button id="btn" @click.stop='btn'>按钮 </button>
        </div>
      </div>
    </div>
    <script>
      var vm = new Vue({
        el: '#app',
        methods: {
          inner() {
            console.log("inner触发了")
          },
          outer() {
            console.log("outer触发了")
          },
          btn() {
            console.log("btn触发了")
          }
        },
      })
    </script>
  </body>

</html>
```

> 当点击按钮时，只会触发`button`本身的`click`事件,不会继续传递

`.self`:  只当事件在该元素本身（而不是子元素）触发时触发回调函数

```html
<div id="outer" @click='outer'>
  <div id="inner" @click.self='inner'>
    <button id="btn" @click='btn'>按钮 </button>
  </div>
</div>
```

> 当点击按钮时, 继续触发冒泡机制，因此`outter`盒子同样会触发对应的回调函数,但是`inner`盒子并不会触发回调函数，只有点击`inner`本身时，才会正常执行回调函数

`.capture`: 添加事件侦听器时使用事件捕获模式,即拥有该事件修饰符的元素会优先触发对应事件

```html
<div id="outer" @click.capture='outer'>
  <div id="inner" @click='inner'>
    <button id="btn" @click='btn'>按钮 </button>
  </div>
</div>
```

> 当点击按钮时, 继续触发冒泡机制，但是会优先触发`outer`的回调函数,其次，按照正常的冒泡顺序，由内向外

#### 事件本身修饰符

`.prevent`:阻止默认行为

```html
<!DOCTYPE html>
<html lang="zh-CN">

  <head>
    <meta charset="UTF-8">
    <title>VueDemo</title>
    <script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>
    <style>
      form {
        width: 210px;
        height: 300px;

        position: relative;
        margin: 0 auto;
      }

      .user {
        width: 200px;
        height: 20px;
        display: block;
        margin: 5px auto;
      }

      #btn {
        width: 70px;
        float: right;
      }
    </style>
  </head>

  <body>

    <div id='app'>

      <form action="/userinfo" method="POST" v-on:submit.prevent='onsubmit'>
        <input type="text" name="user" class="user" v-model='user.name' placeholder="请输入用户名。。。">
        <input type="password" name="user" class="user" v-model='user.pwd' placeholder="请输入密码。。。">

        <input type="submit" id="btn" value="提交">
      </form>

    </div>

    <script>
      var vm = new Vue({
        el: '#app',
        data() {
          return {
            user: {
              name: "",
              pwd: ""
            }
          }
        },
        methods: {
          onsubmit() {
            console.log(`表单信息:${this.user.name}和${this.user.pwd}提交`)
          }
        },
      })
    </script>
  </body>

</html>
```

> 表单本身的提交行为会进行页面跳转，现在使用`.prevent`修饰符之后，只执行绑定的方法，不跳转页面;类似的还有超链接等的默认行为都可以使用该修饰符阻止

`.once`: 事件只能触发一次

```html
<!DOCTYPE html>
<html lang="zh-CN">

  <head>
    <meta charset="UTF-8">
    <title>VueDemo</title>
    <script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>
  </head>

  <body>
    <div id='app'>
      <button @click.once='btn'> 你只能评论一次 </button>
    </div>
    <script>
      var vm = new Vue({
        el: '#app',
        methods: {
          btn() {
            alert("已评论")
          }
        },
      })
    </script>
  </body>

</html>
```

## 属性绑定

如果我们需要设置的模板变量是一个属性,比如a标签的`href`属性、`id`属性等，就需要使用`v-bind`动态设定

`v-bind` 中,可以写合法的JS表达式

```vue
<div id="app">
  <a v-bind:href="url" :id="msg + '123'">百度 </a>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      url: "http://www.baidu.com",
      msg:"bd"
    }
  })

</script>
```

### 绑定 HTML Class

- 使用 v-bind:class 指令来设置元素的class属性;
- 属性表达式的类型可以是字符串、对象或数组

#### 对象语法绑定Class

可以通过为元素绑定一个对象，对象的key是样式类，对象的value是true或false来动态切换class

```vue
  <style type="text/css">
      .fontGreen {
          color: green;
      }

      .fontRed {
          color: red;
      }
  </style>

  <div id="app">

      <p :class="{ 'fontRed': isactivered, 'fontGreen':isactivegreen}">这是一个段落</p>
      <input type="button" value="红色" @click="changeRed">
      <input type="button" value="绿色" @click="changeGreen">
      <input type="button" value="变色" @click="toggle">
  </div>

  <script src="./lib/vue.min.js"></script>
  <script>
      var vm = new Vue({
          el: "#app",
          data: {
              isactivegreen: true,
              isactivered: false,
          },
          methods: {
              changeRed: function () {
                  if (this.isactivegreen && !this.isactivered) {
                      this.isactivegreen = false
                      this.isactivered = true
                      console.log("被修改为红色")
                  }
              },
              changeGreen: function () {
                  if (this.isactivered && !this.isactivegreen) {
                      this.isactivered = false
                      this.isactivegreen = true
                      console.log("被修改为绿色")
                  }
              },
              toggle() {
                  if (this.isactivegreen && !this.isactivered) {
                      this.isactivegreen = false
                      this.isactivered = true
                      console.log("被修改为红色")
                  }
                  else {
                      this.isactivered = false
                      this.isactivegreen = true
                      console.log("被修改为绿色")
                  }
              }
          },
      })
  </script>
```

#### 数组语法绑定Class

可以通过为元素绑定一个数组，用来为元素设置单个或多个样式，类名在数组中用单引号

在数组中也可以套用对象

```vue
<style type="text/css">
  .fontBold {
    font-weight: bold;
  }

  .fontRed {
    color: red;
  }
</style>

<div id="app">
  <div id="container">
    <p :class="['fontBold',{ 'fontRed': activeClass }]">这是一个段落</p>
  </div>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      activeClass: true,
    }
  })
</script>
```

### 绑定内联样式

#### 对象语法绑定Style

对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。

CSS 属性名可以用驼峰式 (camelCase) 或==短横线分隔== (kebab-case，记得==用引号括起来==) 来命名

```vue
<div id="app">
  <p v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">这是一个段落！</p>
  <p v-bind:style="styleObject">这是另一个段落！</p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      activeColor: 'red',
      fontSize: 30,
      styleObject: {
        fontWeight:'bold',
        'font-style': 'italic',
        fontSize: '20px',
      }
    },
    methods: {

    },
  })
</script>
```

#### 数组语法绑定Style

数组语法可以将多个样式对象应用到同一个元素上

```vue
<div id="app">
  <p v-bind:style="[styleObj1,styleObj2]">这是一个段落！</p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      'styleObj1': {
        border: '1px solid green',
        width: '50%',
        margin:'0 auto', 
      },
      styleObj2: {
        background: 'pink',
        color: 'black',
      }
    },
  })
</script>
```

## 表单绑定

### v-model

使用`v-model`指令可以在表单 `input` 、 `textarea` 以及 `select` 元素上创建双向数据绑定，根据表单上的值，自动更新模板变量中的值

**注意**：`v-model`会忽略表单的初始值，比如: `checked` 、 `value` 、 `selected` ，如果需要的话，应该在 `javascript`中首先声明初始值

#### text

表单类型为文本输入框

```vue
<div id="app">
  <input type="text" v-model="msg">
  <p> {{msg}} </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "hello"
    },
  })
</script>
```

#### textarea

表单类型为文本域

```vue
<div id="app">
  <textarea v-model="msg" cols="30" rows="5"></textarea>
  <p> {{msg}} </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "hello"
    },
  })
</script>
```

#### checkbox

单个复选框:数据为绑定为 true 和 false 的布尔值

```vue
<div id="app">
  <input type="checkbox" v-model="checked">{{checked}}
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      checked: false,
    },
  })
</script>
```

复选框:选中的结果会绑定到同一个数组，将保存的 v-model 变量创建为数组

```vue
<div id="app">
  <input type="checkbox" name="fruit" value="banana" v-model="checked"> 香蕉
  <input type="checkbox" name="fruit" value="apple" v-model="checked"> 苹果
  <input type="checkbox" name="fruit" value="orange" v-model="checked"> 橘子
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      checked: new Array(),
    },
  })
</script>
```

#### radio

表单类型为单选框

```vue
<div id="app">
  <h3>哈哈，我的性别是:{{checked}}</h3>
  <input type="radio" name="gender" value="man" v-model="checked"> 男
  <input type="radio" name="gender" value="women" v-model="checked"> 女
  <input type="radio" name="gender" value="ladybody" v-model="checked"> 人妖
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      checked: "XX",
    },
  })
</script>
```

#### selected

表单类型为下拉框

```vue
<div id="app">
  <h3>十一你想要去旅游的城市:{{selected}}</h3>
  <select v-model="selected">
    <option disabled value="" selected="selected">省份</option>
    <option value="山西">山西</option>
    <option value="北京">北京</option>
    <option value="上海">上海</option>
  </select>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      selected: "",
    },
  })
</script>
```

设置select标签的multiple属性即可设置为多选下拉菜单，按着ctrl键可以多选

```vue
<div id="app">
  <h3>十一你想要去旅游的城市:{{selecteds}}</h3>
  <select multiple v-model="selecteds">
    <option value="山西">西安</option>
    <option value="北京">北京</option>
    <option value="上海">上海</option>
  </select>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      selecteds: new Array(),// 多重数据一般都要保存成数组
    },
  })
</script>
```

### 修饰符

#### `.lazy`

默认情况下，`v-model`在`input`和`textarea`表单中进行同步输入框的改动，添加了`.lazy`修饰符之后，对应的`v-model`绑定事件触发机制将变为change事件，只有在光标失去焦点时会触发

```vue
<div id="app">
    <div id="container">
        <h3 v-html="msg"></h3>
        <input type="text" v-model.lazy="msg">
    </div>
</div>
<script src="./lib/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            msg: "hello"
        },
    })
</script>
```

#### `.number`

如果用户希望将输入表单的内容处理为Number类型，可以使用`.number`给`v-model`进行修饰;如果表单字符串无法被处理为数字，则返回原始的值

```vue
<div id="app">
  <div id="container">
    <h3 v-html="msg"></h3>
    <input type="text" v-model.number="msg">
  </div>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "123"
    },
  })
</script>
```

#### `.trim`

使用`.trim`可以自动过滤输入框的首尾空格

```vue
<div id="app">
  <div id="container">
    <h3 v-html="msg"></h3>
    <input type="text" v-model.trim="msg">
  </div>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "123"
    },
  })
</script>
```

## 条件渲染

> 通过条件指令可以控制元素的显示及隐藏，或者说叫做创建和销毁

### v-if

`v-if` 指令用于条件性的渲染一块内容。这块内容只会在指令的表达式返回 `truthy` 值的时候渲染

```vue
<div id="app">
  <input type="radio" name="gender" value="男" v-model="msg">男
  <input type="radio" name="gender" value="女" v-model="msg">女
  <input type="radio" name="gender" value="人妖" v-model="msg">人妖
  <input type="radio" name="gender" value="保密" v-model="msg">保密

  <h2 v-if="msg == '女'">你是一个Girl</h2>
  <h2 v-else-if="msg == '男'">你是一个Boy</h2>
  <h2 v-else-if="msg == '人妖'">你是一个LadyBoy</h2>
  <h2 v-else>你是一个神秘的人</h2>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "保密",
    },
  })
</script>
```

> 在 JavaScript 中，truthy（真值）指的是在布尔值上下文中，转换后的值为真的值。

> 所有值都是真值，除非它们被定义为 假值（即：除 false、0、""、null、undefined 和 NaN 以外皆为真值）

### v-show

与`v-if`不同的是: `v-show` 的元素始终会被渲染并保留在 `DOM` 中

`v-show` 只是简单地切换元素的 CSS 属性 `display`

```vue
<div id="app">
  <input type="button" value="点击" @click="btn">
  <h2 v-show="a">嗨，我在</h2>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      a: true,
    },
    methods: {
      btn() {
        this.a = !this.a
      }
    },
  })
</script>
```

## 列表渲染

### 迭代数字

`v-for` 进行一段取值

```vue
<div id="app">
  <p v-for="i in 8">
    {{i}}
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
    },
  })
</script>
```

### 迭代对象

使用 `v-for` 迭代访问一个对象

```vue
<div id="app">
  <p v-for="value in user">
    {{value}}
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      user: {
        name: "张三",
        age: 18
      }
    },
  })
</script>
```

### 迭代索引

`v-for` 支持最多三个参数，同时获取遍历对象的`key`和`value`值，以及`index`索引位置

> 要注意的是，此时的`key`和`value`和python中的顺序是颠倒的，`key`在后，`value`在前

```vue
<div id="app">
  <p v-for="(value, key, i) in user">
    {{i}}--{{key}}--{{value}}
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      user: {
        name: "张三",
        age: 18
      }
    },
  })
</script>
```

### 迭代嵌套数据

用 `v-for`指令根据一组数组的选项列表进行渲染

`v-for` 指令需要使用`item in items`形式的特殊语法， `items` 是源数据数组并且 `item` 是数组元素迭代的别名

```vue
<div id="app">
  <p v-for="user in users">
    <span>{{ user.name }}---{{user.age}}</span>
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      users: [{ name: "张三", age: 18 }, { name: "李四", age: 20 }, { name: "王五", age: 19 },
             ]
    },
  })
</script>
```

`v-for`还可以支持将当前循环索引作为渲染时的第二个参数

```vue
<div id="app">
  <p v-for="(user,i) in users">
    <span>{{i}}---{{ user.name }}---{{user.age}}</span>
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      users: [{ name: "张三", age: 18 }, { name: "李四", age: 20 }, { name: "王五", age: 19 },
             ]
    },
  })
</script>
```

`v-for` 中`v-bind:key`

```vue
<div id="app">
  <p v-for="(user,i) in users" :key="user.name">
    <span>{{i}}---{{ user.name }}---{{user.age}}</span>
  </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      users: [{ name: "张三", age: 18 }, { name: "李四", age: 20 }, { name: "王五", age: 19 },
             ]
    },
  })
</script>
```

> 当我们在使用v-for进行渲染时，尽可能使用渲染元素自身属性的id给渲染的元素绑定一个key值，这样在当前渲染元素的DOM结构发生变化时，能够单独响应该元素而不触发所有元素的渲染。

## 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本，对它们进行格式化

过滤器可以用在两个地方:双花括号插值和 `v-bind` 表达式 (后者从 2.1.0+ 开始支持)

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

过滤器本质上是一个函数

> vue.js中过滤器的使用方式

```vue
<p>
  {{ message | filter }}
</p>
<p v-bind:type="message | filter"> </p>
```

> 在一个组件的选项中定义本地的过滤器,实现将表单输入的内容中所有的字母变大写的过滤器

```vue
<div id="app">
  <input type="text" v-model.lazy="msg">
  <p>{{msg | toUpper}}</p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "",
    },
    filters: {
      toUpper(value) {
        if (!value)
          return '' // 字符串内容为空 直接返回 
        console.log("正在变大小")
        return String(value).toUpperCase()
      }
    }
  })
</script>
```

> 在创建 Vue 实例之前全局定义过滤器, 当全局过滤器和局部过滤器重名时，会采用局部过滤器

```vue
<div id="app">
  <input type="text" v-model.lazy="msg">
  <p> {{msg|capitalize}} </p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  })

  var vm = new Vue({
    el: "#app",
    data: {
      msg: "",
    },
  })
</script>
```

> 过滤器函数也可以有多个参数

```vue
<div id="app">
  <input type="text" v-model.lazy="msg">
  <p>展示: {{ msg | toLong("| "," |") }}</p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      msg: "",
    },
    filters: {
      toLong(value, arg1, arg2) {
        if (!value) return ''
        return arg1 + value + arg2
      }

    }
  })
</script>
```

> 多个过滤器可以串联

```vue
<div id="app">
  <input type="text" v-model.lazy="msg">
  <p>展示: {{ msg |capitalize| toLong("| "," |") }}</p>
</div>
<script src="./lib/vue.min.js"></script>
<script>
  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  })

  var vm = new Vue({
    el: "#app",
    data: {
      msg: "",
    },
    filters: {
      toLong(value, arg1, arg2) {
        if (!value) return ''
        return arg1 + value + arg2
      }

    }
  })
</script>
```

## 监听属性

监听属性的作用是监听某些属性的变化，从而做相应的操作，进行对数据变化的相应， 监听属性是一个对象(字典)，key值是要监听的元素，值是当监听的元素发生改变时要执行的函数

监听函数有两个参数，一个是当前值，另一个是变化后的值

监听函数有一个参数，是变化后的值

```vue
<div id="app">
  <h3>您的年龄是{{age}}</h3>
  <input type="text" v-model.lazy.number="age">
</div>
<script src="./lib/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      age: 0,
    },
    watch: {
      age: function (val) {
        if (this.age > 100 || this.age < 0) {
          alert("数据不合法")
        }
      },
      // age: function (newval, oldval) {
      //     console.log("%d被修改为%d", oldval, newval)
      // }
    },
  })
</script>
```

## 计算属性

### computed

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的在模板中放入太多的逻辑会让模板过重且难以维护

也就是说，某些时候页面中的模板变量如果需要复杂的运算处理，应该使用计算属性，而不是直接在模板位置进行计算

```html
<div id="app">
    <div id="container">
        <input type="text" v-model="msg">

        <h3>模板计算: {{msg.split("").reverse().join("")}} </h3>

        <input type="button" value="方法计算" @click="btn1">
        <h3>方法计算: {{ mmsg }}</h3>

        <input type="button" value="计算属性" @click="btn2">
        <h3>计算属性: {{ cmsg }}</h3>
    </div>
</div>
<script src="./lib/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            msg: "这是一个测试字符串！",
            mmsg: "",
            cmsg: "",
        },
        methods: {
            MReverseStr() {
                console.log("方法被执行")
                return this.msg.split("").reverse().join("")
            },
            btn1() {
                this.mmsg = this.MReverseStr()
        // 普通methods函数调用需加括号
            },
            btn2() {
                this.cmsg = this.CReverseStr
        // 计算属性直接写入函数名
            },
        },
        computed: {
            CReverseStr() {
                console.log("计算属性被执行")
                return this.msg.split("").reverse().join("")
            }
        },
    })
</script>
```

> 注意:虽然计算属性和函数都可以达成同样的目的，但是==computed会缓存结果==，计算属性如果发现依赖的属性msg未发生改变，再次访问计算属性不会重复运算函数，而是直接利用已有结果;如果依赖数据发生改动，计算属性函数才会重新运算。

### 计算属性SetAttr

默认的计算属性只有获取getattr的方式，我们可以手动为他添加一个setter

需要由计算结果得到前置属性时，可以利用setAttr实现

```html
<div id="app">
    <div id="container">
        姓氏: <input type="text" v-model="firstName">
        名字: <input type="text" v-model="lastName">
        全称是: <input type="text" v-model="fullName">
    </div>
</div>
<script src="./lib/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            firstName: "尼古拉",
            lastName: "凯丁奇"
        },
        methods: {
        },
        computed: {
            fullName: {
                // getter
                get: function () {
                    return this.firstName + '-' + this.lastName
                },
                // setter
                set: function (newValue) {
                    var names = newValue.split('-')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            }
        }
    })
</script>
```

## 组件注册

### 全局注册

```vue
Vue.component('my-component', {/* ... */})
```

此时组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中

### 局部注册

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件

```js
new Vue({
  components: {
    'my-component':{/* ... */}
  }
})
```

### 实例演示

添加一个全局组件:

```js
Vue.component('button_show', {
  data: function () {
    return {
      count: 0
    }
  }, // 当前组件会需要的数据，定义为函数的返回值
  template: '<button @click="count++">按钮:{{ count }}</button>' // 组件的标签模板
})
```

接下来可以在任何Vue接管的元素中使用该组件，

```vue
<div id="container">
  <button_show></button_show>
</div>

<script>
  var vm = new Vue({
    el: "#container",
  })

</script>
```

组件就是vue的实例，所有vue实例中属性和方法，组件中也可以用;

其中`data`属性必须是一个函数，因为组件会重复使用在多个地方，为了使用在多个地方的组件数据相对独立， `data`属性需要用一个函数的返回值来将数据处理为不同的每个个体

## vue生命周期

### Vue实例

#### 构造器(实例化)

```javascript
　var vm = new Vue({

　　　//选项

　　　|-------DOM（3）

　　　|  　　　　|-------el (提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。)

　　　|  　　　　|-------template (一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发 slot。)

　　　|  　　　　|-------render (字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。)

　　　|-------数据（6）

　　　|  　　　　|-------data    (Vue实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化)

　　　|  　　　　|-------props　(可以是数组或对象，用于接收来自父组件的数据。)

　　　|  　　　　|-------propsData (创建实例时传递 props。主要作用是方便测试。)

　　　|  　　　　|-------computed (计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例)

　　　|  　　　　|-------methods (methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。)

　　　|  　　　　|-------watch (一个对象，键是需要观察的表达式，值是对应回调函数。)

　　　|-------生命周期钩子（10）

　　　|  　　　　|-------beforeCreate(在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。)

　　　|  　　　　|-------create(实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见)

　　　|  　　　　|-------beforeMount(在挂载开始之前被调用：相关的 render 函数首次被调用。)

　　　|  　　　　|-------mounted(el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。)

　　　|  　　　　|-------beforeUpdate(数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。)

　　　|  　　　　|-------updated(由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。)

　　　|  　　　　|-------activated(keep-alive 组件激活时调用。)

　　　|  　　　　|-------deactivated(keep-alive 组件停用时调用。)

　　　|  　　　　|-------beforeDestroy(实例销毁之前调用。在这一步，实例仍然完全可用。)

　　　|  　　　　|-------destroyed(Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。)

　　　|-------资源（3）

　　　|  　　　　|-------directives(包含 Vue 实例可用指令的哈希表。)

　　　|  　　　　|-------filters(包含 Vue 实例可用过滤器的哈希表。)

　　　|  　　　　|-------components(包含 Vue 实例可用组件的哈希表。)

　　　|-------杂项（6）

　　　|  　　　　|-------parent(指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。)

　　　|  　　　　|-------mixins(mixins 选项接受一个混合对象的数组。Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用。)

　　　|  　　　　|-------name(允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。)

　　　|  　　　　|-------extends（允许声明扩展另一个组件。这主要是为了便于扩展单文件组件。这和 mixins 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级。）

　　　|  　　　　|-------delimiters（改变纯文本插入分隔符。）

　　　|  　　　　|-------functional（使组件无状态（没有 data ）和无实例（没有 this 上下文）。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。）

　})
```

扩展Vue构造器：可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：

```javascript
　var MyComponent = Vue.extend({

　})
```

#### 属性与方法

实例属性(10)

- `vm.$data`（Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。）
- `vm.$el`（Vue 实例使用的根 DOM 元素。）
- `vm.$options`（用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处）
- `vm.$parent`（父实例，如果当前实例有的话。）
- `vm.$root`（当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已。）
- `vm.$children`（当前实例的直接子组件。）
- `vm.$slots`（用来访问被 slot 分发的内容。每个具名 slot 有其相应的属性（例如：slot="foo" 中的内容将会在 vm.$slots.foo中被找到）。default 属性包括了所有没有被包含在具名 slot 中的节点。）
- `vm.$scopedSlots`（用来访问 scoped slots.）
- `vm.$refs`（一个对象，其中包含了所有拥有 ref 注册的子组件。）
- `vm.$isServer`（当前 Vue 实例是否运行于服务器。）

实例方法/数据（3）

- `vm.$watch`（观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。）
- `vm.$set`（这是全局 Vue.set 的别名。）
- `vm.$delete`（这是全局 Vue.delete 的别名。）

实例方法/事件（4）

- `vm.$on`（监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。）
- `vm.$once`（监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。）
- `vm.$off`（移除事件监听器。）
- `vm.$emit`（触发当前实例上的事件。附加参数都会传给监听器回调。）

实例方法/生命周期（4）

- `vm.$mount`（如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount()手动地挂载一个未挂载的实例。）
- `vm.$forceUpdate`（迫使Vue实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。）
- `vm.$nextTick`（将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。）
- `vm.$destroy`（完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。）

#### 全局API

- `Vue.extend`　------使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
- `Vue.nextTick` ------在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
- `Vue.set`          ------设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
- `Vue.delete`     ------删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。
- `Vue.directive`  ------注册或获取全局指令。
- `Vue.filter`        ------注册或获取全局过滤器。
- `Vue.component`----注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
- `Vue.use`         ------安装 Vue.js 插件。
- `Vue.mixin`　　------全局注册一个混合，影响注册之后所有创建的每个 Vue 实例。
- `Vue.compile`  ------在render函数中编译模板字符串。只在独立构建时有效

#### 全局配置 `Vue.config`

- `Vue.config.silent = true`   　　　　　　　　　　   ------取消 Vue 所有的日志与警告。
- `Vue.config.optionMergeStrategies.methods`　　  ------自定义合并策略的选项。
- `Vue.config.devtools= true`   　　　　　　　　　　------配置是否允许vue-devtools检查代码。
- `Vue.config.errorHandler= functiono(err, vm){}`  ------指定组件的渲染和观察期间未捕获错误的处理函数。
- `Vue.config.ignoredElements = ['my-custom-web-component', 'another-web-component']`　　　------忽略在Vue 之外的自定义元素。
- `Vue.config.keyCodes`   　　　　　　　　　　　　　------给v-on自定义键位别名

### 生命周期

Vue实例有一个完整的生命周期，从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

​![vue生命周期](assets/net-img-1064935-20170103204551597-1413099760-20231230105616-dxargtp.png)​

#### 钩子函数

1. beforeCreate

   在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
2. created

   实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
3. beforeMount

   在挂载开始之前被调用：相关的 render 函数首次被调用。
4. mounted

   el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
5. beforeUpdate

   数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
6. updated

   由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。

   该钩子在服务器端渲染期间不被调用。
7. beforeDestroy

   实例销毁之前调用。在这一步，实例仍然完全可用。
8. destroyed

   Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

#### 实例演示

那么下面我们来进行测试一下

```html
<div id="container">
    <p v-html="message"></p>
    <input type="text" v-model.lazy="message">
</div>
<script src="./lib/vue.min.js"></script>
<script type="text/javascript">
    function showData(process, vm) {
        console.log(process)
        console.log("vue数据:", vm.message) // 当前Vue中的数据 
        console.log("Vue挂载el:") // Vue接管的元素 
        console.log(vm.$el)
        console.log("真实Dom:")
        console.log(document.getElementById("container"))
        console.log('-----------------')
    } // 这个函数用来输出相关信息的 
    var vm = new Vue({
        el: "#container",
        data: {
            message: "aaaaa",
        },
        beforeCreate: function () {
            showData("创建Vue实例前", this)
        },
        created: function () {
            showData("创建Vue实例后", this)
        },
        beforeMount: function () {

            showData("挂载到Dom前", this)
        },
        mounted: function () {
            showData("挂载到Dom后", this)
        },
        beforeUpdate: function () {
            showData("数据发生变化时", this)
        },
        updated: function () {
            showData("数据发生变化后", this)
        },
        beforeDestroy: function () {
            showData("Vue实例销毁前", this)
        },
        destroyed: function () {
            showData("Vue实例销毁后", this)
        }
    })

</script>
```

代码如上，浏览器开始加载文件

1. beforeCreate 此时$el、data 的值都为undefined
2. create之后，此时可以拿到data的值，但是$el依旧为undefined
3. mount之前，$el的值为“虚拟”的元素节点
4. mount之后，mounted之前，“虚拟”的dom节点被真实的dom节点替换，并将其插入到dom树中，于是在触发mounted时，可以获取到$el为真实的dom元素()

接着，在表单中修改data，更新视图

触发`beforeUpdata` 和`updated`

接着，执行`myVue.$destroy()`

总结一下，对官方文档的那张图简化一下，就得到了这张图

​![](assets/net-img-1064935-20170103211421987-2119701214-20231230105530-obq67os.png)​

‍
