---
title: 每日leetcode-回文数-9
date: 2019-12-16 23:45:36
categories:
- leetcode
tags: [leetcode, 每日训练, 算法, 面试, 学习笔记]
---

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。


```
示例 1:
输入: 121
输出: true

示例 2:
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读

示例 3:
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
进阶:

你能不将整数转为字符串来解决这个问题吗？
```
题目地址：[两数之和](https://leetcode-cn.com/problems/palindrome-number)
<!-- more -->
------

## 思路
同整数回转, 取目标数的每位并回转判断。负数及对10求余等于0的数（不包括0）表示最后一为一定为0, 必不可能是回文数。

最佳解法只要反转一半数字再判断是否相等，就知道是不是回文数。
```	
而当x小于保存的数时，即表示已经到达中间了
e.g. x:12321 res:0 -> x:12321 res:1 -> x:1232 res:12 -> x:123 => res = x/10
此时x<=res则跳出循环去判断，分奇数和偶数两种情况，奇数时res要整除10
```
## 代码
```go
func isPalindrome(x int) bool {
	if x < 0 {
		return false
	}
	pre_x := x
	reverseNum := 0

	for ; ; {
		if x == 0 {
			break
		}
		reverseNum = reverseNum * 10 + x % 10
		x /= 10
	}
	return pre_x == reverseNum
}

func Test_isPalindrome(t *testing.T) {
	print(isPalindrome(123321))
}
```
## 最佳解
```go
func isPalindrome(x int) bool {
    // 只要是负数，肯定不是回文数
	// 若对十求余数为0，表明最后一位是0，肯定不是回文数
	if x < 0 || (x % 10 == 0 && x != 0) {
		return false
	}
	res := 0
	// 只要反转一半数字再判断是否相等，就知道是不是回文数
	// 而当x小于保存的数时，即表示已经到达中间了
	// e.g. x:12321 res:0 -> x:12321 res:1 -> x:1232 res:12 -> x:123 => res = x/10
	// 此时x<=res则跳出循环去判断，分奇数和偶数两种情况，奇数时res要整除10
	for x > res {
		tmp := x % 10
		x /= 10
		res = res*10 + tmp
	}
	return x == res || x == res / 10
}
```