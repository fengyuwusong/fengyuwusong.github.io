---
title: 每日leetcode-字符串相乘
date: 2018-12-27 23:02:31
categories:
- leetcode
tags: [leetcode, 每日训练, 算法, 面试, 学习笔记]
---

给定两个以字符串形式表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也表示为字符串形式。

```
示例 1:
输入: num1 = "2", num2 = "3"
输出: "6"

示例 2:
输入: num1 = "123", num2 = "456"
输出: "56088"
```

**说明：**

1. `num1` 和 `num2` 的长度小于110。
2. `num1` 和 `num2` 只包含数字 `0-9`。
3. `num1` 和 `num2` 均不以零开头，除非是数字 0 本身。
4. **不能使用任何标准库的大数类型（比如 BigInteger）**或**直接将输入转换为整数来处理**。

题目链接：[点击这里~](https://leetcode-cn.com/explore/interview/card/bytedance/242/string/1015/)

<!-- more -->

## 思路

由于 `num1` 和 `num2` 长度最大为 ***110***，故两数相乘的长度最大 `110 * 110`  位，`long` 为8字节 所能表示的最大长度为 2^64，所能表示最大长度远远小于目标位数，故 将字符串转为int类型后在做运算在转回字符串的方法行不通。

研究乘法计算发现规律， 以 `123 *456 = 56088` 举例：

|      |      |      |               |              |                  |             |            |
| :--: | :--: | :--: | :-----------: | ------------ | :--------------: | :---------: | :--------: |
|      |      |      |               |              |        1         |      2      |     3      |
|  *   |      |      |               |              |        4         |      5      |     6      |
|      |      |      |               |              |    1 * 6 = 6     | 2 * 6 = 12  | 3 * 6 = 18 |
|      |      |      |               | 1 * 5 = 5    |    2 * 5 = 10    | 3 * 5 = 15  |            |
|      |      |      |   4 * 1 = 4   | 4 * 2 = 8    |    4 * 3 = 12    |             |            |
|      |      |      |       4       | 5 + 8 = 13   | 6 + 10 + 12 = 28 | 12 + 15 =27 |     18     |
|      |      |      |     40000     | 10000 + 3000 |    2000 + 800    |  200 + 70   |   10 + 8   |
|      |      |      | 40000 + 10000 | 3000 +2000   |    800 + 200     |   70 + 10   |     8      |
|      |      |      |       5       | 6            |        0         |      8      |     8      |

则可以通过逐位相乘在相加的形式完成大数的乘法运算。



## 代码

```java
class Solution {
    public String multiply(String num1, String num2) {
int len1 = num1.length();
        int len2 = num2.length();
        // 获得最大位数建立数组
        int[] res = new int[len1 + len2];

        // 遍历计算每位对应的数值 从最低位开始
        int n1, n2;
        for (int i = len1 - 1; i >= 0; i--) {
            n1 = num1.charAt(i) - '0';
            for (int j = len2 - 1; j >= 0; j--) {
                n2 = num2.charAt(j) - '0';
                res[i + j + 1] += n1 * n2;
                // 如果大于10则向前进位
                if(res[i + j + 1] >= 10 ){
                    res[i + j] += res[i + j + 1] / 10;
                    res[i + j + 1] %= 10;
                }
            }
        }

        // 将int数组转为字符串
        StringBuilder stringBuffer = new StringBuilder(len1 + len2);
        boolean flag = true;
        for (int n : res){
            if(flag){
                if(n != 0){
                    flag = false;
                }else {
                    continue;
                }
            }
            stringBuffer.append(n);
        }
        return stringBuffer.toString().isEmpty() ? "0" : stringBuffer.toString();

    }
}
```

难点：注意进位问题



## 官方最佳解答

```
class Solution {
    public String multiply(String num1, String num2) {
		if(num1.isEmpty() || num2.isEmpty() 
           ||(num1.length() == 1 && num1.charAt(0) == '0') 
           || (num2.length() == 1 && num2.charAt(0) == '0'))
			return "0";
		int len1 = num1.length();
		int len2 = num2.length();
		int[] ans = new int[len1 + len2 + 1];
		for(int i = 0 ; i < len1;i++) {
			int a = num1.charAt(i) - '0';
			for(int j = 0; j < len2; j++) {
				int b = num2.charAt(j) - '0';
				ans[len1 + len2 - i - j - 2] += a * b ;
			}
		}
		StringBuffer res = new StringBuffer();		
		for(int i = 0; i < len1 + len2   ;i++) {
			res.append(ans[i] % 10);
			ans[i + 1] += ans[i] / 10;
		}
		String result = res.reverse().toString();
		if(result.startsWith("0"))
			result = result.substring(1, len1 + len2);
		return result;
	}  
}
```