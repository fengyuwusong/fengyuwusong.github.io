---
title: 每日leetcode-无重复字符的最长子串
date: 2018-12-09 22:33:01
categories:
- leetcode
tags: [leetcode, 每日训练, 算法, 面试, 学习笔记]
---

给定两个字符串 **s1** 和 **s2**，写一个函数来判断 **s2** 是否包含 **s1** 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。


```
示例1:
输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").

示例2:
输入: s1= "ab" s2 = "eidboaoo"
输出: False
```

 

**注意：**

1. 输入的字符串只包含小写字母
2. 两个字符串的长度都在 [1, 10,000] 之间

题目地址：[这里~](https://leetcode-cn.com/explore/interview/card/bytedance/242/string/1016/)

<!-- more -->

------

## 思路

由于字符串的长度最长为 10000， 故列出所有排列关系时间复杂度过高，我们需要转换思路，寻找其他办法。

由于排列的规则是任意字符串的随意排列，例如***abb***可以是***abb、bab、bba***， 那么我们可以观察发现只要

***字符串长度相等且每个字符的个数一致，则该字符串为原串的排列之一。** 通过这个原则我们只需要计算 ***s1*** 字符串的长度及每个字母的个数即可。然后在 ***s2*** 中建立滑动窗口扫描符合的字符串。则该题的问题则变为实现一个滑动窗口。

## 代码

```java
import java.util.Arrays;

public class 字符串的排列 {
    public static boolean checkInclusion(String s1, String s2) {
        int len1 = s1.length();
        int len2 = s2.length();
        // 建立字典并初始化
        int[] dict1 = new int[26];
        int[] dict2 = new int[26];

        // 记录s1中每个字符的个数
        for (char s : s1.toCharArray()) {
            dict1[s - 'a']++;
        }

        // 滑动窗口遍历s2
        for (int i = 0; i < len2; i++) {
            // 由于是从0开始，故相等时窗口已经超出len1大小
            if (i >= len1)
                // 将窗口外的记录去除
                dict2[s2.charAt(i - len1) - 'a']--;
            // 将新加入的纳入字典
            dict2[s2.charAt(i) - 'a']++;
            // 判断两数组是否相等
            if (Arrays.equals(dict1, dict2))
                return true;
        }

        return false;
    }
}

```

## 官方最佳解法

```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        long[] hash = {77886, 51044, 75120, 93338, 63245, 84866, 70301, 19244,
                37029, 95036, 62918, 79389, 52211, 69968, 14003, 56270, 20747, 64639, 26711, 95751, 32553,
                14959, 81792, 41986, 75273, 99929,};
        if (s1.length() > s2.length()) return false;
        if (s1.equals(s2)) return true;

        char[] map1 = s1.toCharArray();
        char[] map2 = s2.toCharArray();

        int cs1Hash = 0;
        int cs2Hash = 0;
        for (int i = 0; i < s1.length(); ++i) {
            cs1Hash += hash[map1[i] - 'a'];
            cs2Hash += hash[map2[i] - 'a'];
        }


        if (cs1Hash == cs2Hash) return true;

        int len = s2.length() - s1.length();

        for (int i = 0; i < len; ++i) {
            cs2Hash += hash[map2[i + s1.length()] - 'a'] - hash[map2[i] - 'a'];
            if (cs1Hash == cs2Hash) return true;
        }

        return false;
    }
}
```

这里的hash值应该是 **任意个相加后不能相等与其中的一个值的（类似于加法的质数）**，然后就可以以这个值代替字典的遍历比较，从而使用int进行对比，进一步节省了时间复杂度。

