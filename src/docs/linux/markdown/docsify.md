---
title: docsify
date: 2023-07-29T08:41:34Z
lastmod: 2023-07-29T08:52:44Z
order: 4
article: false
---

# docsify

　　官网： [https://docsify.js.org/#/](https://docsify.js.org/#/)  
代码块：[https://github.com/docsifyjs/docsify](https://github.com/docsifyjs/docsify)

　　依赖 node.js 环境。

　　特点：  
1、扩展性非常好，有社区支持。支持插件。  
2、目录需要手动配置。  
3、发布无需编译生成 html，动态解析 md 文件。

### 安装

　　全局安装：

```
npm i docsify-cli -g
```

### 如何使用

　　创建并初始化项目：

```
$ mkdir test-docsify
$ cd test-docsify


$ docsify init ./docs
```

　　执行完毕，生成 `docs`​ 目录。里面有 3 个文件：

* ​`.nojekyll`​：让 gitHub 不忽略掉以 `_`​ 打头的文件
* index.html：整个网站的核心文件
* README.md：默认页面

　　接下来预览一下效果：

```
$ docsify serve docs
```

　　会在本地运行 server 服务，我们打开浏览器，输入：[http://localhost:3000](http://localhost:3000/) 即可看到 demo 页面。

　　项目的目录结构示例：

```
.
└── docs
    ├── README.md
    ├── guide.md
    └── zh-cn
        ├── README.md
        └── guide.md
```

　　实际路由对应关系是：

```
docs/README.md        => http://domain.com
docs/guide.md         => http://domain.com/guide
docs/zh-cn/README.md  => http://domain.com/zh-cn/
docs/zh-cn/guide.md   => http://domain.com/zh-cn/guide
```

### 增加一个页面

　　我们新增 guide.md 文件作为示例：

```
## docsify

官网： https://docsify.js.org/#/  
代码块：https://github.com/docsifyjs/docsify  

> 依赖 node.js 环境。

### 安装

全局安装：

npm i docsify-cli -g


### 如何使用

创建并初始化项目：

```

　　我们启动 server 预览效果：

```
$ docsify serve docs
```

　　浏览：[http://localhost:3000/#/guide](http://localhost:3000/#/guide)

　　server 启动后，我们修改文件保存后，浏览器会实时刷新。

　　我们可以给文档增加左侧菜单。菜单文件名是`_sidebar.md`​。格式要求示例：

```
* [Home](/)
* [Guide](guide.md)
* [About](about.md "关于我，这是title tag")
```

　　括号里可以增加 title tag，通常用于 SEO。

　　保存后需要修改 index.html 添加`loadSidebar: true`​以启用左侧菜单：

```
window.$docsify = {
  loadSidebar: true,
  subMaxLevel: 3,
  name: '',
  repo: '',
  auto2top: true,
  search: 'auto'
}
```

　　其中：

* ​`loadSidebar`​：是否显示左侧菜单
* ​`subMaxLevel`​：配置菜单层级，默认仅显示一级
* ​`name`​：配置项目名
* ​`repo`​：配置代码库地址
* ​`auto2top`​：更改路由时自动滚动到屏幕顶部
* ​`search`​：配置启用搜索功能。需要加载对应 js 文件。后面有说明。

　　也可以增加分组菜单，必须用 tag 键留空格，否则层级是相同的。示例：

```
* [首页](/)
* 开始学习
    * [loppo](loppo.md "非常简单的静态站点生成器")
    * [idoc](idoc.md)
    * [gitbook](gitbook.md)
    * [docsify](docsify.md)
* 参考
```

### 配置高亮

　　docsify 使用 [`Prism`](https://github.com/PrismJS/prism)​ 突出显示页面中的代码块。默认情况下，它仅支持 CSS，JavaScript 和 HTML。你可以使用 Prism 加载其他语言：

```
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
<script src="//unpkg.com/prismjs/components/prism-bash.min.js"></script>
<script src="//unpkg.com/prismjs/components/prism-php.min.js"></script>
<script src="//unpkg.com/prismjs/components/prism-java.min.js"></script>
<script src="//unpkg.com/prismjs/components/prism-go.min.js"></script>
<script src="//unpkg.com/prismjs/components/prism-c.js"></script>
<script src="//unpkg.com/prismjs/components/prism-asm6502.js"></script>
<script src="//unpkg.com/prismjs/components/prism-makefile.js"></script>
```

　　从这个库里获取更多选项支持：[https://github.com/PrismJS/prism/tree/gh-pages/components。](https://github.com/PrismJS/prism/tree/gh-pages/components%E3%80%82)

### 搜索

　　修改 index.html ，头部引入：

```
<script src="//unpkg.com/docsify/lib/plugins/search.js"></script>
```

　　然后配置里开启搜索：

```
search: 'auto'
```

### copy-code

　　如果需要支持代码后面显示复制按钮，可以引入该插件：

```
<script src="//unpkg.com/docsify-copy-code"></script>
```

　　无需额外配置。

### 自定义导航栏

　　参考：[https://docsify.js.org/#/custom-navbar](https://docsify.js.org/#/custom-navbar)

### 主题修改

　　仅需替换 index.html 里的`vue`​：

```
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
```

　　可用的主题：

```
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/buble.css">
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/dark.css">
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/pure.css">
```

　　其它主题： [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/) ：A delightfully simple theme system for docsify.

　　参考：[https://docsify.js.org/#/themes](https://docsify.js.org/#/themes)

### 配置参考

　　参考：[https://docsify.js.org/#/configuration](https://docsify.js.org/#/configuration)

### 插件参考

　　参考：[https://docsify.js.org/#/plugins](https://docsify.js.org/#/plugins)

### 发布到 GitHub Pages

　　参考：[https://docsify.js.org/#/deploy](https://docsify.js.org/#/deploy)

### 配置文件

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <title>Bookandmusic</title>
    <link rel="icon" href="/siteinfo/favicon.ico" sizes="32x32">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="description" content="Description">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
    <!-- 目录样式 -->
    <link rel="stylesheet" href="https://unpkg.com/docsify-plugin-toc@1.3.1/dist/light.css">
</head>

<body>
    <div id="app"></div>
    <script>
        window.$docsify = {
            name: 'bookandmusic', //文档标题，会显示在侧边栏顶部
            nameLink: "/",
            // coverpage: '_coverpage.md', // 封面
            coverpage: false,
            loadSidebar: '_sidebar.md', //侧边栏
            loadNavbar: '_navbar.md', // 导航配置
            notFoundPage: '_404.md', //加载自定义404页面
            alias: {
                '/.*/_sidebar.md': '/_sidebar.md',
                '/.*/_navbar.md': '/_navbar.md', // See #301
            },
            autoHeader: true, //同时设置 loadSidebar 和 autoHeader 后，可以根据 _sidebar.md 的内容自动为每个页面增加标题
            // subMaxLevel: 0, // 目录

            auto2top: true, //切换页面后是否自动跳转到页面顶部
            logo: '', //侧边栏中出现的网站图标
            // themeColor: '#3F51B5', // 主题色
            mergeNavbar: true, //小屏设备下合并导航栏到侧边栏

            search: {
                placeholder: '搜索',
                noData: '找不到结果!',
                depth: 6
            },

            pagination: {
                previousText: '上一章节',
                nextText: '下一章节',
                crossChapter: true,
                crossChapterText: true,
            },
            copyCode: {
                buttonText: '复制到剪贴板',
                errorText: '错误',
                successText: '已复制'
            },
            progress: {
                position: "top",
                color: "var(--theme-color,#42b983)",
                height: "3px",
            },
            beian: {
                ICP: "京ICP备2021028097号",
                NISMSP: {
                    number: "",
                    url: "",
                    id: ""
                },
            },
            tabs: {
                persist: true,      // default
                sync: true,      // default
                theme: 'classic', // default
                tabComments: true,      // default
                tabHeadings: true       // default
            },
            toc: {
                tocMaxLevel: 5,
                target: 'h2, h3, h4, h5, h6',
                ignoreHeaders: ['<!-- {docsify-ignore} -->', '<!-- {docsify-ignore-all} -->']
            },
        }
    </script>
    <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
    <!-- 折叠目录 -->
    <script src="//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js"></script>
    <!-- 搜索插件 -->
    <script src="//unpkg.com/docsify/lib/plugins/search.js"></script>
    <!-- 备案插件 -->
    <script src="https://cdn.jsdelivr.net/npm/docsify-beian@latest/dist/beian.min.js"></script>
    <!-- 复制代码 -->
    <script src="//unpkg.com/docsify-copy-code"></script>
    <!-- emoji插件 -->
    <script src="//unpkg.com/docsify/lib/plugins/emoji.js"></script>
    <!-- 分页导航插件 -->
    <script src="//unpkg.com/docsify-pagination/dist/docsify-pagination.min.js"></script>
    <!-- 阅读进度条插件 -->
    <script src="https://cdn.jsdelivr.net/npm/docsify-progress@latest/dist/progress.min.js"></script>
    <!-- alert插件 -->
    <script src="https://unpkg.com/docsify-plugin-flexible-alerts"></script>
    <!-- tab插件 -->
    <script src="https://cdn.jsdelivr.net/npm/docsify-tabs@1"></script>
    <!-- 图片缩放 -->
    <script src="//unpkg.com/docsify/lib/plugins/zoom-image.js"></script>
    <!-- 目录插件 -->
    <script src="https://unpkg.com/docsify-plugin-toc@1.3.1/dist/docsify-plugin-toc.min.js"></script>

    <!-- 代码高亮 -->
    <script src="//unpkg.com/prismjs/components/prism-sql.js"></script>
    <script src="//unpkg.com/prismjs/components/prism-python.js"></script>
    <script src="//unpkg.com/prismjs/components/prism-go.js"></script>
    <script src="//unpkg.com/prismjs/components/prism-javascript.js"></script>
    <script src="//unpkg.com/prismjs/components/prism-json.js"></script>
    <script src="//unpkg.com/prismjs/components/prism-bash.js"></script>
</body>

</html>
```
