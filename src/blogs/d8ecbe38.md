---
title: 借助multipass使用 Podman
category: 工具软件
tags:
  - Container
  - Podman
  - Multipass
date: 2024-07-03T08:05:11.000Z
updated: 2024-07-12T01:56:09.000Z
---
​`Podman`​ 是一个无守护程序与 `Docker`​ 命令兼容的下一代 Linux 容器工具，该项目由 `RedHat`​ 主导，其他的细节可以参考 **Podman 使用指南 [1]**  ，本文的重点不是这个。

Podman 一直以来只能跑在 Linux 系统上，`macOS`​ 和 `Windows`​ 只能通过 CLI 远程连接 Podman 的 `API`​ 来管理容器。事实上 Docker 也不支持 macOS 和 Windows，但 Docker 针对 Windows 和 macOS 推出了专门的客户端，客户端里面集成了虚拟化相关的设置，通过嵌套一层虚拟化来支持 Docker。对于 `Podman`​ 来说，默认的虚拟机有时候会创建失败，因此可以借助`multipass`​创建podman需要的虚拟机。

### **创建虚拟机**

直接通过 multipass 来创建，命令特别简单：

```
$ multipass launch -c 2 -d 10G -m 2G -n podman
```

* -n : 指定启动实例名字
* -c : 分配 CPU 数量
* -d : 设置磁盘容量
* -m : 设置内存容量

第一次启动虚拟机的时候会去拉去镜像，国内网速可能会很慢。

查看已经启动的虚拟机：

```
$ multipass list
Name                    State             IPv4             Image
podman                  Running           192.168.64.2     Ubuntu 20.04 LTS
```

进入虚拟机：

```
$ multipass shell podman
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-52-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sun Nov  8 19:30:29 CST 2020

  System load:  0.0                Processes:               119
  Usage of /:   13.4% of 11.46GB   Users logged in:         0
  Memory usage: 11%                IPv4 address for enp0s2: 192.168.64.2
  Swap usage:   0%

0 updates can be installed immediately.
0 of these updates are security updates.

Last login: Sun Nov  8 17:38:31 2020 from 192.168.64.1
ubuntu@podman:~$
```

### **安装 Podman**

在虚拟机中安装 Podman：

```
ubuntu@podman:~$ . /etc/os-release
ubuntu@podman:~$ echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
ubuntu@podman:~$ curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/Release.key | sudo apt-key add -
ubuntu@podman:~$ sudo apt-get update
ubuntu@podman:~$ sudo apt-get -y upgrade
ubuntu@podman:~$ sudo apt-get -y install podman
```

### **建立 Podman Socket**

Podman 依赖于 systemd 的 **socket activation[5]**   特性。假设 Daemon B 依赖于 Daemon A，那么它就必须等到 Daemon A 完成启动后才能启动。`socket activation`​的思想就是：Daemon B 启动时其实并不需要 Daemon A 真正运行起来, 它只需要 Daemon A 建立的 socket 处于 listen 状态就 OK 了。而这个 socket 不必由 Daemon A 建立, 而是由 systemd 在系统初始化时就建立。当 Daemon B 发起启动时发起连接，systemd 再将 Daemon A 启动，当 Daemon A 启动后，再将 socket 归还给 Daemon A。

Podman 会通过 `podman.socket`​ 先创建一个处于监听状态的 socket 文件 `/run/podman/podman.sock`​，当有进程向该 socket 发起连接时，systemd 会启动同名的 service：`podman.service`​，以接管该 socket。先看看 podman.socket 和 podman.service 长啥样：

```
ubuntu@podman:~$ sudo systemctl cat podman.socket
# /lib/systemd/system/podman.socket
[Unit]
Description=Podman API Socket
Documentation=man:podman-system-service(1)

[Socket]
ListenStream=%t/podman/podman.sock
SocketMode=0660

[Install]
WantedBy=sockets.target

ubuntu@podman:~$ sudo systemctl cat podman.service
# /lib/systemd/system/podman.service
[Unit]
Description=Podman API Service
Requires=podman.socket
After=podman.socket
Documentation=man:podman-system-service(1)
StartLimitIntervalSec=0

[Service]
Type=notify
KillMode=process
ExecStart=/usr/bin/podman system service
```

设置开机自启 `podman.socket`​，并立即启动：

```shell
ubuntu@podman:~$ sudo systemctl enable podman.socket --now
```

确认 socket 是否正处于监听状态：

```shell
ubuntu@podman:~$ podman --remote info
host:
  arch: amd64
  buildahVersion: 1.16.1
  cgroupManager: systemd
  cgroupVersion: v1
  conmon:
    package: 'conmon: /usr/libexec/podman/conmon'
    path: /usr/libexec/podman/conmon
    version: 'conmon version 2.0.20, commit: '
  cpus: 2
  ...
```

### **客户端 CLI 设置**

接下来所有的设置，如不作特殊说明，都在 macOS 本地终端执行。

Podman 远程连接依赖 SSH，所以需要设置免密登录，先生成秘钥文件：

```
$ ssh-keygen -t rsa   # 一路回车到底
```

然后将本地的公钥 `~/.ssh/id_rsa.pub`​ 追加到虚拟机的 `/root/.ssh/authorized_keys`​ 文件中。

安装 Podman CLI：

```
$ brew install podman
```

添加远程连接：

```
$ podman system connection add ubuntu --identity ~/.ssh/id_rsa ssh://root@192.168.64.2/run/podman/podman.sock
```

查看已经建立的连接：

```
$ podman system connection list
Name     Identity                 URI
podman*  /Users/Ryan/.ssh/id_rsa  ssh://root@192.168.64.2:22/run/podman/podman.sock
```

由于这是第一个连接，所以被直接设置为默认连接（podman 后面加了 *）。

测试远程连接是否可用：

```shell
$ podman ps
CONTAINER ID  IMAGE   COMMAND  CREATED  STATUS  PORTS   NAMES

$ podman pull nginx:alpine
Trying to pull docker.io/library/nginx:alpine...
Getting image source signatures
Copying blob sha256:188c0c94c7c576fff0792aca7ec73d67a2f7f4cb3a6e53a84559337260b36964
Copying blob sha256:9dd8e8e549988a3e2c521f27f805b7a03d909d185bb01cdb4a4029e5a6702919
Copying blob sha256:85defa007a8b33f817a5113210cca4aca6681b721d4b44dc94928c265959d7d5
Copying blob sha256:f2dc206a393cd74df3fea6d4c1d3cefe209979e8dbcceb4893ec9eadcc10bc14
Copying blob sha256:0ca72de6f95718a4bd36e45f03fffa98e53819be7e75cb8cd1bcb0705b845939
Copying config sha256:e5dcd7aa4b5e5d2df8152b9e58aba32a05edd9b269816f5d8b7ced535743d16c
Writing manifest to image destination
Storing signatures
e5dcd7aa4b5e5d2df8152b9e58aba32a05edd9b269816f5d8b7ced535743d16c

$ podman image ls
REPOSITORY                TAG     IMAGE ID      CREATED      SIZE
docker.io/library/nginx   alpine  e5dcd7aa4b5e  2 days ago   23.3 MB
```

现在我们就可以直接在本地用 podman 愉快地玩耍了！

如果你建立了多个连接，可用使用 `--connection`​ 参数指定远程连接，或者使用 `podman system connection default <NAME>`​ 来设置默认的远程连接。

### **总结**

本文介绍了通过 multipass创建 Ubuntu 虚拟机运行 Podman，并建立 Podman Socket，然后客户端通过 SSH 连接服务端的 Socket，以实现通过远程连接来管理容器。

‍
