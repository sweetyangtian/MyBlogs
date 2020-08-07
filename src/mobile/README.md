---
title: 移动端常见问题
date: 2019-12-08
tags:
 - 移动端
---

## 设置meta标签
```html
<meta name="viewport" content="initial-scale=1,width=device-width,user-scalable=no,maximum-scale=1"/>

<meta name="applicable-device" content="pc,mobile">
```

## 页面尺寸适配
### 网易做法

css中使用的尺寸与设计稿保持一致。将页面宽度设为屏幕宽度，通过设置html的font-size与使用rem实现尺寸与设计稿一致

  ● 假设设计稿宽度为640px，那么以设计稿为准，设置body的宽度为640px

  ● 由于使用rem单位，因此需要设置html标签的font-size

  ● 为计算方便，取100px为参照，所以body的宽度为6.4rem

  ● 由于设备的dip!=设计稿宽度，因此font-size=deviceWidth/6.4

  ● css尺寸为：设计稿标注尺寸/100

### 淘宝做法

页面大小与设计稿保持一致。设置meta viewport中的 scale 保证页面大小与设计稿一致，使用rem

  ● meta viewport中device-width的算法为：设备的物理分辨率 / (devicePixelRatio * scale)

  ● 而每台设备的devicePixelRatio可通过 window.devicePixelRatio 获取

  ● JavaScript动态计算设置scale，包括initial-scale，maximum-scale，minimum-scale

  ● 动态设置html的font-size，为屏幕分辨率/10

  ● css尺寸为：设计稿标注尺寸/html的font-size

[适配-flexible方案-淘宝](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)


### 字号用px来作为单位

```sass

@function px($val) {
    @return $val/$basewidth*16+rem;
}
$basewidth:640px; //设计稿宽度
height:px(86px);
原理：选择16作为因子，font-size = W / 16；比例为640/16=40;所以，页面rem换算为：设计稿px值/40;
```
```js
var h=document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth/10+'px';

var h=document.documentElement.style.fontSize =window.innerWidth / 640 * 100 + 'px';

var h=document.documentElement.style.fontSize =window.innerWidth / 640 * 100 / 16 * 100 + '%';
```

### PostCss插件 
[postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem)，[移动端postcss-px2rem配置](https://juejin.im/post/5bf66282f265da61542d4338)

1. 安装
```
npm install postcss-px2rem -S
```
2. 在webpack配置中加入这个插件
```js
plugins:[
  new webpack.LoaderOptionsPlugin({
    vue: {
      postcss: [require('postcss-px2rem')({'remUnit': 100,'baseDpr':2})]
    },
  })
]
// remUnit: 100意思为1rem=100px，因为100比较好计算所以这里写100
```

3. 对html的font-size进行动态设置
```js
(function (doc, win) {    
  	var docEl = doc.documentElement, 
  	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  	recalc = function () {       
      	var clientWidth = docEl.clientWidth;
      	if (!clientWidth) return;  
      	if(clientWidth>=640){  
          docEl.style.fontSize = '100px';  
        }else{  
          docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }        
    }; 
	if (!doc.addEventListener) return;    
	win.addEventListener(resizeEvt, recalc, false);    
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```
4. 使用
```css
#box {
   height: 44px;                //会被postcss-px2rem插件转换，相当于0.44rem
   width: 100%;
   font-size: 24px;/*no*/      //如果不想用插件转换可以用/*no*/标识符
}
```

>[如何在Vue项目中使用vw实现移动端适配-----大漠](https://juejin.im/entry/5aa09c3351882555602077ca)


[移动端H5图片上传的那些坑](https://segmentfault.com/a/1190000006140042)


## 调试工具

VConsole，npm 地址 [https://www.npmjs.com/package/vconsole](https://www.npmjs.com/package/vconsole)，专为手机web 页面量身设计的网页前端调试面板。

```js
// 下载
npm install vconsole

// 然后js代码中
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化
```
或者，直接下载js文件引入。
注意：VConsole 只是 vConsole 的原型，而非一个已实例化的对象。所以在手动 new 实例化之前，vConsole 不会被插入到网页中。



## 爬坑合集

### [网站收藏-移动端爬坑记](http://blog.csdn.net/crper/article/details/51902681)

● Flex兼容

● IOS的H5页面scroll不流畅解决方案

● IOS 遮罩层较好方案

● IOS滚动窗滑动到底部还能弹窗拖拉的奇葩修复

● ios和android下触摸元素时出现半透明灰色遮罩

● IOS 默认输入框内阴影重置

● 旋转屏幕时，字体大小调整的问题

● 默认启用GPU渲染页面

● transition闪屏

● placeholder的颜色值改变

● 移动端禁止选中内容

● IOS禁止保存或拷贝图像

● 常用的移动端meta

● IOS中input键盘事件调用缓慢

● 页面高度渲染错误

● 怪异悬浮的表单




### 1px 问题

使用postcss-write-svg插件
```sass
@svg 1px-border {
  height: 2px;
  @rect {
    fill: var(--color, black);
    width: 100%; height: 50%;
  }
}
.example {
  border: 1px solid transparent;
  border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}

或者
@svg square {
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 100%;
    }
}

#example {
    background: white svg(square param(--color #00b1ff));
}
```

### 处理图片清晰度

用同等比例的图片在PC机上很清楚，但是手机上很模糊，是devicePixelRatio作怪，因为手机分辨率太小，想让图片在手机里显示更为清晰，必须使用2x的背景图（一般情况都是用2倍）。
例如一个div的宽高是100，背景图必须得200，然后background-size:contain;，这样显示出来的图片就比较清晰了。

### 调用安卓或者ios的拨号功能  
```html
 <a href="tel:10010">10010</a>
 ```

###  iOS下页面启动时设置默认显示图片

iOS下页面启动时设置默认显示图片，避免加载时的白屏。
```html
<link rel="apple-touch-startup-image" href="start.png"/>
```

### 某些Android手机圆角失效  
```css
background-clip: padding-box;
```

### 禁止复制、选中文本
```css
Element {
 -webkit-user-select: none;
 -moz-user-select: none;
 -khtml-user-select: none;
  user-select: none;
}
```
