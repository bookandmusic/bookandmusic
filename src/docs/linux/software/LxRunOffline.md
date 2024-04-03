---
title: WSL必备神器：LxRunOffline
date: 2023-07-29T08:16:27Z
lastmod: 2023-07-29T08:24:50Z
article: false
order: -1
---

# WSL必备神器：LxRunOffline

## LxRunOffline简介

　　虽然 WSL (Win­dows Sub­sys­tem for Linux) 可以直接访问 Win­dows 下的文件，但是因为文件权限的问题，把需要在 WSL 中使用的文件放在 WSL 的用户主目录是最好的解决方案，没有之一。为了不撑爆系统盘，除了修改 Win­dows 应用安装位置，还可以把 WSL 整个安装目录进行转移，使用 wsl --export 和 wsl --import 这两个命令可以对 WSL 进行打包再自定义目录安装，就相当于转移。我以为这已经是相当完美的解决方案了，但最近发现了一款非常实用的 WSL 管理软件：[LxRunOffline](https://github.com/DDoSolitary/LxRunOffline)，它可以安装任意发行版到任意目录、转移已安装的 WSL 目录、备份 WSL、设置默认用户和修改环境变量等操作，完全碾压 wsl、wslconfig 这些简陋原生管理命令。

## 安装 LxRunOffline

　　方式一：普通手动安装。下载解压 [LxRunOffline](https://github.com/DDoSolitary/LxRunOffline/releases) ，并设置环境变量方便调用 (也可将其直接丢到C:\Windows下)。

　　方式二：使用 [Chocolatey](https://chocolatey.org/) 安装。

```bash
choco install lxrunoffline
```

　　方式三：使用 [Scoop](https://scoop.sh/) 安装。

```shell
scoop bucket add extras
scoop install lxrunoffline
```

## LxRunOffline 选项及参数

　　开发者并没有在 GitHub 上给出任何选项参数说明，你需要在终端内直接输入 `lxrunoffline` 查看，这里列举一下当前版本 (3.4.0) 的选项说明。相关的参数可以直接输入选项查看，比如 `lxrunoffline i`。

　　所有命令如下：

```shell
C:\WINDOWS\system32>lxrunoffline version
LxRunOffline v3.5.0

C:\WINDOWS\system32>lxrunoffline
[ERROR] No action is specified.

Supported actions are:
    l, list            List all installed distributions.
    gd, get-default    Get the default distribution, which is used by bash.exe.
    sd, set-default    Set the default distribution, which is used by bash.exe.
    i, install         Install a new distribution.
    ui, uninstall      Uninstall a distribution.
    rg, register       Register an existing installation directory.
    ur, unregister     Unregister a distribution but not delete the installation directory.
    m, move            Move a distribution to a new directory.
    d, duplicate       Duplicate an existing distribution in a new directory.
    e, export          Export a distribution's filesystem to a .tar.gz file, which can be imported by the "install" command.
    r, run             Run a command in a distribution.
    di, get-dir        Get the installation directory of a distribution.
    gv, get-version    Get the filesystem version of a distribution.
    ge, get-env        Get the default environment variables of a distribution.
    se, set-env        Set the default environment variables of a distribution.
    ae, add-env        Add to the default environment variables of a distribution.
    re, remove-env     Remove from the default environment variables of a distribution.
    gu, get-uid        Get the UID of the default user of a distribution.
    su, set-uid        Set the UID of the default user of a distribution.
    gk, get-kernelcmd  Get the default kernel command line of a distribution.
    sk, set-kernelcmd  Set the default kernel command line of a distribution.
    gf, get-flags      Get some flags of a distribution. See https://docs.microsoft.com/en-us/previous-versions/windows/desktop/api/wslapi/ne-wslapi-wsl_distribution_flags for details.
    sf, set-flags      Set some flags of a distribution. See https://docs.microsoft.com/en-us/previous-versions/windows/desktop/api/wslapi/ne-wslapi-wsl_distribution_flags for details.
    s, shortcut        Create a shortcut to launch a distribution.
    ec, export-config  Export configuration of a distribution to an XML file.
    ic, import-config  Import configuration of a distribution from an XML file.
    sm, summary        Get general information of a distribution.
    version            Get version information about this LxRunOffline.exe.
```

## 使用 LxRunOffline 安装 WSL

　　与微软商店的安装方式不同，LxRunOf­fline 安装 WSL 更灵活，它可以安装任意发行版到任意目录，还可以自定义 WSL 名称。

　　如果你没有使用过 WSL ，首先以管理员身份运行 Pow­er­Shell (WIN+X , A)，输入下面的命令开启 “适用于 Linux 的 Win­dows 子系统” 功能，并重启。

```shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

　　下载 [WSL 官方离线包](https://docs.microsoft.com/en-us/windows/wsl/install-manual)，改后缀名为.zip，解压后可得到名为 install.tar.gz 的文件。或者在 [LxRunOffline WiKi](https://github.com/DDoSolitary/LxRunOffline/wiki) 中下载大佬们提供的镜像文件。

　　输入以下命令进行安装：

```shell
lxrunoffline i -n <WSL名称> -d <安装路径> -f <安装包路径>.tar.gz
```

> 加入`-s`参数可在桌面创建快捷方式。

## 设置默认用户

　　当修改过 WSL 的名称或目录后就无法通过[微软官方提供的方法](https://docs.microsoft.com/en-us/windows/wsl/user-support)设置默认用户。这时可以使用 LxRunOf­fline 进行设置。

### 设置普通用户为默认用户

　　使用 LxRunOf­fline 新安装的 WSL 默认是以 root 用户登录，如果你需要默认以普通用户进行登录，就需要进行下面的操作。

　　首先运行 WSL ，输入以下命令创建用户：

```shell
useradd -m -s /bin/bash <用户名>
```

　　然后对该用户设置密码，输入命令后会提示输入两次密码。

```shell
passwd <用户名>
```

　　授予该用户 sudo 权限。

```shell
usermod -aG sudo <用户名>
```

> 为了保持和微软商店安装的效果一致，这里提及的方法是把用户添加到 sudo 用户组。其他关于 sudo 权限的设置方法以及免密设置可参考《[Linux 中授予普通用户 sudo 权限的正确方法](https://p3terx.com/archives/linux-grants-normal-user-sudo-permission.html)》这篇文章。

　　查看用户 UID ，一般是 1000。

```shell
id -u <用户名>
```

　　按 Ctrl+D 退出 WSL ，在 Pow­er­Shell 中输入以下命令：

```shell
lxrunoffline su -n <WSL名称> -v 1000
```

### 设置 root 为默认用户

　　root 用户的 UID 为 `0`，所以可以直接在 Pow­er­Shell 输入以下命令进行设置：

```shell
lxrunoffline su -n <WSL名称> -v 0
```

## 转移 WSL 安装目录

　　LxRunOf­fline 可以对系统中已经安装的 WSL 进行目录转移操作，拯救爆满的 C 盘。

　　查看系统中已安装的 WSL 。

```shell
lxrunoffline l
```

> 类似于`wsl -l`。LxRunOf­fline 不会显示默认 WSL ，查看默认 WSL 需要使用 `lxrunoffline gd`命令。

　　输入命令对 WSL 的目录进行移动：

```shell
lxrunoffline m -n <WSL名称> -d <路径>
```

　　最后查看路径，进行确认：

```shell
lxrunoffline di -n <WSL名称>
```

## 备份和恢复 WSL

　　使用 LxRunOf­fline 可以方便的对 WSL 进行备份和恢复，同样可以实现转移的操作，而且还可以在转移到其它电脑上。

### 备份 WSL

　　查看系统中已安装的 WSL 。

```shell
wsl -l
```

　　然后输入需要备份的 WSL 名称和备份的目标路径。

```shell
lxrunoffline e -n <WSL名称> -f <压缩包路径>.tar.gz
```

> 类似但不等同于`wsl --export <压缩包路径>.tar`。LxRunOf­fline 备份完会生成一个`.xml`后缀的同名配置文件，比如`WSL.tar.gz.xml`。

### 恢复 WSL

　　输入以下命令可以恢复已备份的 WSL，和安装是相同的命令。

```shell
lxrunoffline i -n <WSL名称> -d <安装路径> -f <压缩包路径>.tar.gz
```

> 类似但不等同于`wsl --import <安装路径> <压缩包路径>.tar`。LxRunOf­fline 会读取备份时生成的配置文件并写入配置，前提是同目录且同名。否则你需要加入`-c`参数指定配置文件。

## 创建快捷方式

　　使用微软应用商店安装的 WSL 会在开始菜单添加应用图标（快捷方式），而使用 LxRunOf­fline 安装 WSL 时可以通过添加 -s 参数在桌面创建快捷方式。如果你安装时忘记添加参数，可以使用以下命令进行创建。

```shell
lxrunoffline s -n <WSL名称> -f <快捷方式路径>.lnk
```

　　举例：

```shell
lxrunoffline s -n centos -f C:\Users\<用户名>\Desktop\centos.lnk
```

## 设置默认 WSL

　　设置默认 WSL 后，可以在 cmd 和 powershell 中输入 wsl 直接调用默认的 WSL 。

```shell
lxrunoffline sd -n <WSL名称>
```

> 等同于`wsl -s`

## 运行 WSL

　　和原生运行方式本质上是一样的。在有多个 WSL 的情况下，可以指定运行某个发行版。

```shell
lxrunoffline r -n <WSL名称>
```

> 等同于`wsl -d`

## 其他操作

　　查看 WSL 安装目录。

```shell
lxrunoffline di -n <WSL名称>
```

　　导出指定的 WSL 配置文件到目标路径。

```shell
lxrunoffline ec -n <WSL名称> -f <配置文件路径>.xml
```

　　配置信息可以输入`lxrunoffline sm -n`查看

　　取消注册（这个操作不会删除目录）

```shell
lxrunoffline ur -n <WSL名称>
```

　　使用新名称注册

```shell
lxrunoffline rg -n <WSL名称> -d <WSL路径> -c <配置文件路径>.xml
```
