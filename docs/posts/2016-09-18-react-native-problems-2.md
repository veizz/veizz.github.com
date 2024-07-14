---
v_pageid: ddb5c52223c238ccf228f0c285af0559
author: veizz
title: react-native开发中遇到的一些坑（二）
date:  2016-09-18 20:50:56 +0800
categories: react-native
meta: 产品已经上线，在app中有一个较大的模块使用react-native完成，记录了在开发过程中遇到的一些坑及解决办法

---


#### 当android的viewpagerandroid里的page数量不固定的时候

可能会遇到问题。比如说这个：
`The specified child already has a parent. You must call removeView() on the child's parent first`

会报错的代码类似如下结构：

```lang=js
render(){
    return(
        <IndicatorViewPager>
            <View>
            </View>
            {
                exists ? <View><Text>xxx</Text></View> : null;
            }
            <View>
            </View>
        </IndicatorViewPager>
    )
}
```

解决办法：修改成如下结构就好了

```lang=js
render(){
    return exists ?  this._genExists() : this._genNotExists();
}

_genExists(){
    return (
        <IndicatorViewPager>
            <View>
            </View>
            <View><Text>xxx</Text></View>
            <View>
            </View>
        </IndicatorViewPager>
    );
}

_genNotExists(){
    return (
        <IndicatorViewPager>
            <View>
            </View>
            <View>
            </View>
        </IndicatorViewPager>
    );
}
```

- - -

#### 异步操作，组件已经被unmount

在有些时候，组件会被unmount，而有一些异步的请求，会在组件umount之前发出，在umount之后完成，这个时候异步请求的回调函数会执行，然后有一些setState的操作
这样的setState操作会报一个warning:
`setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.`

解决办法：
在`componentWillMount`里面，设置`this._isMounted = true;`
在`componentWillUnmount`里面，设置`this._isMounted = false;`
然后在回调函数里面判断`this._isMounted`的值来解决

> 据说不推荐isMounted()函数

- - -

#### moment时间处理类，不能正确引入 locale 代码

在使用momentjs进行时间处理的时候，有时候需要国际化配置，使用本地语言。这时需要导入locale文件

解决办法：

```lang=js
import moment from 'moment';
import 'moment/locale/zh-cn';

// some other code ...
moment.locale('zh-cn');
```

- - -

#### iOS和android共用react-native代码的时候，开发协作

使用react-native的代码，主要是因为，同样的代码可以同时在android和iOS平台下使用，那么，跟原来已经有的android和iOS项目混合开发的时候，怎么样协作呢？

解决办法： 使用git subtree, 参考[这个链接](https://segmentfault.com/a/1190000003969060)

```lang=shell
# 添加subtree
git subtree add --prefix=rnComponents path-to-rn-project.git master

# 提交到subtree
git subtree push --prefix=rnComponents path-to-rn-project.git master

# 从subtree更新
git subtree pull --prefix=rnComponents path-to-rn-project.git master


# 还可以给url起个别名
git remote add the_alias path-to-rn-project.git
# 之后就可以使用别名来操作
git subtree add --prefix=rnComponents the_alias master
git subtree push --prefix=rnComponents the_alias master
git subtree pull --prefix=rnComponents the_alias master
```

- - -

#### setTimeout, setInterval的使用

使用`setTimeout`, `setInterval`等是非常危险的，如果在组件umount的时候忘记把它们清理掉的话。

解决办法：
在较早的版本中，使用[react-timer-mixin](https://github.com/reactjs/react-timer-mixin)来解决问题
在当前的版本中（主要是当前使用ES6语法），在componentWillUmount函数里，调用clearTimeout, clearInterval等做清理工作


