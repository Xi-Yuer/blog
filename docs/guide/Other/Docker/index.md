---
title: Docker
date:  2022-02-01
sidebar: 'auto'
categories:
 - 后端
tags:
 - Docker
 
---
# Docker



## Docker基础命令

- docker容器? 镜像?

```
docker 镜像 ===> 类似于类/对象
docker 容器 ===> 类似于实例/new实例
```

- 启动docker

```
systemctl start docker
```

- 关闭docker

```
docker stop docker
```

- 重启docker

```
systemctl restart docker
```

- docker设置随服务器启动而启动

```
systemctl enable docker
```

- 查看docker运行状态(绿色说明docker正在运行)

```
systemctl status docker
```

- 查看docker版本信息

```
docker version
```

- 查看docker详细信息（容器运行以及镜像个数）

```
docker info
```

- docker帮助命令（可查看某些命令）

```bash
docker --help
#pull相关指令
docker pull --help
```



## Docker镜像命令

- 查看自己服务器中docker镜像列表

```bash 
docker images
#或
docker image ls
```

- 搜索镜像

```bash
docker search 镜像名
#搜索mysql镜像 过滤条件是收藏数大于10的镜像
docker search --filter stars=10 mysql
```


- 拉取镜像:不加tag(版本号) 即拉取docker仓库中 该镜像的最新版本latest 加:tag 则是拉取指定版本

```bash
docker pull 镜像名 
docker pull 镜像名:tag
```

