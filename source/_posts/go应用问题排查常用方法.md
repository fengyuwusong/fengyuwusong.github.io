---
title: go应用问题排查常用方法
date: 2022-5-5 17:25:15
categories:
- 学习笔记
tags: [编程, 学习笔记, golang, 问题排查]
keywords: 编程,学习笔记,golang,问题排查
---

## 前言

一般来说，在开发过程中我们的应用都会遇上各种问题场景，下面关于以下几种常见场景的排查分析问题常见方法进行一定的总结：

- 分析程序运行时间和CPU利用率情况
- 分析golang程序内存占用情况
- 分析golang程序CPU性能情况

<!-- more -->

## 场景1： 如何分析程序的运行时间与CPU利用率情况？

### (1) shell内置time指令

这个方法不算新颖，但是确很实用。 time是Unix/Linux内置多命令，使用时一般不用传过多参数，直接跟上需要调试多程序即可。

```shell
$ time go run test2.go
&{{0 0} 张三 0}

real 0m0.843s
user 0m0.216s
sys 0m0.389s
```

上面是使用time对 go run test2.go对执行程序坐了性能分析，得到3个指标。

● real：从程序开始到结束，实际度过的时间；
● user：程序在用户态度过的时间；
● sys：程序在内核态度过的时间。

一般情况下 `real >= user + sys`，因为系统还有其它进程(切换其他进程中间对于本进程会有空白期)。

## 2) /usr/bin/time指令

这个指令比内置的time更加详细一些，使用的时候需要用绝对路径，而且**要加上参数-v**

```shell
$ /usr/bin/time -v go run test2.go  

 Command being timed: "go run test2.go"
 User time (seconds): 0.12
 System time (seconds): 0.06
 Percent of CPU this job got: 115%
 Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.16
 Average shared text size (kbytes): 0
 Average unshared data size (kbytes): 0
 Average stack size (kbytes): 0
 Average total size (kbytes): 0
 Maximum resident set size (kbytes): 41172
 Average resident set size (kbytes): 0
 Major (requiring I/O) page faults: 1
 Minor (reclaiming a frame) page faults: 15880
 Voluntary context switches: 897
 Involuntary context switches: 183
 Swaps: 0
 File system inputs: 256
 File system outputs: 2664
 Socket messages sent: 0
 Socket messages received: 0
 Signals delivered: 0
 Page size (bytes): 4096
 Exit status: 0
 ```

可以看到这里的功能要强大多了，除了之前的信息外，还包括了：

● CPU占用率；
● 内存使用情况；
● Page Fault 情况；
● 进程切换情况；
● 文件系统IO；
● Socket 使用情况；
● ……

## 场景2： 如何分析golang程序的内存使用情况？

### (1) 内存占用情况查看

我们先写一段demo例子代码

```go
package main

import (
    "log"
    "runtime"
    "time"
)

func test() {
    //slice 会动态扩容，用slice来做堆内存申请
    container := make([]int, 8)

    log.Println(" ===> loop begin.")
    for i := 0; i < 32*1000*1000; i++ {
        container = append(container, i)
    }
    log.Println(" ===> loop end.")
}

func main() {
    log.Println("Start.")

    test()

    log.Println("force gc.")
    runtime.GC() //强制调用gc回收

    log.Println("Done.")

    time.Sleep(3600 * time.Second) //睡眠，保持程序不退出
}
```

编译

```shell
$go build -o snippet_mem && ./snippet_mem
```

然后在`./snippet_mem`进程没有执行完，我们再开一个窗口，通过top命令查看进程的内存占用情况

`$top -p $(pidof snippet_mem)`

得到结果如下：

