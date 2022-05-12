---
title: prometheus学习笔记
categories:
  - 学习笔记
tags:
  - 云原生
  - 监控
  - prometheus
keywords: 'prometheus,云原生,监控'
date: 2022-5-12 16:04:59
---

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Markmap</title>
<style>
* {
  margin: 0;
  padding: 0;
}
# mindmap {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markmap-toolbar@0.13.2/dist/style.css">
</head>
<body>
<svg id="mindmap"></svg>
<script src="https://cdn.jsdelivr.net/npm/d3@6.7.0"></script><script src="https://cdn.jsdelivr.net/npm/markmap-view@0.13.2"></script><script src="https://cdn.jsdelivr.net/npm/markmap-toolbar@0.13.2/dist/index.umd.min.js"></script><script>(r => {
                setTimeout(r);
              })(() => {
  const {
    markmap,
    mm
  } = window;
  const toolbar = new markmap.Toolbar();
  toolbar.attach(mm);
  const el = toolbar.render();
  el.setAttribute('style', 'position:absolute;bottom:20px;right:20px');
  document.body.append(el);
})</script><script>((getMarkmap, getOptions, root, jsonOptions) => {
        const markmap = getMarkmap();
        window.mm = markmap.Markmap.create('svg#mindmap', getOptions == null ? void 0 : getOptions(markmap, jsonOptions), root);
      })(() => window.markmap,(markmap, jsonOptions) => markmap.deriveOptions(jsonOptions),{"type":"heading","depth":1,"payload":{"lines":[1,2]},"content":"prometheus相关实践","children":[{"type":"heading","depth":2,"payload":{"lines":[3,4]},"content":"docker部署prometheus和grafana","children":[{"type":"heading","depth":3,"payload":{"lines":[5,6]},"content":"启动node-exporter","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token function\">docker</span> run -d -p <span class=\"token number\">9100</span>:9100 <span class=\"token punctuation\">\\</span>\n --name node-exporter <span class=\"token punctuation\">\\</span>\n --restart<span class=\"token operator\">=</span>always  <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/node-exporter-data/proc:/host/proc:ro <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/node-exporter-data/sys:/host/sys:ro <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/node-exporter-data:/rootfs:ro <span class=\"token punctuation\">\\</span>\n prom/node-exporter\n</code></pre>\n"}]},{"type":"heading","depth":3,"payload":{"lines":[17,18]},"content":"编写prometheus.yml","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-yml\"><code class=\"language-yml\"><span class=\"token key atrule\">global</span><span class=\"token punctuation\">:</span>\n  <span class=\"token key atrule\">scrape_interval</span><span class=\"token punctuation\">:</span> 60s\n  <span class=\"token key atrule\">evaluation_interval</span><span class=\"token punctuation\">:</span> 60s\n\n<span class=\"token key atrule\">scrape_configs</span><span class=\"token punctuation\">:</span>\n  <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">job_name</span><span class=\"token punctuation\">:</span> prometheus\n    <span class=\"token key atrule\">static_configs</span><span class=\"token punctuation\">:</span>\n      <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">targets</span><span class=\"token punctuation\">:</span>\n          <span class=\"token punctuation\">-</span> 192.168.0.104<span class=\"token punctuation\">:</span><span class=\"token number\">9090</span>\n\n  <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">job_name</span><span class=\"token punctuation\">:</span> node<span class=\"token punctuation\">-</span>exporter\n    <span class=\"token key atrule\">static_configs</span><span class=\"token punctuation\">:</span>\n      <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">targets</span><span class=\"token punctuation\">:</span>\n          <span class=\"token punctuation\">-</span> 192.168.0.104<span class=\"token punctuation\">:</span><span class=\"token number\">9100</span>\n  <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">job_name</span><span class=\"token punctuation\">:</span> jenkins\n    <span class=\"token key atrule\">scheme</span><span class=\"token punctuation\">:</span> http\n    <span class=\"token key atrule\">metrics_path</span><span class=\"token punctuation\">:</span> prometheus\n    <span class=\"token key atrule\">bearer_token</span><span class=\"token punctuation\">:</span> bearer_token\n    <span class=\"token key atrule\">static_configs</span><span class=\"token punctuation\">:</span>\n      <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">targets</span><span class=\"token punctuation\">:</span>\n          <span class=\"token punctuation\">-</span> 192.168.57.242<span class=\"token punctuation\">:</span><span class=\"token number\">8080</span>\n</code></pre>\n"}]},{"type":"heading","depth":3,"payload":{"lines":[43,44]},"content":"启动promethus","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token function\">docker</span> run -d <span class=\"token punctuation\">\\</span>\n --name prometheus <span class=\"token punctuation\">\\</span>\n --restart<span class=\"token operator\">=</span>always <span class=\"token punctuation\">\\</span>\n -u root <span class=\"token punctuation\">\\</span>\n -p <span class=\"token number\">9090</span>:9090 <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/prometheus-data/prometheus.yml:/etc/prometheus/prometheus.yml <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/prometheus-data:/prometheus <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/prometheus-data/conf:/etc/prometheus/conf <span class=\"token punctuation\">\\</span>\n prom/prometheus --web.enable-lifecycle\n</code></pre>\n"}]},{"type":"heading","depth":3,"payload":{"lines":[57,58]},"content":"启动grafana","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token function\">docker</span> run -d <span class=\"token punctuation\">\\</span>\n -p <span class=\"token number\">3000</span>:3000 <span class=\"token punctuation\">\\</span>\n --restart<span class=\"token operator\">=</span>always <span class=\"token punctuation\">\\</span>\n --name<span class=\"token operator\">=</span>grafana <span class=\"token punctuation\">\\</span>\n -u root <span class=\"token punctuation\">\\</span>\n -v /data/apps/docker/grafana-data:/var/lib/grafana <span class=\"token punctuation\">\\</span>\n grafana/grafana\n</code></pre>\n"}]}]},{"type":"heading","depth":2,"payload":{"lines":[71,72]},"content":"Metric指标","children":[{"type":"heading","depth":3,"payload":{"lines":[73,74]},"content":"数据模型","children":[{"type":"list_item","depth":5,"payload":{"lines":[79,80]},"content":"指标名和指标标签集合：metric_name{&lt;label1=v1&gt;,&lt;label2=v2&gt;....}，指标名：表示这个指标是监控哪一方面的状态，比如 http_request_total 表示：请求数量；指标标签，描述这个指标有哪些维度，比如 http_request_total 这个指标，有请求状态码 code = 200/400/500，请求方式：method = get/post 等，实际上指标名称实际上是以标签的形式保存，这个标签是name，即：name=。"},{"type":"list_item","depth":5,"payload":{"lines":[80,81]},"content":"时间戳：描述当前时间序列的时间，单位：毫秒。"},{"type":"list_item","depth":5,"payload":{"lines":[81,82]},"content":"样本值：当前监控指标的具体数值，比如 http_request_total 的值就是请求数是多少。"}]},{"type":"heading","depth":3,"payload":{"lines":[83,84]},"content":"指标类型","children":[{"type":"list_item","depth":5,"payload":{"lines":[85,86]},"content":"Counter 计数器"},{"type":"list_item","depth":5,"payload":{"lines":[86,87]},"content":"Gauge 仪表盘"},{"type":"list_item","depth":5,"payload":{"lines":[87,88]},"content":"Histogram 直方图"},{"type":"list_item","depth":5,"payload":{"lines":[88,89]},"content":"Summary 摘要"}]}]},{"type":"heading","depth":2,"payload":{"lines":[90,91]},"content":"PromQL","children":[{"type":"bullet_list","depth":3,"payload":{"lines":[94,99]},"content":"","children":[{"type":"list_item","depth":4,"payload":{"lines":[94,95]},"content":"字符串：只作为某些内置函数的参数出现"},{"type":"list_item","depth":4,"payload":{"lines":[95,96]},"content":"标量：单一的数字值，可以是函数参数，也可以是函数的返回结果"},{"type":"list_item","depth":4,"payload":{"lines":[96,97]},"content":"瞬时向量：某一时刻的时序数据"},{"type":"list_item","depth":4,"payload":{"lines":[97,98]},"content":"区间向量：某一时间区间内的时序数据集合"}]},{"type":"heading","depth":3,"payload":{"lines":[99,100]},"content":"瞬时查询","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token comment\"># 直接查询</span>\ngo_gc_duration_seconds_count\n<span class=\"token comment\"># 筛选</span>\ngo_gc_duration_seconds_count<span class=\"token punctuation\">{</span>instance<span class=\"token operator\">=</span><span class=\"token string\">\"127.0.0.1:9600\"</span><span class=\"token punctuation\">}</span>\n<span class=\"token comment\"># 正则</span>\ngo_gc_duration_seconds_count<span class=\"token punctuation\">{</span>instance<span class=\"token operator\">=~</span><span class=\"token string\">\"localhost.*\"</span><span class=\"token punctuation\">}</span>\n</code></pre>\n"}]},{"type":"heading","depth":3,"payload":{"lines":[112,113]},"content":"范围查询","children":[{"type":"fence","depth":4,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token comment\"># d：天，h：小时，m：分钟，ms：毫秒，s：秒，w：周，y：年</span>\ngo_gc_duration_seconds_count<span class=\"token punctuation\">{</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">[</span>5m<span class=\"token punctuation\">]</span>\n<span class=\"token comment\"># 偏移</span>\ngo_gc_duration_seconds_count<span class=\"token punctuation\">{</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">[</span>5m<span class=\"token punctuation\">]</span> offset 1d\n</code></pre>\n"}]},{"type":"heading","depth":3,"payload":{"lines":[123,124]},"content":"内置函数","children":[{"type":"heading","depth":4,"payload":{"lines":[125,126]},"content":"rate","children":[{"type":"fence","depth":5,"content":"<pre class=\"language-shell\"><code class=\"language-shell\">rate函数<span class=\"token operator\">=</span>时间区间前后两个点的差 / 时间范围\n</code></pre>\n"},{"type":"fence","depth":5,"content":"<pre class=\"language-shell\"><code class=\"language-shell\">rate<span class=\"token punctuation\">(</span>demo_api_request_duration_seconds_count<span class=\"token punctuation\">[</span>1m<span class=\"token punctuation\">]</span><span class=\"token punctuation\">)</span>/60\n</code></pre>\n"}]},{"type":"heading","depth":4,"payload":{"lines":[141,142]},"content":"irate","children":[{"type":"fence","depth":5,"content":"<pre class=\"language-shell\"><code class=\"language-shell\">irate <span class=\"token operator\">=</span> 时间区间内最后两个样本点的差 / 最后两个样本点的时间差\n</code></pre>\n"}]},{"type":"heading","depth":4,"payload":{"lines":[147,148]},"content":"聚合函数：Sum() by() without()","children":[{"type":"fence","depth":5,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token comment\"># 将多个服务多个接口的请求聚合</span>\nsum<span class=\"token punctuation\">(</span>rate<span class=\"token punctuation\">(</span>demo_api_request_duration_seconds_count<span class=\"token punctuation\">{</span>job<span class=\"token operator\">=</span><span class=\"token string\">\"demo\"</span>, <span class=\"token assign-left variable\">method</span><span class=\"token operator\">=</span><span class=\"token string\">\"GET\"</span>, <span class=\"token assign-left variable\">status</span><span class=\"token operator\">=</span><span class=\"token string\">\"200\"</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">[</span>5m<span class=\"token punctuation\">]</span><span class=\"token punctuation\">))</span>\n\n<span class=\"token comment\"># 根据请求接口标签分组</span>\nsum<span class=\"token punctuation\">(</span>rate<span class=\"token punctuation\">(</span>demo_api_request_duration_seconds_count<span class=\"token punctuation\">{</span>job<span class=\"token operator\">=</span><span class=\"token string\">\"demo\"</span>, <span class=\"token assign-left variable\">method</span><span class=\"token operator\">=</span><span class=\"token string\">\"GET\"</span>, <span class=\"token assign-left variable\">status</span><span class=\"token operator\">=</span><span class=\"token string\">\"200\"</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">[</span>5m<span class=\"token punctuation\">]</span><span class=\"token punctuation\">))</span> by<span class=\"token punctuation\">(</span>path<span class=\"token punctuation\">)</span>\n\n<span class=\"token comment\"># 不根据接口路径分组</span>\nsum<span class=\"token punctuation\">(</span>rate<span class=\"token punctuation\">(</span>demo_api_request_duration_seconds_count<span class=\"token punctuation\">{</span>job<span class=\"token operator\">=</span><span class=\"token string\">\"demo\"</span>, <span class=\"token assign-left variable\">method</span><span class=\"token operator\">=</span><span class=\"token string\">\"GET\"</span>, <span class=\"token assign-left variable\">status</span><span class=\"token operator\">=</span><span class=\"token string\">\"200\"</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">[</span>5m<span class=\"token punctuation\">]</span><span class=\"token punctuation\">))</span> without<span class=\"token punctuation\">(</span>path<span class=\"token punctuation\">)</span>\n</code></pre>\n"}]},{"type":"heading","depth":4,"payload":{"lines":[160,161]},"content":"histogram_quantile","children":[{"type":"fence","depth":5,"content":"<pre class=\"language-shell\"><code class=\"language-shell\"><span class=\"token comment\"># 用来统计百分位数：第一个参数是百分位，第二个 histogram 指标，这样计算出来的就是中位数，即 P50</span>\nhistogram_quantile<span class=\"token punctuation\">(</span><span class=\"token number\">0.5</span>,go_gc_pauses_seconds_total_bucket<span class=\"token punctuation\">)</span>\n</code></pre>\n"}]}]},{"type":"heading","depth":3,"payload":{"lines":[167,168]},"content":"其他","children":[{"type":"heading","depth":4,"payload":{"lines":[169,170]},"content":"prometheus配置动态动态更新","children":[{"type":"list_item","depth":6,"payload":{"lines":[171,172]},"content":"启动时需带上参数 <code>prometheus --config.file=/usr/local/etc/prometheus.yml --web.enable-lifecycle</code>"},{"type":"list_item","depth":6,"payload":{"lines":[172,173]},"content":"更新prometheus.yml配置"},{"type":"list_item","depth":6,"payload":{"lines":[173,174]},"content":"通过post的方式请求接口<code>curl -v --request POST 'http://localhost:9090/-/reload'</code>"}]},{"type":"heading","depth":4,"payload":{"lines":[175,176]},"content":"指标抓取和存储","children":[{"type":"fence","depth":5,"content":"<pre class=\"language-yaml\"><code class=\"language-yaml\"><span class=\"token key atrule\">global</span><span class=\"token punctuation\">:</span>\n <span class=\"token key atrule\">scrape_interval</span><span class=\"token punctuation\">:</span> 15s\n</code></pre>\n"}]},{"type":"heading","depth":4,"payload":{"lines":[186,187]},"content":"prometheus分位数坑点"}]}]},{"type":"heading","depth":2,"payload":{"lines":[194,195]},"content":"参考","children":[{"type":"list_item","depth":4,"payload":{"lines":[196,197]},"content":"<a href=\"https://mp.weixin.qq.com/s/sQpB0WTs7eBDi4BuWp7gQg\">一文带你了解 Prometheus</a>"}]}]},{})</script>
