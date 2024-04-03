---
title: GOPATH、GoModules
category: [Go]
tag: []
date: 2023-02-19 14:31:21
---



> `go env`命令,可以查询到GO相关的环境变量

在 Golang 中，有两个概念非常容易弄错，第一个就是 `GoPath`，第二个则是 `GoModule`，特别是随着Go版本的更新，好多文档没有及时更新，导致初学者对两者模糊不清，一头雾水。

## 什么是 GoPath

GoPath 是 Golang 的工作空间，所有的 Go 文件，都需要放在 GoPath 下的 src 目录下才能够编译运行，所以我提议不要直接配置全局的 GoPath 目录，否则会非常难以管理所有的 Golang 项目。

我们在项目中使用第三方类库的时候，使用`go get`命令去下载安装的第三方类库的包，而拉取下来的包就会直接下载到 GoPath 目录下的 src 中。GOPATH本身是不区分项目的，代码中任何`import`的路径均从GOPATH为根目录开始；

### 不区分依赖项版本

当有多个项目时，不同项目对于依赖库的版本需求不一致时，无法在一个GOPATH下面放置不同版本的依赖项。典型的例子：当有多项目时候，A项目依赖C 1.0.0，B项目依赖C 2.0.0，由于没有依赖项版本的概念，C 1.0.0和C 2.0.0无法同时在GOPATH下共存，解决办法是分别为A项目和B项目设置GOPATH，将不同版本的C源代码放在两个GOPATH中，彼此独立（编译时切换），或者C 1.0.0和C 2.0.0两个版本更改包名。无论哪种解决方法，都需要人工判断更正，不具备便利性。

并且不同的 GoPath 都需要下载依赖，那么磁盘中重复的依赖就会非常多，会占用大量的磁盘空间。

### 依赖项列表无法数据化

在项目中没有任何语义化的数据可以知道当前项目的所有依赖项，需要手动找出所有依赖。对项目而言，需要将所有的依赖项全部放入源代码控制中。如果剔除某个依赖，需要在源代码中手工确认某个依赖是否剔除。

**为了解决这所有的问题，Golang 最终引入了 GoModule 的概念。**

## 什么是 GoModule

GoModule 是 Golang 在 1.11 版本初步引入的概念，在 1.12 版本中正是开始使用，所以如果需要使用 GoModule，那么需要保证你的 Golang 的版本在 1.12 或以上。
另外需要说一下，Golang1.11 和 1.12 版本虽然已经引入了 GoModule 的概念，但是 GoModule 是默认不开启的，如果需要开启，那么需要配置一个环境变量：`GO111MODULE=on`，默认是`off`。

而在 Golang1.13 及以上的版本中，GoModule 的默认配置为 auto，即 GoModule 会通过你的目录下是否有 go.mod 文件来判断是否开启 GoModule。所以 Golang1.13 + 的版本中我们就不需要配置 GO111MODULE 属性了。

**那么究竟什么是 GoModule？**

- Go Modules是语义化版本管理的依赖项的包管理工具；它解决了GOPATH存在的缺陷，最重要的是，它是Go官方出品。
- 说得直白一下，GoModule 就是一个用来取代 GoPath 的 Golang 的工作空间。

我们之前说过，所有的 Golang 的文件，都需要放在 GoPath 目录下才能进行正确的编译和运行，而有了 GoModule 之后，那么我们就可以把文件放在 GoModule 目录下，而放在 GoModule 目录下的 Golang 文件，也可以正确地编译运行。

那么我们有了 GoModule 之后，GoPath 是不是就可以被舍弃了？

不是的！

我们之前说过，GoPath 所引出的问题，就是因为第三方类库的包所导致的，所以我们在有了 GoModule 之后，GoPath 和 GoModule 就分别负责不同的职责，共同为我们的 Golang 项目服务。

**GoPath 我们用来存放我们从网上拉取的第三方依赖包。**
**GoModule 我们用来存放我们自己的 Golang 项目文件**，当我们自己的项目需要依赖第三方的包的时候，我们通过 GoModule 目录下的一个 go.mod 文件来引用 GoPath 目录 src 包下的第三方依赖即可。

这样依赖，既解决了原来只能局限在 GoPath 目录 src 包下进行编程的问题，也解决了第三方依赖包难以管理和重复依赖占用磁盘空间的问题。

总而言之，在引入 GoModule 之后，我们不会直接在 GoPath 目录进行编程，而是把 GoPath 作为一个第三方依赖包的仓库，我们真正的工作空间在 GoModule 目录下。

## GoModule 的设置

既然搞清楚了 GoPath 和 GoModule 之间的区别，那么 GoModule 又该怎么配置呢？一个目录怎么才能算是一个 GoModule 目录了。

很简单，我们直接使用`go mod init 模块名称`命令对目录进行初始化操作，即可将这个目录设置为 GoModule 目录。

当初始化命令执行完毕之后，会在 go_module 目录下生成一个 go.mod 文件，该文件就是用来引入 GoPath 目录下的第三方依赖的文件。

**初始化之后的 go.mod 文件**

```go
module GoDocument

go 1.19
```

当我们需要引入 GoPath 目录下的第三方依赖包的时候，只需要在 go.mod 目录下使用命令下载即可，GoModule 就会自动帮我们把第三方依赖包下载到 GoPath 目录下。

例如：

```shell
go get -u github.com/gin-gonic/gin
```

则 go.mod 文件如下：

```
module GoDocument

go 1.19

require (
    github.com/gin-contrib/sse v0.1.0 // indirect
    github.com/gin-gonic/gin v1.8.2 // indirect
    github.com/go-playground/locales v0.14.1 // indirect
    github.com/go-playground/universal-translator v0.18.1 // indirect
    github.com/go-playground/validator/v10 v10.11.2 // indirect
    github.com/goccy/go-json v0.10.0 // indirect
    github.com/json-iterator/go v1.1.12 // indirect
    github.com/leodido/go-urn v1.2.1 // indirect
    github.com/mattn/go-isatty v0.0.17 // indirect
    github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
    github.com/modern-go/reflect2 v1.0.2 // indirect
    github.com/pelletier/go-toml/v2 v2.0.6 // indirect
    github.com/ugorji/go/codec v1.2.9 // indirect
    golang.org/x/crypto v0.5.0 // indirect
    golang.org/x/net v0.5.0 // indirect
    golang.org/x/sys v0.4.0 // indirect
    golang.org/x/text v0.6.0 // indirect
    google.golang.org/protobuf v1.28.1 // indirect
    gopkg.in/yaml.v2 v2.4.0 // indirect
)

```

## GoModule 无法下载国外的依赖包问题

这是一个很多开发者都碰到过的问题，对于国外的依赖包无法直接通过网络进行下载，这显然会让开发者非常难受，所以 Golang 也引入了另一个属性：GOPROXY，我们只需要在环境变量中配置 GOPROXY属性，即可解决 GoModule 无法下载国外的依赖包问题。

```shell
# ~/.bashrc 或 ~/.zshrc
export GOPROXY=https://mirrors.aliyun.com/goproxy/
```