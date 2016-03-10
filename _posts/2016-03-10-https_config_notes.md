---
v_pageid: 830bef08ac03463a870b5114843f32aa
layout: post  
author: veizz
title: https配置手记  
date:  2016-03-10 21:44:45 +0800
categories: server
meta: 之前给公司的线上服务添加了https的支持，留下一些记录，包含https创建连接过程、在nginx上配置https支持、及证书申请相关介绍

---

## 引. 原理简介

>原理内容引自：[http://www.guokr.com/post/114121/](http://www.guokr.com/post/114121/)

HTTPS在传输数据之前需要客户端（浏览器）与服务端（网站）之间进行一次握手，在握手过程中将确立双方加密传输数据的密码信息。TLS/SSL协议不仅仅是一套加密传输的协议，更是一件经过艺术家精心设计的艺术品，TLS/SSL中使用了非对称加密，对称加密以及HASH算法。握手过程的简单描述如下：

1.**浏览器将自己支持的一套加密规则发送给网站。**

2.**网站从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给浏览器。**证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。

3.**获得网站证书之后**浏览器要做以下工作：  
a) 验证证书的合法性（颁发证书的机构是否合法，证书中包含的网站地址是否与正在访问的地址一致等），如果证书受信任，则浏览器栏里面会显示一个小锁头，否则会给出证书不受信的提示。  
b) 如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密。  
c) 使用约定好的HASH计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给网站。  

4.**网站接收浏览器发来的数据之后**要做以下的操作：  
a) 使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致。  
b) 使用密码加密一段握手消息，发送给浏览器。  

5.**浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密**。

这里浏览器与网站互相发送加密的握手消息并验证，目的是为了**保证双方都获得了一致的密码**，并且可以正常的加密解密数据，为后续真正数据的传输做一次测试。另外，HTTPS一般使用的加密与HASH算法如下：  
非对称加密算法：RSA，DSA/DSS  
对称加密算法：AES，RC4，3DES  
HASH算法：MD5，SHA1，SHA256  

**其中非对称加密算法用于在握手过程中加密生成的密码，对称加密算法用于对真正传输的数据进行加密，而HASH算法用于验证数据的完整性**。由于浏览器生成的密码是整个数据加密的关键，因此在传输的时候使用了非对称加密算法对其加密。非对称加密算法会生成公钥和私钥，公钥只能用于加密数据，因此可以随意传输，而网站的私钥用于对数据进行解密，所以网站都会非常小心的保管自己的私钥，防止泄漏。  
TLS握手过程中如果有任何错误，都会使加密连接断开，从而阻止了隐私信息的传输。正是由于HTTPS非常的安全，攻击者无法从中找到下手的地方，于是更多的是采用了假证书的手法来欺骗客户端，从而获取明文的信息，但是这些手段都可以被识别出来，我将在后续的文章进行讲述。  


## 一. 为什么要使用https

### 1）安全考虑
http是明文的传输，而https是安全的传输。具体怎么做到的安全，上面原理部分已经有过说明。最常用到一个场景是登录及注册。因为登录是需要用户名密码的，这些数据是关乎用户隐私的敏感数据,明文传输很不安全。（*特别是在公共场所的wifi，还有人说骑着一个自行车带一个不设密码的wifi在在大街上走一圈能获得很多的用户名密码*）为了防止这些信息的明文传输，我们一般通过使用Https的方式来做。

### 2）防止被网络运营商篡改网页内容，防止被挂马
还有一些情况，比如说联通，会给网页里面添加一些东西，比如说广告。这些东西通常会影响到用户的使用正常服务的体验。为了防止这种事情发生，也应该使用https。  
<img src="http://ww4.sinaimg.cn/mw1024/6cd82737jw1exwsaps60fj20sg0j5jze.jpg" style="width:50%;margin-left:25%;">

## 二. 关于证书的申请

baidu: Symantec  
taobao: globalsign  
zhihu.com: geotrust  
免费: startssl  

### 几种证书的类型，关键名词：

* EV: extended validation, 通常是在地址栏同时显示公司名称。比较权威的认证（很贵）
* OV: organization validated, 证书包含对应组织信息
* wildcard: 通配符，例如*.example.com， 同时支持example.com下所有子域名。（注意，a.b.example.com，有的不支持。）
* DV: 最简单的域名认证。 domain validation.

startssl可以申请免费的证书，每个证书支持最多5个域名。

