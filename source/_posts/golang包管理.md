---
title: Golang包管理笔记
categories:
  - 学习笔记
tags:
  - go
  - govendor
  - go mod
  - 学习笔记
  - 包管理
keywords: 'go,golang,包管理,govendor,gomod'
date: 2020-02-18 23:00:13
---

### 1. go get命令

go get 命令可以借助代码管理工具通过远程拉取或更新代码包及其依赖包到`gopath`路径下，并自动完成编译和安装。整个过程就像安装一个 App 一样简单。
example:

```shell
go get github.com/spf13/viper
```
如上命令则是将github上中的viper包下载到本地`gopath`路径，在对应目录`$gopath/src/github.com/sfp13/viper`即可看到对应代码。

这个命令可以动态获取远程代码包，目前支持的有 `BitBucket、GitHub、Google Code 和 Launchpad`。在使用 go get 命令前，需要安装与远程包匹配的代码管理工具，如 Git、SVN、HG 等，参数中需要提供一个包名。

这个命令在内部实际上分成了两步操作：第一步是下载源码包，第二步是执行 go install。

下载源码包的 go 工具会自动根据不同的域名调用不同的源码工具，对应关系如下：

| 名称       | 主命令 | 说明                                                         |
| :--------- | :----- | :----------------------------------------------------------- |
| Mercurial  | hg     | Mercurial是一种轻量级分布式版本控制系统，采用Python语言实现，易于学习和使用，扩展性强。 |
| Git        | git    | Git最开始是Linux Torvalds为了帮助管理 Linux 内核开发而开发的一个开源的分布式版本控制软件。但现在已被广泛使用。它是被用来进行有效、高速的各种规模项目的版本管理。 |
| Subversion | svn    | Subversion是一个版本控制系统，也是第一个将分支概念和功能纳入到版本控制模型的系统。但相对于Git和Mercurial而言，它只算是传统版本控制系统的一员。 |
| Bazaar     | bzr    | Bazaar是一个开源的分布式版本控制系统。但相比而言，用它来作为VCS的项目并不多。 |

#### 1.1. 常用参数

| 标记名称  | 标记描述                                                     |
| :-------- | :----------------------------------------------------------- |
| -d        | 让命令程序只执行下载动作，而不执行安装动作。                 |
| -f        | 仅在使用`-u`标记时才有效。该标记会让命令程序忽略掉对已下载代码包的导入路径的检查。如果下载并安装的代码包所属的项目是你从别人那里Fork过来的，那么这样做就尤为重要了。 |
| -fix      | 让命令程序在下载代码包后先执行修正动作，而后再进行编译和安装。 |
| -insecure | 允许命令程序使用非安全的scheme（如HTTP）去下载指定的代码包。如果你用的代码仓库（如公司内部的Gitlab）没有HTTPS支持，可以添加此标记。请在确定安全的情况下使用它。 |
| -t        | 让命令程序同时下载并安装指定的代码包中的测试源码文件中依赖的代码包。 |
| -u        | 让命令利用网络来更新已有代码包及其依赖包。默认情况下，该命令只会从网络上下载本地不存在的代码包，而不会更新已有的代码包。 |
| -v        | 打印出那些下载的代码包的名字                                 |
| -x        | 打印出整个过程使用的命令                                     |

#### 1.2. 下载特定分支

```shell
go get 项目包路径@(分支名或提交id) # 默认go1版本 其次master
```

#### 1.3. 手动导入包

可手动到`$gopath/src`路径进行`git clone`等操作进行手动导入包。

#### 1.4 常见错误

由于`http`协议使用`git`系列操作的时候，需要输入密码，但是由于go默认不进行交互，所以还是会导致最终结果失败。
错误如下：

