---
title: CSS代码规范
date: 2019-12-08
tags:
 - 代码规范

---

## 缩进
[强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。

    .selector {
        margin: 0;
        padding: 0;
    }

## 空格
[强制] 选择器 与 { 之间必须包含空格。
[强制] 属性名 与之后的 : 之间不允许包含空格， : 与 属性值 之间必须包含空格。
[强制] 列表型属性值 书写在单行时，, 后必须跟一个空格。

    .selector {
        margin: 0;
        font-family: Arial, sans-serif;
    }


## 选择器

[强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。

    /* good */
    .post,
    .page,
    .comment {
        line-height: 1.5;
    }

    /* bad */
    .post, .page, .comment {
        line-height: 1.5;
    }



[强制] >、+、~ 选择器的两边各保留一个空格。


    /* good */
    main > nav {
        padding: 10px;
    }

    label + input {
        margin-left: 5px;
    }

    input:checked ~ button {
        background-color: #69C;
    }

    /* bad */
    main>nav {
        padding: 10px;
    }

    label+input {
        margin-left: 5px;
    }

    input:checked~button {
        background-color: #69C;
    }



[强制] 属性选择器中的值必须用双引号包围。

解释：不允许使用单引号，不允许不使用引号。


    /* good */
    article[character="juliet"] {
        voice-family: "Vivien Leigh", victoria, female;
    }

    /* bad */
    article[character='juliet'] {
        voice-family: "Vivien Leigh", victoria, female;
    }

## 属性
[强制] 属性定义必须另起一行。
```
    /* good */
    .selector {
        margin: 0;
        padding: 0;
    }

    /* bad */
    .selector { margin: 0; padding: 0; }
```

[强制] 属性定义后必须以分号结尾。

```
    /* good */
    .selector {
        margin: 0;
    }

    /* bad */
    .selector {
        margin: 0
    }
```

## 属性缩写
[建议] 在可以使用缩写的情况下，尽量使用属性缩写。


    /* good */
    .post {
        font: 12px/1.5 arial, sans-serif;
    }

    /* bad */
    .post {
        font-family: arial, sans-serif;
        font-size: 12px;
        line-height: 1.5;
    }


[建议] 使用 border / margin / padding 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。

解释：border / margin / padding 等缩写会同时设置多个属性的值，容易覆盖不需要覆盖的设定。如某些方向需要继承其他声明的值，则应该分开设置。


    /* centering <article class="page"> horizontally and highlight featured ones */
    article {
        margin: 5px;
        border: 1px solid #999;
    }

    /* good */
    .page {
        margin-right: auto;
        margin-left: auto;
    }

    .featured {
        border-color: #69c;
    }

    /* bad */
    .page {
        margin: 5px auto; /* introducing redundancy */
    }

    .featured {
        border: 1px solid #69c; /* introducing redundancy */
    }

## 属性书写顺序
[建议] 同一 rule set 下的属性在书写时，应按功能进行分组，并以 Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果） 的顺序书写，以提高代码的可读性。

* 解释：
  * Formatting Model 相关属性包括：position / top / right / bottom / left / float / display / overflow 等
  * Box Model 相关属性包括：border / margin / padding / width / height 等
  * Typographic 相关属性包括：font / line-height / text-align / word-wrap 等
  * Visual 相关属性包括：background / color / transition / list-style 等
  * 另外，如果包含 content 属性，应放在最前面。


    .sidebar {
        /* formatting model: positioning schemes / offsets / z-indexes / display / ... */
        position: absolute;
        top: 50px;
        left: 0;
        overflow-x: hidden;

        /* box model: sizes / margins / paddings / borders / ... */
        width: 200px;
        padding: 5px;
        border: 1px solid #ddd;

        /* typographic: font / aligns / text styles / ... */
        font-size: 14px;
        line-height: 20px;

        /* visual: colors / shadows / gradients / ... */
        background: #f5f5f5;
        color: #333;
        -webkit-transition: color 1s;
        -moz-transition: color 1s;
                transition: color 1s;
    }

## !important
[建议] 尽量不使用 !important 声明。

一定要使用的话： 1、出现在全局样式上（全局样式，考虑是否存在污染） 2、出现在内联样式上

## 值与单位
### 文本
[强制] 文本内容必须用双引号包围。

解释：文本类型的内容可能在选择器、属性值等内容中。

    /* good */
    html[lang|="zh"] q:before {
        font-family: "Microsoft YaHei", sans-serif;
        content: "“";
    }


    /* bad */
    html[lang|=zh] q:before {
        font-family: 'Microsoft YaHei', sans-serif;
        content: '“';
    }

### 数值
[强制] 当数值为 0 - 1 之间的小数时，省略整数部分的 0。
示例：

    /* good */
    panel {
        opacity: .8;
    }

    /* bad */
    panel {
        opacity: 0.8;
    }

### url()
[强制] url() 函数中的路径不加引号。

    body {
        background: url(bg.png);
    }
[建议] url() 函数中的绝对路径可省去协议名。


    body {
        background: url(//baidu.com/img/bg.png) no-repeat 0 0;
    }
### 长度
[强制] 长度为 0 时须省略单位。 (也只有长度单位可省)

    /* good */
    body {
        padding: 0 5px;
    }

    /* bad */
    body {
        padding: 0px 5px;
    }

### 颜色
[强制] RGB颜色值必须使用十六进制记号形式 #rrggbb。不允许使用 rgb()。
解释：

带有alpha的颜色信息可以使用 rgba()。使用 rgba() 时每个逗号后必须保留一个空格。

    /* good */
    .success {
        box-shadow: 0 0 2px rgba(0, 128, 0, .3);
        border-color: #008000;
    }

    /* bad */
    .success {
        box-shadow: 0 0 2px rgba(0,128,0,.3);
        border-color: rgb(0, 128, 0);
    }
[强制] 颜色值可以缩写时，必须使用缩写形式。

    /* good */
    .success {
        background-color: #aca;
    }

    /* bad */
    .success {
        background-color: #aaccaa;
    }
[强制] 颜色值不允许使用命名色值。

    /* good */
    .success {
        color: #90ee90;
    }

    /* bad */
    .success {
        color: lightgreen;
    }
[建议] 颜色值中的英文字符采用小写。如不用小写也需要保证同一项目内保持大小写一致。

    /* good */
    .success {
        background-color: #aca;
        color: #90ee90;
    }

    /* good */
    .success {
        background-color: #ACA;
        color: #90EE90;
    }

    /* bad */
    .success {
        background-color: #ACA;
        color: #90ee90;
    }

### 2D 位置
[强制] 必须同时给出水平和垂直方向的位置。
解释：

2D 位置初始值为 0% 0%，但在只有一个方向的值时，另一个方向的值会被解析为 center。为避免理解上的困扰，应同时给出两个方向的值。background-position属性值的定义

    /* good */
    body {
        background-position: center top; /* 50% 0% */
    }

    /* bad */
    body {
        background-position: top; /* 50% 0% */
    }

## 文本编排
### 字体族
[强制] font-family 属性中的字体族名称应使用字体的英文 Family Name，其中如有空格，须放置在引号中。
解释：

所谓英文 Family Name，为字体文件的一个元数据，常见名称如下：

字体	操作系统	Family Name
宋体 (中易宋体)	Windows	SimSun
黑体 (中易黑体)	Windows	SimHei
微软雅黑	Windows	Microsoft YaHei
微软正黑	Windows	Microsoft JhengHei
华文黑体	Mac/iOS	STHeiti
冬青黑体	Mac/iOS	Hiragino Sans GB
文泉驿正黑	Linux	WenQuanYi Zen Hei
文泉驿微米黑	Linux	WenQuanYi Micro Hei

    h1 {
        font-family: "Microsoft YaHei";
    }
[强制] font-family 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( serif / sans-serif )。


    /* Display according to platform */
    .article {
        font-family: Arial, sans-serif;
    }

    /* Specific for most platforms */
    h1 {
        font-family: "Helvetica Neue", Arial, "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
    }

[强制] font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。

    /* good */
    body {
        font-family: Arial, sans-serif;
    }

    h1 {
        font-family: Arial, "Microsoft YaHei", sans-serif;
    }

    /* bad */
    body {
        font-family: arial, sans-serif;
    }

    h1 {
        font-family: Arial, "Microsoft YaHei", sans-serif;
    }

### 字号
[强制] 需要在 Windows 平台显示的中文内容，其字号应不小于 12px。
解释：

由于 Windows 的字体渲染机制，小于 12px 的文字显示效果极差、难以辨认。

### 字重
[强制] font-weight 属性必须使用数值方式描述。
解释：

CSS 的字重分 100 – 900 共九档，但目前受字体本身质量和浏览器的限制，实际上支持 400 和 700 两档，分别等价于关键词 normal 和 bold。

    /* good */
    h1 {
        font-weight: 700;
    }

    /* bad */
    h1 {
        font-weight: bold;
    }
### 行高
[建议] line-height 在定义文本段落时，应使用数值。

    .container {
        line-height: 1.5;
    }
## 响应式
[强制] Media Query 不得单独编排，必须与相关的规则一起定义。

    /* Good */
    /* header styles */
    @media (...) {
        /* header styles */
    }

    /* main styles */
    @media (...) {
        /* main styles */
    }

    /* footer styles */
    @media (...) {
        /* footer styles */
    }


    /* Bad */
    /* header styles */
    /* main styles */
    /* footer styles */

    @media (...) {
        /* header styles */
        /* main styles */
        /* footer styles */
    }

[强制] Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。

    @media
    (-webkit-min-device-pixel-ratio: 2), /* Webkit-based browsers */
    (min--moz-device-pixel-ratio: 2),    /* Older Firefox browsers (prior to Firefox 16) */
    (min-resolution: 2dppx),             /* The standard way */
    (min-resolution: 192dpi) {           /* dppx fallback */
        /* Retina-specific stuff here */
    }
[建议] 尽可能给出在高分辨率设备 (Retina) 下效果更佳的样式。
## 兼容性
### 属性前缀
[强制] 带私有前缀的属性由长到短排列，按冒号位置对齐。
解释：标准属性放在最后，按冒号对齐方便阅读，也便于在编辑器内进行多行编辑。

    .box {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
                box-sizing: border-box;
    }
### Hack
[建议] 需要添加 hack 时应尽可能考虑是否可以采用其他方式解决。
解释：

如果能通过合理的 HTML 结构或使用其他的 CSS 定义达到理想的样式，则不应该使用 hack 手段解决问题。通常 hack 会导致维护成本的增加。

[建议] 尽量使用 选择器 hack 处理兼容性，而非 属性 hack。
解释：

尽量使用符合 CSS 语法的 selector hack，可以避免一些第三方库无法识别 hack 语法的问题。

    /* IE 7 */
    *:first-child + html #header {
        margin-top: 3px;
        padding: 5px;
    }

    /* IE 6 */
    * html #header {
        margin-top: 5px;
        padding: 4px;
    }
[建议] 尽量使用简单的 属性 hack。
示例：

    .box {
        _display: inline; /* fix double margin */
        float: left;
        margin-left: 20px;
    }

    .container {
        overflow: hidden;
        *zoom: 1; /* triggering hasLayout */
    }
## 备注

布局（grid）（.g-）；
模块（module）（.m-）；
元件（unit）（.u-）；
功能（function）（.f-）； //  只能出现在style 目录下，充分利用function
皮肤（skin）（.s-）

## demo

/* 布局 */
.g-sd{float:left;width:300px;}
/* 模块 */
.m-logo{width:200px;height:50px;}
/* 元件 */
.u-btn{height:20px;border:1px solid #333;}
/* 功能 */
.f-tac{text-align:center;}
/* 皮肤 */
.s-fc,a.s-fc:hover{color:#fff;}



## Less/Sass 编码规范
### 代码组织
代码必须（MUST）按如下形式按顺序组织：

@import
变量声明
样式声明
    // ✓
    @import "est/all.less";

    @default-text-color: #333;

    .page {
        width: 960px;
        margin: 0 auto;
    }
@import 语句
@import 语句引用的文件必须（MUST）写在一对引号内，.less 后缀不得（MUST NOT）省略（与引入 CSS 文件时的路径格式一致）。引号使用 ' 和 "均可，但在同一项目内必须（MUST）统一。

    // ✗
    @import 'est/all';
    @import "my/mixins.less";

    // ✓
    @import "est/all.less";
    @import "my/mixins.less";
### 空格
属性、变量
选择器和 { 之间必须（MUST）保留一个空格。

属性名后的冒号（:）与属性值之间必须（MUST）保留一个空格，冒号前不得（MUST NOT）保留空格。

定义变量时冒号（:）与变量值之间必须（MUST）保留一个空格，冒号前不得（MUST NOT）保留空格。

在用逗号（,）分隔的列表（Less 函数参数列表、以 , 分隔的属性值等）中，逗号后必须（MUST）保留一个空格，逗号前不得（MUST NOT）保留空格。

    // ✗
    .box{
        @w:50px;
        @h :30px;
        width:@w;
        height :@h;
        color: rgba(255,255,255,.3);
        transition: width 1s,height 3s;
    }

    // ✓
    .box {
        @w: 50px;
        @h: 30px;
        width: @w;
        height: @h;
        transition: width 1s, height 3s;
    }
### 运算
+ / - / * / / 四个运算符两侧必须（MUST）保留一个空格。+ / - 两侧的操作数必须（MUST）有相同的单位，如果其中一个是变量，另一个数值必须（MUST）书写单位。
```
    // ✗
    @a: 200px;
    @b: (@a+100)*2;

    // ✓
    @a: 200px;
    @b: (@a + 100px) * 2;
```
### 嵌套和缩进
必须（MUST）采用 4 个空格为一次缩进， 不得（MUST NOT）采用 TAB 作为缩进。

嵌套的声明块前必须（MUST）增加一次缩进，有多个声明块共享命名空间时尽量（SHOULD）嵌套书写，避免选择器的重复。

但是需注意的是，尽量（SHOULD）仅在必须区分上下文时才引入嵌套关系（在嵌套书写前先考虑如果不能嵌套，会如何书写选择器）。

    // ✗
    .main .title {
    font-weight: 700;
    }

    .main .content {
    line-height: 1.5;
    }

    .main {
        .warning {
        font-weight: 700;
        }
    }

    // ✓
    .main {
        .title {
            font-weight: 700;
        }

        .content {
            line-height: 1.5;
        }
        
        .warning {
            font-weight: 700;
        }
    }


### 变量
Less 的变量值总是以同一作用域下最后一个同名变量为准，务必注意后面的设定会覆盖所有之前的设定。

变量命名必须（MUST）采用 @foo-bar 形式，不得（MUST NOT）使用 @fooBar 形式。

    // ✗
    @sidebarWidth: 200px;
    @width:800px;

    // ✓
    @sidebar-width: 200px;
    @width: 800px;

### 继承
使用继承时，如果在声明块内书写 :extend 语句，必须（MUST）写在开头：

    // ✗
    .sub {
        color: red;
        &:extend(.mod all);
    }

    // ✓
    .sub {
        &:extend(.mod all);
        color: red;
    }

### 混入（Mixin）
在定义 mixin 时，如果 mixin 名称不是一个需要使用的 className，必须（MUST）加上括号，否则即使不被调用也会输出到 CSS 中。

    // ✗
    .big-text {
        font-size: 2em;
    }

    h3 {
        .big-text;
    }

    // ✓
    .big-text() {
        font-size: 2em;
    }

    h3 {
        .big-text();
    }

如果混入的是本身不输出内容的 mixin，必须（MUST）在 mixin 后添加括号（即使不传参数），以区分这是否是一个 className（修改以后是否会影响 HTML）。

    // ✗
    .box {
        .clearfix;
        .size (20px);
    }

    // ✓
    .box {
        .clearfix();
        .size(20px);
    }
Mixin 的参数分隔符使用 , 和 ; 均可，但在同一项目中必须（MUST）保持统一。

### 注释
单行注释尽量（SHOULD）使用 // 方式。

    // Hide everything
    * {
        display: none;
    }
