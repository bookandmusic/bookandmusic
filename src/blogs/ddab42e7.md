---
title: Vite 和 Vue Cli 对比
category: 前端
date: 2024-01-29 07:41:51
updated: 2024-07-09 08:28:17
---
Vite 和 Vue Cli 可以是师出同门，都属于 Vue 整个团队的产物，他们的功能也非常相似，都是一个提供基本项目脚手架和开发服务器的构建工具。那么在这里就有几个问题需要讨论：

* Vite 和 Vue Cli 的主要区别。
* Vite 和 Vue Cli 哪个性能更好。
* 实际项目中如何选择。

## Vite 和 Vue Cli 的主要区别

Vite 在开发环境下基于浏览器原生 ES6 Modules 提供功能支持，在生产环境下基于 RollUp 打包，Vue Cli 不区分环境，都是基于 Webpack。可以说在生产环境下，两者都是基于源码文件，RollUp 和 Webpack 都是将代码进行处理，并提供出浏览器页面所需要的 HTML，JavaScript，CSS，图片等静态文件。但是对于开发环境的处理，两者却有不同：

* Vue Cli 在开发环境下也是基于对源码文件的转换，即利用 Webpack 对代码打包，结合 webpack-dev-server 提供静态资源服务。
* Vite 在开发环境下基于浏览器原生 ES6 Modules，无需对代码进行打包直接让浏览器使用。

Vite 正是因为利用浏览器原生功能，而省略掉耗时的打包流程，才使得开发环境下体验非常快。而对于生产环境，他们各自所依赖的 Webpack 和 RollUp 这两个工具其实也各有优劣：

* Webpack 有着生态更加丰富的 loader，可以处理各种各样的资源依赖，以及代码拆分 (Code Splitting) 和按需合并。RollUp 的插件生态较 Webpack 弱一些，但是也可以满足基本的日常开发需要，且不能支持 Code Splitting 和热更新 HMR。
* RollUp 对 ES6 Modules 的代码依赖方式天然支持，而对于类似 CommonJS 或者 UMD 方式的依赖却无法可靠的处理，Webpack 借助于自己的__webpack_require__函数和 Babel，对于各种类型代码都支持的比较好。
* RollUp 会静态分析代码中的 import，并将排除任何未实际使用的代码即 Tree Shaking 支持很好，Webpack 则从 Webpack 2 版本开始支持 Tree Shaking，且要求使用原生的 import 和 export 语法并且不能被 Babel 转换过的代码。
* RollUp 编译的代码可读性更好（虽然基本不会去阅读这些代码），没有过多的冗余代码，而 Webpack 则会插入很多__webpack_require__函数影响代码的可读性。

由于 Webpack 的支持性比较多，处理的场景更为广泛，而 RollUp 对源码的处理更加简洁，所以业界一般认为对于项目业务使用 Webpack，对于类库使用 RollUp，而之所以 Vite 使用 RollUp，可能原因是整体上对浏览器 ES6 Modules 的使用，为了更加统一，并且摆脱 Vue Cli 那样对 Webpack 过于依赖吧。

## Vite 和 Vue Cli 哪个性能更好

这个不用多说，必然是 Vite 的更快，在开发环境下体验更好。

Vue Cli 的 Webpack 的工作方式是，它通过解析应用程序中的每一个 JavaScript 模块里面 import 或者 require，借助各种 loader 将整个应用程序构建成一个基于 JavaScript 的捆绑包，并转换文件（例如 Sass、.vue 等）。这都是在 webpack-dev-server 服务器端提前完成的，文件越多，依赖越复杂，则消耗时间更多。

Vite 不捆绑应用服务器端。相反，它依赖于浏览器对 ES6 Modules 的原生支持，浏览器直接通过 HTTP 请求 JavaScript 模块，并且在运行时处理，而对于例如 Sass、.vue 文件等则单独采用插件处理，并提供静态服务。这样耗时的大头 JavaScript 模块处理就被单独剥离了出来，利用浏览器高效处理，并且对于文件的多少，影响并不大，这样消耗的时间就更少。我们可以沿用之前章节中的图来总结这种模式区别，如图所示。

​![net-img-2e1386bc85cf49139aa26cb8c5a12960tplv-k3u1fbpfcp-zoom-in-crop-mark1512000-20240129154206-qchhsaw](https://jsd.vxo.im/gh/bookandmusic/static/image/2024-11/d1bc49af4da19ca373d4d4f7c1bd5ff1.webp)​

所以总结下来，在开发模式下，Vite 显然要比 Vue Cli 性能强，生产模式下相差不大。

## 实际项目中如何选择

关于实际项目中如何选择 Vite 和 Vue Cli，我们先来总结一下他们各自的优缺点，如下表格所示。

Vue Cli:

|Vue Cli 优点|Vue Cli 缺点|
| -------------------------------------------------------| -----------------------------------------------|
|生态好，应用实际项目多<br />|开发环境慢，体验差|
|||
|可以和 Vue2.x，Vue3.x 结合|只支持 Vue|
|||
|直接解析各种类型代码依赖|产物冗余代码多|
|构建配置项丰富，插件全||

Vite:

|Vite 优点|Vite 缺点|
| ---------------------------------------------------| ---------------------------------------------------------|
|开发环境速度快，体验好|只针对 ES6 浏览器|
|||
|支持 Vue，React 等|脚手架不包括 Vuex，Router 等|
|||
|产物简洁清晰||

Vite 在开发环境下体验强，速度快是其核心优势，但是与 Vue Cli/Webpack 不同，Vite 无法创建针对旧版浏览器，这对于一些用户来说是一个抉择点。另外，Vue Cli 作为老牌构建工具，使用者众多，更加经得住历史的考验，并且得益于使用者众多，所以在生态环境和插件数量方面更好。

Vite 是一个新兴的产物，Vue 团队更想把 Vite 做成一个通用的构建工具而不只限制于 Vue，所以后面也会主推 Vite，所以回到问题上来，Vue Cli 和 Vite 到底怎么选笔者认为还是要根据自己实际的业务场景来，这里总结几条原则：

* 当前已正在运行的 Vue Cli 项目，不建议切换 Vite，维稳！
* 企业大型项目，构建功能复杂需求多，建议 Vue Cli，稳定坑少！
* 小型项目，快应用，Vue3 项目，建议 Vite，体验好！

以上原则仅供参考。

## 备注

> 原文地址 [https://juejin.cn/post/7018754950498877471](https://juejin.cn/post/7018754950498877471)
