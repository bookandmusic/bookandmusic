---
title: Linux环境
date: 2023-07-29T08:13:01Z
lastmod: 2023-08-05T08:56:11Z
article: false
order: 1
---

# Linux环境

　　Linux下编译安装大多数软件的过程，主要分为几个步骤：

1. 安装编译器和各种依赖
2. 下载源码并解压
3. 通过configure配置编译安装的参数
4. make && make install
5. 将编译出来的二进制文件添加到环境变量

## 手动编译

　　详细记录在Linux上编译安装指定版本Python解释器的过程和可能遇到的问题，及多个Python版本并存的使用方法。

### 安装编译工具和依赖包

　　在正式开始之前，建议首先检查系统软件是否均为最新，并更新到最新版本，然后安装必须得依赖软件。

> Ubuntu

```bash
sudo apt install -y gcc build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libbz2-dev liblzma-dev sqlite3 libsqlite3-dev tk-dev uuid-dev libgdbm-compat-dev

```

> Centos

```bash
yum -y install wget xz tar gcc make tk-devel    sqlite-devel zlib-devel readline-devel openssl-devel curl-devel tk-devel gdbm-devel  xz-devel  bzip2-devel
```

### 下载源代码

　　可通过 `wget` 下载：

```bash
# 下载 Python 3.9.12
sudo wget https://registry.npmmirror.com/-/binary/python/3.9.12/Python-3.9.12.tar.xz  /opt
# 下载其他版本只需替换版本号数字
```

　　解压并进入该目录，后续的所有命令均在该目录中执行：

```bash
# 解压
tar -xf Python-3.9.12.tar.xz
# 进入该目录
cd Python-3.9.12/
```

### 配置

```bash
# 检查依赖与配置编译
sudo ./configure --enable-optimizations --with-lto --enable-shared
```

　　此处使用了三个可选配置项，含义如下：

