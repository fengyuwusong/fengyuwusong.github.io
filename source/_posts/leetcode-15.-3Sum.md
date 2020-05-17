---
title: leetcode-15.3Sum
categories:
  - leetcode
tags:
  - 面试
  - 学习笔记
  - leetcode
keywords: 'leetcede,3Sum'
date: 2020-05-17 10:27:05

---

### 题目

```shell
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

<!-- more -->

### 解题思路

#### 1. 暴力解法

假设三个数字分别为 x, y, z。 那么可知 x + y + z = 0，由此可以通过三层遍历依次确定每个数值即可（确保不会出现重复，需要将数组排序）。

需要注意的是每个解的三个数值必须不同， 当x ，y确定时， z符合目标的仅需遍历一次，x，y不可与上次符合的重复。

该解法不够优雅，特殊情况太多if判断，时间复杂度o(n^3)。

#### 2. 利用hash表获取第三人

由于 x + y + z = 0，那么我们可以维护一个hash表，确定需要的x值是否存在 => x = 0 - y -z，设为 hash[0 - y - z] = [y, z]， 不存在则 hash[x] = nil.

可以先通过二维遍历整个数组确定x、y值、以及维护一个hash表， 则可将时间复杂度降低为 O(n^2)。

#### 3. 双指针

可以先对数组进行排序，然后取中间的任意一个数 x，那么有 x + y + z = 0可知（由于排序后， z >= y >= x）， 那么x必然在y左边，z必然在y右边。那么就可以通过双指针依次遍历即可得到解。

```shell
x => nums[i]

y => nums[i + 1] 

z => nums[len(nums)-1]
```

当 x + y + z > 0，说明 z 值过大，指针左移；

当 x + y + z < 0，说明x值过小，指针右移。

当 两者相遇时退出 x = nums[i] 循环。

**优化点&特殊情况考虑：**

1. 需考虑x值重复情况，例如 [0, 0 , 0, 10情况，x值取两次0必然会重复得出结果 [0, 0, 0]。
2. 由于 x + y + z == 0，那么 x/y/z必然符号不可能相同（0除外）；
3. 必然不存在 x > 0 的情况。

时间复杂度 O(nlogn)

### 代码

#### 1. 暴力解

```golang
func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	var x, y, z int
	var res [][]int
	for i := 0; i < len(nums); i++ {
		if i != 0 && x == nums[i] {
			continue
		}
		x = nums[i]
		for j := i + 1; j < len(nums); j++ {
			if j > i+1 && nums[j] == nums[j-1] {
				continue
			}
			y = nums[j]
			z = 0 - x - y
			for k := j + 1; k < len(nums); k++ {
				if z == nums[k] {
					res = append(res, []int{x, y, z})
					break
				}
			}
		}
	}
	return res
}
```

#### 2. hash表

```go
// hash表解法 不可ac 特殊情况未编写 如重复值
func threeSum(nums []int) [][]int {
	var res [][]int
	hash := make(map[int][]int)
	for i := 0; i < len(nums)-2; i++ {
		for j := i + 1; j < len(nums)-1; j++ {
			if hash[nums[j]] != nil {
				res = append(res, append(hash[nums[j]], nums[j]))
				continue
			}
			// hash表不存在则两个人x, y 组队
			hash[0-nums[j]-nums[i]] = []int{nums[j], nums[i]}
		}
	}
	return res
}
```

#### 3. 双指针

```go
// 双指针
func threeSum(nums []int) [][]int {
	if len(nums) < 3 {
		return nil
	}
	sort.Ints(nums)
	var res [][]int
	for i := 0; i < len(nums)-1; i++ {
		// x 值不可能大于0
		if nums[i] > 0 {
			break
		}
		left := i + 1
		right := len(nums) - 1
		for {
			// left >= right  x z 不可能符号相同 时退出
			if left >= right || nums[i]*nums[right] > 0 {
				break
			}
			data := nums[i] + nums[left] + nums[right]
			if data == 0 {
				res = append(res, []int{nums[left], nums[i], nums[right]})
				// 同一x值可能有不同结果 left + 1取其他情况
				left++
				for left < right && nums[left] == nums[left-1] {
					left++
				}
			} else if data > 0 {
				right--
				for right > left && nums[right] == nums[right+1] {
					right--
				}
			} else {
				left++
				for left < right && nums[left] == nums[left-1] {
					left++
				}
			}
		}
		//去除x值重复值情况
		for i < len(nums)-1 && nums[i] == nums[i+1] {
			i++
		}
	}
	return res
}
```

