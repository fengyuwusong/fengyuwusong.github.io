---
title: Golang逃逸分析
categories:
  - 学习笔记
tags:
  - go
  - 逃逸分析
keywords: 'go,golang,包管理,govendor,gomod'
date: 2022-5-10 16:58:42
---
### Golang编译器逃逸分析

#### 逃逸分析(escape analysis)

go语言编译器会自动决定把一个变量放在栈还是放在堆，编译器会做逃逸分析(escape analysis)，**当发现变量的作用域没有跑出函数范围，就可以在栈上，反之则必须分配在堆。**

<!-- more -->

##### 判断是否发生逃逸

- 查看指针是否连续

```go
package main

func foo(arg_val int) (*int) {

    var foo_val1 int = 11;
    var foo_val2 int = 12;
    var foo_val3 int = 13;
    var foo_val4 int = 14;
    var foo_val5 int = 15;


    //此处循环是防止go编译器将foo优化成inline(内联函数)
    //如果是内联函数，main调用foo将是原地展开，所以foo_val1-5相当于main作用域的变量
    //即使foo_val3发生逃逸，地址与其他也是连续的
    for i := 0; i < 5; i++ {
        println(&arg_val, &foo_val1, &foo_val2, &foo_val3, &foo_val4, &foo_val5)
    }

    //返回foo_val3给main函数
    return &foo_val3;
}


func main() {
    main_val := foo(666)

    println(*main_val, main_val)
}
```

输出：

```shell
0xc000038768 0xc000038760 0xc000038758 0xc000038750 0xc000038748 0xc000038740
0xc000038768 0xc000038760 0xc000038758 0xc000038750 0xc000038748 0xc000038740
0xc000038768 0xc000038760 0xc000038758 0xc000038750 0xc000038748 0xc000038740
0xc000038768 0xc000038760 0xc000038758 0xc000038750 0xc000038748 0xc000038740
0xc000038768 0xc000038760 0xc000038758 0xc000038750 0xc000038748 0xc000038740
13 0xc000038750
```

- 使用`go tool compile`测试，发现该变量被判断为逃逸，在堆中被开辟

```shell
➜  ~ go tool compile -m demo.go 
demo.go:3:6: can inline foo
demo.go:22:6: can inline main
demo.go:23:17: inlining call to foo
demo.go:7:6: moved to heap: foo_val3
```

- 也可以采用去汇编的方式来证实是否逃逸

```shell
go tool compile -S demo.go > demo.S
```

截取demo.S部分，发现`runtime.newobject(SB)`,说明该变量在堆空间开辟。

```S
 0x0033 00051 (demo.go:7) LEAQ type.int(SB), AX
 0x003a 00058 (demo.go:7) MOVQ AX, (SP)
 0x003e 00062 (demo.go:7) PCDATA $1, $0
 0x003e 00062 (demo.go:7) NOP
 0x0040 00064 (demo.go:7) CALL runtime.newobject(SB)
 0x0045 00069 (demo.go:7) MOVQ 8(SP), AX
 0x004a 00074 (demo.go:7) MOVQ AX, "".&foo_val3+56(SP)
 0x004f 00079 (demo.go:7) MOVQ $13, (AX)
 0x0056 00086 (demo.go:8) MOVQ $14, "".foo_val4+32(SP)
 0x005f 00095 (demo.go:9) MOVQ $15, "".foo_val5+24(SP)
 0x0068 00104 (demo.go:9) XORL CX, CX
```

#### 逃逸规则

**一般我们给一个引用类对象中的引用类成员进行赋值，可能出现逃逸现象。**
可以理解为访问一个引用对象实际上底层就是通过一个指针来间接的访问了，但如果再访问里面的引用成员就会有第二次间接访问，这样操作这部分对象的话，极大可能会出现逃逸的现象。

Go语言中的引用类型有
**func（函数类型），interface（接口类型），slice（切片类型），map（字典类型），channel（管道类型），*（指针类型），等**

##### 逃逸范例

1. []interface{}数据类型，通过[]赋值必定会出现逃逸。
2. map[string]interface{}类型尝试通过赋值，必定会出现逃逸。
3. map[interface{}]interface{}类型尝试通过赋值，会导致key和value的赋值，key和value均出现逃逸。
4. map[string][]string数据类型，赋值会发生[]string发生逃逸。
5. []*int数据类型，赋值的右值会发生逃逸现象。
6. func(*int)函数类型，进行函数赋值，会使传递的形参出现逃逸现象。
7. func([]string): 函数类型，进行[]string{"value"}赋值，会使传递的参数出现逃逸现象。
8. chan []string数据类型，想当前channel中传输[]string{"value"}会发生逃逸现象。