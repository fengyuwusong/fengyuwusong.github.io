---
title: Golang的协程调度器原理及GMP设计思想
categories:
  - 编程
tags:
  - golang
  - 学习笔记
  - GMP
keywords: 'golang,GMP,编程'
date: 2022-5-7 16:27:55
---

## 思维导图

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Markmap</title>
<style>
* {
  margin: 0;
  padding: 0;
}
#mindmap {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markmap-toolbar@0.13.2/dist/style.css">
</head>
<body>
<svg id="mindmap"></svg>
<script src="https://cdn.jsdelivr.net/npm/d3@6.7.0"></script><script src="https://cdn.jsdelivr.net/npm/markmap-view@0.13.2"></script><script src="https://cdn.jsdelivr.net/npm/markmap-toolbar@0.13.2/dist/index.umd.min.js"></script><script>(r => {
                setTimeout(r);
              })(() => {
  const {
    markmap,
    mm
  } = window;
  const toolbar = new markmap.Toolbar();
  toolbar.attach(mm);
  const el = toolbar.render();
  el.setAttribute('style', 'position:absolute;bottom:20px;right:20px');
  document.body.append(el);
})</script><script>((getMarkmap, getOptions, root, jsonOptions) => {
        const markmap = getMarkmap();
        window.mm = markmap.Markmap.create('svg#mindmap', getOptions == null ? void 0 : getOptions(markmap, jsonOptions), root);
      })(() => window.markmap,(markmap, jsonOptions) => markmap.deriveOptions(jsonOptions),{"type":"heading","depth":1,"payload":{"lines":[1,2]},"content":"GMP设计思想","children":[{"type":"heading","depth":2,"payload":{"lines":[3,4]},"content":"调度器的由来","children":[{"type":"heading","depth":3,"payload":{"lines":[5,6]},"content":"单进程"},{"type":"heading","depth":3,"payload":{"lines":[9,10]},"content":"多进程/线程","children":[{"type":"list_item","depth":5,"payload":{"lines":[13,14]},"content":"优点","children":[{"type":"list_item","depth":7,"payload":{"lines":[14,15]},"content":"可以并发执行任务"}]},{"type":"list_item","depth":5,"payload":{"lines":[15,16]},"content":"缺点","children":[{"type":"list_item","depth":7,"payload":{"lines":[16,17]},"content":"高内存占用"},{"type":"list_item","depth":7,"payload":{"lines":[17,18]},"content":"调度的高消耗CPU"},{"type":"list_item","depth":7,"payload":{"lines":[18,19]},"content":"锁&amp;竞争冲突"}]}]},{"type":"heading","depth":3,"payload":{"lines":[20,21]},"content":"协程","children":[{"type":"list_item","depth":5,"payload":{"lines":[22,23]},"content":"解决多进程&amp;线程的缺点而被设计"},{"type":"list_item","depth":5,"payload":{"lines":[23,24]},"content":"线程和协程关系","children":[{"type":"list_item","depth":7,"payload":{"lines":[24,25]},"content":"N:1","children":[{"type":"list_item","depth":9,"payload":{"lines":[25,26]},"content":"缺点：无法使用硬件多核能力、协程阻塞则无法并行"}]},{"type":"list_item","depth":7,"payload":{"lines":[26,27]},"content":"1:1","children":[{"type":"list_item","depth":9,"payload":{"lines":[27,28]},"content":"缺点：协程创建、删除和切换的代价都依赖CPU线程完成，代价昂贵"}]},{"type":"list_item","depth":7,"payload":{"lines":[28,29]},"content":"M:N","children":[{"type":"list_item","depth":9,"payload":{"lines":[29,30]},"content":"克服了以上缺点"}]}]},{"type":"list_item","depth":5,"payload":{"lines":[30,31]},"content":"线程&amp;协程区别","children":[{"type":"list_item","depth":7,"payload":{"lines":[31,32]},"content":"占用空间"},{"type":"list_item","depth":7,"payload":{"lines":[32,33]},"content":"调度：抢占式vs协作式（协程让出CPU后才执行下一个协程）"}]}]}]},{"type":"heading","depth":2,"payload":{"lines":[34,35]},"content":"Goroutine调度器的GMP模型设计思想","children":[{"type":"heading","depth":3,"payload":{"lines":[36,37]},"content":"Go语言的协程goroutine","children":[{"type":"list_item","depth":5,"payload":{"lines":[38,39]},"content":"goroutine&amp;channel"},{"type":"list_item","depth":5,"payload":{"lines":[39,40]},"content":"特点","children":[{"type":"list_item","depth":7,"payload":{"lines":[40,41]},"content":"占用内存更小"},{"type":"list_item","depth":7,"payload":{"lines":[41,42]},"content":"调度更灵活"}]}]},{"type":"heading","depth":3,"payload":{"lines":[43,44]},"content":"旧版goroutine调度器","children":[{"type":"list_item","depth":5,"payload":{"lines":[49,50]},"content":"缺点","children":[{"type":"list_item","depth":7,"payload":{"lines":[50,51],"index":1},"content":"1. 创建、销毁、调度G都需要每个M获取锁，这就形成了激烈的锁竞争。"},{"type":"list_item","depth":7,"payload":{"lines":[51,52],"index":2},"content":"2. M转移G会造成延迟和额外的系统负载。比如当G中包含创建新协程的时候，M创建了G’，为了继续执行G，需要把G’交给M’执行，也造成了很差的局部性，因为G’和G是相关的，最好放在M上执行，而不是其他M'。"},{"type":"list_item","depth":7,"payload":{"lines":[52,53],"index":3},"content":"3. 系统调用(CPU在M之间的切换)导致频繁的线程阻塞和取消阻塞操作增加了系统开销。"}]}]},{"type":"heading","depth":3,"payload":{"lines":[54,55]},"content":"GMP模型","children":[{"type":"list_item","depth":5,"payload":{"lines":[58,59]},"content":"模型相关","children":[{"type":"list_item","depth":7,"payload":{"lines":[59,60],"index":1},"content":"1. 全局队列（Global Queue）：存放等待运行的G。"},{"type":"list_item","depth":7,"payload":{"lines":[60,61],"index":2},"content":"2. P的本地队列：同全局队列类似，存放的也是等待运行的G，存的数量有限，不超过256个。新建G'时，G'优先加入到P的本地队列，如果队列满了，则会把本地队列中一半的G移动到全局队列。"},{"type":"list_item","depth":7,"payload":{"lines":[61,62],"index":3},"content":"3. P列表：所有的P都在程序启动时创建，并保存在数组中，最多有GOMAXPROCS(可配置)个。"},{"type":"list_item","depth":7,"payload":{"lines":[62,63],"index":4},"content":"4. M：线程想运行任务就得获取P，从P的本地队列获取G，P队列为空时，M也会尝试从全局队列拿一批G放到P的本地队列，或从其他P的本地队列偷一半放到自己P的本地队列。M运行G，G执行之后，M会从P获取下一个G，不断重复下去。"}]},{"type":"list_item","depth":5,"payload":{"lines":[63,64]},"content":"P和M的个数问题","children":[{"type":"list_item","depth":7,"payload":{"lines":[64,65]},"content":"P的数量","children":[{"type":"list_item","depth":9,"payload":{"lines":[65,66]},"content":"由启动时环境变量<code>$GOMAXPROCS</code>或者是由<code>runtime</code>的方法<code>GOMAXPROCS()</code>决定。这意味着在程序执行的任意时刻都只有<code>$GOMAXPROCS个goroutine</code>在同时运行。"},{"type":"list_item","depth":9,"payload":{"lines":[66,67]},"content":"M的数量","children":[{"type":"list_item","depth":11,"payload":{"lines":[67,68]},"content":"go语言本身的限制：go程序启动时，会设置M的最大数量，默认10000.但是内核很难支持这么多的线程数，所以这个限制可以忽略。"},{"type":"list_item","depth":11,"payload":{"lines":[68,69]},"content":"<code>runtime/debug</code>中的<code>SetMaxThreads</code>函数，设置M的最大数量"},{"type":"list_item","depth":11,"payload":{"lines":[69,70]},"content":"一个M阻塞了，会创建新的M。"}]},{"type":"list_item","depth":9,"payload":{"lines":[70,71]},"content":"P和M的关系","children":[{"type":"list_item","depth":11,"payload":{"lines":[71,72]},"content":"M与P的数量没有绝对关系，一个M阻塞，P就会去创建或者切换另一个M，所以，即使P的默认数量是1，也有可能会创建很多个M出来。"}]},{"type":"list_item","depth":9,"payload":{"lines":[72,73]},"content":"P和M何时被创建","children":[{"type":"list_item","depth":11,"payload":{"lines":[73,74]},"content":"P：在确定P的最大数量n后，运行时系统会根据这个数量创建n个P"},{"type":"list_item","depth":11,"payload":{"lines":[74,75]},"content":"M：没有足够的M来关联P并运行其中可运行的G。比如所有的M此时都阻塞住了，而P中还有很多就绪任务，就会去寻找空闲的M，而没有空闲的，就会去创建新的M。"}]}]}]}]},{"type":"heading","depth":3,"payload":{"lines":[76,77]},"content":"调度器的设计策略","children":[{"type":"list_item","depth":5,"payload":{"lines":[78,79]},"content":"复用线程","children":[{"type":"list_item","depth":7,"payload":{"lines":[79,80]},"content":"work stealing机制：当本线程无可运行的G时，尝试从其他线程绑定的P偷取G，而不是销毁线程。"},{"type":"list_item","depth":7,"payload":{"lines":[80,81]},"content":"hand off机制：当本线程因为G进行系统调用阻塞时，线程释放绑定的P，把P转移给其他空闲的线程执行。"}]},{"type":"list_item","depth":5,"payload":{"lines":[81,82]},"content":"利用并行","children":[{"type":"list_item","depth":7,"payload":{"lines":[82,83]},"content":"GOMAXPROCS设置P的数量，最多有GOMAXPROCS个线程分布在多个CPU上同时运行。GOMAXPROCS也限制了并发的程度，比如GOMAXPROCS = 核数/2，则最多利用了一半的CPU核进行并行。"}]},{"type":"list_item","depth":5,"payload":{"lines":[83,84]},"content":"抢占","children":[{"type":"list_item","depth":7,"payload":{"lines":[84,85]},"content":"在coroutine中要等待一个协程主动让出CPU才执行下一个协程，<strong>在Go中，一个goroutine最多占用CPU 10ms，防止其他goroutine被饿死，这就是goroutine不同于coroutine的一个地方。</strong>"}]},{"type":"list_item","depth":5,"payload":{"lines":[85,86]},"content":"全局G队列","children":[{"type":"list_item","depth":7,"payload":{"lines":[86,87]},"content":"在新的调度器中依然有全局G队列，但功能已经被弱化了，当M执行work stealing从其他P偷不到G时，它可以从全局G队列获取G。"}]}]},{"type":"heading","depth":3,"payload":{"lines":[88,89]},"content":"<code>go func()</code>调度流程"},{"type":"heading","depth":3,"payload":{"lines":[99,100]},"content":"调度器的生命周期","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-go\"><code class=\"language-go\"><span class=\"token keyword\">package</span> main\n\n<span class=\"token keyword\">import</span> <span class=\"token string\">\"fmt\"</span>\n\n<span class=\"token keyword\">func</span> <span class=\"token function\">main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n    fmt<span class=\"token punctuation\">.</span><span class=\"token function\">Println</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello world\"</span><span class=\"token punctuation\">)</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n"},{"type":"bullet_list","depth":4,"payload":{"lines":[113,125]},"content":"","children":[{"type":"list_item","depth":5,"payload":{"lines":[113,114]},"content":"M0&amp;G0","children":[{"type":"list_item","depth":7,"payload":{"lines":[114,115]},"content":"M0是启动程序后的编号为0的主线程，这个M对应的实例会在全局变量runtime.m0中，不需要在heap上分配，M0负责执行初始化操作和启动第一个G， 在之后M0就和其他的M一样了。"},{"type":"list_item","depth":7,"payload":{"lines":[115,116]},"content":"G0是每次启动一个M都会第一个创建的gourtine，G0仅用于负责调度的G，G0不指向任何可执行的函数, 每个M都会有一个自己的G0。在调度或系统调用时会使用G0的栈空间, 全局变量的G0是M0的G0。"}]},{"type":"list_item","depth":5,"payload":{"lines":[116,117]},"content":"生命周期流程","children":[{"type":"list_item","depth":7,"payload":{"lines":[117,118],"index":1},"content":"1. runtime创建最初的线程m0和goroutine g0，并把2者关联。"},{"type":"list_item","depth":7,"payload":{"lines":[118,119],"index":2},"content":"2. 调度器初始化：初始化m0、栈、垃圾回收，以及创建和初始化由GOMAXPROCS个P构成的P列表。"},{"type":"list_item","depth":7,"payload":{"lines":[119,120],"index":3},"content":"3. 示例代码中的main函数是main.main，runtime中也有1个main函数——runtime.main，代码经过编译后，runtime.main会调用main.main，程序启动时会为runtime.main创建goroutine，称它为main goroutine吧，然后把main goroutine加入到P的本地队列。"},{"type":"list_item","depth":7,"payload":{"lines":[120,121],"index":4},"content":"4. 启动m0，m0已经绑定了P，会从P的本地队列获取G，获取到main goroutine。"},{"type":"list_item","depth":7,"payload":{"lines":[121,122],"index":5},"content":"5. G拥有栈，M根据G中的栈信息和调度信息设置运行环境"},{"type":"list_item","depth":7,"payload":{"lines":[122,123],"index":6},"content":"6. M运行G"},{"type":"list_item","depth":7,"payload":{"lines":[123,124],"index":7},"content":"7. G退出，再次回到M获取可运行的G，这样重复下去，直到main.main退出，runtime.main执行Defer和Panic处理，或调用runtime.exit退出程序。"}]}]}]},{"type":"heading","depth":3,"payload":{"lines":[125,126]},"content":"可视化GMP编程","children":[{"type":"bullet_list","depth":4,"payload":{"lines":[127,129]},"content":"","children":[{"type":"list_item","depth":5,"payload":{"lines":[127,128]},"content":"<code>go tool trace</code>"}]},{"type":"fence","depth":4,"content":"<pre class=\"language-go\"><code class=\"language-go\"><span class=\"token keyword\">package</span> main\n\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token string\">\"os\"</span>\n    <span class=\"token string\">\"fmt\"</span>\n    <span class=\"token string\">\"runtime/trace\"</span>\n<span class=\"token punctuation\">)</span>\n\n<span class=\"token keyword\">func</span> <span class=\"token function\">main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n\n    <span class=\"token comment\">//创建trace文件</span>\n    f<span class=\"token punctuation\">,</span> err <span class=\"token operator\">:=</span> os<span class=\"token punctuation\">.</span><span class=\"token function\">Create</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"trace.out\"</span><span class=\"token punctuation\">)</span>\n    <span class=\"token keyword\">if</span> err <span class=\"token operator\">!=</span> <span class=\"token boolean\">nil</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token function\">panic</span><span class=\"token punctuation\">(</span>err<span class=\"token punctuation\">)</span>\n    <span class=\"token punctuation\">}</span>\n\n    <span class=\"token keyword\">defer</span> f<span class=\"token punctuation\">.</span><span class=\"token function\">Close</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span>\n\n    <span class=\"token comment\">//启动trace goroutine</span>\n    err <span class=\"token operator\">=</span> trace<span class=\"token punctuation\">.</span><span class=\"token function\">Start</span><span class=\"token punctuation\">(</span>f<span class=\"token punctuation\">)</span>\n    <span class=\"token keyword\">if</span> err <span class=\"token operator\">!=</span> <span class=\"token boolean\">nil</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token function\">panic</span><span class=\"token punctuation\">(</span>err<span class=\"token punctuation\">)</span>\n    <span class=\"token punctuation\">}</span>\n    <span class=\"token keyword\">defer</span> trace<span class=\"token punctuation\">.</span><span class=\"token function\">Stop</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span>\n\n    <span class=\"token comment\">//main</span>\n    fmt<span class=\"token punctuation\">.</span><span class=\"token function\">Println</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello World\"</span><span class=\"token punctuation\">)</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n"},{"type":"bullet_list","depth":4,"payload":{"lines":[162,164]},"content":"","children":[{"type":"list_item","depth":5,"payload":{"lines":[162,163]},"content":"<code>Debug trace</code>"}]},{"type":"fence","depth":4,"content":"<pre class=\"language-shell\"><code class=\"language-shell\">  $ <span class=\"token assign-left variable\">GODEBUG</span><span class=\"token operator\">=</span>schedtrace<span class=\"token operator\">=</span><span class=\"token number\">1000</span> ./trace2\n  SCHED 0ms: <span class=\"token assign-left variable\">gomaxprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">idleprocs</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token assign-left variable\">threads</span><span class=\"token operator\">=</span><span class=\"token number\">4</span> <span class=\"token assign-left variable\">spinningthreads</span><span class=\"token operator\">=</span><span class=\"token number\">1</span> <span class=\"token assign-left variable\">idlethreads</span><span class=\"token operator\">=</span><span class=\"token number\">1</span> <span class=\"token assign-left variable\">runqueue</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token punctuation\">[</span><span class=\"token number\">0</span> <span class=\"token number\">0</span><span class=\"token punctuation\">]</span>\n  Hello World\n  SCHED 1003ms: <span class=\"token assign-left variable\">gomaxprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">idleprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">threads</span><span class=\"token operator\">=</span><span class=\"token number\">4</span> <span class=\"token assign-left variable\">spinningthreads</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token assign-left variable\">idlethreads</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">runqueue</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token punctuation\">[</span><span class=\"token number\">0</span> <span class=\"token number\">0</span><span class=\"token punctuation\">]</span>\n  Hello World\n  SCHED 2014ms: <span class=\"token assign-left variable\">gomaxprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">idleprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">threads</span><span class=\"token operator\">=</span><span class=\"token number\">4</span> <span class=\"token assign-left variable\">spinningthreads</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token assign-left variable\">idlethreads</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">runqueue</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token punctuation\">[</span><span class=\"token number\">0</span> <span class=\"token number\">0</span><span class=\"token punctuation\">]</span>\n  Hello World\n  SCHED 3015ms: <span class=\"token assign-left variable\">gomaxprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">idleprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">threads</span><span class=\"token operator\">=</span><span class=\"token number\">4</span> <span class=\"token assign-left variable\">spinningthreads</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token assign-left variable\">idlethreads</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">runqueue</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token punctuation\">[</span><span class=\"token number\">0</span> <span class=\"token number\">0</span><span class=\"token punctuation\">]</span>\n  Hello World\n  SCHED 4023ms: <span class=\"token assign-left variable\">gomaxprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">idleprocs</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">threads</span><span class=\"token operator\">=</span><span class=\"token number\">4</span> <span class=\"token assign-left variable\">spinningthreads</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token assign-left variable\">idlethreads</span><span class=\"token operator\">=</span><span class=\"token number\">2</span> <span class=\"token assign-left variable\">runqueue</span><span class=\"token operator\">=</span><span class=\"token number\">0</span> <span class=\"token punctuation\">[</span><span class=\"token number\">0</span> <span class=\"token number\">0</span><span class=\"token punctuation\">]</span>\n  Hello World\n</code></pre>\n"},{"type":"bullet_list","depth":4,"payload":{"lines":[180,192]},"content":"","children":[{"type":"list_item","depth":5,"payload":{"lines":[180,181]},"content":"执行方式：<code>GODEBUG=schedtrace=1000 ./trace2</code>"},{"type":"list_item","depth":5,"payload":{"lines":[181,182]},"content":"说明","children":[{"type":"list_item","depth":7,"payload":{"lines":[182,183]},"content":"SCHED：调试信息输出标志字符串，代表本行是goroutine调度器的输出；"},{"type":"list_item","depth":7,"payload":{"lines":[183,184]},"content":"0ms：即从程序启动到输出这行日志的时间；"},{"type":"list_item","depth":7,"payload":{"lines":[184,185]},"content":"gomaxprocs: P的数量，本例有2个P, 因为默认的P的属性是和cpu核心数量默认一致，当然也可以通过GOMAXPROCS来设置；"},{"type":"list_item","depth":7,"payload":{"lines":[185,186]},"content":"idleprocs: 处于idle状态的P的数量；通过gomaxprocs和idleprocs的差值，我们就可知道执行go代码的P的数量；"},{"type":"list_item","depth":7,"payload":{"lines":[186,187]},"content":"threads: os threads/M的数量，包含scheduler使用的m数量，加上runtime自用的类似sysmon这样的thread的数量；"},{"type":"list_item","depth":7,"payload":{"lines":[187,188]},"content":"spinningthreads: 处于自旋状态的os thread数量；"},{"type":"list_item","depth":7,"payload":{"lines":[188,189]},"content":"idlethread: 处于idle状态的os thread的数量；"},{"type":"list_item","depth":7,"payload":{"lines":[189,190]},"content":"runqueue=0： Scheduler全局队列中G的数量；"},{"type":"list_item","depth":7,"payload":{"lines":[190,191]},"content":"[0 0]: 分别为2个P的local queue中的G的数量。"}]}]}]}]},{"type":"heading","depth":2,"payload":{"lines":[192,193]},"content":"Go调度器调度场景过程全解析","children":[{"type":"list_item","depth":4,"payload":{"lines":[196,197]},"content":"新建G会优先放到当前的P本地队列"},{"type":"list_item","depth":4,"payload":{"lines":[197,198]},"content":"M执行完G时，会先切换G0负责协程的调度切换，从而执行下一个G"},{"type":"list_item","depth":4,"payload":{"lines":[198,199]},"content":"当开辟过多G，P本地队列装不下的时候，则会执行负载均衡（把P本地队列前一半的G和新建的G打乱顺序转移到全局队列【新建的G不一定会转移，需视是否需立即执行决定】）"},{"type":"list_item","depth":4,"payload":{"lines":[199,200]},"content":"创建G时，运行的G会尝试唤醒其他空闲的P和M组合去执行"},{"type":"list_item","depth":4,"payload":{"lines":[200,201]},"content":"空闲M从全局队列GQ获取G的数量符合公式：<code>n = min(len(GQ) / GOMAXPROCS + 1, cap(LQ) / 2 )</code>"},{"type":"list_item","depth":4,"payload":{"lines":[201,202]},"content":"如全局队列已经没有G，则m需要自行<code>work stealing</code>: 从其他P的本地队列中偷取一半的G，放到自己的P队列"},{"type":"list_item","depth":4,"payload":{"lines":[202,203]},"content":"空闲线程如没有G执行，则会让其处于自旋状态【由于创建销毁本身也需消耗资源，故保存自旋当有新的G时可立马执行】，最多有GOMAXPROCS个自旋线程"},{"type":"list_item","depth":4,"payload":{"lines":[203,204]},"content":"当G进行了系统调用时，则M和P会立即解绑，此时如P本地队列存在G、全局队列有G或有空闲的M，P都会立马唤醒一个M和它绑定，否则P会加入空闲P列表，等待M来获取【即当前M用于执行阻塞系统调用的G，此时M无P绑定】"},{"type":"list_item","depth":4,"payload":{"lines":[204,205]},"content":"假设G进行的系统调用并非阻塞，则M执行完毕系统后，G会重新投入G全局队列中并标记为可运行状态，同时M会重新尝试获取之前绑定的P，如该P已被其他M绑定，则从空闲队列中获取P，如仍获取失败则M因为没有P的绑定而变成休眠状态(长时间休眠等待GC回收销毁)。"}]},{"type":"heading","depth":2,"payload":{"lines":[206,207]},"content":"总结"},{"type":"heading","depth":2,"payload":{"lines":[210,211]},"content":"参考","children":[{"type":"list_item","depth":4,"payload":{"lines":[212,213]},"content":"<a href=\"https://www.yuque.com/aceld/golang/srxd6d\">Golang的协程调度器原理及GMP设计思想</a>"}]}]},{})</script>