</body>
</html>

<!-- more -->

### prometheus相关实践

#### docker部署prometheus和grafana

##### 启动node-exporter

```shell
docker run -d -p 9100:9100 \
 --name node-exporter \
 --restart=always  \
 -v /data/apps/docker/node-exporter-data/proc:/host/proc:ro \
 -v /data/apps/docker/node-exporter-data/sys:/host/sys:ro \
 -v /data/apps/docker/node-exporter-data:/rootfs:ro \
 prom/node-exporter
```

##### 编写prometheus.yml

```yml
global:
  scrape_interval: 60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - 192.168.0.104:9090

  - job_name: node-exporter
    static_configs:
      - targets:
          - 192.168.0.104:9100
  - job_name: jenkins
    scheme: http
    metrics_path: prometheus
    bearer_token: bearer_token
    static_configs:
      - targets:
          - 192.168.57.242:8080
```

##### 启动promethus

```shell
docker run -d \
 --name prometheus \
 --restart=always \
 -u root \
 -p 9090:9090 \
 -v /data/apps/docker/prometheus-data/prometheus.yml:/etc/prometheus/prometheus.yml \
 -v /data/apps/docker/prometheus-data:/prometheus \
 -v /data/apps/docker/prometheus-data/conf:/etc/prometheus/conf \
 prom/prometheus --web.enable-lifecycle
```

