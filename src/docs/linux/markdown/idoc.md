---
title: idoc
date: 2023-07-29T08:37:07Z
lastmod: 2023-07-29T08:56:42Z
order: 2
article: false
---

# idoc

　　官网： [https://github.com/jaywcjlove/idoc](https://github.com/jaywcjlove/idoc)

> 依赖 node.js 环境。

　　特点：  
1、简单小巧，支持自动生成目录。有几个主题可以选择。  
2、不支持插件。  
3、原理是将 Markdown 文件编译生成 html 文件。

### 安装

　　全局安装：

```shell
$ sudo npm install idoc -g
```

### 如何使用

　　创建并初始化项目：

```shell
$ mkdir test-idoc
$ cd test-idoc

# 初始化
$ idoc init 
```

　　填入必要的项目信息，初始化完成。会在项目目录下生成：

```shell
md/
 |-- index.md
package.json
```

　　运行 `idoc server`​ 预览生成的静态页面。默认预览地址为 [http://localhost:1987/](http://localhost:1987/)

　　预览的时候改动md文件，浏览器刷新可以看到改动后的内容。

　　其中 `初始化`​ 步骤也可以手动执行，把目录和配置文件建好就行了。

### 目录结构

　　idoc对目录结构没有要求，只要你把md文件放在`md/`​目录下面，idoc会自动识别。支持子目录。例如：

```
md/
 |-- 首页.md
 |-- 关于.md
 |-- 使用方法/
    |-- 命令文档.md
    |-- 命令文档2.md
```

　　如果有子目录，生成的文档导航栏也会有子菜单。效果： ![](http://img2018.cnblogs.com/blog/663847/201904/663847-20190421140250559-2049292225.png)​

### 配置文件

　　​`package.json`​文件。

```json
{
    "name": "idoc",
    "version": "0.0.1",
    "description": "",
    "keywords": [
        ""
    ],
    "homepage": "http://JSLite.io",
    "author": "jaywcjlove <wowohoo@qq.com>",
    "repository": {
        "type": "git",
        "url": "https://github.com/jaywcjlove/idoc"
    },
    "licenses": "MIT",
    "idoc": {
        "theme": "default",
        "logo": "idoc-logo.svg",
        "md": [
            "首页.md",
            {
                "使用方法": [
                    "主题文件.md",
                    "初始化.md",
                    "配置说明.md"
                ]
            },
            "关于.md"
        ]
    }
}
```

　　其中 `idoc.md`​块无需手动配置，`idoc build`​ 自动生成。其它配置无需多说明，也能看的懂。

### 主题

　　支持：

* handbook
* default
* resume

　　​![](http://img2018.cnblogs.com/blog/663847/201904/663847-20190421140816532-2133474905.png)​

　　参考：[https://wangchujiang.com/idoc/html/%E4%B8%BB%E9%A2%98.html](https://wangchujiang.com/idoc/html/%E4%B8%BB%E9%A2%98.html)

### 常用命令

* build

　　生成静态 HTML 页面到指定目录中。

```shell
$ idoc build
```

* watch

　　监控 `md`​ 文件发生变化自动 build。

```shell
$ idoc watch
```

* server

　　打开本地静态 `html`​ 服务器，预览你生成的页面。

```shell
$ idoc server
```

* clean

　　清除生成的静态文件。

```shell
$ idoc clean
```

* theme

　　​`$ idoc theme`​ 与 `$ idoc -t`​ 相同  
选择默认主题或者第三方主题，默认两个主题 handbook 或者 default。

```shell
# 选择主题
# 第三方主题，克隆到当前跟目录就可以使用命令选择了
$ idoc theme
# theme 简写 －t
$ idoc -t

# 制作主题 需要指定制作的主题目录
$ idoc -t ~/git/idoc-theme-slate/
```

* deploy

　　将文档部署到 `git`​ 仓库的 `gh-pages`​ 分支中。  
目前需要手动添加分支。

```shell
$ idoc deploy
```
