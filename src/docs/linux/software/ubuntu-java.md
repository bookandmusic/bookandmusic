---
title: ubuntu安装java
date: 2023-06-01T09:26:14Z
lastmod: 2023-08-05T08:28:00Z
article: false
---

# ubuntu安装java

---

* [https://zhuanlan.zhihu.com/p/137114682 - 知乎专栏](https://zhuanlan.zhihu.com/p/137114682)
* 2023-06-01 01:26:14

---

　　在这个指南中，我们将会描述如何在 Ubuntu 20.04 上安装 Java。

　　Java 是世界上最流行的编程语言之一，被用来构建各种不同的应用和系统。Java 运行在所有的主流操作系统和设备上。你可以在你的笔记本，电话和游戏中发现使用 Java 开发的应用。

## 一、开始之前

　　有很多不同的 Java 实现。OpenJDK 和 Oracle Java 是最主要的两个 Java 实现，除了 Oracle Java 拥有极少的一些额外特性之外，它们两个基本没有什么不同。 Oracle Java 授权仅仅允许作为非商业软件的使用，例如：个人用途和开发用途。

　　默认的 Ubuntu 20.04 源仓库包含了两个 OpenJDK 软件包，, Java Runtime Environment (JRE) 和 Java Development Kit (JDK)。JRE 主要包含了 Java 虚拟机（JVM），类和允许你运行 Java 程序的二进制包。 JDK 包含 JRE 和用于构建 Java 应用的开发/调试工具和库文件。

　　如果你不确定要安装哪一个版本的 Java，我们通常推荐安装 OpenJDK (JDK 11)版本。一些基于 Java 的应用可能需要运行在指定的 Java 版本下，你应该查阅应用文档。

## 二、安装 OpenJDK 11

　　在写作的时候，Java 11 是 Java 的一个长期支持版本（LTS）。它同时也是 Ubuntu 20.04的默认 Java 开发和运行环境。

　　以 root 或者其他 sudo 权限用户身份 运行下面的命令，更新软件包索引，并且安装OpenJDK 11 JDK 软件包：

```text
sudo apt update
sudo apt install openjdk-11-jdk
```

　　一旦安装完成，你可以通过检查 Java 版本来验证它：

```text
java -version
```

　　输出类似下面这样：

```text
openjdk version "11.0.7" 2020-04-14
OpenJDK Runtime Environment (build 11.0.7+10-post-Ubuntu-3ubuntu1)
OpenJDK 64-Bit Server VM (build 11.0.7+10-post-Ubuntu-3ubuntu1, mixed mode, sharing)
```

　　就这些！此时，你已经成功地在你的 Ubuntu 系统上安装好了 Java。

　　JRE 被包含在 JDK 软件包中。如果你仅仅需要 JRE，安装`openjdk-11-jre`​软件包。最小 Java 运行环境，安装`openjdk-11-jdk-headless`​软件包。

## 三、安装 OpenJDK 8

　　Java 8，前一个 Java LTS 版本，目前仍被广泛应用。如果你的应用运行在 Java 8 上，你可以通过输入下面的命令，安装它：

```text
sudo apt update
sudo apt install openjdk-8-jdk
```

　　通过检查 Java 版本，来验证安装过程：

```text
java -version
```

　　输出将会像下面这样：

```text
openjdk version "1.8.0_252"
OpenJDK Runtime Environment (build 1.8.0_252-8u252-b09-1ubuntu1-b09)
OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)
```

## 四、设置默认版本

　　如果你在你的 Ubuntu 系统上安装了多个 Java 版本，你可以输入下面的命令，检测哪个版本被设置成了默认值：

```text
java -version
```

　　想要修改默认的版本，使用`update-alternatives`​命令：

```text
sudo update-alternatives --config java
```

　　输出像下面这样：

```text
There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                            Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      auto mode
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      manual mode
  2            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   1081      manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

　　所有已经安装的 Java 版本将会列出来。输入你想要设置为默认值的序号，并且按"Enter”。

## 五、JAVA_HOME 环境变量

　　在一些 Java 应用中，环境变量`JAVA_HOME`​被用来表示 Java 安装位置。

　　想要设置 `JAVA_HOME`​ 变量，首先使用`update-alternatives`​找到 Java 安装路径:

```text
sudo update-alternatives --config java
```

　　在这个例子中，安装路径如下：

* OpenJDK 11 is located at `/usr/lib/jvm/java-11-openjdk-amd64/bin/java`​
* OpenJDK 8 is located at `/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java`​

　　一旦你发现你偏好的 Java 安装路径，打开`/etc/environment`​文件：

```text
sudo nano /etc/environment
```

　　假设你想设置 `JAVA_HOME`​ 指定到 OpenJDK 11，在文件的末尾，添加下面的行：

```text
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
```

　　想要让修改在当前 shell 生效，你可以登出系统，再登入系统，或者运行下面的命令：

```text
source /etc/environment
```

　　验证 `JAVA_HOME`​ 环境变量被正确设置：

```text
echo $JAVA_HOME
```

　　你应该可以看到 Java 安装路径：

```text
/usr/lib/jvm/java-11-openjdk-amd64
```

　　你可以使用 apt 卸载 Java，就像卸载任何软件包一样。

　　例如，想要卸载`default-jdk`​软件包，输入：

```text
sudo apt remove openjdk-11-jdk
```

## 七、总结

　　OpenJDK 11 和 OpenJDK 8 都在默认的 Ubuntu 20.04 软件源仓库中，并且可以使用`apt`​软件包管理工具进行安装。

　　​​

　　​​
