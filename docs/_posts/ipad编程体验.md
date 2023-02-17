---
title: ipad编程体验
categories: 
  - 折腾
tags: 
  - 折腾
  - 学习笔记
  - 搭建
keywords: vscode,ipad编程
date: 2021-12-25 11:00:13
permalink: /pages/84b324/
author: 
  name: 风雨雾凇
  link: https://github.com/fengyuwusong
sidebar: auto
---

### 背景

由于之前买的16寸mac太大太重了，同时看到有许多同事有使用ipad等平板设备进行办公，在这个念头的驱动下，摆脱又大又重的笔记本的想法越来越强烈，故在双十一一冲动则入手了ipad pro2021 11寸M1款，并且也上手在公司使用了一段时间，平时开会&技术方案评审等表现都尚可，总体来说还是十分满意～

最近有些事情需要回家一趟，遂想着vscode本身也是基于Node.js与Chromium进行搭建的，故理论上应该能够在我的云服务器上搭建一个vscode服务器，同时使用浏览器进行访问使用vscode，在网上搜索了一下果不其然有相关的方案，故下面介绍一下vscode服务器版`code-server`的搭建以及在ipad上编码的感受～

<!-- more -->

### code-server官方介绍

[code-server](https://github.com/coder/code-server)是运行代码服务器的最佳场所，它在您的浏览器或桌面中提供 Visual Studio Code 作为渐进式 Web 应用程序。由数以万计的个人开发人员使用，代码服务器使在任何设备上的任何浏览器中运行 VS Code 成为可能——由任何规模的服务器提供支持。当打包在 Coder 工作区中时，代码服务器为开发团队提供无缝的 VS Code 体验，感觉像是原生的，并以您的云提供的速度和可扩展性为后盾。

### 搭建

搭建方式有多种，这里面简单介绍一下docker以及普通rpm部署。
安装文档：https://coder.com/docs/code-server/latest/install

#### docker
```
 docker run -itd -u root -p 18888:8080 --name code-server -v $CODE/config.yaml:/data/apps/docker/code-server-data/config.yaml codercom/code-server
```

docker部署后进入vscode使用的终端为docker内部bash，除非多人使用，否则不太推荐使用docker部署。

#### rpm
```
curl -fOL https://github.com/coder/code-server/releases/download/v3.12.0/code-server-3.12.0-amd64.rpm
sudo systemctl enable --now code-server@$USER
# Now visit http://127.0.0.1:8080. Your password is in ~/.config/code-server/config.yaml
```

#### 访问
config.yaml
```
bind-addr: 127.0.0.1:8080
auth: password
password: xxxx
cert: false
```
config.yaml文件为登录code-server网页需要的配置的密钥，映射好后登录后查看相关密码输入即可进入界面。

此时访问服务对应端口号应该就能进入到服务（没尝试过），但是为了达到ipad访问的目的，我们还需要通过nginx给服务设置反向代理,绑定域名以及证书进行访问，nginx location相关配置如下：

code-server.conf
```
#PROXY-START/
location ~* \.(gif|png|jpg|css|js|woff|woff2)$
{
	proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    expires 12h;
}
location /
{
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    
    add_header X-Cache $upstream_cache_status;
    
    #Set Nginx Cache
    proxy_ignore_headers Set-Cookie Cache-Control expires;
    proxy_cache cache_one;
    proxy_cache_key $host$uri$is_args$args;
    proxy_cache_valid 200 304 301 302 1m;
    
    # websocket config 此处需加wss配置，否则进入会提示websocket建立超时
	  proxy_set_header Upgrade $http_upgrade;
	  proxy_set_header Connection upgrade;
	  proxy_set_header Accept-Encoding gzip;
}

#PROXY-END/
```


### ipad使用技巧

- 使用safari浏览器打开对应code-server网页,点击右上角导出添加到主屏幕
- 键盘相关设置和输入法切换需要修改一下，否则一直会有下面横跳出现很难受

### 感受

环境机器负载并不大，对于个人使用上来说一定是满足的了，在编码体验上总的来说还是能勉强够用的，当网络条件不允许远程的情况下，使用这个vscode编码进行简单的学习和工作还是十分惬意，也满足了当前情况我对于这个ipad生产力的需求～

例如目前这篇文章就是在这个环境下进行的，感觉还是挺有意思的哈～以后如果是几天的假期应该是能完全摆脱mac和家里的台式机了。

- 在家使用ipad写这个文章
![在家使用ipad写这个文章](https://pic.fengyuwusong.cn/BE0567E1-4119-42D4-BDFF-28A05394CBD7.jpeg)

- 在高铁上编码
![高铁编码](https://pic.fengyuwusong.cn/D00CE826-FDC3-4DF3-ADA4-90B272BE578F.jpeg)

### 缺陷

- 有些快捷键缺失，很影响编程感受，例如ctrol+tab切换tab
- 中文输出法无法使用快捷键
- 切换进程再切回vscode时，键盘输出有时不响应，需要切到其他tab或删除文本操作重新调出键盘才行
- vscode用户无法登录，没办法同步配置
- markdown无法侧边预览
- [官网相关使用建议](https://coder.com/docs/code-server/latest/ipad#using-the-code-server-progressive-web-app-pwa)

### 相关设备及依赖

- ipad pro
- 罗技k380键盘
- 罗技pabble无线鼠标
- 腾讯云服务2c4g

### 后续

看了下相关介绍，目前Jetbrains也有类似的产品[Projector](https://jetbrains.github.io/projector-client/mkdocs/latest/ij_user_guide/jetbrains/#client-side)支持，但是看使用体验上来说好像都是半斤八两，后续有机会再折腾一下试试，毕竟目前`goland`可是上班吃饭的家伙，如果能完美支持远程使用就好了～