##### 启动grafana

```shell
docker run -d \
 -p 3000:3000 \
 --restart=always \
 --name=grafana \
 -u root \
 -v /data/apps/docker/grafana-data:/var/lib/grafana \
 grafana/grafana
```

grafana账号密码默认admin

#### Metric指标

##### 数据模型

![数据模型](https://pic.fengyuwusong.cn/20220512151720.png)

Prometheus 采集的所有指标都是以时间序列的形式进行存储，每一个时间序列有三部分组成：

- 指标名和指标标签集合：metric_name{<label1=v1>,<label2=v2>....}，指标名：表示这个指标是监控哪一方面的状态，比如 http_request_total 表示：请求数量；指标标签，描述这个指标有哪些维度，比如 http_request_total 这个指标，有请求状态码 code = 200/400/500，请求方式：method = get/post 等，实际上指标名称实际上是以标签的形式保存，这个标签是name，即：name=。
- 时间戳：描述当前时间序列的时间，单位：毫秒。
- 样本值：当前监控指标的具体数值，比如 http_request_total 的值就是请求数是多少。

##### 指标类型

- Counter 计数器
- Gauge 仪表盘
- Histogram 直方图
- Summary 摘要

#### PromQL

PromQL 是 Prometheus 为我们提供的函数式的查询语言，查询表达式有四种类型：

- 字符串：只作为某些内置函数的参数出现
- 标量：单一的数字值，可以是函数参数，也可以是函数的返回结果
- 瞬时向量：某一时刻的时序数据
- 区间向量：某一时间区间内的时序数据集合

##### 瞬时查询

直接通过指标名即可进行查询，查询结果是当前指标最新的时间序列，比如查询 Gc 累积消耗的时间：

```shell
# 直接查询
go_gc_duration_seconds_count
# 筛选
go_gc_duration_seconds_count{instance="127.0.0.1:9600"}
# 正则
go_gc_duration_seconds_count{instance=~"localhost.*"}
```

##### 范围查询

范围查询的结果集就是区间向量，可以通过[]指定时间来做范围查询，查询 5 分钟内的 Gc 累积消耗时间：

```shell
# d：天，h：小时，m：分钟，ms：毫秒，s：秒，w：周，y：年
go_gc_duration_seconds_count{}[5m]
# 偏移
go_gc_duration_seconds_count{}[5m] offset 1d
```

##### 内置函数

###### rate

rate 函数可以用来求指标的平均变化速率

```shell
rate函数=时间区间前后两个点的差 / 时间范围
```

一般 rate 函数可以用来求某个时间区间内的请求速率，也就是我们常说的 QPS：

```shell
rate(demo_api_request_duration_seconds_count[1m])/60
```

但是 rate 函数只是算出来了某个时间区间内的平均速率，没办法反映突发变化，假设在一分钟的时间区间里，前 50 秒的请求量都是 0 到 10 左右，但是最后 10 秒的请求量暴增到 100 以上，这时候算出来的值可能无法很好的反映这个峰值变化。这个问题可以通过 irate 函数解决，irate 函数求出来的就是瞬时变化率。

###### irate

```shell
irate = 时间区间内最后两个样本点的差 / 最后两个样本点的时间差
```

###### 聚合函数：Sum() by() without()

```shell
# 将多个服务多个接口的请求聚合
sum(rate(demo_api_request_duration_seconds_count{job="demo", method="GET", status="200"}[5m]))

# 根据请求接口标签分组
sum(rate(demo_api_request_duration_seconds_count{job="demo", method="GET", status="200"}[5m])) by(path)

# 不根据接口路径分组
sum(rate(demo_api_request_duration_seconds_count{job="demo", method="GET", status="200"}[5m])) without(path)
```

###### histogram_quantile

```shell
# 用来统计百分位数：第一个参数是百分位，第二个 histogram 指标，这样计算出来的就是中位数，即 P50
histogram_quantile(0.5,go_gc_pauses_seconds_total_bucket)
```

##### 其他

###### prometheus配置动态动态更新

- 启动时需带上参数 `prometheus --config.file=/usr/local/etc/prometheus.yml --web.enable-lifecycle`
- 更新prometheus.yml配置
- 通过post的方式请求接口`curl -v --request POST 'http://localhost:9090/-/reload'`

###### 指标抓取和存储

Prometheus 对指标的抓取采取主动 Pull 的方式，即周期性的请求被监控服务暴露的 metrics 接口或者是 PushGateway，从而获取到 Metrics 指标，默认时间是 15s 抓取一次，配置项如下：

```yaml
global:
 scrape_interval: 15s
```

抓取到的指标会被以时间序列的形式保存在内存中，并且定时刷到磁盘上，默认是两个小时回刷一次。并且为了防止 Prometheus 发生崩溃或重启时能够恢复数据，Prometheus 也提供了类似 MySQL 中 binlog 一样的预写日志，当 Prometheus 崩溃重启时，会读这个预写日志来恢复数据。

###### prometheus分位数坑点

Prometheus 不保存具体的指标数值的，他会帮你把指标放到具体的桶，但是他不会保存你指标的值，计算的分位数是一个预估的值，怎么预估呢？就是假设每个桶内的样本分布是均匀的，线性分布来计算的。
假设我们指定桶为：`[]float64{0,2.5,5,7.5,10}`
则 P50，其实就是算排在第50%位置的样本值，假设刚刚所有的数据都落在了第一个桶，那么他在计算的时候就会假定这个50%值在第一个桶的中点，他就会假定这个数就是 `0.5*2.5`，P99 就是第一个桶的 99%的位置，他就会假定这个数就是 `0.99*2.5`。

导致这个误差较大的原因就是我们的 bucket 设置的不合理。

#### 参考

- [一文带你了解 Prometheus](https://mp.weixin.qq.com/s/sQpB0WTs7eBDi4BuWp7gQg)