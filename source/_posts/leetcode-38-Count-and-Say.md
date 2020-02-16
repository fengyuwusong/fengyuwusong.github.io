---
title: leetcode-38-Count and Say
categories:
  - leetcode
tags:
  - 面试
  - 学习笔记
  - leetcode
keywords: 'leetcede,Count and Say'
date: 2020-02-16 16:28:13
---

### 题目

```shell
The count-and-say sequence is the sequence of integers with the first five terms as following:

1.     1
2.     11
3.     21
4.     1211
5.     111221
1 is read off as "one 1" or 11.
11 is read off as "two 1s" or 21.
21 is read off as "one 2, then one 1" or 1211.

Given an integer n where 1 ≤ n ≤ 30, generate the nth term of the count-and-say sequence. You can do so recursively, in other words from the previous member read off the digits, counting the number of digits in groups of the same digit.

Note: Each term of the sequence of integers will be represented as a string.

 

Example 1:

Input: 1
Output: "1"
Explanation: This is the base case.
Example 2:

Input: 4
Output: "1211"
Explanation: For n = 3 the term was "21" in which we have two groups "2" and "1", "2" can be read as "12" which means frequency = 1 and value = 2, the same way "1" is read as "11", so the answer is the concatenation of "12" and "11" which is "1211".

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-and-say
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

<!-- more -->

### 解答思路

先理解题意：

```shell
# 设函数为fn(x) 其本意为解释int类型每个数的个数和顺序
fn(1) => "1"  # 固定值返回1
fn(2) => fn(fn(1)) => fn("1") => "11" # 1个1
fn(3) => fn(fn(2)) => fn("11") => "21" # 2个1
fn(4) => fn(fn(3)) => fn("21") => "1211" # 1个2 1个1
fn(5) => fn(fn(4)) => fn("1211") => "111221" # 1个1 1个2 2个1
...
```

故明显需使用递归来进行，找到递归出口并按照规则返回即可。

golang注意语法，`string`进行切片本质为`[]rune{...}`

### 代码

```go
package easy

import (
	"bytes"
	"strconv"
	"testing"
)

/**
The count-and-say sequence is the sequence of integers with the first five terms as following:

1.     1
2.     11
3.     21
4.     1211
5.     111221
1 is read off as "one 1" or 11.
11 is read off as "two 1s" or 21.
21 is read off as "one 2, then one 1" or 1211.

Given an integer n where 1 ≤ n ≤ 30, generate the nth term of the count-and-say sequence. You can do so recursively, in other words from the previous member read off the digits, counting the number of digits in groups of the same digit.

Note: Each term of the sequence of integers will be represented as a string.



Example 1:

Input: 1
Output: "1"
Explanation: This is the base case.
Example 2:

Input: 4
Output: "1211"
Explanation: For n = 3 the term was "21" in which we have two groups "2" and "1", "2" can be read as "12" which means frequency = 1 and value = 2, the same way "1" is read as "11", so the answer is the concatenation of "12" and "11" which is "1211".

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-and-say
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

func countAndSay(n int) string {
	// 递归出口
	if n == 1 {
		return "1"
	}
	// 上一个递归结果
	lastRes := countAndSay(n - 1)
	var sameTimes, lastIndex int
	var res bytes.Buffer
	for i := 0; i < len(lastRes); i++ {
		if lastRes[i] == lastRes[lastIndex] {
			sameTimes++
		} else {
			res.WriteString(strconv.Itoa(sameTimes))
			res.WriteRune(rune(lastRes[lastIndex]))
			sameTimes = 1
			lastIndex = i
		}
	}
	if sameTimes != 0 {
		res.WriteString(strconv.Itoa(sameTimes))
		res.WriteRune(rune(lastRes[lastIndex]))
	}
	return res.String()
}

func TestCountAnySay(t *testing.T) {
	println(countAndSay(5))
}

```