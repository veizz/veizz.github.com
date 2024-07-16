---
v_pageid: 5c7dbd5be3e148ca3db03db0665f5b1d
author: veizz
title: chrome加载延迟的两个问题
date:  2015-08-05 22:34:19
categories: html5
head: 关于chrome的safebrowsing服务，开发者工具中时间线各参数的含义解释

---

### 问题起源
刚上线的代码，突然发现ajax请求的列表加载出来的时间特别久，但是在chrome的dev-tool里面看，完成请求的时间特别短，但是有一个等待的时间特别长，为**5秒**左右。

### 查找原因
在新tab中（下文暂时就叫log tab）打开```chrome://net-internals/#events```， 查看chrome的event log
刷新页面，在log tab中查看对应的log。【*在输入框里输入url特征，可以筛选出指定的url*】
看到日志中有如下一段：

    t=111322 [st=   0] +REQUEST_ALIVE  [dt=5023]
    t=111322 [st=   0]    DELEGATE_INFO  [dt=5002]
                          --> delegate_info = "SafeBrowsingResourceThrottle"
    t=116324 [st=5002]   +URL_REQUEST_DELEGATE  [dt=2]
    t=116324 [st=5002]      DELEGATE_INFO  [dt=2]
                            --> delegate_info = "扩展程序“AdBlock”"
    t=116326 [st=5004]   -URL_REQUEST_DELEGATE

第一个5002ms内做了一件事，```SafeBrowsingResourceThrottle```.
看名字是安全相关的，通过查看[chrome源码](https://github.com/adobe/chromium/blob/cfe5bf0b51b1f6b9fe239c2a3c2f2364da9967d7/chrome/browser/renderer_host/safe_browsing_resource_throttle.cc)，发现如下一段注释，也就够了：

    //文件：chrome/browser/renderer_host/safe_browsing_resource_throttle.cc
    // Maximum time in milliseconds to wait for the  to
    // verify a URL. After this amount of time the outstanding check will be
    // aborted, and the URL will be treated as if it were safe.
    static const int kCheckUrlTimeoutMs = 5000;

### 结论
**这个5000ms是chrome安全浏览服务校验一个url是否安全的超时时间。如果在这个时间内服务未响应，就认为链接是安全的，并把当前校验取消**。

#### safe browsing服务
查看用户访问的url是否安全的一个服务，具体可以参考这里：
[http://blog.chromium.org/2012/01/all-about-safe-browsing.html](http://blog.chromium.org/2012/01/all-about-safe-browsing.html)
[http://www.google.com/transparencyreport/safebrowsing/](http://www.google.com/transparencyreport/safebrowsing/)
[safe browsing 服务调用的api文档](https://developers.google.com/safe-browsing/lookup_guide)
安全校验服务采用的google的服务器，在中国大陆一般都会超时。所以会导致5s的延时。
> 移动端chrome浏览器有代理服务，访问一个url的时候会从走代理，代理会压缩图片，css等，以节省用户流量。但是这个服务在中国不可用。跟这个safe browsing的服务差不多的意思。


### 相关文档参考
在找到问题的原因之前，看到dev tool中，时间线里有个值叫```stalled```，怀疑有可能是它的问题。虽然最终确认不是这方面问题，但也有一些帮助。

百度fex的一篇解析，特别详细。很大的参考价值
[http://fex.baidu.com/blog/2015/01/chrome-stalled-problem-resolving-process/](http://fex.baidu.com/blog/2015/01/chrome-stalled-problem-resolving-process/)
stackoverflow上对stalled的一个解释
[http://stackoverflow.com/questions/29206067/understanding-chrome-network-log-stalled-state](http://stackoverflow.com/questions/29206067/understanding-chrome-network-log-stalled-state)


#### 得到如下信息
1. 浏览器对一个域名最多同时打开的连接数是有限的（文中说chrome中6个，其它的浏览器常用的有4个，2个等）。对于css, js，图片等，都会使用其中一个连接，如果有6个图片同时在下载，那么这个域名下的接口，需要等到图片下载完成之后才开始调用。也就是说有可能会晚于document.ready事件执行。
2. 还有可能有这样一种情况，服务端已经断开了可利用的tcp链接『注1』，但是客户端（浏览器）还在使用。这样的话，当浏览器使用旧的连接去连接服务器的时候，会报错，会重试。重新选择tcp连接或者新建连接。这会导致发起的一个请求花费较多的时间在连接重置或者创建新的http上面。
3. 在这种情况下，有必要做动静分离，把静态文件隔离出去使用不同的域名，这样的话，图片等大文件的加载不会影响到接口调用。

4. chrome dev tool中时间线各阶段代表的意义

* **Stalled/Blocking** 在请求能够被发出去前的等等时间。包含了用于处理代理的时间。另外，如果有已经建立好的连接，那么这个时间还包括等待已建立连接被复用的时间，这个遵循Chrome对同一源最大6个TCP连接的规则。
* **Proxy Negotiation** 处理代理的时间。
* **DNS Lookup** 查找DNS的时间。页面上每个新的域都需要一次完整的寻路来完成DNS查找。
* **Initial Connection / Connecting** 用于建立链接的时间，包括TCP握手及多次尝试握手，还有处理SSL。
* **SSL** 完成SSL握手的时间。
* **Request Sent / Sending** 发起请求的时间，通常小到可以忽略。
* **Waiting (TTFB)** 等待响应的时间，具体来说是等待返回首个字节的时间。包含了与服务器之间一个来回响应的时间和等待首个字节被返回的时间。
* **Content Download / Downloading** 用于下载响应的时间

> chrome有好多服务在国内都是不能用的。
> 1）帐号同步，会同步浏览记录，书签，密码等，这个对于拥有多台设备的同学来说是一个很实用的功能，然后，不好用
> 2）语音识别，h5文档 中有一些对语音识别的支持，国内不好用
> 3）安全浏览服务，上面说的safe browsing
> 4）应用商店，扩展中心
> 5）升级
> 国内像百度浏览器，是使用的chromium的内核，大多数功能跟chrome相同，但是捆绑安装不好，自己的商店应用扩展不全
