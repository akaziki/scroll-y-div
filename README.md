# **[scroll-y-div](https://github.com/akaziki/scroll-y-div)**

### 介绍

简易的竖向滚动组件，用于解决滚动条占位置挤压div或者div跳动的问题。

 实现原理是在里面包一层div，利用MutationObserver监听div的subtree和childList的变化，动态设置里层div的宽度。

### 安装

```shell
npm i scroll-y-div
```



### 使用

```jsx
import React from 'react';
import ScrollYDiv from 'scroll-y-div';

export default function IndexPage() {
  return (
    <div style={{width:100,height:200,background:'blue',overflow:'hidden'}}>
      <ScrollYDiv>
        <div style={{height:2000,background:'red'}}></div>
      </ScrollYDiv>
    </div>
  );
}
```

调试element可以看到里面的div的宽度变小了，减去了div的滚动条的宽度