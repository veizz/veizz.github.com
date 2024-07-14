---
v_pageid: 3143a288c57e1b1add7767a83be774b9
author: veizz,peggyw1217
title: react-native和已有OC项目混合开发
date:  2016-09-17 14:52:56 +0800
categories: react-native
meta: react-native和已有OC项目混合开发,环境搭建简单介绍,搭配官方文档阅读更佳

---

## 注意
本文档结合官方文档一起阅读，效果更好
[中文翻译，0.30.0版](http://reactnative.cn/docs/0.30/integration-with-existing-apps.html)

## 思路
在原来的项目里面添加react-native相关依赖（lib），然后OC引入一个RCTRootView，在这个RCTRootView里面引入react-native的代码。（这个view是react-native提供的lib，可以使用js代码初始化。）
所以按照这个思路下来，需要

* 先准备好react-native开发环境
* 准备可以初始化RCTRootView的js代码（编译代码）
* 准备cocoapods环境
* 使用cocoapods添加react-native依赖
* OC代码中引入RCTRootView，编译调试

## 思路拆分

### RN环境准备，安装node
准备react-native 开发环境（安装node），node自带npm，npm是node的包管理工具。用以安装react, react-native等包

```lang=shell
# brew是mac下的一个包管理工具，具体参考http://brew.sh/
brew install node
```

### 准备js代码

```lang=shell
# 在项目目录下创建rnComponents文件夹（可以是任意目录，推荐是跟oc项目相关的目录）
mkdir rnComponents
cd rnComponents

# 创建node项目，自动生成package.json
npm init

# 在下面这一步，可能会遇到问题，不能成功安装react, react-native的包。需要科学上网。
# 一般的解决办法是使用国内的镜像
# npm config set registry https://registry.npm.taobao.org && npm install react react-native --save
npm install react react-native --save

# 创建index.ios.js文件
touch index.ios.js

# 在index.ios.js中添加示例代码
# 示例代码省略，请参考官网

# 启动服务
node node_modules/react-native/local-cli/cli.js start
# 之后在浏览器里面访问http://localhost:8081/index.ios.bundle?platform=ios
# 等一会儿之后，可以看到很多的js代码，到此时，已经准备好js

# 还可以把这条指令添加到package.json里面
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
# 之后就可以使用npm start来启动服务
```

### 添加依赖
官方推荐使用`cocoapods`来管理依赖，如下是推荐的步骤

```lang=shell
# 安装 cocoapods
sudo gem install cocoapods
```

> 如果mac上安装的ruby版本过低（低于2.2.0）的话，需要安装新版本的ruby。
> 推荐使用rvm（或者自行查询ruby版本更新方法）
>
> `curl -L get.rvm.io | bash -s stable`
> 然后安装2.3.1版本的ruby `rvm install 2.3.1  `
> 之后在命令行输入`ruby -v`可以看看版本号
> ruby 升级完成后，再次执行`sudo gem install cocoapods`

创建cocoapods配置文件
到ios的项目代码目录，执行`pod init`

cocoapods安装依赖
修改Podfile，文件中如下内容：

```
# =====================================
# Podfile
project 'Myapp.xcodeproj'

# Uncomment this line to define a global platform for your project
# platform :ios, '9.0'

# target 跟OC工程的target相关
target 'Myapp' do
  # Uncomment this line if you're using Swift or would like to use dynamic frameworks
  # use_frameworks!

  # Pods for Myapp
  # path配置的路径，跟上一步执行npm init的目录对应。
  # 如果npm init在/a/b/c/
  # 那下面这个目录对应的是/a/b/c/node_modules/react-native
  pod 'React', :path => 'rnComponents/node_modules/react-native', :subspecs => [
    'Core',
    'RCTText',
    'RCTWebSocket', # needed for debugging
    'RCTImage',
  ]
  target 'MyappTests' do
    inherit! :search_paths
    # Pods for testing
  end

  target 'MyappUITests' do
    inherit! :search_paths
    # Pods for testing
  end

end
# file end=====================================
```

```lang=shell
# 执行pod install, 进行安装
pod install
# 这一步需要等很久，建议科学上网
# 这一步完成之后，生成xcworkspace项目，使用xcode打开
```

#### 解决Build Setting问题
引入pods后需要在Build Setting的Other Linker Flags和Library Search Paths下面都加入`$(inherited)`，否则会报错

### 在OC的项目中，引入RCTRootView
首先打开项目名带`.xcworkspace`的文件，Pods和项目名应在平级目录中

在项目中创建一个继承于`UIView`的类，名字自定，这里叫`ReactView`

```lang=oc
// ReactView.h

#import <UIKit/UIKit.h>
@interface ReactView : UIView
@end

```

创建一个视图控制器

```lang=oc
// ViewController.m

@interface ViewController ()
@property (weak, nonatomic) ReactView *reactView;
@end
```
在视图控制器里面添加RCTRootView，首先先用`index.ios.bundle`的URI来初始化`RCTRootView`

```lang=oc
# 这里是js传过来的URL
# OC从这个url拉取js代码，解析并渲染
NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];

#核心代码，初始化一个RCTRootView。moduleName是js模块的名字，Properties可以传递字典类型的属性给js
RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"SimpleApp" initialProperties:nil launchOptions:nil];

```

### 更新App Transport Security
在iOS 9以上的系统中，除非明确指明，否则应用无法通过http协议连接到localhost主机，需要在`Info.plist`文件中将`localhost`列为App Transport Security的例外

```
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

### 操作完成后的目录结构

```lang=shell
.
├── Myapp
├── Myapp.xcodeproj
│   ├── project.pbxproj
│   ├── project.xcworkspace
│   └── xcuserdata
├── Myapp.xcworkspace
│   ├── contents.xcworkspacedata
│   └── xcuserdata
├── MyappTests
│   ├── MyappTests.m
│   └── Info.plist
├── MyappUITests
│   ├── MyappUITests.m
│   └── Info.plist
├── Podfile
├── Podfile.lock
├── Pods
│   ├── Headers
│   ├── Local Podspecs
│   ├── Manifest.lock
│   ├── Pods.xcodeproj
│   └── Target Support Files
└── rnComponents
    ├── index.ios.js
    ├── node_modules
    ├── package.json
    └── readme.md
```

### 编译执行
在xcode中编译代码，并执行，就可以看到效果了