</body>
</html>

<!-- more -->

## GMP设计思想

### 调度器的由来

#### 单进程

一个进程只能处理一个任务，故不需要调度器

#### 多进程/线程

进程阻塞时，可以切换其他进程来执行其他任务

- 优点
  - 可以并发执行任务
- 缺点
  - 高内存占用
  - 调度的高消耗CPU
  - 锁&竞争冲突

#### 协程

- 解决多进程&线程的缺点而被设计
- 线程和协程关系
  - N:1
    - 缺点：无法使用硬件多核能力、协程阻塞则无法并行
  - 1:1
    - 缺点：协程创建、删除和切换的代价都依赖CPU线程完成，代价昂贵
  - M:N
    - 克服了以上缺点
- 线程&协程区别
  - 占用空间
  - 调度：抢占式vs协作式（协程让出CPU后才执行下一个协程）

### Goroutine调度器的GMP模型设计思想

#### Go语言的协程goroutine

- goroutine&channel
- 特点
  - 占用内存更小
  - 调度更灵活

#### 旧版goroutine调度器

Go目前使用的调度器是2012年重新设计的，因为之前的调度器性能存在问题，所以使用4年就被废弃了，那么我们先来分析一下被废弃的调度器是如何运作的？
![GPM模型](http://pic.fengyuwusong.cn/20220509002839.png)
![旧版调度流程](http://pic.fengyuwusong.cn/20220509002636.png)

- 缺点
  1. 创建、销毁、调度G都需要每个M获取锁，这就形成了激烈的锁竞争。
  2. M转移G会造成延迟和额外的系统负载。比如当G中包含创建新协程的时候，M创建了G’，为了继续执行G，需要把G’交给M’执行，也造成了很差的局部性，因为G’和G是相关的，最好放在M上执行，而不是其他M'。
  3. 系统调用(CPU在M之间的切换)导致频繁的线程阻塞和取消阻塞操作增加了系统开销。

#### GMP模型

![GPM模型](http://pic.fengyuwusong.cn/20220509002911.png)

- 模型相关
  1. 全局队列（Global Queue）：存放等待运行的G。
  2. P的本地队列：同全局队列类似，存放的也是等待运行的G，存的数量有限，不超过256个。新建G'时，G'优先加入到P的本地队列，如果队列满了，则会把本地队列中一半的G移动到全局队列。
  3. P列表：所有的P都在程序启动时创建，并保存在数组中，最多有GOMAXPROCS(可配置)个。
  4. M：线程想运行任务就得获取P，从P的本地队列获取G，P队列为空时，M也会尝试从全局队列拿一批G放到P的本地队列，或从其他P的本地队列偷一半放到自己P的本地队列。M运行G，G执行之后，M会从P获取下一个G，不断重复下去。
- P和M的个数问题
  - P的数量
    - 由启动时环境变量`$GOMAXPROCS`或者是由`runtime`的方法`GOMAXPROCS()`决定。这意味着在程序执行的任意时刻都只有`$GOMAXPROCS个goroutine`在同时运行。
    - M的数量
      - go语言本身的限制：go程序启动时，会设置M的最大数量，默认10000.但是内核很难支持这么多的线程数，所以这个限制可以忽略。
      - `runtime/debug`中的`SetMaxThreads`函数，设置M的最大数量
      - 一个M阻塞了，会创建新的M。
    - P和M的关系
      - M与P的数量没有绝对关系，一个M阻塞，P就会去创建或者切换另一个M，所以，即使P的默认数量是1，也有可能会创建很多个M出来。
    - P和M何时被创建
      - P：在确定P的最大数量n后，运行时系统会根据这个数量创建n个P
      - M：没有足够的M来关联P并运行其中可运行的G。比如所有的M此时都阻塞住了，而P中还有很多就绪任务，就会去寻找空闲的M，而没有空闲的，就会去创建新的M。

#### 调度器的设计策略

- 复用线程
  - work stealing机制：当本线程无可运行的G时，尝试从其他线程绑定的P偷取G，而不是销毁线程。
  - hand off机制：当本线程因为G进行系统调用阻塞时，线程释放绑定的P，把P转移给其他空闲的线程执行。
- 利用并行
  - GOMAXPROCS设置P的数量，最多有GOMAXPROCS个线程分布在多个CPU上同时运行。GOMAXPROCS也限制了并发的程度，比如GOMAXPROCS = 核数/2，则最多利用了一半的CPU核进行并行。
- 抢占
  - 在coroutine中要等待一个协程主动让出CPU才执行下一个协程，**在Go中，一个goroutine最多占用CPU 10ms，防止其他goroutine被饿死，这就是goroutine不同于coroutine的一个地方。**
- 全局G队列
  - 在新的调度器中依然有全局G队列，但功能已经被弱化了，当M执行work stealing从其他P偷不到G时，它可以从全局G队列获取G。

#### `go func()`调度流程

![go func()调度流程](http://pic.fengyuwusong.cn/20220509004938.png)

 1、我们通过 go func()来创建一个goroutine；
 2、有两个存储G的队列，一个是局部调度器P的本地队列、一个是全局G队列。新创建的G会先保存在P的本地队列中，如果P的本地队列已经满了就会保存在全局的队列中；
 3、G只能运行在M中，一个M必须持有一个P，M与P是1：1的关系。M会从P的本地队列弹出一个可执行状态的G来执行，如果P的本地队列为空，就会想其他的MP组合偷取一个可执行的G来执行；
 4、一个M调度G执行的过程是一个循环机制；
 5、当M执行某一个G时候如果发生了syscall或则其余阻塞操作，M会阻塞，如果当前有一些G在执行，runtime会把这个线程M从P中摘除(detach)，然后再创建一个新的操作系统的线程(如果有空闲的线程可用就复用空闲线程)来服务于这个P；
 6、当M系统调用结束时候，这个G会尝试获取一个空闲的P执行，并放入到这个P的本地队列。如果获取不到P，那么这个线程M变成休眠状态， 加入到空闲线程中，然后这个G会被放入全局队列中。

#### 调度器的生命周期

![调度器的声生命周期](http://pic.fengyuwusong.cn/20220509005403.png)

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello world")
}
```

- M0&G0
  - M0是启动程序后的编号为0的主线程，这个M对应的实例会在全局变量runtime.m0中，不需要在heap上分配，M0负责执行初始化操作和启动第一个G， 在之后M0就和其他的M一样了。
  - G0是每次启动一个M都会第一个创建的gourtine，G0仅用于负责调度的G，G0不指向任何可执行的函数, 每个M都会有一个自己的G0。在调度或系统调用时会使用G0的栈空间, 全局变量的G0是M0的G0。
- 生命周期流程
  1. runtime创建最初的线程m0和goroutine g0，并把2者关联。
  2. 调度器初始化：初始化m0、栈、垃圾回收，以及创建和初始化由GOMAXPROCS个P构成的P列表。
  3. 示例代码中的main函数是main.main，runtime中也有1个main函数——runtime.main，代码经过编译后，runtime.main会调用main.main，程序启动时会为runtime.main创建goroutine，称它为main goroutine吧，然后把main goroutine加入到P的本地队列。
  4. 启动m0，m0已经绑定了P，会从P的本地队列获取G，获取到main goroutine。
  5. G拥有栈，M根据G中的栈信息和调度信息设置运行环境
  6. M运行G
  7. G退出，再次回到M获取可运行的G，这样重复下去，直到main.main退出，runtime.main执行Defer和Panic处理，或调用runtime.exit退出程序。

#### 可视化GMP编程

- `go tool trace`

trace记录了运行时的信息，能提供可视化的Web页面。

```go
package main

import (
    "os"
    "fmt"
    "runtime/trace"
)

func main() {

    //创建trace文件
    f, err := os.Create("trace.out")
    if err != nil {
        panic(err)
    }

    defer f.Close()

    //启动trace goroutine
    err = trace.Start(f)
    if err != nil {
        panic(err)
    }
    defer trace.Stop()

    //main
    fmt.Println("Hello World")
}
```

- `Debug trace`

编译二进制包后使用以下方式执行

```shell
  $ GODEBUG=schedtrace=1000 ./trace2
  SCHED 0ms: gomaxprocs=2 idleprocs=0 threads=4 spinningthreads=1 idlethreads=1 runqueue=0 [0 0]
  Hello World
  SCHED 1003ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
  Hello World
  SCHED 2014ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
  Hello World
  SCHED 3015ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
  Hello World
  SCHED 4023ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
  Hello World
```

- 执行方式：`GODEBUG=schedtrace=1000 ./trace2`
- 说明
  - SCHED：调试信息输出标志字符串，代表本行是goroutine调度器的输出；
  - 0ms：即从程序启动到输出这行日志的时间；
  - gomaxprocs: P的数量，本例有2个P, 因为默认的P的属性是和cpu核心数量默认一致，当然也可以通过GOMAXPROCS来设置；
  - idleprocs: 处于idle状态的P的数量；通过gomaxprocs和idleprocs的差值，我们就可知道执行go代码的P的数量；
  - threads: os threads/M的数量，包含scheduler使用的m数量，加上runtime自用的类似sysmon这样的thread的数量；
  - spinningthreads: 处于自旋状态的os thread数量；
  - idlethread: 处于idle状态的os thread的数量；
  - runqueue=0： Scheduler全局队列中G的数量；
  - [0 0]: 分别为2个P的local queue中的G的数量。

### Go调度器调度场景过程全解析

具体参考下列文章，重点如下：

- 新建G会优先放到当前的P本地队列
- M执行完G时，会先切换G0负责协程的调度切换，从而执行下一个G
- 当开辟过多G，P本地队列装不下的时候，则会执行负载均衡（把P本地队列前一半的G和新建的G打乱顺序转移到全局队列【新建的G不一定会转移，需视是否需立即执行决定】）
- 创建G时，运行的G会尝试唤醒其他空闲的P和M组合去执行
- 空闲M从全局队列GQ获取G的数量符合公式：`n =  min(len(GQ) / GOMAXPROCS +  1,  cap(LQ) / 2 )`
- 如全局队列已经没有G，则m需要自行`work stealing`: 从其他P的本地队列中偷取一半的G，放到自己的P队列
- 空闲线程如没有G执行，则会让其处于自旋状态【由于创建销毁本身也需消耗资源，故保存自旋当有新的G时可立马执行】，最多有GOMAXPROCS个自旋线程
- 当G进行了系统调用时，则M和P会立即解绑，此时如P本地队列存在G、全局队列有G或有空闲的M，P都会立马唤醒一个M和它绑定，否则P会加入空闲P列表，等待M来获取【即当前M用于执行阻塞系统调用的G，此时M无P绑定】
- 假设G进行的系统调用并非阻塞，则M执行完毕系统后，G会重新投入G全局队列中并标记为可运行状态，同时M会重新尝试获取之前绑定的P，如该P已被其他M绑定，则从空闲队列中获取P，如仍获取失败则M因为没有P的绑定而变成休眠状态(长时间休眠等待GC回收销毁)。

### 总结

Go调度本质是把大量的goroutine分配到少量线程上去执行，并利用多核并行，实现更强大的并发。

### 参考

- [Golang的协程调度器原理及GMP设计思想](https://www.yuque.com/aceld/golang/srxd6d)