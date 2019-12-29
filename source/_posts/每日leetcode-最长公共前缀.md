---
title: 每日leetcode-最长公共前缀
date: 2018-12-14 23:06:06
categories:
- leetcode
tags: [leetcode, 每日训练, 算法, 面试, 学习笔记]
---

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。
```
示例 1:
输入: ["flower","flow","flight"]
输出: "fl"

示例 2:
输入: ["dog","racecar","car"]
输出: ""
```

**说明:**

所有输入只包含小写字母 `a-z` 。

题目链接：[点击这里~](https://leetcode-cn.com/explore/interview/card/bytedance/242/string/1014/)

<!-- more -->

## 思路

该题可直接暴力破解，有横向和纵向两种思路：

1. 先记录第一个字符串，然后以第一个字符串的值去匹配剩下的字符串，遇到不同的则截取匹配下一个。例如：字符串数组为 `["abcde", "abced", "abbcde"]` 。则当第一个去匹配第二个字符串的时候遇到`e`和第一个值`d`不同。故截取剩余`abc`，同理`abc`与`abb`截取后得到`ab`。
2. 依次取每个字符串的相同位置字符作对比，不同则返回。



## 代码

采用横向对比解。

```java
public class 最长公共前缀 {
    public static String longestCommonPrefix(String[] strs) {
        // 代码健壮性判断
        if(strs.length == 0){
            return "";
        }
        String res = strs[0];
        int len;
        for(int i = 1; i < strs.length; i++){
            len = Math.min(res.length(), strs[i].length());
            // 避免aa 和 a 的情况
            res = res.substring(0, len);
            for (int j = 0; j < len; j++){
                if(strs[0].charAt(j)!=strs[i].charAt(j)) {
                    res = res.substring(0, j);
                    break;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println(longestCommonPrefix(new String[]{"aa", "a"}));
    }
}
```

注意点：

1. 需要做好代码健壮性，例如输入为 `String[]{}`。
2.  特殊情况，例如 ***aa*** 和 ***a*** 的公共前缀为 ***a***。需取最小值。

## 官方最佳答案

采用了横向对比。

```java
class Solution {
  public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) {
            return "";
        }
		
        int shortest = strs[0].length();
        for (int i = 1; i < strs.length; i++) {
            shortest = Math.min(shortest, strs[i].length());
        }
        
        String result = "";
        for (int i = 0; i < shortest; i++) {
            char ch = strs[0].charAt(i);
            for (int j = 1; j < strs.length; j++) {
                if (strs[j].charAt(i) != ch) {
                    return result;
                }
            }
            result += ch;
        }
        return result;
    }
}
```



