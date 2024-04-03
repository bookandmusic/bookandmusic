---
title: 可视化工具Portainer
date: 2023-04-26T22:18:52Z
lastmod: 2023-04-26T22:18:52Z
article: false
order: 9
---

# Docker轻量级可视化工具Portainer

Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便地管理Docker环境，包括单机环境和集群环境。

一、官网

https://www.portainer.io/

https://docs.portainer.io/v/ce-2.9/start/install/server/docker/linux

二、步骤

docker命令安装

```shell
docker run -d -p 8000:8000 -p 9000:9000 --name portainer     --restart=always     -v /var/run/docker.sock:/var/run/docker.sock     -v portainer_data:/data     portainer/portainer 
```

第一次登录需创建admin，访问地址：xxx.xxx.xxx.xxx:9000

```shell
用户名，直接用默认admin 
密码记得8位，随便你写 
```

设置admin用户和密码后首次登陆

选择local选项卡后本地docker详细信息展示
