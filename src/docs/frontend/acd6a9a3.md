---
title: Axios(一):axios在vue中的使用教程
category: 前端
tag: [axios,vue]
abbrlink: 9ad6c9ea
date: 2020-03-03 07:25:10
article: false
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
