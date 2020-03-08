---
title: leetcode-69. Sqrt(x)
categories:
  - leetcode
tags:
  - 面试
  - 学习笔记
  - leetcode
keywords: 'leetcede,Sqrt(x)'
date: 2020-03-8 15:00:13
---

### 题目

```shell
Implement int sqrt(int x).

Compute and return the square root of x, where x is guaranteed to be a non-negative integer.

Since the return type is an integer, the decimal digits are truncated and only the integer part of the result is returned.

Example 1:

Input: 4
Output: 2
Example 2:

Input: 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since 
             the decimal part is truncated, 2 is returned.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sqrtx
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

<!-- more -->

### 解答思路

使用二分法求其根，注意使用 x/res > res 来进行比较，如使用res * res >=x 有溢出风险。

需考虑代码健壮性排除0、1。

### 代码

```go
package easy

import (
	"testing"
)

/**
Implement int sqrt(int x).

Compute and return the square root of x, where x is guaranteed to be a non-negative integer.

Since the return type is an integer, the decimal digits are truncated and only the integer part of the result is returned.

Example 1:

Input: 4
Output: 2
Example 2:

Input: 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since
             the decimal part is truncated, 2 is returned.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sqrtx
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

func mySqrt(x int) int {
	if x <= 1 {
		return x
	}
	min, max := 0, x
	for max-min != 1 {
		res := (min + max) / 2
		if x/res >= res {
			min = res
			continue
		}
		max = res
	}
	return min
}

func TestMySqrt(t *testing.T) {
	println(mySqrt(4))
	println(mySqrt(8))
	println(mySqrt(100))
}

```

