---
title: leetcode-28. Implement strStr()
categories:
  - leetcode
tags:
  - 面试
  - 学习笔记
  - leetcode
keywords: 'leetcede,Implement strStr()'
date: 2020-02-8 20:16:13
---

### 题目

```shell
Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "hello", needle = "ll"
Output: 2
Example 2:

Input: haystack = "aaaaa", needle = "bba"
Output: -1
Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-strstr
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

<!-- more -->

### 解答思路

双循环暴力解法。

kmp解法：相较于暴力解法更聪明，遇到特定字符时不会完全从头开始，而是遵从pat生成的next数组规则（即确认有限自动状态机）。如下图所示：

![kmp解法图例](https://pic.leetcode-cn.com/74666053023d668f2007c84382a86930c1270807cdf2f4394165bf2b16336f72-file_1568963023167)

主要任务在于构建**确认有限自动状态机**，即上图中的跳转规则。创建next数组如下图所示：

![next数组](https://pic.leetcode-cn.com/b3fe29e2c772df9eb04baae42b4be0a388d03a625cb3815de474868531768d9b-file_1568963023183)

伪代码：

```java
public class KMP {
    private int[][] dp;
    private String pat;

    public KMP(String pat) {
        this.pat = pat;
        int M = pat.length();
        // dp[状态][字符] = 下个状态
        dp = new int[M][256];
        // base case
        dp[0][pat.charAt(0)] = 1;
        // 影子状态 X 初始为 0
        int X = 0;
        // 构建状态转移图（稍改的更紧凑了）
        for (int j = 1; j < M; j++) {
            for (int c = 0; c < 256; c++) {
                // 等于重置状态 x 值
                dp[j][c] = dp[X][c];
            }
            // 步进状态
            dp[j][pat.charAt(j)] = j + 1;
            // 更新影子状态 等于为 dp[j][c] = dp[X][c]; 做下一步的映射准备
            X = dp[X][pat.charAt(j)];
        }
    }

    public int search(String txt) {
        int M = pat.length();
        int N = txt.length();
        // pat 的初始态为 0
        int j = 0;
        for (int i = 0; i < N; i++) {
            // 计算 pat 的下一个状态
            j = dp[j][txt.charAt(i)];
            // 到达终止态，返回结果
            if (j == M) return i - M + 1;
        }
        // 没到达终止态，匹配失败
        return -1;
    }
}

/**
作者：labuladong
链接：https://leetcode-cn.com/problems/implement-strstr/solution/kmp-suan-fa-xiang-jie-by-labuladong/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
/
```



### 代码

```go
package easy

import "testing"

/**
Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "hello", needle = "ll"
Output: 2
Example 2:

Input: haystack = "aaaaa", needle = "bba"
Output: -1
Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-strstr
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
// 暴力解
func strStr(haystack string, needle string) int {
	// 健壮性编写
	if len(needle) == 0 {
		return 0
	}
	if len(needle) > len(haystack) {
		return -1
	}
	var i, j int
	for i = 0; i < len(haystack); i++ {
		for j = 0; j < len(needle); j++ {
			if haystack[i+j] != needle[j] {
				break
			}
		}
		if j == len(needle) {
			return i
		}
		// 剩余字符串长度小于needle长度则返回
		if len(haystack)-i-1 < len(needle) {
			return -1
		}
	}
	return -1
}

func TestStrStr(t *testing.T) {
	println(strStr("hello", "ll"))
	println(strStr("aaaaa", "bba"))
	println(strStr("aaaaa", "aa"))
	println(strStr("mississippi", "issipi"))
}

```