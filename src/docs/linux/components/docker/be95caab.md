---
order: 12
article: false
title: 镜像仓库
date: 2024-07-03 16:04:53
updated: 2024-07-31 03:21:42
---
## Docker仓库介绍

在使用Docker时，我们经常需要将我们自己的镜像上传到远程仓库，供其他人或者其他机器使用。而Docker仓库就是用来存储Docker镜像的地方。Docker官方提供了公共的Docker Hub，我们可以在上面存储和分享镜像。但是由于网络原因，有时候我们需要自己搭建Docker仓库，或者是为了保证数据安全，我们需要自己的私有仓库。下面就介绍一下如何自己搭建Docker仓库。

## 搭建Docker仓库

拉取镜像仓库

```bash
docker pull registry
```

查看所有镜像

```bash
docker images
```

由于Registry是一个镜像，运行后若我们删除了容器，里面的资源就会丢失，
所以我们在运行时，指定一个资源的挂载目录，映射到宿主的一个目录下，这样资源就不会丢失了。

```bash
mkdir -p /opt/docker_registry/
cd /opt/docker_registry/
mkdir auth
mkdir data
mkdir config
```

创建用户名和密码的认证信息

```shell
docker run --entrypoint htpasswd registry:2.6.2 -Bbn admin 123456 > auth/htpasswd
```

查看认证文件，发现信息已经被加密处理过

```shell
$ cat auth/htpasswd
admin:$2y$05$49cDI4yWugmWExUzlc0YUe0PjGHomP/dvivj81cH1NkIJUoRfrl32
```

配置文件 `cofig/config.yaml`​

```shell
version: 0.1
log:
  fields:
    service: registry
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
  delete:
    enabled: true
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
```

启动镜像服务器registry

* ​`REGISTRY_AUTH=htpasswd`​ `# 以 htpasswd 的方式认证`​
* ​`REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm`​ `# 注册认证`​
* ​`REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd`​ `# 认证的用户密码`​
* ​`REGISTRY_STORAGE_DELETE_ENABLED=true`​ `# 希望能够删除镜像标记`​

```bash
docker run -d -p 5000:5000 --name=localregistry --restart=always\
 	-v /opt/docker_registry/data/:/var/lib/registry \
	-v /opt/docker_registry/auth/:/auth \
	-v /opt/docker_registry/config/:/etc/docker/registry/ \
	-e "REGISTRY_AUTH=htpasswd" \
	-e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
	-e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
	-e "REGISTRY_STORAGE_DELETE_ENABLED=true" \
docker.io/registry
```

## 使用自己的Docker仓库

搭建完成后，我们可以使用Docker客户端来上传和下载镜像。在上传镜像前，我们需要先给镜像打上标签，标签的格式为`registry-domain/repo-name:tag`​，其中`registry-domain`​指的是你自己的域名或者IP地址，`repo-name`​为仓库名，`tag`​为标签名。

### push

例如，假设我们的Docker仓库地址为192.168.1.100:5000，我们可以先使用docker tag命令打上标签，然后使用docker push上传镜像：

```shell
➜  docker_registry docker images
REPOSITORY                    TAG       IMAGE ID       CREATED         SIZE
ubuntu                        latest    ba6acccedd29   21 months ago   72.8MB

$ docker tag ubuntu:latest localhost:5000/liusf/ubuntu:latest

$ docker images
REPOSITORY                    TAG       IMAGE ID       CREATED         SIZE
ubuntu                        latest    ba6acccedd29   21 months ago   72.8MB
localhost:5000/liusf/ubuntu   latest    ba6acccedd29   21 months ago   72.8MB

$ docker push localhost:5000/liusf/ubuntu:latest
The push refers to repository [localhost:5000/liusf/ubuntu]
9f54eef41275: Pushed
latest: digest: sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17 size: 529
```

### pull

删除本地镜像，从仓库中重新拉取

```shell
$ docker rmi localhost:5000/liusf/ubuntu:latest
Untagged: localhost:5000/liusf/ubuntu:latest
Untagged: localhost:5000/liusf/ubuntu@sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17

$ docker images
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
registry         latest    b8604a3fe854   20 months ago   26.2MB
ubuntu           latest    ba6acccedd29   21 months ago   72.8MB
registry         2.6.2     10b45af23ff3   3 years ago     28.5MB

$ docker pull localhost:5000/liusf/ubuntu:latest
latest: Pulling from liusf/ubuntu
Digest: sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17
Status: Downloaded newer image for localhost:5000/liusf/ubuntu:latest
localhost:5000/liusf/ubuntu:latest

$ docker images
REPOSITORY                    TAG       IMAGE ID       CREATED         SIZE
registry                      latest    b8604a3fe854   20 months ago   26.2MB
ubuntu                        latest    ba6acccedd29   21 months ago   72.8MB
localhost:5000/liusf/ubuntu   latest    ba6acccedd29   21 months ago   72.8MB
registry                      2.6.2     10b45af23ff3   3 years ago     28.5MB
```

## API

Docker Registry HTTP API 是面向 Docker Registry v2 的 API，用于与 Registry 进行通信以管理 Docker 镜像。常用的 API 如下：

