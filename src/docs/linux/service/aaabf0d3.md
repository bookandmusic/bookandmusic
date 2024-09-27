---
title: service
date: 2023-08-05T22:42:51Z
lastmod: 2023-08-06T08:36:02Z
article: false
---

# service

　　在Linux中，`service`​命令是一个用于管理系统服务的工具。

### 语法格式

　　​`service`​命令的一般语法如下：

```shell
service [options] <service-name> <command>
```

　　其中，`service-name`​是要管理的服务的名称，`command`​是要执行的操作，如状态(`status`​)、启动(`start`​)、停止(`stop`​)、重启(`reload`​)等。

### 执行流程

　　​`service`​命令的基本原理是提供一个简单的用户界面，用于管理系统服务的运行状态。它是一个便利的工具，使系统管理员可以轻松地启动、停止、重启和查看服务，而无需手动执行复杂的命令。

　　在具体实现上，`service`​命令与SysV（System 5）初始化系统结合使用。SysV是一种早期的初始化和服务管理系统，用于启动和管理系统中的进程。`service`​命令实际上是一个脚本，它解析命令行参数并执行特定的操作，以操作SysV脚本文件，从而影响服务的状态。

　　下面是`service`​命令的基本工作流程：

1. **命令行输入**：用户在终端中输入`service`​命令及相应的参数，例如启动、停止、重启等。
2. **查找服务脚本**：`service`​命令会根据用户提供的服务名称，查找位于`/etc/init.d/`​目录下对应的服务脚本文件。
3. **解析操作**：根据用户输入的操作（如start、stop、restart等），`service`​命令会在服务脚本中查找相应的操作函数。
4. **执行操作**：一旦找到操作函数，`service`​命令会调用该函数来执行用户请求的操作，例如启动、停止、重启等。
5. **显示输出**：`service`​命令可能会显示操作的结果、错误信息或成功消息，以便向用户提供反馈。

### 自定义管理脚本

　　首先，创建一个用于管理服务的Shell脚本。打开终端并输入以下命令，将以下内容保存为`myapp-service`​文件

```shell
touch /etc/init.d/myapp-service
```

　　然后，将以下内容粘贴到文件中，并保存：

```shell
#!/bin/bash

case "$1" in
    start)
        echo "Starting My App"
        # 启动命令，例如：/path/to/your/app &
        ;;
    stop)
        echo "Stopping My App"
        # 停止命令，例如：pkill -f /path/to/your/app
        ;;
    restart)
	# $0表示当前脚本的名称。当脚本被执行时，$0会被替换为脚本的完整路径。
        $0 stop
        sleep 2
        $0 start
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac

exit 0
```

　　给这个管理脚本添加执行权限：

```shell
sudo chmod +x /etc/init.d/myapp-service
```

　　现在可以使用类似于`service`​命令的方式来管理你的自定义服务：

```shell
$ service myapp-service start
Starting My App
$ service myapp-service stop
Stopping My App
$ service myapp-service restart
Stopping My App
Starting My App
```
