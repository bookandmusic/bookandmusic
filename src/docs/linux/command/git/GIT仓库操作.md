---
title: GIT仓库操作
category: [Linux]  
tag: [auth, github, gitee]  
abbrlink: 4e44e57a  
date: 2019-03-31 12:15:27  
updated: 2023-03-02 22:19:24
article: false
---

# GIT仓库操作

## 仓库配置信息

### 查看配置信息

　　config 配置有system(系统级别)、global(用户级别)和local(当前仓库)，三个设置优先级: `system -> global ->local`​ ,底层配置会覆盖顶层配置, 分别使用`--system/global/local`​ 定位到配置文件

　　查看系统config

```shell
git config --system --list
```

　　查看当前用户（global）配置

```shell
git config --global  --list
```

　　查看当前仓库配置信息

```shell
git config --local  --list
```

### 设置配置信息

　　设置全局身份信息

```shell
git config --global user.name 'test'
git config --global user.email 'test@qq.com'
# git config --global user.password 'test'
```

　　在仓库下设置局部身份信息

```shell
git config user.name 'test'
git config user.email 'test@qq.com'
# git config user.password 'test'
```

### 取消配置信息

　　取消全局身份信息

```shell
git config --unset --global user.name
git config --unset --global user.email
# git config --unset --global user.password
```

　　在仓库下取消局部身份信息

```shell
git config --unset --local user.name
git config --unset --local user.email
# git config --unset --local user.password
```

## 仓库密钥管理

　　git使用https协议，每次pull, push都要输入密码，相当的麻烦。这个时候就可以使用ssh密钥进行身份认证，这样可以省去每次都输密码。

### 本地密钥生成

#### 创建密钥

　　终端输入命令

```shell
ssh-keygen -t rsa -C "your@email.com"（请填你设置的邮箱地址）
```

　　接着出现：

```shell
Generating public/private rsa key pair.

Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):
```

　　请直接按下回车

　　然后系统会自动在`.ssh`文件夹下生成两个文件，`id_rsa`和`id_rsa.pub`，用记事本打开`id_rsa.pub`

　　将全部的内容复制

### 远程仓库密钥配置

#### GitHub密钥配置

##### 添加公钥

　　打开[https://github.com/](https://github.com/)，登陆你的账户，进入设置

　　进入ssh设置

　　点击 `New SSH key`

　　在key中将刚刚复制的粘贴进去

　　最后点击`Add SSH key`

##### 测试

　　在终端输入

```shell
ssh -T git@github.com
```

　　你将会看到：

```shell
The authenticity of host 'github.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?
```

　　输入 yes

```shell
Hi humingx! You've successfully authenticated, but GitHub does not provide shell access.
```

　　如果看到Hi后面是你的用户名，就说明成功了。

#### Gitee仓库密钥配置

> Gitee仓库密钥配置和GitHub密钥配置步骤相似

#### Gitlab仓库密钥配置

> Gitlab仓库密钥配置和GitHub密钥配置步骤相似

## 错误解析

### 密钥未配置

- 错误原因：

　　当使用git方式下载时，如果没有配置过`ssh key`，则会有如下错误提示：

```bash
git@github.com:Permissiondenied(publickey) 
fatal: Could not read from remote repository
```

- 解决方案：

　　正常配置`ssh`密钥即可。

### 密钥不匹配

> 重装系统之后,git push的时候会出现问题:`The authenticity of host 'github.com (13.229.188.59)' can't be established.`

- 错误原因：

　　本地仓库和远程的SSH密钥不匹配

- 解决办法：

　　重新配置仓库密钥即可

### 免密登录失败

> 在本地电脑上已经配置过 密钥，但是每次上传、下载仍然需要输入用户名和密码

- 错误原因

　　首先来明确一下需要每次输入用户名和密码的场景：

　　首先，必须是使用`https`方式下载的代码在操作时才可能需要输入用户名密码。

　　第二，在满足第一点的基础上，未配置`credential.helper`。可以用如下命令检查`credential.helper`的当前配置：

```bash
git config -l | grep credential.helper
```

　　如果未配置的话结果应该为空。

- 解决方案：

　　方案一, 既然是因为本地仓库和远程仓库关联时使用 `ssh`方式，才会没有使用密钥验证身份，而是重复输入密码验证。因此，可以删除`https`方式的本地仓库的远程连接，然后添加`ssh`方式的远程链接

　　方案二, 既然是因为未配置`credential.helper`。简单粗暴的办法就是直接配置`credential.helper`的值为`manager`

```bash
git config  --global credential.helper manager
```

　　再次尝试`pull`代码的时候会弹出窗口要求输入用户名密码（只需要输入这一次就ok了）。