![top结果](https://pic.fengyuwusong.cn/20220506100834.png)

我们看出来，没有退出的snippet_mem进程有约770m的内存被占用。

直观上来说，这个程序在test()函数执行完后，切片contaner的内存应该被释放，不应该占用770m那么大。

下面让我们使用GODEBUG来分析程序的内存使用情况。

### (2) GODEBUG与gctrace

- 用法

执行`snippet_mem`程序之前添加环境变量`GODEBUG='gctrace=1'`来跟踪打印垃圾回收器信息

```shell
GODEBUG='gctrace=1' ./snippet_mem
```

设置`gctrace=1`会使得垃圾回收器在每次回收时汇总所回收内存的大小以及耗时，
并将这些内容汇总成单行内容打印到标准错误输出中。

- 格式

```shell
gc # @#s #%: #+#+# ms clock, #+#/#/#+# ms cpu, #->#-># MB, # MB goal, # P
```

- 含义

```shell
 gc #        GC次数的编号，每次GC时递增
 @#s         距离程序开始执行时的时间
 #%          GC占用的执行时间百分比
 #+...+#     GC使用的时间
 #->#-># MB  GC开始，结束，以及当前活跃堆内存的大小，单位M
 # MB goal   全局堆内存大小
 # P         使用processor的数量
```

如果每条信息最后，以(forced)结尾，那么该信息是由runtime.GC()调用触发

我们来选择其中一行来解释一下：

```shell
gc 17 @0.149s 1%: 0.004+36+0.003 ms clock, 0.009+0/0.051/36+0.006 ms cpu, 181->181->101 MB, 182 MB goal, 2 P
```

该条信息含义如下：

● gc 17: Gc 调试编号为17
● @0.149s:此时程序已经执行了0.149s
● 1%: 0.149s中其中gc模块占用了1%的时间
● 0.004+36+0.003 ms clock: 垃圾回收的时间，分别为STW（stop-the-world）清扫的时间+并发标记和扫描的时间+STW标记的时间
● 0.009+0/0.051/36+0.006 ms cpu: 垃圾回收占用cpu时间
● 181->181->101 MB： GC开始前堆内存181M， GC结束后堆内存181M，当前活跃的堆内存101M
● 182 MB goal: 全局堆内存大小
● 2 P: 本次GC使用了2个P(调度器中的Processer)

了解了GC的调试信息读法后，接下来我们来分析一下本次GC的结果。

我们还是执行GODEBUG调试

```shell
GODEBUG='gctrace=1' ./snippet_mem
```

结果如下

```shell
➜  study git:(main) ✗ GODEBUG='gctrace=1' ./main
2022/05/06 10:16:30 Start.
2022/05/06 10:16:30  ===> loop begin.
gc 1 @0.001s 3%: 0.008+0.42+0.002 ms clock, 0.017+0/0.10/0.33+0.004 ms cpu, 4->4->0 MB, 5 MB goal, 2 P
gc 2 @0.002s 2%: 0.006+1.6+0.003 ms clock, 0.012+0/0.10/0.59+0.006 ms cpu, 4->6->3 MB, 5 MB goal, 2 P
gc 3 @0.004s 2%: 0.007+1.4+0.001 ms clock, 0.014+0/0.10/1.3+0.003 ms cpu, 8->8->2 MB, 9 MB goal, 2 P
gc 4 @0.006s 3%: 0.017+0.49+0.001 ms clock, 0.034+0.11/0/0+0.003 ms cpu, 6->6->3 MB, 7 MB goal, 2 P
gc 5 @0.007s 9%: 0.32+0.54+0.001 ms clock, 0.65+0.020/0.41/0+0.003 ms cpu, 8->8->4 MB, 9 MB goal, 2 P
gc 6 @0.008s 7%: 0.006+2.5+0.002 ms clock, 0.013+0.005/0.075/2.4+0.005 ms cpu, 10->10->5 MB, 11 MB goal, 2 P
gc 7 @0.011s 9%: 0.024+2.5+0.003 ms clock, 0.048+0.020/0.91/0+0.006 ms cpu, 12->12->6 MB, 13 MB goal, 2 P
gc 8 @0.014s 9%: 0.11+1.7+0.001 ms clock, 0.23+0.10/0/0+0.003 ms cpu, 15->15->8 MB, 16 MB goal, 2 P
gc 9 @0.016s 7%: 0.007+5.4+0.004 ms clock, 0.015+0/0.074/5.1+0.008 ms cpu, 19->19->10 MB, 20 MB goal, 2 P
gc 10 @0.021s 6%: 0.007+1.4+0.002 ms clock, 0.014+0/0.076/1.2+0.005 ms cpu, 24->24->13 MB, 25 MB goal, 2 P
gc 11 @0.023s 6%: 0.007+3.0+0.003 ms clock, 0.014+0/0.083/2.9+0.007 ms cpu, 30->30->16 MB, 31 MB goal, 2 P
gc 12 @0.027s 14%: 0.050+9.4+0.004 ms clock, 0.10+0.012/7.2/0.009+0.008 ms cpu, 38->38->21 MB, 39 MB goal, 2 P
gc 13 @0.037s 13%: 0.007+2.7+0.003 ms clock, 0.014+0/0.091/2.5+0.006 ms cpu, 47->47->26 MB, 48 MB goal, 2 P
gc 14 @0.040s 17%: 0.084+5.8+0.003 ms clock, 0.16+0.021/5.3/0+0.007 ms cpu, 59->59->33 MB, 60 MB goal, 2 P
gc 15 @0.046s 26%: 0.027+19+0.004 ms clock, 0.054+0.022/19/0+0.009 ms cpu, 74->74->41 MB, 75 MB goal, 2 P
gc 16 @0.066s 24%: 0.007+5.2+0.003 ms clock, 0.014+0/0.11/4.9+0.007 ms cpu, 93->93->51 MB, 94 MB goal, 2 P
gc 17 @0.072s 27%: 0.008+10+0.005 ms clock, 0.017+0.010/10/0.010+0.010 ms cpu, 116->116->64 MB, 117 MB goal, 2 P
gc 18 @0.084s 18%: 0.007+40+0.005 ms clock, 0.015+0/0.080/39+0.010 ms cpu, 145->145->145 MB, 146 MB goal, 2 P
gc 19 @0.167s 10%: 0.016+59+0.004 ms clock, 0.032+0/0.082/58+0.009 ms cpu, 372->372->126 MB, 373 MB goal, 2 P
gc 20 @0.227s 12%: 0.34+15+0.015 ms clock, 0.69+0/14/0+0.030 ms cpu, 284->284->284 MB, 285 MB goal, 2 P
gc 2022/05/06 10:16:30  ===> loop end.
21 @0.3242022/05/06 10:16:30 force gc.
s 5%: 0.014+198+0.003 ms clock, 0.029+0/0.089/198+0.006 ms cpu, 728->728->0 MB, 729 MB goal, 2 P
2022/05/06 10:16:30 Done.
gc 22 @0.523s 5%: 0.006+2.4+0.002 ms clock, 0.013+0/0.045/2.4+0.005 ms cpu, 0->0->0 MB, 4 MB goal, 2 P (forced)```
```

- 分析

 先看在test()函数执行完后立即打印的gc 21那行的信息。`728->728->0 MB, 729 MB goal`表示垃圾回收器已经把729M的内存标记为非活跃的内存。

再看下一个记录`gc 22。0->0->0 MB, 4 MB goal`表示垃圾回收器中的全局堆内存大小由729M下降为4M。

- 结论

1、在test()函数执行完后，demo程序中的切片容器所申请的堆空间都被垃圾回收器回收了。

2、如果此时在top指令查询内存的时候，如果依然是800+MB，说明垃圾回收器回收了应用层的内存后，（可能）并不会立即将内存归还给系统。

### (3) runtime.ReadMemStats

接下来我么换另一种方式查看内存的方式 利用 runtime库里的ReadMemStats()方法

demo2.go

```go
package main

import (
    "log"
    "runtime"
    "time"
)

func readMemStats() {

    var ms runtime.MemStats

    runtime.ReadMemStats(&ms)

    log.Printf(" ===> Alloc:%d(bytes) HeapIdle:%d(bytes) HeapReleased:%d(bytes)", ms.Alloc, ms.HeapIdle, ms.HeapReleased)
}

func test() {
    //slice 会动态扩容，用slice来做堆内存申请
    container := make([]int, 8)

    log.Println(" ===> loop begin.")
    for i := 0; i < 32*1000*1000; i++ {
        container = append(container, i)
        if ( i == 16*1000*1000) {
            readMemStats()
        }
    }

    log.Println(" ===> loop end.")
}

func main() {
    log.Println(" ===> [Start].")

    readMemStats()
    test()
    readMemStats()

    log.Println(" ===> [force gc].")
    runtime.GC() //强制调用gc回收

    log.Println(" ===> [Done].")
    readMemStats()

    go func() {
        for {
            readMemStats()
            time.Sleep(10 * time.Second)
        }
    }()

    time.Sleep(3600 * time.Second) //睡眠，保持程序不退出
}
```

这里我们， 封装了一个函数readMemStats()，这里面主要是调用runtime中的ReadMemStats()方法获得内存信息，然后通过log打印出来。

我们执行一下代码并运行

```shell
➜  study git:(main) ✗ go run demo2.go 
2022/05/06 10:21:59  ===> [Start].
2022/05/06 10:21:59  ===> Alloc:63872(bytes) HeapIdle:66592768(bytes) HeapReleased:66560000(bytes)
2022/05/06 10:21:59  ===> loop begin.
2022/05/06 10:21:59  ===> Alloc:238511072(bytes) HeapIdle:96509952(bytes) HeapReleased:96378880(bytes)
2022/05/06 10:21:59  ===> loop end.
2022/05/06 10:21:59  ===> Alloc:631416280(bytes) HeapIdle:173424640(bytes) HeapReleased:141795328(bytes)
2022/05/06 10:21:59  ===> [force gc].
2022/05/06 10:21:59  ===> [Done].
2022/05/06 10:21:59  ===> Alloc:51040(bytes) HeapIdle:804790272(bytes) HeapReleased:141795328(bytes)
2022/05/06 10:21:59  ===> Alloc:52064(bytes) HeapIdle:804782080(bytes) HeapReleased:141787136(bytes)
2022/05/06 10:22:09  ===> Alloc:52272(bytes) HeapIdle:804782080(bytes) HeapReleased:141795328(bytes)
2022/05/06 10:22:19  ===> Alloc:52416(bytes) HeapIdle:804782080(bytes) HeapReleased:202391552(bytes)
```

 可以看到，打印[Done].之后那条trace信息，Alloc已经下降，即内存已被垃圾回收器回收。在2022/05/06 10:22:19的这条trace信息中，HeapReleased开始上升，即垃圾回收器把内存归还给系统。

另外，MemStats还可以获取其它哪些信息以及字段的含义可以参见[官方文档](http://golang.org/pkg/runtime/#MemStats)

### (4) pprof工具

pprof工具支持网页上查看内存的使用情况，需要在代码中添加一个协程即可。

```go
import(
 "net/http"
 _ "net/http/pprof"
)

go func() {
 log.Println(http.ListenAndServe("0.0.0.0:10000", nil))
}()

具体添加的完整代码如下：

demo3.go

package main

import (
    "log"
    "runtime"
    "time"
    "net/http"
    _ "net/http/pprof"
)

func readMemStats() {

    var ms runtime.MemStats

    runtime.ReadMemStats(&ms)

    log.Printf(" ===> Alloc:%d(bytes) HeapIdle:%d(bytes) HeapReleased:%d(bytes)", ms.Alloc, ms.HeapIdle, ms.HeapReleased)
}

func test() {
    //slice 会动态扩容，用slice来做堆内存申请
    container := make([]int, 8)

    log.Println(" ===> loop begin.")
    for i := 0; i < 32*1000*1000; i++ {
        container = append(container, i)
        if ( i == 16*1000*1000) {
            readMemStats()
        }
    }

    log.Println(" ===> loop end.")
}

func main() {

    //启动pprof
    go func() {
        log.Println(http.ListenAndServe("0.0.0.0:10000", nil))
    }()

    log.Println(" ===> [Start].")

    readMemStats()
    test()
    readMemStats()

    log.Println(" ===> [force gc].")
    runtime.GC() //强制调用gc回收

    log.Println(" ===> [Done].")
    readMemStats()

    go func() {
        for {
            readMemStats()
            time.Sleep(10 * time.Second)
        }
    }()

    time.Sleep(3600 * time.Second) //睡眠，保持程序不退出
}
```

我们正常运行程序，然后同时打开浏览器，

输入地址：<http://127.0.0.1:10000/debug/pprof/heap?debug=1>

浏览器的内容其中有一部分如下，记录了目前的内存情况

```shell
#

# runtime.MemStats

# Alloc = 228248

# TotalAlloc = 1293696976

# Sys = 834967896

# Lookups = 0

# Mallocs = 2018

# Frees = 671

# HeapAlloc = 228248

# HeapSys = 804913152

# HeapIdle = 804102144

# HeapInuse = 811008

# HeapReleased = 108552192

# HeapObjects = 1347

# Stack = 360448 / 360448

# MSpan = 28288 / 32768

# MCache = 3472 / 16384

# BuckHashSys = 1449617

# GCSys = 27418976

# OtherSys = 776551

# NextGC = 4194304

# LastGC = 1583203571137891390
```

## 场景3: 如何分析Golang程序的CPU性能情况？

### (1)性能分析注意事项

●  性能分析必须在一个
可重复的、稳定的环境中来进行。
  ○ 机器必须闲置
    ■ 不要在共享硬件上进行性能分析;
    ■ 不要在性能分析期间，在同一个机器上去浏览网页
  ○ 注意省电模式和过热保护，如果突然进入这些模式，会导致分析数据严重不准确
  ○ 不要使用虚拟机、共享的云主机，太多干扰因素，分析数据会很不一致；
  ○ 不要在 macOS 10.11 及以前的版本运行性能分析，有 bug，之后的版本修复了。

如果承受得起，购买专用的性能测试分析的硬件设备，上架。

● 关闭电源管理、过热管理;
● 绝不要升级，以保证测试的一致性，以及具有可比性。

如果没有这样的环境，那就一定要在多个环境中，执行多次，以取得可参考的、具有相对一致性的测试结果。

### (2) CPU性能分析

我们来用下面的代码进行测试

demo4.go

```go
package main

import (
    "bytes"
    "math/rand"
    "time"
    "log"
    "net/http"
    _ "net/http/pprof"
)

func test() {

    log.Println(" ===> loop begin.")
    for i := 0; i < 1000; i++ {
        log.Println(genSomeBytes())
    }

    log.Println(" ===> loop end.")
}

//生成一个随机字符串
func genSomeBytes() *bytes.Buffer {

    var buff bytes.Buffer

    for i := 1; i < 20000; i++ {
        buff.Write([]byte{'0' + byte(rand.Intn(10))})
    }

    return &buff
}

func main() {

    go func() {
        for {
            test()
            time.Sleep(time.Second * 1)
        }
    }()

    //启动pprof
    http.ListenAndServe("0.0.0.0:10000", nil)

}
```

这里面还是启动了pprof的坚挺,有关pprof启动的代码如下

```shell
import (
    "net/http"
    _ "net/http/pprof"
)

func main() {
 //...
  //...
  
  //启动pprof
  http.ListenAndServe("0.0.0.0:10000", nil)
}
```

main()里的流程很简单,启动一个goroutine去无限循环调用test()方法,休眠1s.

test()的流程是生成1000个20000个字符的随机字符串.并且打印.

我们将上面的代码编译成可执行的二进制文件 demo4(记住这个名字,稍后我们能用到)

```shell
$ go build demo4.go
```

接下来我们启动程序,程序会无限循环的打印字符串.

接下来我们通过几种方式来查看进程的cpu性能情况.

#### A. Web界面查看

浏览器访问<http://127.0.0.1:10000/debug/pprof/>

我们会看到如下画面



这里面能够通过pprof查看包括(阻塞信息、cpu信息、内存堆信息、锁信息、goroutine信息等等), 我们这里关心的cpu的性能的profile信息.

有关profile下面的英文解释大致如下:

“CPU配置文件。您可以在秒GET参数中指定持续时间。获取概要文件后，请使用go tool pprof命令调查概要文件。”

所以我们要是想得到cpu性能,就是要获取到当前进程的profile文件,这个文件默认是30s生成一个,所以你的程序要至少运行30s以上(这个参数也可以修改,稍后我们介绍)

我们可以直接点击网页的profile,浏览器会给我们下载一个profile文件. 记住这个文件的路径, 可以拷贝到与demo4所在的同一文件夹下.

#### B. 使用pprof工具查看

pprof 的格式如下

go tool pprof [binary] [profile]

binary: 必须指向生成这个性能分析数据的那个二进制可执行文件；

profile: 必须是该二进制可执行文件所生成的性能分析数据文件。

binary 和 profile 必须严格匹配。

我们来查看一下:

```shell
$ go tool pprof ./demo4 profile

File: demo4
Type: cpu
Time: Mar 3, 2020 at 11:18pm (CST)
Duration: 30.13s, Total samples = 6.27s (20.81%)
Entering interactive mode (type "help" for commands, "o" for options)
(pprof)
```

help可以查看一些指令,我么可以通过top来查看cpu的性能情况.

```shell
(pprof) top
Showing nodes accounting for 8420ms, 84.79% of 9930ms total
Dropped 116 nodes (cum <= 49.65ms)
Showing top 10 nodes out of 83
      flat  flat%   sum%        cum   cum%
    2190ms 22.05% 22.05%     4350ms 43.81%  math/rand.(*Rand).Int31n
    1530ms 15.41% 37.46%     5880ms 59.21%  math/rand.(*Rand).Intn
    1240ms 12.49% 49.95%     1240ms 12.49%  sync.(*Mutex).Unlock (inline)
    1130ms 11.38% 61.33%     1170ms 11.78%  syscall.Syscall
     610ms  6.14% 67.47%     2060ms 20.75%  math/rand.(*lockedSource).Int63
     550ms  5.54% 73.01%     7500ms 75.53%  main.genSomeBytes
     420ms  4.23% 77.24%      990ms  9.97%  bytes.(*Buffer).Write
     280ms  2.82% 80.06%      280ms  2.82%  runtime.futex
     240ms  2.42% 82.48%      240ms  2.42%  runtime.usleep
     230ms  2.32% 84.79%      230ms  2.32%  runtime.memmove
(pprof) 
```

这里面有几列数据,需要说明一下.

● flat：当前函数占用CPU的耗时
● flat：:当前函数占用CPU的耗时百分比
● sun%：函数占用CPU的耗时累计百分比
● cum：当前函数加上调用当前函数的函数占用CPU的总耗时
● cum%：当前函数加上调用当前函数的函数占用CPU的总耗时百分比
● 最后一列：函数名称

通过结果我们可以看出, 该程序的大部分cpu性能消耗在 main.getSomeBytes()方法中,其中math/rand取随机数消耗比较大.

#### C. 通过go tool pprof得到profile文件

我们上面的profile文件是通过web浏览器下载的,这个profile的经过时间是30s的,默认值我们在浏览器上修改不了,如果你想得到时间更长的cpu利用率,可以通过go tool pprof指令与程序交互来获取到

首先,我们先启动程序

```shell
$./demo4
```

然后再打开一个终端

go tool pprof <http://localhost:10000/debug/pprof/profile?seconds=60>

这里制定了生成profile文件的时间间隔60s

等待60s之后, 终端就会有结果出来,我们继续使用top来查看.

```shell
$ go tool pprof <http://localhost:10000/debug/pprof/profile?seconds=60>
Fetching profile over HTTP from <http://localhost:10000/debug/pprof/profile?seconds=60>
Saved profile in /home/itheima/pprof/pprof.demo4.samples.cpu.005.pb.gz
File: demo4
Type: cpu
Time: Mar 3, 2020 at 11:59pm (CST)
Duration: 1mins, Total samples = 12.13s (20.22%)
Entering interactive mode (type "help" for commands, "o" for options)
(pprof) top
Showing nodes accounting for 9940ms, 81.95% of 12130ms total
Dropped 110 nodes (cum <= 60.65ms)
Showing top 10 nodes out of 56
      flat  flat%   sum%        cum   cum%
    2350ms 19.37% 19.37%     4690ms 38.66%  math/rand.(*lockedSource).Int63
    1770ms 14.59% 33.97%     1770ms 14.59%  sync.(*Mutex).Unlock (inline)
    1290ms 10.63% 44.60%     6040ms 49.79%  math/rand.(*Rand).Int31n
    1110ms  9.15% 53.75%     1130ms  9.32%  syscall.Syscall
     810ms  6.68% 60.43%     1860ms 15.33%  bytes.(*Buffer).Write
     620ms  5.11% 65.54%     6660ms 54.91%  math/rand.(*Rand).Intn
     570ms  4.70% 70.24%      570ms  4.70%  runtime.procyield
     500ms  4.12% 74.36%     9170ms 75.60%  main.genSomeBytes
     480ms  3.96% 78.32%      480ms  3.96%  runtime.memmove
     440ms  3.63% 81.95%      440ms  3.63%  math/rand.(*rngSource).Uint64
(pprof)
```

依然会得到cpu性能的结果, 我们发现这次的结果与上次30s的结果百分比类似.

#### D.可视化查看

我们还是通过

```shell
go tool pprof ./demo4 profile
```

进入profile文件查看,然后我们输入web指令.

```shell
$ go tool pprof ./demo4 profileFile: demo4
Type: cpu
Time: Mar 3, 2020 at 11:18pm (CST)
Duration: 30.13s, Total samples = 6.27s (20.81%)
Entering interactive mode (type "help" for commands, "o" for options)
(pprof) web
```

这里如果报找不到graphviz工具,需要安装一下

Ubuntu安装

```shell
$sudo apt-get install graphviz
```

Mac安装

```shell
brew install graphviz
```

windows安装

下载<https://graphviz.gitlab.io/_pages/Download/Download_windows.html>

将graphviz安装目录下的bin文件夹添加到Path环境变量中。 在终端输入dot -version查看是否安装成功。

然后我们得到一个svg的可视化文件在/tmp路径下

这样我们就能比较清晰的看到函数之间的调用关系,方块越大的表示cpu的占用越大.


## 参考

[最常用的调试 golang 的 bug 以及性能问题的实践方法](https://www.yuque.com/aceld/golang/ga6pb1)