```shell
get "xxx.fengyuwusong.cn/basic_dev_libs/go_template": found meta tag get.metaImport{Prefix:"xxx.fengyuwusong.cn/basic_dev_libs/go_template", VCS:"git", RepoRoot:"http://xxx.fengyuwusong.cn/basic_dev_libs/go_template.git"} at //xxx.fengyuwusong.cn/basic_dev_libs/go_template?go-get=1
go get xxx.fengyuwusong.cn/basic_dev_libs/go_template: git ls-remote -q http://xxx.fengyuwusong.cn/basic_dev_libs/go_template.git in /Users/fengyuwusong/code/gopath/pkg/mod/cache/vcs/bf5a86f855b001622b2d2fe3a7b0447bf64efb8d09620ba2443dd04f7e0ffe44: exit status 128:
        fatal: could not read Username for 'http://xxx.fengyuwusong.cn': terminal prompts disabled
Confirm the import path was entered correctly.
If this is a private repository, see https://golang.org/doc/faq#git_https for additional information.
```

以上错误我们可以通过以下两种方式来解决：

```
方案一
临时解法：手动输入用户名密码

env GIT_TERMINAL_PROMPT=1 go get xxx.com/xxx/xxx

方案二
长期解法：使用已经配置好的git密钥

以GITHUB为例

git config --global --add url."git@github.com:".insteadOf "https://github.com/"
```

### 2. govendor

golang工程的依赖包经常使用go get命令来获取，例如：go get github.com/kardianos/govendor ，会将依赖包下载到`GOPATH`的路径下。

常用的依赖包管理工具有`godep`，`govendor`等，在Golang1.5之后，Go提供了 `GO15VENDOREXPERIMENT` 环境变量(Go 1.6版本默认开启该环境变量)，用于将go build时的应用路径搜索调整成为 `当前项目目录/vendor` 目录方式。通过这种形式，我们可以实现类似于 `godep` 方式的项目依赖管理。

#### 2.1. 安装

```shell
go get -u -v github.com/kardianos/govendor
```

#### 2.2. 使用

```shell
#进入到项目目录
cd /home/gopath/src/mytool

#初始化vendor目录
govendor init

#查看vendor目录
[root@CC54425A mytool]# ls
commands  main.go  vendor  mytool_test.sh

#将GOPATH中本工程使用到的依赖包自动移动到vendor目录中
#说明：如果本地GOPATH没有依赖包，先go get相应的依赖包
govendor add +external
或使用缩写： govendor add +e 

#Go 1.6以上版本默认开启 GO15VENDOREXPERIMENT 环境变量，可忽略该步骤。
#通过设置环境变量 GO15VENDOREXPERIMENT=1 使用vendor文件夹构建文件。
#可以选择 export GO15VENDOREXPERIMENT=1 或 GO15VENDOREXPERIMENT=1 go build 执行编译
export GO15VENDOREXPERIMENT=1
```

#### 2.3. 常用命令

常见的命令如下，格式为 `govendor COMMAND`。

| 命令           | 功能                                                         |
| :------------- | ------------------------------------------------------------ |
| `init`         | 初始化 vendor 目录                                           |
| `list`         | 列出所有的依赖包                                             |
| `add`          | 添加包到 vendor 目录，如 govendor add +external 添加所有外部包 |
| `add PKG_PATH` | 添加指定的依赖包到 vendor 目录                               |
| `update`       | 从 $GOPATH 更新依赖包到 vendor 目录                          |
| `remove`       | 从 vendor 管理中删除依赖                                     |
| `status`       | 列出所有缺失、过期和修改过的包                               |
| `fetch`        | 添加或更新包到本地 vendor 目录                               |
| `sync`         | 本地存在 vendor.json 时候拉去依赖包，匹配所记录的版本        |
| `get`          | 类似 `go get` 目录，拉取依赖包到 vendor 目录                 |

包状态：

| 状态      | 缩写状态 | 缩写含义                                             |
| --------- | :------: | ---------------------------------------------------- |
| +local    |    l     | 本地包，项目自身的包组织                             |
| +external |    e     | 外部包，被`$GOPATH`管理，但不在vendor目录下          |
| +vendor   |    v     | 已被govendor管理的包，在vendor目录下                 |
| +std      |    s     | 标准库的包                                           |
| +unused   |    u     | 未使用的包，即包在vendor目录下，但在项目中并没有使用 |
| +missing  |    m     | 代码应用了依赖包，但该包未找到                       |
| +program  |    p     | 主程序包，可编译为执行文件                           |
| +outside  |          | 外部包或缺失的包                                     |
| +all      |          | 所有包                                               |

example：