## 三. 关于nginx配置
```lang=nginx
server {
    # 默认端口
    listen 443;
    server_name  www.example.com;
    access_log  /export/log/nginx/www.example.com/access.log combined;

    # 开启ssl
    ssl on;

    # 证书路径， 从ca机构申请的证书。
    ssl_certificate /export/ssl/www.example.com/www.crt;

    # 私钥路径， 从ca机构申请证书时的key
    ssl_certificate_key /export/ssl/www.example.com/www.key.unsecure;

    # edh加密算法的参数。 需要openssl的背景知识，参考 ：http://www.chinaunix.net/old_jh/13/478901.html
    # 关于forward secrecy， 参考这里：http://ju.outofmemory.cn/entry/188804
    ssl_dhparam  /export/ssl/www.example.com/dhparam.pem;

    # 客户端重用会话参数的缓存时间
    ssl_session_timeout 5m;

    # 开启指定的加密协议。 tls1.1和tls的1.2版本需要openssl1.0.1及其以上版本。
    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2 ;

    # 支持的加密算法， openssl对应的格式。
    ssl_ciphers  "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !MEDIUM";

    # 当使用SSLv3, 和TLS协议的时候，更倾向于使用服务端支持的算法
    ssl_prefer_server_ciphers on;

    # 设置存储会话参数的缓存的大小和类型。
    ssl_session_cache shared:SSL:10m;

    # 添加头信息，启用HSTS。如果全站使用https的话，建议打开。
    # 参考 这里：http://www.2cto.com/Article/201307/230740.html  ， https://imququ.com/post/web-security-and-response-header.html
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

    # 不允许使用在iframe中。
    add_header X-Frame-Options DENY;

    # 根据content-type的值来渲染页面内容。
    add_header X-Content-Type-Options nosniff;

    #ssl_session_tickets off;
    #ssl_stapling on;
    #ssl_stapling_verify on;

}
```
## 四. 带来的影响

* 用户访问时速度会比普通的http慢100ms左右
* 测试抓包的时候，比如说使用burpsuite, 要给手机安装证书才能使用，否则无法抓取https包。

## 五. 注意
0）做出的https配置是否安全可靠，兼容性好，使用第三方检测工具  
评级工具：[ssllabs](https://www.ssllabs.com)

1）配置冲突，所有的server都要配置同样的ssl配置。  
ssl的相关配置是写在server的大括号中的，但是当前大括号内的配置有可能会被其它大括号内的配置所覆盖。  
>（我猜是因为，早期的ssl配置不支持一个主机配置多个ssl的服务域名，后来就留下了一些bug）  

2）nginx -V
查看当前nginx版本，和支持的东西，查看使用的openssl版本号

3）私钥的使用，需要密码，解决办法是:  
主要是因为生成证书的时候设置了密码，以防止别人拿到key文件直接使用。这么做了之后，给key文件添加密码的意义就没有了。在一些特别注意安全的地方，一定不要这么做。这么生成了明文的私钥之后，一定要好好保管。  
nginx reload的时候需要输入key的密码，解决办法如下：  
[https://segmentfault.com/q/1010000000119345](https://segmentfault.com/q/1010000000119345)  

```lang=shell  
openssl rsa -in server.key -out server.key.unsecure
```

4）sni（`server name indication`）支持：
就是一个ip上面通过不同的servername 去host多个域名的服务，当前版本的nginx一般都支持。但是有一些浏览器不支持。
> （因为http1.0的协议在发送get请求的时候，只传了ip到服务端，header中没有host。导致服务端无法区分访问的是哪个域名，当前主流版本的http协议是1.1）  

5）是否允许页面被使用在iframe中？  

```lang=shell
    add_header X-Frame-Options SAMEORIGIN;     # 同源的才可以
    #add_header X-Frame-Options DENY;               # 不允许使用在iframe中
```
6）在https的页面中，不允许直接访问http的资源。如script的src为http的，会被浏览器block掉。  
例：
`Mixed Content: The page at 'https://www.example.com/' was loaded over HTTPS, but requested an insecure script 'http://www.example.com/script/path'. This request has been blocked; the content must be served over HTTPS.`

## 六. 参考文档：
nginx官方文档：  
[http://nginx.org/en/docs/http/configuring_https_servers.html](http://nginx.org/en/docs/http/configuring_https_servers.html)  
ssl相关配置参数文档：  
[http://nginx.org/en/docs/http/ngx_http_ssl_module.html](http://nginx.org/en/docs/http/ngx_http_ssl_module.html)  
网友配置：   
[https://doc.ssl.do/page/install-nginx/](https://doc.ssl.do/page/install-nginx/)  
