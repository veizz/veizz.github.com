---
v_pageid: 6076469c33d44548dcbe0b586af04c3c
author: veizz
title: 响应式网页设计的两种方法
date:  2015-08-05 21:39:22
categories: html5
head: 使用viewport和rem来解决网页缩放问题的方法和一些问题说明

---

## viewport的使用
> 来自于网易的[一个分享](https://www.icloud.com/keynote/AwBWCAESEJd5uucfBPGt6KPotb3tNfsaKm-Q7fqs2-4ojmPoPJuWZCvjYgKl5jEf1URdRgdgNHe38BTzeF3DK7q1ewMCUCAQEEIJ85mw21ii_AwybOqxoF-V02v51Vdg855ED4qVA_8bXr)   
> github地址在[这儿](https://github.com/unbug/generator-webappstarter/blob/master/app/templates/app/src/util/MetaHandler.js)

一个常见的viewport的写法如下

```html
<!-- 设置页面宽度为设备宽度，初始缩放比例为1.0，最大缩放比例为1.0，禁止用户缩放页面(移动设置浏览器里双击，手势等可以缩放网页)。-->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

这里的方法，是使用上面使用[metahandler.js](https://github.com/unbug/generator-webappstarter/blob/master/app/templates/app/src/util/MetaHandler.js), 然后在dom ready的时候调用```fixViewportWidth()```，这时页面会按照原比例缩放。  
我曾在网页中这样使用：

```html
<meta content="target-densitydpi=device-dpi,width=720" name="viewport">
<!-- some other code -->
<script src="js/zepto.min.js"></script>
<script src="js/metaHandler.js"></script>
<script>
    $(document).ready(function(){
        var mh = getMetaHandler();
        mh.fixViewportWidth(720);
    });
</script>
```

这个```fixViewportWidth()```函数的作用，就是侦测网页的实际宽度，然后根据设计稿和实际宽度的比例设置viewport的meta标签中```initial-scale```的值，让浏览器去整体缩放页面，以达到自适应的效果。这种办法在一般的浏览器里面都没有问题。


### 坑点
在一些旧版本，或者性能较差的浏览器，或者webview里面，会看到页面抖动。遇到过在小米黄页（MIUIV5, 黄页使用webview调用web网页）里面使用的时候，会出现这样的情况『进入页面和退出页面的时候，页面突然变的很大，之后再变正常。有一个闪大的现象』。

### 解决办法
应该可以使用这个办法：在进入页面的时候，先使用loading图，当页面准备好的时候再显示出来内容。且使用单页web程序，不切换页面。这样就没 有了进入和退出时的闪大现象。

## rem的使用
rem是一个长度单位，是css3新加的单位。它是指，**一个元素相对于root元素的字体大小倍数**。那么，如果设计稿是720px的，那么可以设置根元素的字体大小为

```javascript
document.documentElement.getBoundingClientRect().width / (720/100)
```

这样的话，对于720px宽的浏览器，根元素的字体大小为100px，那么设计稿中48px的字体可以为0.48rem。200px的宽度，可以使用2rem。

### 坑点
**chrome浏览器中，为了完整显示中文，小于12px的字体大小会被默认重置为12px.**这就是说，在使用较小的根元素```font-size```的时候，会有问题。最开始的时候，我设置了根元素字体大小为:720px下，根```font-size```为10px。然后就遇到了各种长度单位跟预期不符合的现象。

### 解决办法
设置合理的系数，使根元素字体大小比较合理。如100px。

### 示例代码

```javascript
!function(_window) {
    function setwindowfont() {
        var w = doc_item.getBoundingClientRect().width;
        // 1080px宽的屏幕，html元素字体大小设置为100px
        // 适合1080px宽的设计稿
        _window.rem = w / 10.8,
        doc_item.style.fontSize = _window.rem + "px"
    }
    var doc_item = _window.document.documentElement;
    var timer;
    _window.addEventListener(
        "resize",
        function() {
            clearTimeout(timer),
            timer = setTimeout(setwindowfont, 300)
        },
        false
    );
    _window.addEventListener(
        "pageshow",
        function(ev) {
            if(ev.persisted){
                clearTimeout(timer);
                timer = setTimeout(setwindowfont, 300);
            }
        },
        false
    ),
    setwindowfont()
} (window);

// 压缩以后是这样：
!function(a){function b(){ var b=g.getBoundingClientRect().width;a.rem=b/10.8,g.style.fontSize=a.rem+"px"}var g=a.document.documentElement,e;a.addEventListener("resize",function(){clearTimeout(e),e=setTimeout(b,300)},!1),a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(e),e=setTimeout(b,300))},!1),b()}(window);

```

把这段代码放在文件的开头，之后所有的长度单位可以使用rem。对于1080p的设计稿，42px即0.42rem
