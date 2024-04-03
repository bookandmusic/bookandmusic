---
title: gitbook
date: 2023-07-29T08:39:48Z
lastmod: 2023-07-29T08:56:05Z
order: 3
article: false
---

# gitbook

　　官网： [https://www.gitbook.com/](https://www.gitbook.com/)

　　依赖 node.js 环境。

　　特点：  
1、扩展性非常好，有社区支持。支持插件。  
2、目录需要手动配置。  
3、支持生成 html、pdf、epub 文件。

　　因为 gitbook 扩展性很强，下面仅给出简要教程，详细教程请阅读：[https://github.com/52fhy/gitbook-use](https://github.com/52fhy/gitbook-use)

### 安装

　　1、安装 `gitbook`​ 编辑器：  
[https://legacy.gitbook.com/editor/](https://legacy.gitbook.com/editor/)

　　2、运行下面的命令进行安装 `gitbook-cli`​：

```
npm install gitbook-cli -g
```

　　其中 `gitbook-cli`​ 是 `gitbook`​ 的一个命令行工具, 通过它可以在电脑上安装和管理 `gitbook`​ 的多个版本。

　　注意：

* ​`gitbook-cli`​ 和 `gitbook`​ 是两个软件
* ​`gitbook-cli`​ 会将下载的 `gitbook`​ 的不同版本放到 `~/.gitbook`​ 中, 可以通过设置`GITBOOK_DIR`​环境变量来指定另外的文件夹

### 如何使用

　　新建一个项目：

```
$ mdkir test_gitbook && cd test_gitbook
```

　　初始化目录结构：

```
$ gitbook init
```

```
├── README.md
├── SUMMARY.md
```

　　使用下列命令会运行一个服务器, 通过`http://localhost:4000/`​可以预览书籍：

```
gitbook serve
```

　　运行该命令后会在书籍的文件夹中生成一个 `_book`​ 文件夹, 里面的内容即为生成的 html 文件。 我们可以使用下面命令来生成网页而不开启服务器。

```
gitbook build
```

### 目录结构

　　GitBook 基本的目录结构如下所示

```
├── book.json
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md
```

* ​`book.json`​ 为配置文件
* ​`README.md`​ 主页
* ​`SUMMARY.md`​ 目录文件

### 目录文件

　　​`SUMMARY.md`​ 示例：

```
# Summary
## 基本使用
* [前言](introduction.md)
* [安装](installation.md)
* [命令](commands.md)
* [目录结构](structure.md)
* [配置](settings.md)

## 扩展
* [插件](plugins.md)
* [主题](themes.md)
* [bookjson](bookjson.md)
```

### 配置文件

　　​`book.json`​ 示例：

```json
{
  "title": "GitBook 简明教程",
  "language": "zh-hans",
  "author": "佚名",
  "links": {
    "sidebar": {
      "书和音乐": "http://www.bookandmusic.cn"
    }
  },
  "plugins": [
    "-search",
    "-lunr",
    "-sharing",
    "-livereload",
    "github",
    "donate",
    "chart",
    "todo",
    "graph",
    "puml",
    "katex",
    "code",
    "ace",
    "sitemap-general",
    "mermaid-gb3",
    "include-csv",
    "flexible-alerts",
    "chapter-fold",
    "anchor-navigation-ex",
    "theme-comscore"
  ],
  "pluginsConfig": {
    "anchor-navigation-ex": {
      "showLevel": false,
      "showGoTop": true
    },
    "sitemap-general": {
      "prefix": "http://www.bookandmusic.cn/gitbook/comscore/"
    },
    "my-toolbar": {
      "buttons": [
        {
          "label": "下载PDF",
          "icon": "fa fa-file-pdf-o",
          "url": "http://www.bookandmusic.cn/gitbook/comscore/book.pdf",
          "position": "left",
          "text": "下载PDF",
          "target": "_blank"
        }
      ]
    }
  },
  "structure": {
    "readme": "home.md"
  }
}
```

### 命令

　　**列出 gitbook 所有的命令**

```
gitbook help
```

　　**输出**​**`gitbook-cli`**​**的帮助信息**

```
gitbook --help
```

　　**生成静态网页并运行服务器**

```
gitbook serve
```

　　**生成静态网页**

```
gitbook build
```

　　**生成 pdf**

```
gitbook pdf
```

　　**生成 epub**

```
gitbook epub
```

　　**生成时指定 gitbook 的版本, 本地没有会先下载**

```
gitbook build --gitbook=2.0.1
```

　　**列出本地所有的 gitbook 版本**

```
gitbook ls
```

　　**列出远程可用的 gitbook 版本**

```
gitbook ls-remote
```

　　**安装对应的 gitbook 版本**

```
gitbook fetch 标签/版本号
```

　　**更新到 gitbook 的最新版本**

```
gitbook update
```

　　**卸载对应的 gitbook 版本**

```
gitbook uninstall 2.0.1
```

　　**指定 log 的级别**

```
gitbook build --log=debug
```

　　**输出错误信息**

```
gitbook builid --debug
```

　　注：生成 pdf、epub 需要安装 calibre 插件，下载链接：[https://calibre-ebook.com/download](https://calibre-ebook.com/download) 。Mac 环境需要一个命令 `sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin`​。

### 常见问题

　　1、gitbook 生成 pdf 时缺少 ebook.css  
找到 `C:\Users\YJC\.gitbook\versions\3.2.3\lib\output\website`​，将`copyPluginAssets.js`​文件中 67 行和 112 行的 “confirm: true” 改为：“confirm: false”。

　　2、解决静态网页不能跳转问题

* 在导出的文件夹目录下找到gitbook->theme.js文件
* 找到下面的代码搜索`if(m)for(n.handler&&`​
* 将if(m)改成if(false)

  ```js
  if(false)for(n.handler&&(i=n,n=i.handler,o=i.selector),o&&de.find.matchesSelector(Ye,o),n.guid||(n.guid=de.guid++),(u=m.events)||(u=m.events={}),(a=m.handle)||(a=m.handle=function(t){return"undefined"!=typeof de&&de.event.triggered!==t.type?de.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(qe)||[""],l=t.length;l--;)s=Ze.exec(t[l])||[],h=g=s[1],d=(s[2]||"").split(".").sort(),h&&(f=de.event.special[h]||{},h=(o?f.delegateType:f.bindType)||h,f=de.event.special[h]||{},c=de.extend({type:h,origType:g,data:r,handler:n,guid:n.guid,selector:o,needsContext:o&&de.expr.match.needsContext.test(o),namespace:d.join(".")},i),(p=u[h])||(p=u[h]=[],p.delegateCount=0,f.setup&&f.setup.call(e,r,d,a)!==!1||e.addEventListener&&e.addEventListener(h,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),o?p.splice(p.delegateCount++,0,c):p.push(c),de.event.global[h]=!0)
  ```
