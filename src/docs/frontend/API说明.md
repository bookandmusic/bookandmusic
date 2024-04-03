---
title: Axios(二):API说明
category: 前端
tag: [axios,vue]
abbrlink: 9030a39c
date: 2020-03-03 13:30:05
article: false
---

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
