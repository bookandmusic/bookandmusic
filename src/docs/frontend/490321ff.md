---
title: Node.js环境配置
category: 工具
tag: [环境配置,Node]
abbrlink: 9676ee43
date: 2019-03-31 11:58:35
article: false
---

# Nodejs环境配置

　　简单的说 Node.js 就是运行在服务端的 JavaScript。

　　Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

　　Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

## Node.js版本管理

### 安装nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

　　运行以上任一命令将下载一个脚本并运行它。
该脚本会将nvm存储库克隆到`~/.nvm`,并尝试将以下代码段中的源代码行添加到正确的配置文件（`~/.bash_profile`, `~/.zshrc`, `~/.profile`, 或 `~/.bashrc`）

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### 修改nvm镜像源

　　用国内镜像快速安装node,把环境变量 NVM_NODEJS_ORG_MIRROR加入到正确的配置文件（`~/.bash_profile`,`~/.zshrc`, `~/.profile`, 或 `~/.bashrc`）

```bash
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
```

### nvm命令

```bash
nvm version # 查看当前的版本
nvm ls-remote # 列出所有可以安装的node版本号

nvm install stable # 安装最新稳定版本
nvm install  <version> # 安装指定版本号的node
nvm use <version> # 切换使用指定的版本node

nvm ls  # 列出所有已经安装的node版本
nvm current # 当前node版本

nvm alias default <version>  # 指定默认的node版本
nvm alias <name> <version> # 给不同的版本号添加别名
nvm unalias <name> ## 删除已定义的别名

nvm uninstall <version> 卸载指定的版本
```

## Node.js包管理

### 安装包管理工具

```bash
npm -g install npm@next  # npm升级
npm install -g cnpm --registry=https://registry.npm.taobao.org  # cnpm安装
npm install -g yarn  # yarn安装
```

### 管理第三方包

　　查看已安装的所有全局包

```bash
npm list -g --depth=0

cnpm list -g --depth=0

yarn global list
```

　　安装包

```bash
npm install -g <package>

cnpm install -g <package>

yarn global add <package>
```

　　卸载包

```bash
npm uninstall -g <package>

cnpm uninstall -g <package>

yarn global remove <package>
```

　　更新包

```bash
npm update <package>
```

　　更新本地包

```bash
npm upgrade --save
yarn upgrade
```

### 其他命令

```bash
npm config get registry  # 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  # 设置npm镜像源为淘宝镜像

yarn config get registry  # 查看yarn当前镜像源

yarn config set registry https://registry.npm.taobao.org/  # 设置yarn镜像源为淘宝镜像
```

## Node.js包镜像管理

### 编辑npm配置文件

　　直接编辑npm的配置文件

```bash
npm config edit
```

　　直接修改registry的地址

```bash
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
```

### Npm命令修改

　　用代码更改npm的配置文件

```bash
npm config set registry http://registry.npm.taobao.org
```

　　这段代码即将镜像改为淘宝镜像

### nrm命令管理

　　安装nrm

```bash
npm install -g nrm
```

　　查看镜像列表

```bash
nrm ls
```

　　切换镜像

```bash
nrm use taobao
```

　　在nrm添加自己的镜像地址

```bash
nrm add r_name r_url
# r_name镜像名字  
# r_url镜像地址
```

　　删除

```bash
nrm del r_name
```

　　测试镜像的相应速度

```bash
nrm test r_name
```

## 第三方脚手架

### vue 3.0

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### vue2.0

　　Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
```

　　或者直接安装vue-cli脚手架

```bash
cnpm install -g vue-cli
```

### http-server

　　利用http-server，开启本地服务

```bash
cnpm install -g http-server
```

```bash
http-server -c-1   （⚠️只输入http-server的话，更新了代码后，页面不会同步更新）
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.8.196:8080
Hit CTRL-C to stop the server
```

### hexo-cli

```bash
cnpm install -g hexo-cli
```

### gitbook-cli

```bash
cnpm install -g gitbook-cli
```

　　‍
