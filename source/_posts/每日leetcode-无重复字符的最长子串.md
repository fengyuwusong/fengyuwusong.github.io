---
title: 每日leetcode-无重复字符的最长子串
date: 2018-12-09 22:33:01
categories:
- leetcode
tags: [leetcode, 每日训练, 算法, 面试, 学习笔记]
---

## 无重复字符的最长子串

 给定一个字符串，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例 1:**

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

题目链接：[点击这里~](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

<!--more-->

## 思路

使用Hash表建立一个简单的滑动窗口，并尽量扩大滑动窗口的长度。

## 代码

##### 变量说明

- res 最大长度
- left 上一次重复位置
- data 哈希表 记录每个字符出现的位置
- t 记录字符对应的ascii值

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        // 最大值 上一次起点
        int res = 0, left = 0;
        // 记录上一次出现的位置, 如没出现则为0
        int[] data = new int[256];
        for (int i = 0; i < s.length(); i++) {
            // 该字符对应的ascii码
            int t = s.charAt(i);
            if (data[t] == 0 || data[t] < left) {
                // 由于记录从1开始所以当前位置到起点大小为i-left+1 例如123456 总共有6-1+1个字符
                res = Math.max(res, i - left + 1);
            } else {
                // 出现重复，重新记录left值
                left = data[t];
            }
            // 从1开始
            data[t] = i + 1;
        }

        return res;
    }
}
```

**难点：**

1. Hash表用于记录每个字符出现的位置，如还没出现设为0。
2. Hash表需建立256位的空间，因为Ascii表功能表示256个字节，所以建立这么大才可以记录所有的字符。
3. 需设定res, left两个变量来进行标记，res负责记录最大的值，left记录上一次出现重复的位置。
4. res增加的条件不单只是data[t] == 0 (尚未出现)， 还存在上次出现但是在left前面，所以并不算的情况，因此需加上判断***data[t]<left***，例如*abbca*，假设不加判断那么当 *i == 4* 时， 由于a在data中已经存在值，故不会进入 *if* 中， 而是会进入*else*。

## 官方最佳答案

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        int[] index = new int[128]; // current index of character
        // try to extend the range [i, j]
        for (int j = 0, i = 0; j < n; j++) {
            i = Math.max(index[s.charAt(j)], i);
            ans = Math.max(ans, j - i + 1);
            index[s.charAt(j)] = j + 1;
        }
        return ans;
    }
}
```

将if-else更改为***i = Math.max(index[s.charAt(j)], i);***既达到效果也更加美观。

## 关于

为什么要开始进行这个训练呢，其实是有挺多目的：

1. 想通过这个方法保持每天写一点东西。
2. 并且也掌握多一点面试算法相关的，好进行春招的准备。
3. 多进行一些算法相关的学习也能保持住脑子的活跃，不用每天为了业务奔波。
4. 等等。。。

于是就这么愉快的决定了，以后如果没什么事的话尽量每天做一道leetcode的题。

备注：关于算法的题目以后应该都会用Java来进行。由于时间紧迫，所以题目大多会采取直接看答案思路并自己编码。