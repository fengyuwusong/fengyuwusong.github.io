---
title: 机器学习入门(1)-pandas库的使用
date: 2018-12-09 21:34:45
categories:
- 机器学习
tags: [pandas, 机器学习, 学习笔记]
---

## Pands简介

[*pandas*](http://pandas.pydata.org/) 是一种列存数据分析 API。它是用于处理和分析输入数据的强大工具，很多机器学习框架都支持将 *pandas* 数据结构作为输入。

官方文档：[点这里~](http://pandas.pydata.org/pandas-docs/stable/index.html)

***该系列机器学习是实践 [谷歌机器学习教程](https://developers.google.cn/machine-learning/crash-course/)做的笔记。***

<!--more-->

## 安装

使用pip即可进行安装。

```
pip install pandas
```

## 基本用法

#### 导入

```python
# coding=utf-8
import pandas

if __name__ == '__main__':
    print(pandas.__version__)

```

输出：**0.23.4**

#### 基本数据结构

- **DataFrame**: 关系型数据表格，包含多个行和已命名的列。（及类似关系型数据库或excel表）
- **Series**: 单一列。*DataFrame* 中包含一个或多个 *Series*，每个*Series* 均有一个名称。

#### 创建Series、DataFrame对象

- 以list、dict 的方式创建：

```python
city_names = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
population = pd.Series([852469, 1015785, 485199])
# 将两个series对象整合到dataframe中，如两个series长度不一致则会以NA/NaN填充
pd.DataFrame({'city_name': city_names, 'population': population})
```

- 直接读取文件

```python
# 方式2 直接读取文件
california_housing_dataframe = pd.read_csv("https://download.mlcc.google.cn/mledu-datasets/california_housing_train.csv", sep=",")
```

#### 访问数据

```python
# coding=utf-8
import pandas as pd

if __name__ == '__main__':
    print(pd.__version__)

    # 构建series、dataframe对象
    # 方式1 以list，dict的方式构建
    city_names = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
    population = pd.Series([852469, 1015785, 485199])
    # 将两个series对象整合到dataframe中，如两个series长度不一致则会以NA/NaN填充
    california_housing_dataframe = pd.DataFrame({'city_name': city_names, 'population': population})

    # 方式2 直接读取文件
    # california_housing_dataframe = pd.read_csv("https://download.mlcc.google.cn/mledu-datasets/california_housing_train.csv", sep=",")

    print("========显示统计数据========")
    print(california_housing_dataframe.describe())

    print("========显示前几个记录========")
    print(california_housing_dataframe.head())

    print("========显示中值分布========")
    print(california_housing_dataframe.hist('population'))


```

输出：

```
0.23.4
========显示统计数据========
         population
count  3.000000e+00
mean   7.844843e+05
std    2.717477e+05
min    4.851990e+05
25%    6.688340e+05
50%    8.524690e+05
75%    9.341270e+05
max    1.015785e+06
========显示前几个记录========
       city_name  population
0  San Francisco      852469
1       San Jose     1015785
2     Sacramento      485199
========显示中值分布========
[[<matplotlib.axes._subplots.AxesSubplot object at 0x000000000594CBA8>]]
```

## 访问数据

直接以 ***dict/list*** 的方式 访问数据即可。

```python
def access_data():
    """
    访问数据
    :return:
    """
    city_names = ['San Francisco', 'San Jose', 'Sacramento']
    population = [852469, 1015785, 485199]
    cities = pd.DataFrame({'City name': city_names, 'Population': population})
    # 直接以list/dict的操作即可
    print(type(cities['City name']))
    print(cities['City name'])

    print(type(cities["City name"][1]))
    print(cities["City name"][1])
```

输出：

```
<class 'pandas.core.series.Series'>
0    San Francisco
1         San Jose
2       Sacramento
Name: City name, dtype: object
<class 'str'>
San Jose
```

## 操作数据

可直接对 ***Series/DataFrame*** 运算。或应用***Series.apply()***方法，例如：

```python
def operate_data():
    """
    操作数据
    :return:
    """
    city_names = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
    population = pd.Series([852469, 1015785, 485199])

    # 可直接向Series应用python基本运算命令
    print(population / 1000)

    # 可应用于Numpy做参数运算
    print(np.log(population))

    # Series.apply函数 参数 接受lambda函数
    # 例如 创建一个population超过100000的新Series
    new_series = population.apply(lambda val: val > 100000)

    # 修改DataFrames对象
    cities = dict()
    cities['Population'] = population
    cities['Area square miles'] = pd.Series([46.87, 176.53, 97.92])
    cities['Population density'] = cities['Population'] / cities['Area square miles']
    print(cities)
```

输出：

```
0     852.469
1    1015.785
2     485.199
dtype: float64
0    13.655892
1    13.831172
2    13.092314
dtype: float64
{'Population': 0     852469
1    1015785
2     485199
dtype: int64, 'Area square miles': 0     46.87
1    176.53
2     97.92
dtype: float64, 'Population density': 0    18187.945381
1     5754.177760
2     4955.055147
dtype: float64}
```

## 索引

***Series*** 和 ***DataFrame*** 对象也定义了 ***index*** 属性，该属性会向每个 ***Series*** 项或 ***DataFrame*** 行赋一个标识符值。

例如：

```python
def data_index():
    """
    数据索引demo
    :return:
    """
    # 模拟创建cities对象
    temp = dict()
    temp['Population'] = pd.Series([852469, 1015785, 485199])
    temp['Area square miles'] = pd.Series([46.87, 176.53, 97.92])
    temp['Name'] = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
    cities = pd.DataFrame(temp)

    # 默认情况下，在构造时，pandas 会赋可反映源数据顺序的索引值。索引值在创建后是稳定的
    # 也就是说，它们不会因为数据重新排序而发生改变。
    print(cities['Name'].index)
    print(cities.index)

    # 可使用reindex方法手动重新排序
    print(cities.reindex([2, 0, 1]))

    # 利用numpy random.permutation方法重新随机排序
    print(cities.reindex(np.random.permutation(cities.index)))
```

输出：

```
RangeIndex(start=0, stop=3, step=1)
RangeIndex(start=0, stop=3, step=1)
   Population  Area square miles           Name
2      485199              97.92     Sacramento
0      852469              46.87  San Francisco
1     1015785             176.53       San Jose
   Population  Area square miles           Name
2      485199              97.92     Sacramento
1     1015785             176.53       San Jose
0      852469              46.87  San Francisco
```



## 练习1

通过添加一个新的布尔值列（当且仅当以下*两项*均为 True 时为 True）修改 `cities` 表格：

- 城市以圣人命名。
- 城市面积大于 50 平方英里。

**注意：**布尔值 `Series` 是使用“按位”而非传统布尔值“运算符”组合的。例如，执行*逻辑与*时，应使用 `&`，而不是 `and`。

**提示：**"San" 在西班牙语中意为 "saint"。

答案：

```python
def exe_1():
    """
    练习 1
    通过添加一个新的布尔值列（当且仅当以下两项均为 True 时为 True）修改 cities 表格：

    城市以San命名。
    城市面积大于 50 平方英里。
    注意：布尔值 Series 是使用“按位”而非传统布尔值“运算符”组合的。例如，执行逻辑与时，应使用 &，而不是 and。

    提示："San" 在西班牙语中意为 "saint"。
    :return:
    """
    # 模拟创建cities对象
    temp = dict()
    temp['Population'] = pd.Series([852469, 1015785, 485199])
    temp['Area square miles'] = pd.Series([46.87, 176.53, 97.92])
    temp['Name'] = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
    cities = pd.DataFrame(temp)

    # 使用apply函数创建该列
    cities["wide and with san"] = cities['Name'].apply(lambda name: name.startswith('San')) & (cities['Area square miles'] > 50)
    print(cities)
```

**注意点**： (cities['Area square miles'] > 50) 必须要用括号包起来，不然判别就变成 *cities['Name'].apply(lambda name: name.startswith('San')) & cities['Area square miles'] > 50* 导致错误。

输出：

```
   Population        ...          wide and with san
0      852469        ...                      False
1     1015785        ...                       True
2      485199        ...                      False

[3 rows x 4 columns]
```



## 练习 2

`reindex` 方法允许使用未包含在原始 `DataFrame` 索引值中的索引值。请试一下，看看如果使用此类值会发生什么！您认为允许此类值的原因是什么？

```python
def exe_2():
    """
    练习 2
    reindex 方法允许使用未包含在原始 DataFrame 索引值中的索引值。
    请试一下，看看如果使用此类值会发生什么！您认为允许此类值的原因是什么？
    :return:
    """
    # 模拟创建cities对象
    temp = dict()
    temp['Population'] = pd.Series([852469, 1015785, 485199])
    temp['Area square miles'] = pd.Series([46.87, 176.53, 97.92])
    temp['Name'] = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
    cities = pd.DataFrame(temp)

    # 目前只有三组数据索引: 0 1 2，假设操作索引 2 以上的数据
    print(cities.reindex([4, 0, 1, 3]))
```

输出：

```
   Population  Area square miles           Name
4         NaN                NaN            NaN
0    852469.0              46.87  San Francisco
1   1015785.0             176.53       San Jose
3         NaN                NaN            NaN
```

解释：

如果您的 `reindex` 输入数组包含原始 `DataFrame` 索引值中没有的值，`reindex` 会为此类“丢失的”索引添加新行，并在所有对应列中填充 `NaN` 值。

这种行为是可取的，因为索引通常是从实际数据中提取的字符串（请参阅 [*pandas* reindex 文档](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.reindex.html)，查看索引值是浏览器名称的示例）。

在这种情况下，如果允许出现“丢失的”索引，您将可以轻松使用外部列表重建索引，因为您不必担心会将输入清理掉。