1. **检查 API 版本**
   请求路径: `GET /v2/`​
   参数列表: 无
   返回值: 如果成功，返回 200 OK，表示正在使用 Docker Registry v2 API。
2. **检索所有镜像仓库**

   请求路径: `GET /v2/_catalog`​

   参数列表: 无

   返回值: 成功时返回一个 JSON 对象，包含所有镜像仓库。
3. **获取镜像仓库的所有标签**
   请求路径: `GET /v2/<name>/tags/list`​
   参数列表:

   * ​`name`​: 镜像仓库名称

   返回值: 成功时返回一个 JSON 对象，包含仓库的所有标签。
4. **拉取镜像的 manifest**
   请求路径: `GET /v2/<name>/manifests/<reference>`​
   参数列表:

   * ​`name`​: 镜像仓库名称
   * ​`reference`​: 镜像标签或摘要

   返回值: 成功时返回镜像的 manifest，它是一个 JSON 对象。
5. **删除镜像的 manifest**
   请求路径: `DELETE /v2/<name>/manifests/<reference>`​
   参数列表:

   * ​`name`​: 镜像仓库名称
   * ​`reference`​: 镜像摘要

   返回值: 成功时返回 202 Accepted，表示已成功删除。

### Search

docker search 在registry v2版本中是不支持docker search 私有镜像的；这时候，我们需要通过V2版本中提供的REST API 配合shell命令来完成查找请求

```shell
$ curl -u "admin:123456" -X GET http://localhost:5000/v2/_catalog
{"repositories":["liusf/ubuntu"]}

$ curl -u "admin:123456" -X GET http://localhost:5000/v2/_catalog 2>/dev/null | python -m json.tool | grep 'liusf'
        "liusf/ubuntu"
```

### DELETE

还有一个常用的需求就是从私有仓库删除不需要的image. 这个在docker 的命令中也没有直接的提供；这时候依然需要用REST API的方式来实现删除操作

获取具有所需标记的清单：

```shell
$ curl -u "admin:123456" -I GET localhost:5000/v2/liusf/ubuntu/manifests/latest --header "Accept: application/vnd.docker.distribution.manifest.v2+json"
curl: (6) Could not resolve host: GET
HTTP/1.1 200 OK
Content-Length: 529
Content-Type: application/vnd.docker.distribution.manifest.v2+json
Docker-Content-Digest: sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17
Docker-Distribution-Api-Version: registry/2.0
Etag: "sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17"
X-Content-Type-Options: nosniff
Date: Sat, 29 Jul 2023 12:58:29 GMT
```

复制并最终删除该图像：

```shell
$ curl -u "admin:123456" -X DELETE localhost:5000/v2/liusf/ubuntu/manifests/sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17
```

运行垃圾回收器

```shell
$ docker exec localregistry registry garbage-collect /etc/docker/registry/config.yml
liusf/ubuntu

0 blobs marked, 4 blobs and 0 manifests eligible for deletion
blob eligible for deletion: sha256:7b1a6ab2e44dbac178598dabe7cff59bd67233dba0b27e4fbd1f9d4b3c877a54
time="2023-07-29T13:00:46.479784254Z" level=info msg="Deleting blob: /docker/registry/v2/blobs/sha256/7b/7b1a6ab2e44dbac178598dabe7cff59bd67233dba0b27e4fbd1f9d4b3c877a54" go.version=go1.11.2 instance.id=78547b17-c8d3-4abf-8315-90b2ae4ce1a8 service=registry
time="2023-07-29T13:00:46.484233213Z" level=info msg="Deleting blob: /docker/registry/v2/blobs/sha256/7c/7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17" go.version=go1.11.2 instance.id=78547b17-c8d3-4abf-8315-90b2ae4ce1a8 service=registry
blob eligible for deletion: sha256:7cc0576c7c0ec2384de5cbf245f41567e922aab1b075f3e8ad565f508032df17
time="2023-07-29T13:00:46.487909072Z" level=info msg="Deleting blob: /docker/registry/v2/blobs/sha256/a3/a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4" go.version=go1.11.2 instance.id=78547b17-c8d3-4abf-8315-90b2ae4ce1a8 service=registry
blob eligible for deletion: sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
blob eligible for deletion: sha256:ba6acccedd2923aee4c2acc6a23780b14ed4b8a5fa4e14e252a23b846df9b6c1
time="2023-07-29T13:00:46.493359585Z" level=info msg="Deleting blob: /docker/registry/v2/blobs/sha256/ba/ba6acccedd2923aee4c2acc6a23780b14ed4b8a5fa4e14e252a23b846df9b6c1" go.version=go1.11.2 instance.id=78547b17-c8d3-4abf-8315-90b2ae4ce1a8 service=registry
```

删除镜像目录

```shell
$ docker exec localregistry rm -rf /var/lib/registry/docker/registry/v2/repositories/liusf/ubuntu
```

查看镜像目录是否存在

```shell
$ curl -u "admin:123456" -X GET http://localhost:5000/v2/_catalog
{"repositories":[]}
```

> 最后还需要重启整个服务，才能彻底清楚所有信息，保证再次上传同一镜像可以上传成功

‍

‍
