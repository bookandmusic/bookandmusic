---
title: 解压缩
category: [Linux]
tag: [tar, zip]
date: 2021-06-12 22:29:36
updated: 2023-03-02 22:11:28
article: false
---

# 解压缩

## tar

　　tar命令是Linux系统中用于打包和压缩文件的命令。它可以将一个或多个文件打包成一个.tar格式的文件，以便于存储和传输。

### 压缩

　　以下是一些常用的tar命令打包示例：

```shell
# 将单个文件打包为.tar格式
tar -cvf archive.tar file1
# 将多个文件打包为.tar格式
tar -cvf archive.tar file1 file2 file3
# 将文件夹打包为.tar格式
tar -cvf archive.tar foldername/


# 将文件打包为tar.gz
tar -czvf archive.tar.gz file1 file2 file3
# 将文件打包为tar.xz格式
tar -cJvf archive.tar.xz file1 file2 file3
```

* `-c`​：创建一个新归档

* ​`-v`​：详细地列出处理的文件
* ​`-f`​：使用的归档文件
* ​`-z`​：通过 gzip 过滤归档
* ​`-J`​：通过 xz 过滤归档
* `-j`​：通过 bzip2 过滤归档

### 解压

　　以下是一些常用的tar命令解压示例：

```shell
tar -xvf archive.tar -C 目标目录/
tar -zxvf archive.tar.gz -C 目标目录/
tar -Jxvf archive.tar.xz -C 目标目录/
```

* ​`-z`​:表示通过gzip过滤归档(用gzip解压)
* ​`-x`​:表示从归档中解出文件(提取压缩包)
* ​`-v`​:表示详细地列出处理过程
* ​`-f`​：使用的归档文件
* ​`-z`​：通过 gzip 过滤归档
* ​`-J`​：通过 xz 过滤归档
* ​`-j`​：通过 bzip2 过滤归档

## zip

　　tar命令是Linux系统中用于打包和压缩文件的命令。它可以将一个或多个文件打包成一个.tar格式的文件，以便于存储和传输。以下是一些常用的tar命令示例：

### 压缩

　　以下是一些常用的zip命令压缩示例

```shell
# 将单个文件压缩为.zip格式
zip filename.zip filename
# 将多个文件压缩为.zip格式
zip archive.zip file1 file2 file3
# 将文件夹压缩为.zip格式，并排除所有 .DS_Store 文件
zip -r archive.zip foldername/ -x "^\.DS_Store$"
```

* ​`-r`​: 递归地压缩目录及其子目录中的所有文件
* ​`-x`​：排除指定的文件或目录，且支持正则表达式

### 解压

　　以下是一些常用的zip命令解压示例

```shell
# 解压到特定目录
unzip archive.zip -d /path/to/directory/
# 不解压，直接查看压缩文件
unzip -l archive.zip
```

　　‍
