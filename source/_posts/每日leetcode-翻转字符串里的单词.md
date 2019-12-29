---
title: 每日leetcode-翻转字符串里的单词
date: 2019-01-15 22:14:52
categories:
- leetcode
tags: [leetcode, 每日训练, 算法, 面试, 学习笔记]
---

给定一个字符串，逐个翻转字符串中的每个单词。

示例: 
```
输入: "the sky is blue",
输出: "blue is sky the".
```

**说明:**

- 无空格字符构成一个单词。
- 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
- 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

**进阶:** 请选用C语言的用户尝试使用 *O*(1) 空间复杂度的原地解法。

题目地址：[这里~](https://leetcode-cn.com/explore/interview/card/bytedance/242/string/1011/)

<!-- more -->

## 思路：

java暴力破解。

## 代码

```java
public class 翻转字符串里的单词 {
    public static String reverseWords(String s) {
        // 健壮性判空
        if (s.trim().isEmpty())
            return "";
        String[] ss = s.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = ss.length - 1; i >= 0; i--) {
            if (!ss[i].isEmpty()){
                sb.append(ss[i]).append(" ");
            }
        }
        // 删除最后添加的空格
        return sb.deleteCharAt(sb.length()-1).toString();
    }

    public static void main(String[] args) {
        System.out.println(reverseWords("     "));
    }
}

```

注意特殊值的判断。

## 官方最佳答案：

```java
public class Solution {
    public String reverseWords(String s) {
        if(s.length()==0)return s;
        char[] ch=s.toCharArray();
        char[] res=new char[ch.length];
        int len=helper(ch,ch.length-1,res,0,0);
        return new String(res,0,len);
    }
    private int helper(char[] ch,int r,char[] res,int l,int len){
        while(r>=0&&ch[r]==' '){
            r--;
        }
        if(r<0)return Math.max(0,len-1);
        int rigth=r;
        while(r>=0&&ch[r]!=' '){
            r--;
        }
        len+=rigth-r+1;
        for(int left=r+1;left<=rigth;left++,l++){
            res[l]=ch[left];
        }
        if(l<res.length){
            res[l++]=' ';
        }
        return helper(ch,r,res,l,len);
    }
}

```

