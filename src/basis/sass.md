---
title: SASS语法
date: 2020-8-7
tags:
 - CSS
---
## SASS语法

#### 1 变量
```js
$primaryColor :red;
$side:left;
border-#{$side}: 5px solid $primaryColor; // 镶嵌在字符串  写在#{}
```
#### 2 计算功能
```js
$var:100px;
right: $var * 10%;
```
#### 3 继承
```js
.class2 { @extend .class1;}

```
#### 4 @mixin定义代码块
```js
@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　	}
  //带变量
 @mixin left($value: 10px) {
　　　　float: left;
　　　　margin-right: $value;
　}
  //调用
div {
　　　　@include left;
　　}
```
#### 5 自定义函数
```js
@function double($n) {
　　　　@return $n * 2;
　　}
　　#sidebar {
　　　　width: double(5px);
　　}
```
#### 6 引用其他文件
```js

@import "path/filename.scss";

    lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c


```
#### 7 条件语句
```js

p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}
```
#### 8 循环语句
```js

  //8.1
@for $i from 1 to 10 {
　　　　.border-#{$i} {
　　　　　　border: #{$i}px solid blue;
　　　　}
　　}
  //8.2
  $i: 6;
　　@while $i > 0 {
　　　　.item-#{$i} { width: 2em * $i; }
　　　　$i: $i - 2;
　　}
  //8.3
  @each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　}
　　}
```
