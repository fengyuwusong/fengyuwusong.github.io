---
title: tmux学习笔记
categories: 
  - 编程
tags: 
  - linux
  - 学习笔记
  - tmux
keywords: linux,编程,学习笔记
date: 2022-05-08 14:21:20
permalink: /pages/5842a4/
author: 
  name: 风雨雾凇
  link: https://github.com/fengyuwusong
sidebar: auto
---

### Tmux

![思维导图](https://pic.fengyuwusong.cn/20220508163622.png)
<!-- more -->

#### Tmux是什么

##### 会话与进程

- 命令行的典型使用方式是，打开一个终端窗口（terminal window，以下简称"窗口"），在里面输入命令。用户与计算机的这种临时的交互，称为一次"会话"（session） 。
- 会话的一个重要特点是，窗口与其中启动的进程是连在一起的。打开窗口，会话开始；关闭窗口，会话结束，会话内部的进程也会随之终止，不管有没有运行完。
- 故为了避免上述问题，需要将会话和窗口“解绑”

##### Tmux的作用

Tmux 就是会话与窗口的"解绑"工具，将它们彻底分离。

- 它允许在单个窗口中，同时访问多个会话。这对于同时运行多个命令行程序很有用。
- 它可以让新窗口"接入"已经存在的会话。
- 它允许每个会话有多个连接窗口，因此可以多人实时共享会话。
- 它还支持窗口任意的垂直和水平拆分。

#### 基本用法

##### 安装

```shell
# Ubuntu 或 Debian
$ sudo apt-get install tmux

# CentOS 或 Fedora
$ sudo yum install tmux

# Mac
$ brew install tmux
```

##### 启动

```shell
tmux
```

##### 退出

- `exit`
- `Ctrl+d`

##### 前缀键

- `Ctrl+b`

Tmux 窗口有大量的快捷键。所有快捷键都要通过前缀键唤起。默认的前缀键是Ctrl+b，即先按下Ctrl+b，快捷键才会生效。

#### 会话管理

##### 新建会话

- `tmux new -s <session-name>`

第一个启动的 Tmux 窗口，编号是0，第二个窗口的编号是1，以此类推。这些窗口对应的会话，就是 0 号会话、1 号会话。

使用编号区分会话，不太直观，更好的方法是为会话起名。

##### 分离会话

- `tmux detach`
- `Ctrl+b d`

在 Tmux 窗口中，按下`Ctrl+b d`或者输入`tmux detach`命令，就会将当前会话与窗口分离。

##### 查看会话

- `tmux ls`
- `tmux list-session`

##### 接入会话

- `tmux attach -t <session-id>`
- `tmux attach -t <session-name>`

##### 杀死会话

- `tmux kill-session -t <session-id>`
- `tmux kill-session -t <session-name>`

##### 切换会话

- `tmux switch -t <session-id>`
- `tmux switch -t <session-name>`

##### 重命名会话

- `tmux rename-session -t <session-id> <session-new-name>
- `Ctrl+b $` 重命名当前会话

##### 会话快捷键

- `Ctrl+b d` 分离当前会话
- `Ctrl+b s` 列出所有会话
- `Ctrl+b $` 重命名当前会话

#### 窗格操作

##### 划分窗格

- `tmux split-window` 划分上下两个窗格
- `tmux split-window -h` 划分左右两个窗格

##### 移动光标

- `tmux select-pane -U` 光标切换到上方窗格
- `tmux select-pane -D` 光标切换到下方窗格
- `tmux select-pane -L` 光标切换到左边窗格
- `tmux select-pane -R` 光标切换到右边窗格

##### 交换窗格位置

- `tmux swap-pane -U` 当前窗格上移
- `tmux swap-pane -D` 当前窗格下移

##### 窗格快捷键

```shell
Ctrl+b %：划分左右两个窗格。
Ctrl+b "：划分上下两个窗格。
Ctrl+b <arrow key>：光标切换到其他窗格。<arrow key>是指向要切换到的窗格的方向键，比如切换到下方窗格，就按方向键↓。
Ctrl+b ;：光标切换到上一个窗格。
Ctrl+b o：光标切换到下一个窗格。
Ctrl+b {：当前窗格与上一个窗格交换位置。
Ctrl+b }：当前窗格与下一个窗格交换位置。
Ctrl+b Ctrl+o：所有窗格向前移动一个位置，第一个窗格变成最后一个窗格。
Ctrl+b Alt+o：所有窗格向后移动一个位置，最后一个窗格变成第一个窗格。
Ctrl+b x：关闭当前窗格。
Ctrl+b !：将当前窗格拆分为一个独立窗口。
Ctrl+b z：当前窗格全屏显示，再使用一次会变回原来大小。
Ctrl+b Ctrl+<arrow key>：按箭头方向调整窗格大小。
Ctrl+b q：显示窗格编号。
```

#### 窗口管理

##### 新建窗口

- `tmux new-window`
- `tmux new-window -n <window-name>`

##### 切换窗口

- `tmux select-window -t <window-number>` 切换到指定编号的窗口
- `tmux select-window -t <window-name>` 切换到指定名称的窗口

##### 重命名窗口

- `tmux rename-window <new-name>` 命名当前窗口(重命名)

##### 窗口快捷键

```shell
Ctrl+b c：创建一个新窗口，状态栏会显示多个窗口的信息。
Ctrl+b p：切换到上一个窗口（按照状态栏上的顺序）。
Ctrl+b n：切换到下一个窗口。
Ctrl+b <number>：切换到指定编号的窗口，其中的<number>是状态栏上的窗口编号。
Ctrl+b w：从列表中选择窗口。
Ctrl+b ,：窗口重命名。
```

#### 其他命令

```shell
# 列出所有快捷键，及其对应的 Tmux 命令
$ tmux list-keys

# 列出所有 Tmux 命令及其参数
$ tmux list-commands

# 列出当前所有 Tmux 会话的信息
$ tmux info

# 重新加载当前的 Tmux 配置
$ tmux source-file ~/.tmux.conf
```

#### 踩坑点

- 鼠标滚轮不能翻动缓冲区
  - 需要更改`~/.tmux.conf`配置，增加配置 `set -g mode-mouse on`
