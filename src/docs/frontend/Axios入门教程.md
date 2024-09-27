---
created: 2023-08-03T13:05:52.000Z
article: false
order: 3
tags:
  - Vue
  - Axios
title: Axios入门教程
updated: 2024-09-27T07:27:07.000Z
---
# vue集成axios

在 vue项目中使用axios分为局部使用和全局使用

## 在vue中局部使用

```js
import axios from 'axios'

axios.get('/api/goods/add_info/?ID=12345&firstName=Fred&lastName=Flintstone')
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

## 在vue中全部使用

axios 是一个基于 promise 的 HTTP 库，所以是不能使用vue.use()方法的。  
那么难道我们要在每个文件都要来引用一次axios吗？多繁琐！！！  
☞解决方法有很多种：

### 结合 vue-axios使用

看了vue-axios的源码，它是按照vue插件的方式去写的。那么结合vue-axios，就可以去使用vue.use方法了

首先在主入口文件main.js中引用：

```js
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
```

之后就可以使用了，在组件文件中的methods里去使用了：

```js
function getNewsList(){
    this.axios.get('api/getNewsList').then((response)=>{
        this.newsList=response.data.data;
    }).catch((response)=>{
        console.log(response);
    })
}
```

### axios 改写为 Vue 的原型属性（不推荐这样用）

首先在主入口文件main.js中引用，之后挂在vue的原型链上：

```js
import axios from 'axios'
Vue.prototype.$axios= axios
```

在组件中使用

```js
this.$ajax.get('api/getNewsList')
.then((response)=>{
    this.newsList=response.data.data;
}).catch((response)=>{
    console.log(response);
})
```

### 结合Vuex的action

在vuex的仓库文件store.js中引用，使用action添加方法

```js
import Vue from 'Vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
// 定义状态
state: {
    user: {
    name: 'xiaoming'
    }
},
actions: {
    // 封装一个 ajax 方法
    login (context) {
    axios({
        method: 'post',
        url: '/user',
        data: context.state.user
    })
    }
}
})

export default store
```

在组件中发送请求的时候，需要使用 this.$store.dispatch

```js
this.$store.dispatch('login')
```

# API说明

以下对axios的使用方式做一个简单说明，详细细节可以参数 axios中文文档。

## axios配置参数创建请求

> axios中配置全局参数

```js
axios(config)
```

```js
// 发送 POST 请求
axios({
    method: 'post',
    url: '/user/12345',
    data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
    }
});
```

> axios中指定url和参数配置

```text
axios(url[, config])
```

```js
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

```js
// 发送 POST 请求
axios('/user/12345', {
    method: 'post',
    data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
    }
});
```

## 请求方法的别名

> 为方便起见，为所有支持的请求方法提供了别名

```text
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

> NOTE:在使用别名方法时， url、method、data 这些属性都不必在配置中指定。

> axios请求方法

```js
// 发送 POST 请求
axios.post('/user/12345',{
    firstName: 'Fred',
    lastName: 'Flintstone'
});
```

## 并发

> 处理并发请求的助手函数

```js
axios.all(iterable)
axios.spread(callback)
```

> 执行多个并发请求

```js
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
.then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
}));
```

# 提交数据

在处理http请求方面，经常需要前端向后端提交参数，本文以vue中axios处理http发送请求的的两种方式（Post和Get）为例，简单说明一下不同请求方式下参数的提交方式。

## GET 请求传递参数

### 直接在 URL 上添加参数

```javascript
import axios from 'axios'

axios.get('/api/goods/add_info/?ID=12345&firstName=Fred&lastName=Flintstone')
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

### 通过 params 设置参数

```javascript
import axios from 'axios'

axios.get('/api/goods/add_info/', {
    params: {
        ID: 12345,
        firstName: 'Fred',
        lastName: 'Flintstone',
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

## POST 请求传递参数

### Content-Type: application/json

```javascript
import axios from 'axios'

let data = {"code":"1234","name":"yyyy"};
axios.post(`/test/testRequest`,data)
.then(res=>{
    console.log('res=>',res);
})
```

### Content-Type: multipart/form-data

```javascript
import axios from 'axios'
let data = new FormData();
data.append('code','1234');
data.append('name','yyyy');
axios.post(`/test/testRequest`,data)
.then(res=>{
    console.log('res=>',res);
})
```

### Content-Type: application/x-www-form-urlencoded

```javascript
import axios from 'axios'
import qs from 'Qs'
let data = {"code":"1234","name":"yyyy"};
axios.post(`/test/testRequest`,qs.stringify({
    data
}))
.then(res=>{
    console.log('res=>',res);
})
```

**总结**

上面三种方式会对应后台的请求方式，这个也要注意，比如: django POST参数获取

# 跨域请求

在前后端开发过程中一直会伴随我们的问题就是跨域问题，因为这时候前端和后端的代码是在不同机器上运行的，两个地址不在一个域名下，这个时候前端脚本在进行axios访问的时候浏览器就会报跨域相关的错误。

原因：浏览器的同源策略不允许跨域访问，所谓同源策略是指协议、域名、端口相同。

## 前端跨域

> 思路： 设置代理服务器,实现跨域请求转发
>
> 方案：采用proxyTable解决。

### proxyTable是什么？

vue-cli提供的解决vue开发环境下跨域问题的方法，proxyTable的底层使用了[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware),它是http代理中间件，它依赖node.js，基本原理是用服务端代理解决浏览器跨域

实现的过程就是在我们前端的本地起一个服务，然后我们前端的所有ajax访问首选访问我们本地的服务，本地的服务不会对来的请求做加工处理，只是将请求转发到我们真实的后台服务上去。我们本地的服务其实你就是一个中转站。这种解决方案就是利用**后端之间访问是不存在跨域的问题**。

### 具体流程

#### 自定义跨域代理

首先在`config/index.js`​里面找到`proxyTable:{}`​,然后在里面加入

```js
proxyTable:{
    "/api": {
        target: 'https://www.runoob.com',
            changeOrigin: true,
            pathRewrite:{
            '^/api':''
        }
    }
}
```

> 注意:

* ​`/api`​: 是自定义的，写成什么都可以。
* ​`target`​: 设置要调用的接口域名和端口号。
* ​`^/api`​: 代替`target`​里面的地址，后面组件中我们调接口时直接用`/api`​代替

#### 在组件中实现跨域请求

比如要访问`'https://www.runoob.com/ajax/json_demo.json'`​，直接写`/api/ajax/json_demo.json`​即可。

```javascript
import axios from 'axios'

axios.get('/api/ajax/json_demo.json')
    .then(resp=>{
        console.log(resp.data)
    })
    .cath(err=>{
        console.log(err)
    })
```

#### 自定义axios请求基础路径

然而我们可以在`src/main.js`​设置一个基础路径，这样你调用接口的时候可以不写`api`​,直接写`/ajax/json_demo.json`​即可。

在`src/main.js`​设置`axios.defaults.baseURL="/api"`​;

```javascript
import axios from 'axios'
axios.defaults.baseURL="/api";
```

在组件中直接调用接口即可。

```javascript
import axios from 'axios'

axios.get('/ajax/json_demo.json')
    .then(resp=>{
        console.log(resp.data)
    })
    .cath(err=>{
        console.log(err)
    })
```

## 后端跨域

但是今天我们这里不讲这种方式，有兴趣的可以在我的另一篇博客看到
