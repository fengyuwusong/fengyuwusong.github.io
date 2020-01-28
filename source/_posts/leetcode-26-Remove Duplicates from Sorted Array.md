---
title: leetcode-21-Remove Duplicates from Sorted Array
categories:
  - leetcode
tags:
  - 面试
  - 学习笔记
  - leetcode
keywords: 'leetcede,Remove Duplicates from Sorted Array'
date: 2020-01-28 09:50:13


---

### 题目

```shell
Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

Example 1:

Given nums = [1,1,2],

Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

It doesn't matter what you leave beyond the returned length.
Example 2:

Given nums = [0,0,1,1,1,2,2,3,3,4],

Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

It doesn't matter what values are set beyond the returned length.
Clarification:

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

<!-- more -->

### 解答思路

遍历数组即可即可，注意参数校验。

### 代码

```go
package easy

import (
	"fmt"
	"testing"
)

func removeDuplicates(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	lastNum := nums[0]
	currentIndex := 1
	for _, num := range nums {
		if num > lastNum {
			nums[currentIndex] = num
			currentIndex++
			lastNum = num
		}
	}
	return currentIndex
}

func TestRemoveDuplicates(t *testing.T) {
	nums := []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}
	numsLen := removeDuplicates(nums)
	for i := 0; i < numsLen; i++ {
		fmt.Printf("=>%v", nums[i])
	}
}


```