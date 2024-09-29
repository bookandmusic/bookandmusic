---
created: 2023-07-29T00:21:13.000Z
article: false
order: 2
title: pypi镜像
updated: 2024-09-29T03:18:44.000Z
---
### 镜像源

- 清华：`https://pypi.tuna.tsinghua.edu.cn/simple`
- 阿里云：`http://mirrors.aliyun.com/pypi/simple/`
- 中国科技大学 `https://pypi.mirrors.ustc.edu.cn/simple/`
- 华中理工大学：`http://pypi.hustunique.com/`
- 山东理工大学：`http://pypi.sdutlinux.org/`
- 豆瓣：`http://pypi.douban.com/simple/`

### 文件修改

#### Linux/Mac

修改 `~/.pip/pip.conf` (没有就创建一个文件夹及文件。文件夹要加`.`，表示是隐藏文件夹)

> 内容如下

```bash
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host=mirrors.aliyun.com
```

#### windows

直接在 user 目录中创建一个 pip 目录，如：`C:\Users\xx\pip`，新建文件`pip.ini`。内容同上。

### 终端修改

```bash
pip config set global.index-url http://mirrors.aliyun.com/pypi/simple/ # 终端使用命令设置pip镜像
pip install pip -U  # 升级pip包管理工具
```

‍