![image-20211208114714340](https://s2.loli.net/2022/06/13/V8gUcpb1x6jKqiO.png)



- 运行镜像：取一个tomcat 跑起来试一试

```
docker run 镜像名
docker run 镜像名:Tag
```

```
docker pull tomcat
docker run tomcat
```

![image-20211207095919690-16388423614761](https://s2.loli.net/2022/06/13/6nsLIMcUAd1uaRb.png)

![image-20211207100001232](https://s2.loli.net/2022/06/13/LEwPUbnGxk2ysQZ.png)

> 运行后 出现tomcat 默认占用的8080 端口 说明该镜像已经是启动了



- 删除镜像 

```bash
#删除一个
docker rmi -f 镜像名/镜像ID

#删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

#删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)

#强制删除镜像
docker image rm 镜像名称/镜像ID
```



- 保存镜像

> 将镜像 保存为tar 压缩文件 这样方便镜像转移和保存 ,然后 可以在任何一台安装了docker的服务器上 加载这个镜像

```bash
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字
# exmaple
docker save tomcat -o /myimg.tar
```



![image-20211207104007684](https://s2.loli.net/2022/06/13/EHZWTSun5cfrXz2.png)

![image-20211207104407809](https://s2.loli.net/2022/06/13/T6ZwFRol2PYxgat.png)



- 加载镜像 

> 任何装 docker 的地方加载镜像保存文件,使其恢复为一个镜像

```
docker load -i 镜像保存文件位置
```





## Docker容器命令



- 查看正在运行容器列表

```bash
docker ps
#查看所有容器 -----包含正在运行 和已停止的
docker ps -a
```

> 容器怎么来呢 可以通过run 镜像 来构建 自己的容器实例



- 运行一个容器

```
#1. 拉取redis 镜像
docker pull redis:5.0.5
#2.命令启动
docker run -it -d --name redis001 redis:5.0.5 /bin/bash
```

> -it 表示 与容器进行交互式启动
>
> *-d 表示可后台运行容器* 
>
> *-d 表示可后台运行容器* 起的名字



- 查看已运行容器

```
docker ps
```

![image-20211207105448644-16388456906117-16388457450938](https://s2.loli.net/2022/06/13/ME4DAfoIG73rvCp.png)



- 停止/运行容器

```
docker stop/start 容器名/容器ID
```



- 删除容器

```bash
#删除一个容器
docker rm -f 容器名/容器ID
#删除多个容器 空格隔开要删除的容器名或容器ID
docker rm -f 容器名/容器ID 容器名/容器ID 容器名/容器ID
#删除全部容器
docker rm -f $(docker ps -aq)
```



## Dockerfile文件



> Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。



```bash
FROM nginx
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo 'echo init ok!!'
```



```bash
#依赖node-alpine(体积小的包)
FROM node:14-alpine as build

RUN mkdir /app
WORKDIR /app
#拷贝当前文件夹下的所有文件到app文件夹中
COPY . /app
RUN npm install
RUN npm run build

#依赖nginx
FROM nginx:latest

RUN mkdir -p /var/www/
COPY --from=build /app/build /var/www/
COPY nginx.conf /etc/nginx/
```



**nginx**

```bash
worker_processes auto;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    #tcp_nopush     on;
 
    #keepalive_timeout  0;
    keepalive_timeout  65;
 
    #gzip  on;
 
    client_max_body_size   20m;
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
     location / {
     	#根文件夹
        root   /var/www;
        #在index文件下依次找index.html index.htm
        index  index.html index.htm;
        #
        try_files $uri $uri/ /index.html;
        }
        #查找失败
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
     } 
}
```



# Docker前端项目部署



## 服务器安装Docker

- **登录到服务器ip地址**

``` sh
ssh root@112.124.28.xx 
```

- **安装Docker的依赖库**

```sh
yum install -y yum-utils device-mapper-persistent-data lvm2
```

- **添加Docker CE的软件源信息**

```sh
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

- **安装Docker CE**

```sh
yum makecache fast
yum -y install docker-ce
```

- **启动Docker服务**

```sh
systemctl start docker
```

- **配置阿里镜像加速**

![image-20211206134818693](https://s2.loli.net/2022/06/13/B4nk6ZOEU7xRbPm.png)

- **配置Docker的自定义镜像仓库地址**

```bash
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://kqh8****.mirror.aliyuncs.com"]
}
EOF
# 将下面命令中的镜像仓库地址https://kqh8****.mirror.aliyuncs.com替换为阿里云为您提供的专属镜像加速地址
```

- **重新加载服务配置文件**

```sh
systemctl daemon-reload
```

- **重启Docker服务**

```sh
systemctl restart docker
```



##  构建vue应用镜像

>  Nginx 是一个高性能的 HTTP 和反向代理服务器，使用 Nginx 镜像作为基础来构建vue应用镜像。

### 获取nginx镜像

- 执行拉取nginx镜像命令

```sh
docker pull nginx
```

- Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数运行环境。
- Docker 镜像相关操作有：
  - 搜索镜像，docker search [REPOSITORY[:TAG]]；
  - 拉取镜像，docker pull [REPOSITORY[:TAG]]；
  - 查看镜像列表，docker image ls；
  - 删除镜像，docker image rm [REPOSITORY[:TAG]] ; docker rmi [REPOSITORY[:TAG]] 等等。
- Docker 镜像名称由 REPOSITORY 和 TAG 组成 [REPOSITORY[:TAG]]，TAG默认为 latest。

### 创建Nginx Config 配置文件

- 在项目根目录下创建cms文件夹 ，并在cms文件夹下创建nginx.conf文件

  - ![image-20211206102128557-16387701241531](https://s2.loli.net/2022/06/13/gkCa4t6XHR8NeuP.png)

- 在nginx.conf文件中编写以下配置

  > 该配置文件定义了首页的指向为 /usr/share/nginx/html/index.html，所以我们可以一会把构建出来的 index.html 文件和相关的静态资源放到 /usr/share/nginx/html 目录下。

  - ```nginx
    worker_processes auto;
    events {
        worker_connections  1024;
    }
    http {
        include       mime.types;
        default_type  application/octet-stream;
        sendfile        on;
        #tcp_nopush     on;
     
        #keepalive_timeout  0;
        keepalive_timeout  65;
     
        #gzip  on;
     
        client_max_body_size   20m;
        server {
            listen       80;
            server_name  localhost;
            #charset koi8-r;
            #access_log  logs/host.access.log  main;
         location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
            }
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
         } 
    }
    ```

- 创建 Dockerfile 文件

- 在cms文件夹下创建Dockerfile文件并写入一下内容

  ```bash	
  # 设置基础镜像
  FROM nginx
  # 将build文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
  COPY build/  /usr/share/nginx/html/
  COPY nginx.conf /etc/nginx/nginx.conf
  RUN echo 'echo init ok!!'
  ```

- 自定义构建镜像的时候基于 Dockerfile 来构建。

- FROM nginx 命令的意思该镜像是基于 nginx:latest 镜像而构建的。

- COPY build/ /usr/share/nginx/html/ 命令的意思是将项目根目录下 build 文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下。

- COPY nginx.conf /etc/nginx/nginx.conf 命令的意思是将cms 目录下的 nginx.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.conf 配置来替换 Nginx 镜像里的默认配置。

- 基于该 Dockerfile 构建 Vue 应用镜像

  - 在cms文件目录下执行命令

  ```
  docker build -t vuenginxcontainer .
  ```

  > -t 是给镜像命名，. 是基于当前目录的 Dockerfile 来构建镜像。

- 查看本地镜像，运行命令：

```bash
docker image ls
#或
docker images
```

![image-20211206104121958](https://s2.loli.net/2022/06/13/29ACQn1YEZXuoKS.png)



到此时我们的 Vue 应用镜像 vuenginxcontainer 已经成功创建。接下来，我们基于该镜像启动一个 Docker 容器。

## 启动 Vue app 容器



> Docker 容器Container： 镜像运行时的实体。镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等 。



- 基于 vuenginxcontainer 镜像启动容器，运行命令：

```bash
docker run -p 1024:80 -d --name shopmall shopmall
```

> - docker run 基于镜像启动一个容器
> - -p 1024:80 端口映射，将宿主的1024端口映射到容器的80端口
>
> - -d 后台方式运行
> - --name 容器名，查看 Docker 进程

- 查看

```bash
docker ps
```

![image-20211206104818463](https://s2.loli.net/2022/06/13/NZaixylbQ12Tj3m.png)

可以发现名为 vueApp 的容器已经运行起来。在浏览器访问主机域名加端口号:1024 应该就能访问到该 Vue 应用



## 仍然不能访问解决方案

- 阿里云或者腾讯云的主机配置

- 找到配置安全组规则

![image-20211206105313032](https://s2.loli.net/2022/06/13/HZJ5GEYtj78mIuk.png)

- 点击配置规则

![image-20211206105350296](https://s2.loli.net/2022/06/13/pBUoc9azS3NGiAl.png)

- 手动添加规则

![image-20211206105534391](https://s2.loli.net/2022/06/13/xA52hiaWR1zjFwB.png)

- 开启端口号点击保存再次访问即可

![image-20211206105620686](https://s2.loli.net/2022/06/13/kdXC7RaHZ1DqELh.png)



## Docker 命令学习

- `docker ps` 查看当前运行中的容器
- `docker images` 查看镜像列表
- `docker rm container-id` 删除指定 id 的容器
- `docker stop/start container-id` 停止/启动指定 id 的容器
- `docker rmi image-id` 删除指定 id 的镜像
- `docker volume ls` 查看 volume 列表·
- `docker network ls` 查看网络列表
<!-- - `docker image prune` 删除所有<none>项目 -->
- `docker save REPOSITORY:latest > [app-name].tar` 打包成tar文件



## 总结

- docker：集成软件开发和运行所需环境，体积小，自动打包记成....
- 将文件打包成docker镜像
  - 在当前目录下创建Ddockerflie文件:编写相应的指令
  - 在执行docker build 的时候，docker会根据当前文件夹下的dockerfile对项目进行打包
- 镜像文件可以被运成一个个的容器，容器之间互不影响，但资源共用





# docker部署打包

- 运行容器
  - docker run -p 5050:80 -d --name vue-app vuenginxcontainer
- 移除
  <!-- - docker rm -f  <NAMES> (vueApp) -->
- 打包
  - docker build -t vuenginxcontainer .
- 停止
  <!-- - docker stop <CONTAINER ID > (b3) -->
<!-- - 删除所有<none>项目 -->
  - docker image prune
- 列举所有容器
  - docker images
  - docker image ls
- 列举运行的项目
  - docker ps
  - docker ps -a
- 打包成tar文件
  - docker save vueginxcontainer:latest > vue-app.tar
- 删除指定 id 的镜像
  <!-- - docker rmi  <IMAGE ID>(44a) -->
