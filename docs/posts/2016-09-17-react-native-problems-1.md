---
v_pageid: d6ff801940a852d0c7c6404b3870c51a
author: veizz
title: react-native开发中遇到的一些坑
date:  2016-09-17 18:10:10
categories: react-native
head: 产品已经上线，在app中有一个较大的模块使用react-native完成，记录了在开发过程中遇到的一些坑及解决办法

---

#### 设置边框宽度为hairlineWidth，在模拟器上不显示

遇到的情况是在iOS的模拟器调试的时候，发现部分边框不显示。使用的模拟器是iPhone6Plus，并进行了50%的缩放以在电脑显示器上完整的展示出来不需要滚动条。
这是因为hairlineWidth是设备上最小单位，然而再模拟器中缩放的时候，实际宽度为1个单位的边框，缩放之后不到1，就会有一些显示不出来。

解决办法：模拟低分辨率的设备，不设置缩放，在retina屏幕上100%显示，就好了。

- - -

#### iPhone6sPlus真机上发现Text多了一条线出来

还是因为缩放的问题，react-native认为，所有的iOS设备的屏幕宽度为320个单位(Dimensions取window的width)，它会对根据屏幕宽度自动进行缩放。在iPhone6sPlus设备上，因为屏幕物理分辨率比较高，在缩放时出现的计算误差就显示出来了。

解决办法：给Text设置样式 `backgroundColor:'transparent'`,

注：在react-native0.32.0版本上，已经没有此问题

- - -

#### 使用borderRadius画的圆，看上去不圆

缩放问题

解决办法：在真机上调试，有必要的使用图片代替

- - -

#### android下，图片不出圆角

一个ListView，每个元素是一个图片，不同尺寸的图片缩放到固定大小，并设置borderRadius为5。发现其中一个元素没有圆角。换了一张宽高比接近固定尺寸的图片就好了。

解决办法：使用宽高比相差不大的图片

- - -

#### android下，开发模式发现图片不渲染了

昨天开发的时候发现图片都正常展示，睡了一觉发现所有的图片都没了。因为所有的图片都是从开发服务器上拉到客户端的，可以从终端打出来的请求日志看到图片资源的请求。拉下来之后会有缓存，当缓存过期就失效了。在使用release版本的时候，会把图片资源打包到apk里面去，不会再从开发服务器上拉取，就没有问题了。

解决办法：release版本不会出现这个问题

- - -

#### OC不能发送消息到react-native组件

在示例代码中，事件消息是先由react-native代码调用OC代码，之后OC代码给react-native发送消息。然而在实际应用中你发现，并不是所有的时候都先由react-native发起。

解决办法：在react-native的componentWillMount函数中，调用OC函数，之后就可以发消息了。