- --enable-optimizations：用 [PROFILE_TASK](https://docs.python.org/zh-cn/3/using/configure.html#envvar-PROFILE_TASK) 启用以配置文件主导的优化（PGO）
- --with-lto：在编译过程中启用链接时间优化（LTO）
- --enable-shared：启用共享 Python 库 libpython 的编译

　　更多可用配置项的信息，请参阅 [Python 官方文档](https://docs.python.org/zh-cn/3/using/configure.html)。

　　经过一系列检查无误之后，会自动生成 Makefile，即可进行下一步的编译了。

### 编译

　　完成配置，生成 Makefile 后，就可以开始编译了。**编译耗时较长**，可以使用 `-j` 选项指定参与编译的 CPU 核心数，例如此机器为 8 核 CPU：

```bash
# 编译，-j 后面的数字为参与编译的CPU核心数，根据个人机器配置调整
sudo make -j 8
```

　　编译结束后，注意仔细查看一下输出，检查可能存在的错误：

```bash
# 一种可能出现的问题：
$ sudo make
# ......省略部分输出......
Python build finished successfully!
The necessary bits to build these optional modules were not found:
_dbm                  _tkinter              _uuid              
To find the necessary bits, look in setup.py in detect_modules() for the module's name.
```

　　如果出现类似如上的警告，说明编译时有部分软件包不可用，导致编译出的 Python 有部分可选模块不可用。检查[上一节](https://zhuanlan.zhihu.com/write#安装其他依赖)中提到的依赖是否都已安装，或求助于网络搜索引擎，安装对应软件包后再次编译即可。

### 安装

```bash
# 安装二进制文件
sudo make altinstall
```

　　在 Makefile 中有如下提示：

> If you have a previous version of Python installed that you don't want to overwrite, you can use "make altinstall" instead of "make install".

　　故应使用 `altinstall` 而不是 `install` 。二者的一个重要区别在于，后者会创建符号链接，将 `python3` 等命令链接到正在安装的新版本 Python 3 上，这可能会破坏系统。更多信息请参阅当前目录下的 `README.rst` 文件。

### 链接动态库

　　由于[编译配置](https://zhuanlan.zhihu.com/write#配置)中有 `--enable-shared` 的选项，故此时直接使用命令 `python3.9` 会提示无法找到 `libpython3.9.so.1.0` 的错误。只需找到该 `so` 文件，复制（或创建符号链接）到 `/usr/lib/` 目录下即可：

```bash
# 找到 libpython 的位置
$ whereis libpython3.9.so.1.0
libpython3.9.so.1: /usr/local/lib/libpython3.9.so.1.0
# 在 /usr/lib/ 下创建 libpython 的符号链接
$ sudo ln -s /usr/local/lib/libpython3.9.so.1.0 /usr/lib/
```

### 使用 Python 3.9

　　完成安装后，Python 3.9 会与系统原有的 Python3 共存。由于 Ubuntu 系统、安装的其他软件等很可能会依赖于系统原有的python3，所以不要移除原有Python 环境，也不要对 `python3` 等命令进行修改。

　　直接在命令行使用 `python3.9` 命令即可调用新安装的解释器：

```bash
# 在命令行使用 Python 交互式解释器
$ python3.9
Python 3.9.12 (main, Apr 22 2022, 18:58:57) 
[GCC 11.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>

# 查看该命令所在位置
$ which python3.9
/usr/local/bin/python3.9
```

　　类似的，使用 Python 3.9 的 `pip` 的命令为 `pip3.9`

```bash
# 查看 pip3.9 版本
$ pip3.9 -V
pip 22.0.4 from /usr/local/lib/python3.9/site-packages/pip (python 3.9)
```

## Pyenv

　　当系统中需要多个python版本，每次都手动编译安装，就太过于麻烦。

　　我们可以借助`pyenv`，根据需求在系统里安装和管理多个 Python 版本

1. 配置当前用户的python的版本
2. 配置当前shell的python版本
3. 配置某个项目（目录及子目录）的python版本
4. 配置多个虚拟环境

### 工作原理介绍

　　pyenv是利用系统环境变量PATH的优先级，劫持python的命令到pyenv上，根据用户所在的环境或目录，使用不同版本的python。

　　对于系统环境变量 PATH ，里面包含了一串由冒号分隔的路径，例如 `/usr/local/bin:/usr/bin:/bin`。每当在系统中执行一个命令时，例如 `python` 或 `pip`，操作系统就会在 PATH 的所有路径中从左至右依次寻找对应的命令。因为是依次寻找，因此排在左边的路径具有更高的优先级。

　　在PATH 最前面插入一个 `$(pyenv root)/shims` 目录，`$(pyenv root)/shims`目录里包含名称为`python`以及`pip`等可执行脚本文件；当用户执行`python`或`pip`命令时，根据查找优先级，系统会优先执行`shims`目录中的同名脚本。`pyenv` 正是通过这些脚本，来灵活地切换至我们所需的Python版本。

> 更详细的资料，可以查看`pyenv`的文档介绍或者源码实现。

### pyenv的安装

#### 安装依赖

> Debian/Ubuntu/Linux Mint

```bash
sudo apt install curl git-core gcc make zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev libssl-dev
```

> CentOS/RHEL

```bash
yum -y install epel-release
yum install git gcc zlib-devel bzip2-devel readline-devel sqlite-devel openssl-devel
```

#### 安装pyenv

> 推荐采用第一种方式安装，可以一键安装`pyenv`的所有插件。

```bash
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
# 或者
git clone https://github.com/yyuu/pyenv.git ~/.pyenv
```

#### 配置环境变量

> 将环境变量追加到`~/.bashrc`，如果是zsh，则追加到 `~/.zshrc`

　　如果采用第一种

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
```

　　如果采用第二种

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

#### 配置国内镜像

```bash
echo 'export PYTHON_BUILD_MIRROR_URL_SKIP_CHECKSUM=1' >> ~/.bashrc
echo 'export PYTHON_BUILD_MIRROR_URL="https://registry.npmmirror.com/-/binary/python"' >> ~/.bashrc
```

#### 激活环境变量

```bash
source ~/.bashrc
```

#### 查看pyenv版本

```bash
pyenv --version
pyenv 2.3.9
```

### Pyenv命令

#### 安装python

　　查看可安装的python的版本

```bash
pyenv install –list
```

　　安装python

```bash
pyenv install 3.9.15
```

　　卸载python

```bash
pyenv uninstall 3.9.15
```

#### 查看使用的python版本

　　查看所有python版本

```bash
pyenv versions
  system
* 3.9.13 (set by /Users/liusf/.pyenv/version)
```

　　查看当前使用的python版本

```shell
pyenv version
3.9.13 (set by /Users/liusf/.pyenv/version)
```

#### 管理python版本

　　`pyenv global <version>`：配置当前用户的系统使用的python版本

```shell
$ python -V
Python 2.6.6
$ pyenv global 3.6.4
$ python -V
Python 3.6.4
$ exit
logout
#重新登录
$ python -V
Python 3.6.4
```

　　`pyenv shelll <version>`：配置当前shell的python版本，退出shell则失效

```shell
$ python -V
Python 2.6.6
$ pyenv shell 3.5.4
$ python -V
Python 3.5.4
# 当前shell下，取消配置的使用python shell --unset；若退出此shell，配置也会失效。
$ pyenv shell --unset
```

　　`pyenv local <version>`：配置所在项目（目录）的python版本

```shell
# 新建一个文件夹~/project，设置python版本
$ mkdir project
$ cd project
$ pyenv local 3.5.4
# 在此目录下，查看版本
$ python -V
Python 3.5.4
# 退出目录，仍然是之前的python版本
$ cd ~
$ python -V
Python 3.6.4
```

### 虚拟环境`pyenv-virtualenv`

　　在第一种方式中，会把pyenv的虚拟环境插件也安装上，我们就可以使用他来管理我们项目的环境依赖

　　当然，也可以使用如下命令单独安装该插件，当然此时的配置就需要参考第一种方式：

```shell
$ git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
```

　　使用pyenv install安装的python版本，比如3.6.4；解释器安装的路径为`~/.pyenv/versions/3.6.4/`;插件的安装的路径为`~/.pyenv/versions/3.6.4/lib/python3.6/site-packages`；

　　使用pyenv-virtualenv创建python虚拟环境，实质上是在`~/.pyenv/versions/3.6.4/`下创建一个文件夹evns，存放该虚拟环境python的解释器；并且在`~/.pyenv/`下创建一个软连接，该虚拟环境可以通过pyenv进行管理；

```shell
$ pyenv virtualenv 3.6.4 my_3.6.4
Requirement already satisfied: setuptools in /home/python/.pyenv/versions/3.6.4/envs/my_3.6.4/lib/python3.6/site-packages
Requirement already satisfied: pip in /home/python/.pyenv/versions/3.6.4/envs/my_3.6.4/lib/python3.6/site-packages
 
$ ll ~/.pyenv/versions/
total 8
drwxr-xr-x 6 python python 4096 Jul 20 00:59 3.5.4
drwxr-xr-x 7 python python 4096 Jul 21 01:03 3.6.4
lrwxrwxrwx 1 python python   48 Jul 21 01:03 my_3.6.4 -> /home/python/.pyenv/versions/3.6.4/envs/my_3.6.4
```

　　查看python虚拟环境

```shell
$ pyenv virtualenvs
  3.6.4/envs/my_3.6.4 (created from /home/python/.pyenv/versions/3.6.4)
  my_3.6.4 (created from /home/python/.pyenv/versions/3.6.4)
 
```

　　切换到python虚拟环境

```shell
$ pyenv shell my_3.6.4
(my_3.6.4) [python@localhost 3.6.4]$
(my_3.6.4) [python@localhost 3.6.4]$ pyenv versions
  system
  3.5.4
  3.6.4
  3.6.4/envs/my_3.6.4
* my_3.6.4 (set by PYENV_VERSION environment variable)
```

　　除此之外，还可以使用另一种方式切换到虚拟环境

```shell
pyenv activate my_3.6.4
pyenv deactivate
```

　　删除虚拟环境则使用以下命令

```shell
pyenv uninstall my_3.6.4
pyenv  virtualenv-delete my_3.6.4
```

### 虚拟环境`pyenv-virtualenvwrapper`

　　通过下列命令安装`pyenv-virtualenvwrapper`:

```shell
$ git clone https://github.com/pyenv/pyenv-virtualenvwrapper.git $(pyenv root)/plugins/pyenv-virtualenvwrapper
```

　　这会将 `pyenv-virtualenvwrapper` 的最新开发版本安装到 `$(pyenv root)/plugins/pyenv-virtualenvwrapper` 目录中。
在`.bashrc`(或`.zshrc`)中添加下列内容：

```shell
export PYENV_VIRTUALENVWRAPPER_PREFER_PYVENV="true"
export WORKON_HOME=$HOME/.virtualenvs
pyenv virtualenvwrapper_lazy
```

> 注意：此插件与 `pyenv-virtualenv` 不同。`pyenv-virtualenvwrapper` 有助于与`virtualenvwrapper` 交互，也就是说，`pyenv` 和 `virtualenvwrapper` 仍然是分开的，而 `pyenv-virtualenv` 是一个完整的组合。

　　也就是说， 第一次使用新的 Python 环境需要安装`virtualenvwrapper`

```shell
pip install virtualenvwrapper 
```

　　接下来就是 `virtualenvwrapper`的使用方法：

- `workon`:打印所有的虚拟环境；
- `mkvirtualenv xxx`:创建xxx虚拟环境;
- `workon xxx`:使用xxx虚拟环境;
- `deactivate`:退出xxx虚拟环境；
- `rmvirtualenv xxx`:删除xxx虚拟环境。
