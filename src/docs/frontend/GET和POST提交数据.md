---
title: Axios(三):GET和POST提交数据
category: 前端
tag: [axios,vue]
abbrlink: 1e3d7e67
date: 2020-03-03 17:05:24
article: false
---

# GET和POST提交数据

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
