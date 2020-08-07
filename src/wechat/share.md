---
title: 网页生成图片
date: 2019-12-08
tags:
 - 微信小程序
 - Html2Canvas
 - Painter
categories:
 - 技术高汤
---

## Html2Canvas
- 实现功能：   
HTML页面保存为图片，常见于H5活动页分享。
官方github地址：[https://github.com/niklasvh/html2canvas](https://github.com/niklasvh/html2canvas)

- 原理：   
将DOM改写为canvas，然后利用canvas的toDataURL方法实现将DOM输出为包含图片展示的data url，将URL赋值给img标签src即可

- 注意：
    - 适用于web端、H5等有dom结构的页面
    - 注意图片元素加载完成后再调用 html2canvas
    - 浏览器有滚动条时，或者元素需要定位时，需要指定截图的起始位置
    - 图片中有链接地址时，设置useCORS属性可保证图片的加载

- 重要参数：

| 参数          | 默认值        | 描述  |
| ------------- |:-------------:| -----:|
| useCORS       | false         |    用来设置是否允许使用跨域的图片进行访问 |
| x	            | element x-offset	| 裁剪画布x坐标
| y	            | element y-offset	| 裁剪画布y坐标
| scrollX	    | element scrollX	| 渲染元素时使用的x滚动位置
| scrollY	    | element scrollY	| 渲染元素时使用的y滚动位置
| windowWidth	| Window.innerWidth	| 渲染元素时使用的窗口宽度
| windowHeight	| Window.innerHeght	| 染时使用的窗口高度 Element

### :chestnut: web端整个页面截图

```js
html2canvas(document.body, {
    useCORS: true,
    width: window.screen.availWidth,
    height: window.screen.availHeight,
    windowWidth: document.body.scrollWidth,
    windowHeight: document.body.scrollHeight,
    x:0,
    y: window.scrollY
}).then(canvas => {
    const url = canvas.toDataURL(); // canvas转url，赋值给image元素的src属性
});
```


<!-- ### :chestnut: H5页面截图

简单模拟，存在小问题，H5页面的时候使用定位占据整个窗口宽高即可 -->
<!-- <ClientOnly>
<ShareOne/>
</ClientOnly> -->


## 小程序端
- 使用场景：
    - 保存网页截图，反馈错误
    - 招聘网站，职位详情页，生成海报长图分享职位
    - ......


- 调研：
    - [painter](https://github.com/Kujiale-Mobile/Painter)：能够相对布局，满足使用场景；（:heavy_check_mark:选用）
    - [taro-plugin-canvas](https://taro-ext.jd.com/plugin/view/5d23051670a0f46a87c9785b)：不支持动态文字内容展示，影响布局；（弃用）
    - html2canvas：依赖浏览器window对象，小程序端无此对象；（弃用）
    - [wxm2canvas](https://developers.weixin.qq.com/community/develop/doc/0002a4b2900e50e18bc72046554406)：只支持ios不支持安卓；（弃用）
    
- Painter 的优势
    - 功能全，支持文本、图片、矩形、qrcode 类型的 view 绘制
    - 布局全，支持多种布局方式，如 align（对齐方式）、rotate（旋转）
    - 支持圆角，其中图片，矩形，和整个画布支持 borderRadius 来设置圆角
    - 杠杠的性能优化，我们对网络素材图片加载实现了一套 LRU 存储机制，不用重复下载素材图片。
    - 杠杠的容错，因为某些特殊情况会导致 Canvas 绘图不完整。我们对此加入了对结果图片进行检测机制，如果绘图出错会进行重绘。

  ps: 采用 Taro + Painter实践

 ### :chestnut: 使用 Painter

1. 引入代码
下载painter核心代码，[https://github.com/Kujiale-Mobile/PainterCore.git ](https://github.com/Kujiale-Mobile/PainterCore.git )

2. 作为自定义组件引入
```js
"usingComponents":{
  "painter":"/components/painter/painter"
}
```
3. 组件接收 palette 字段作为画图数据的数据源, 图案数据以json形式存在，推荐使用“皮肤模板”的方法进行传递，示例代码如下：

```jsx
<painter palette="{{data}}" bind:imgOK="onImgOK" />
```