```shell
# 将外部包打入vendor目录
govendor add +e
```

### 3. go mod

从 Go1.11 开始，golang 官方支持了新的依赖管理工具`go mod`。

其本质为将包下载到`$gopath/pkg/mod`目录

```shell
~/code/gopath/pkg/mod: ls
cache               github.com          go.uber.org         google.golang.org   honnef.co
cloud.google.com    go.etcd.io          golang.org          gopkg.in
```



#### 3.1. 常用命令

```shell
➜  ~ go mod
Go mod provides access to operations on modules.
 
Note that support for modules is built into all the go commands,
not just 'go mod'. For example, day-to-day adding, removing, upgrading,
and downgrading of dependencies should be done using 'go get'.
See 'go help modules' for an overview of module functionality.
 
Usage:
 
	go mod <command> [arguments]
 
The commands are:
 
	download    download modules to local cache   下载包到本地缓存
	edit        edit go.mod from tools or scripts 编写go.mod 文件
	graph       print module requirement graph 打印依赖关系图
	init        initialize new module in current directory 初始化当前目录
	tidy        add missing and remove unused modules 添加丢失和移除无用的包
	vendor      make vendored copy of dependencies  打包vendor目录
	verify      verify dependencies have expected content 验证依赖内容
	why         explain why packages or modules are needed 解释为什么依赖此包
 
Use "go help mod <command>" for more information about a command.
```

#### 3.2. 使用

```shell
go mod init # 在项目目录下初始化 生成go.mod文件

#  build 和test会自动编辑go.mod文件 导入依赖包
go build xxx.go
go test xxx.go

# ... 编辑go.mod文件 导入你需要的包然后执行
go mod download

# 或进行以下命令 添加missing包及移除无用包
go mod tidy 

# 打包到本地并部署
go mod vendor

# 其他命令
go list -m all # 列出所有直接或间接使用的包的最终版本
go list -u -m all # 查看所有可用于升级的补丁
go get xxx # 导入需要的包 会自动编辑go.mod文件添加该包
```

#### 3.3. 使用代理

由于一些总所周知的原因，在国内有一些包是无法下载的，所以这时候需要设置第三方代理来对包进行拉取。

```shell
# 使用代理
go env -w GOPROXY="https://goproxy.cn"
# 直连
go env -w GOPROXY="direct"
```

但是有一些包我们是存在自建仓库的，那么这时候需要设置`GOPRIVATE`跳过代理。

```shell
go env -w GOPRIVATE="*.fengyuwusong.cn"
# 此时导入该包将不会使用代理
go get -u -v test.fengyuwusong.cn
```

#### 3.4. go.mod

- `module` 语句指定包的名字（路径）
- `require` 语句指定的依赖项模块
- `replace` 语句可以替换依赖项模块
- `exclude` 语句可以忽略依赖项模块

**go.mod 文件样例**

```mod
module fengyuwusong.cn/my/thing // 指明身份 模块中所有软件包导入前缀

go 1.12

// 依赖包列表 不指定版本时 依赖所需最小版本
require (
    github.com/some/dependency v1.2.3
    github.com/another/dependency/v4 v4.0.0 // indirect 意为间接使用
)

// replace 替换本地路径 当一些包不想上传远程或拉不下来的时候可以使用
replace example.com/some/dependency => example.com/some/dependency v1.2.3  // 替换为其他地址
replace example.com/original/import/path => /your/forked/import/path // 替换为本地路径

exclude xxx.xx.com/test // 忽略此项依赖 很少使用
```

#### 3.5. http支持

目前`go mod`等导包相关操作并不支持`http`，但是有时公司的仓库并不支持`https`，这时候我们需要使用`go get -u -v -insecure xxx`导入此包。

### 参考文章

[Go 1.11 Modules 官方文档](https://github.com/golang/go/wiki/Modules#when-should-i-use-the-replace-directive)

[go get命令——一键获取代码、编译并安装](http://c.biancheng.net/view/123.html)

[Golang包管理工具之govendor的使用](https://www.cnblogs.com/liuzhongchao/p/9233177.html)

[【Golang】go get报错：fatal: could not read Username ... terminal prompts disabled](https://blog.csdn.net/jackgo73/article/details/90604180)

