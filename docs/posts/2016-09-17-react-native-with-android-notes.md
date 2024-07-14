---
v_pageid: 798d93c646d43bc212b8470133d8cce8
author: SeananXiang, zhuxindaba, veizz
title: react-native和已有android项目混合开发
date:  2016-09-17 16:52:03 +0800
categories: react-native
meta: react-native添加到原生android项目中的记录, 参考官网文档阅读

---

> 本文 是在 windows 下实践的总结，mac OX  下可能稍有不同，写作本文时，使用react-native 版本为0.30.0 、react 15.2.1
> 本文主要作者[SeananXiang](https://github.com/SeananXiang)

## 环境搭建

主要是依次安装 Python 2（注意 官方文档说目前不支持Python 3版本。） 、Node 、React Native命令行工具（react-native-cli）、Android Studio2.0或更高版本、Java Development Kit [JDK] 1.8 ， Android SDK 等， 这部分配置一般不会有问题，详见[中文文档](http://reactnative.cn/docs/0.30/getting-started.html#content)

## 集成到现有工程
先参考官方文档，这里有个中文翻译版: [嵌入到现有原生应用](http://reactnative.cn/docs/0.30/integration-with-existing-apps.html#content)

### 主要步骤

#### 准备react-native代码

```lang=shell
# 在项目目录下创建rn代码目录
mkdir rnComponents && cd rnComponents

# 初始node化项目目录,自动生成package.json
npm init

# 在下面这一步，可能会遇到问题，不能成功安装react, react-native的包。需要科学上网。
# 一般的解决办法是使用国内的镜像
# npm config set registry https://registry.npm.taobao.org && npm install react react-native --save
npm install react react-native --save

# 创建index.android.js, 添加示例代码
touch index.android.js

# 添加示例代码略，参考官方文档

# 启动服务
node node_modules/react-native/local-cli/cli.js start
# 之后在浏览器里面访问http://localhost:8081/index.android.bundle?platform=android
# 等一会儿之后，可以看到很多的js代码，到此时，已经准备好js

# 还可以把这条指令添加到package.json里面
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
# 之后就可以使用npm start来启动服务

```

### 修改build.gradle

在工程的build.gradle文件加入

```
   allprojects {
    repositories {
        ...
        maven {
            // All of React Native (JS, Android binaries) is installed from npm
            // $rootDir是指项目根目录，rnComponents是上面创建的，放rn代码的目录
            // 编译的时候，会从这个目录下面查找植入react-native所需要的依赖
            url "$rootDir/rnComponents/node_modules/react-native/android"
        }
    }
    ...
}
```

在项目build.gradle文件中加入 react-native 依赖

```
  // 注意，这里的版本号跟所使用的react-native的版本号相关，记录时，react-native版本为0.30.0
  compile "com.facebook.react:react-native:0.30.0"
```

### 新建activity

新建MyReactActivity，参考[官网代码-添加原生代码一节](http://facebook.github.io/react-native/releases/0.30/docs/integration-with-existing-apps.html#add-native-code)

然后参考文档实现 `ReactInstanceManager`的生命周期

### 剩下的坑

到这里貌似配置完成了，运行一把，崩掉了！恩，下面看看这几个坑，掉进去好几天！

#### 坑0. setUseDeveloperSupport(BuildConfig.DEBUG)

这只未true , 因 BuildConfig.DEBUG 默认为FALSE，即不会从服务器拉取js文件，而直接用android studio 运行工程，会跳过 js 打包的任务，最终会导致 APP 运行后连不上服务，crash!

#### 坑1. 加入 .setUseOldBridge(true)

好像是兼容的问题，不加也会导致运行后崩溃。

#### 坑2. 项目 build.gradle 中改一些版本号

这里的`23.0.1`很关键

```
compileSdkVersion 23
buildToolsVersion '23.0.1'
compile 'com.android.support:appcompat-v7:23.0.1'

defaultConfig {
    minSdkVersion 16  //或者 在manifest 文件加入<uses-sdk tools:overrideLibrary="com.facebook.react" />
    ndk {
        abiFilters "armeabi-v7a", "x86"
    }
}
```


#### 坑3. release 环境下打包

a) 首先`setUseDeveloperSupport(false)`，因为正式打包发布后，除了热更新以外不应再从服务器拉取加载 js 文件，所有js文件都应编译后打包进安装包。

b) 其次、在 model 目录下 build.gralde 文件配置好release  keyStore 相关，这部分不详细介绍(android开发基础知识)
c) 打包js代码，放到指定目录

```lang=shell
react-native bundle --platform android \
--dev false --entry-file index.android.js \
--bundle-output android/app/src/main/assets/index.android.bundle  \
--assets-dest android/app/src/main/res/
```

参数的配置解释：

```lang=shell
--platform      # 打包平台  android
--dev           # 开发模式false
--entry-file    # 原始JS文件名
--bundle-output     # bundle文件输出目录， 配置到工程的 assets 目录下（若没有，先创建此目录）、
--assets-       # 打包的资源目录 ， 配置在工程的 res/  目录下
```

执行完上面命令之后，在bundle output 目录下就可以找到生成的 `index.android.bundle` 文件了，可以在Android studio 直接运行。

## 其它要注意的地方

#### class不能重名
在集成到原生的项目中的时候，注意class名不能跟框架中class重名。给自己定义的react相关模块起名的时候，可以统一添加前缀。
如果重名的话，可能会遇到react-native模块中某元素不可用的问题。

#### node版本的问题

尽量使用较新版本的node，react-native在windows下的开发环境支持不是很完美，偶尔会遇到一些问题。使用较新的版本的node，打包js代码的速度会快一点

#### 图片的圆角问题

在开发中遇到一种情况，react-native中图片可以伸缩。当图片宽高比例较原来缩放较多，且不成比例的时候，有可能会遇到borderRadius失效的问题。


