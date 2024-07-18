---
v_pageid: 422b9e7560b027e816da90e638a17516
author: veizz
title: react-native开发中遇到的一些坑（三 ）
date:  2016-09-28 18:49:40
categories: react-native
head: 产品已上线，app中较大的模块使用react-native完成。记录了一些遇到的问题，包含android向react-native模块传递数据，android和ios下样式区别，等

---

> 整理下列问题时，react-native版本为0.32.0

#### android向react-native传递json数据类型

`JSONObject`是不能直接传递给react-native组件当成json对象来使用的，需要使用`WritableMap`，如果有必要的话，可以实现自己的`JSONObject`转`ReadableMap/WritableMap`的方法。在实现的时候注意，数字类型，在java中区分int, long, float, double，而js中，数字统一使用double(number)表示。
参考[https://github.com/kevinstumpf/react-native-branch](https://github.com/kevinstumpf/react-native-branch/blob/android-support/android/src/main/java/com/dispatcher/rnbranch/RNBranchModule.java)
如下：

```java
protected static WritableMap convertJsonToMap(JSONObject jsonObject) {
    if(jsonObject == null) {
        return null;
    }

    WritableMap map = new WritableNativeMap();

    try {
        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            // 不安全的, Double所能表达的最大的整数，跟Long的最大值并不一样
            // https://en.wikipedia.org/wiki/Double-precision_floating-point_format
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
            //} else if (value instanceof Long) {
            //    map.putDouble(key, ((Long) value).doubleValue());
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
    } catch(JSONException ex) {
        map.putString("error", "Failed to convert JSONObject to WriteableMap: " + ex.getMessage());
    }

    return map;
}

protected static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
    WritableArray array = new WritableNativeArray();

    for (int i = 0; i < jsonArray.length(); i++) {
        Object value = jsonArray.get(i);
        if (value instanceof JSONObject) {
            array.pushMap(convertJsonToMap((JSONObject) value));
        } else if (value instanceof  JSONArray) {
            array.pushArray(convertJsonToArray((JSONArray) value));
        } else if (value instanceof  Boolean) {
            array.pushBoolean((Boolean) value);
        } else if (value instanceof  Integer) {
            array.pushInt((Integer) value);
        //} else if (value instanceof Long) {
        //    array.pushDouble(((Long) value).doubleValue());
        } else if (value instanceof  Double) {
            array.pushDouble((Double) value);
        } else if (value instanceof String)  {
            array.pushString((String) value);
        } else {
            array.pushString(value.toString());
        }
    }
    return array;
}
```

- - -

#### xcode打包支持打包js文件代码

配置xcode run script, 在run script的时候，找不到npm，环境变量问题。

解决办法：
一般是使用nvm安装的node，所以只要在要执行的脚本里，加载并执行nvm的脚本，就可以了。
参考： [https://github.com/facebook/react-native/pull/4015](https://github.com/facebook/react-native/pull/4015)

```shell
# Source the nvm.sh setup script
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  . "$NVM_DIR/nvm.sh"
elif [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  . "$HOME/.nvm/nvm.sh"
elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
  . "$(brew --prefix nvm)/nvm.sh"
fi
```

- - -

#### 一个奇怪的错误

`Warning: There is an internal error in the React performance measurement code. Did not expect componentDidMount timer to start while render timer is still in progress for another instance.`
这个错误的提示并不太准确，一般是因为其它的问题。
在遇到的情况里，是先销毁了一个modal，然后再创建了另外一个modal，在创建新的modal的时候，传的参数有一个是未定义的，就遇到了这个提示。

- - -

#### TextInput输入后，点击ScrollView或者ListView中元素，需要点击两次才能选中

第一次点击键盘收起，第二次点击选中指定元素。在`ScrollView`的文档中有介绍，设置`keyboardDismissMode`, `keyboardShouldPersistTaps`两个属性一般可以解决问题

解决办法：
给`ScrollView`或者`ListView`添加如下属性。

```
keyboardShouldPersistTaps={true}
keyboardDismissMode={'on-drag'}
```

在复杂的项目中，可能有多个`ScrollView`嵌套，需要在外层的`ScrollView`中添加这两个属性。

- - -

#### TextInput在android下面的样式问题

android下面`TextInput`，默认有padding, 需要手动设置padding, 才能把默认的padding清除掉。否则的话，当`TextInput`高度较小的时候，文字显示不出来.

- - -

#### ScrollView

在进行拖拽的时候，一般是先触发`scrollBeginDrag` , `scrollEndDrag`。如果有惯性滚动，会再触发`momentumScrollBegin`, `momentumScrollEnd`。

ios下面，调用`scrollTo`,会触发`momentumScrollEnd`,不会触发 `momentumScrollBegin`
android下面，调用`scrollTo`, 不会触发`momentumScrollEnd`，不会触发`momentumScrollBegin`
