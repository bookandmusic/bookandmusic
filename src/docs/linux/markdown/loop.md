---
title: loop
date: 2023-07-29T08:35:11Z
lastmod: 2023-07-29T08:56:59Z
order: 1
article: false
---

# loop

　　官网： [https://github.com/ruanyf/loppo](https://github.com/ruanyf/loppo)

> 依赖 node.js 环境。

　　特点： 1、简单小巧，支持自动生成目录。  
2、不支持插件。  
3、原理是将 Markdown 文件编译生成 html 文件。  
4、生成的页面很美观、大方，支持响应式。

### 安装

　　全局安装：

```
$ npm install loppo -gCopy to clipboardErrorCopied
```

### 如何使用

　　创建项目：

```shell
$ mkdir test-loppo
$ cd test-loppo
```

　　项目目录格式示例：

```shell
|- test-loppo
   |- README.md
   |- docs
      |- page1.md
      |- page2.md
      |- ...
```

　　然后运行项目：

```shell
$ loppo
```

　　会生成：

```shell
dist/
chapters.yml
loppo.yml
```

　　其中 `dist`​是编译输出目录；`chapters.yml`​是自动生成的文档目录，根据当前目录生成，如果增删了源文件，需要删除该文件使得下次重新生成；`loppo.yml`​是配置文件，第一次生成后不会再变更。

### loppo.yml

　　该文件是配置文件：

```yaml
dir: docs
output: dist
site: Documents
theme: oceandeep
customization: false
themeDir: loppo-theme
direction: ltr
id: test-loppoCopy to clipboardErrorCopied
```

　　我们可以手动进行修改。

* dir： 源文件所在目录。默认是当前目录下的 `docs`​目录。
* output：编译输出文件目录。
* site：项目文档名称。可以自定义，显示在页面 title 里。
* theme：主题。默认oceandeep。暂时不知道有没有其他主题。
