---
title: JS代码规范
date: 2019-12-08
tags:
 - 代码规范

---

## 缩进
[强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。

[强制] switch 下的 case 和 default 必须增加一个缩进层级。

```js
// good
switch (variable) {

    case '1':
        // do...
        break;

    case '2':
        // do...
        break;

    default:
        // do...

}
// bad
switch (variable) {

case '1':
    // do...
    break;

case '2':
    // do...
    break;

default:
    // do...

}
```
## 空格
[强制] 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格。

```js
var a = !arr.length;
a++;
a = b + c;
```
[强制] 用作代码块起始的左花括号 { 前必须有一个空格。

```js
// good
if (condition) {
}

while (condition) {
}

function funcName( ) {
}

// bad
if (condition){
}

while (condition){
}

function funcName( ){
}
```
[强制] if / else / for / while / function / switch / do / try / catch / finally 关键字后，必须有一个空格。

```js
// good
if (condition) {
}

while (condition) {
}

(function ( ) {
})();

// bad
if(condition) {
}

while(condition) {
}

(function( ) {
})();
```
[强制] 在对象创建时，属性中的 : 之后必须有空格，: 之前不允许有空格。

```js
// good
var obj = {
    a: 1,
    b: 2,
    c: 3
};
// bad
var obj = {
    a : 1,
    b:2,
    c :3
};
```
[强制] 函数声明、具名函数表达式、函数调用中，函数名和 ( 之间不允许有空格。

```js
// good
function funcName( ) {
}

var funcName = function funcName( ) {
};

funcName();

// bad
function funcName ( ) {
}

var funcName = function funcName ( ) {
};

funcName ();
```
[强制] , 和 ; 前不允许有空格。如果不位于行尾，, 和 ; 后必须跟一个空格。

```js 
// good
callFunc(a, b);

// bad
callFunc(a , b) ;
```

[强制] 在函数调用、函数声明、括号表达式、属性访问、if / for / while / switch / catch 等语句中，() 和 [] 内紧贴括号部分不允许有空格。

```js 
// good

callFunc(param1, param2, param3);

save(this.list[this.indexes[i]]);

needIncream && (variable += increament);

if (num > list.length) {
}

while (len--) {
}
// bad

callFunc( param1, param2, param3 );

save( this.list[ this.indexes[ i ] ] );

needIncreament && ( variable += increament );

if ( num > list.length ) {
}

while ( len-- ) {
}
 ```
[强制] 单行声明的数组与对象，如果包含元素，[] 内紧贴括号部分不允许包含空格，{}内元素与括号间保留一个空格。

```js 
// good
var arr1 = [];
var arr2 = [1, 2, 3];
var obj1 = {};
var obj2 = { name: 'obj' };
var obj3 = {
    name: 'obj',
    age: 20,
    sex: 1
};

// bad
var arr1 = [ ];
var arr2 = [ 1, 2, 3 ];
var obj1 = { };
var obj2 = {name: 'obj'};
var obj3 = {name: 'obj', age: 20, sex: 1};
 ```
[强制] 行尾不得有多余的空格。

## 换行
[强制] 每个独立语句结束后必须换行。

[强制] 每行不得超过 120 个字符。

[强制] 运算符处换行时，运算符必须在新行的行首。


```js
// good
if (user.isAuthenticated()
    && user.isInRole('admin')
    && user.hasAuthority('add-admin')
    || user.hasAuthority('delete-admin')
) {
    // Code
}

var result = number1 + number2 + number3
    + number4 + number5;

// bad
if (user.isAuthenticated() &&
    user.isInRole('admin') &&
    user.hasAuthority('add-admin') ||
    user.hasAuthority('delete-admin')) {
    // Code
}

var result = number1 + number2 + number3 +
    number4 + number5;
 ```
[建议] 不同行为或逻辑的语句集，使用空行隔开，更易阅读。

```js
// 仅为按逻辑换行的示例，不代表setStyle的最优实现
function setStyle(element, property, value) {
    if (element == null) {
        return;
    }

    element.style[property] = value;
}
```
[建议] 对于 if...else...、try...catch...finally 等语句，推荐使用在 } 号后添加一个换行 的风格，使代码层次结构更清晰，阅读性更好。

```js
if (condition) {
    // some statements;
}
else {
    // some statements;
}

try {
    // some statements;
}
catch (ex) {
    // some statements;
}
```
[强制] 在 if / else / for / do / while 语句中，只有一行，省略块 {...}。

```js
// good
if (condition)
    callFunc();
if (condition) callFunc();

// bad
if (condition) {
    callFunc();
}
```
## 命名
[强制] 变量 使用 Camel命名法。
```js

var loadingModules = {};
```
[强制] 常量 使用 全部字母大写，单词间下划线分隔 的命名方式。
```js

var HTML_ENTITY = {};
```
[强制] 函数 使用 Camel命名法。
```js
function stringFormat(source) {
}
```
[强制] 函数的 参数 使用 Camel命名法。
```js 
function hear(theBells) {
}
```
[强制] 类 使用 Pascal命名法。
```js 
function TextNode(options) {
}
```
[强制] 类的 方法 / 属性 使用 Camel命名法。
```js 
function TextNode(value, engine) {
    this.value = value;
    this.engine = engine;
}

TextNode.prototype.clone = function ( ) {
    return this;
};
```
[强制] 枚举变量 使用 Pascal命名法，枚举的属性 使用 全部字母大写，单词间下划线分隔 的命名方式。
```js 
var TargetState = {
    READING: 1,
    READED: 2,
    APPLIED: 3,
    READY: 4
};
[强制] 类名 使用 名词。
```js 
function Engine(options) {
}
```
[建议] 函数名 使用 动宾短语。
```js 
function getStyle(element) {
}
```
[建议] boolean 类型的变量使用 is 或 has 开头。
```js 

var isReady = false;
var hasMoreCommands = false;
```
[建议] Promise对象 用 动宾短语的进行时 表达。

```js 
var loadingData = ajax.get('url');
loadingData.then(callback);
```
## 注释
单行注释
```js 
let a = 123; // 后跟一个空格
```
多行注释

* 函数/方法注释
  * [强制] 函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识。
  * [强制] 参数和返回值注释必须包含类型信息，且不允许省略参数的说明。
  * [强制] 对 Object 中各项的描述， 必须使用 @param 标识。
```js 
/** * 函数描述 * * 
 * @param {string} p1 参数1的说明 
 * @param {number} p2 参数2的说明，比较长那就换行了.
 * @param {Object} option 参数描述
 * @param {string} option.url option项描述 
 * @param {string=} option.method option项描述，可选参数
 * @return {Object} 返回值描述 
 * 
 * */
function foo(p1, p2, option = {}) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}
```
* 细节注释

对于内部实现、不容易理解的逻辑说明、摘要信息等，我们可能需要编写细节注释。

[建议] 细节注释遵循单行注释的格式。说明必须换行时，每行是一个单行注释的起始。
```js
function foo(p1, p2, opt_p3) {
    // 这里对具体内部逻辑进行说明
    // 说明太长需要换行
    for (...) {
        ....
    }
}
```
* 特殊标记

[强制] 特殊标记必须使用单行注释的形式。

下面列举了一些常用标记：
```js 
TODO: 有功能待实现。此时需要对将要实现的功能进行简单说明。
FIXME: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明。
HACK: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述。
XXX: 该处存在陷阱。此时需要对陷阱进行描述。
```
## 变量
[强制] 尽量少用 var 声明变量。
```js
// good
var hangModules = [],
    missModules = [],
    visited = {};

// bad
var hangModules = [];
var missModules = [];
var visited = {};
```
## 条件
[强制] 在 Equality Expression 中使用类型严格的 ===。仅当判断 null 或 undefined 时，允许使用 == null。

解释：使用 === 可以避免等于判断中隐式的类型转换。
```js
// good
if (age === 30) {
    // ......
}

// bad
if (age == 30) {
    // ......
}
```
[建议] 尽可能使用简洁的表达式。
```js
// 字符串为空

// good
if (!name) {
    // ......
}

// bad
if (name === '') {
    // ......
}
// 字符串非空

// good
if (name) {
    // ......
}

// bad
if (name !== '') {
    // ......
}
// 数组非空

// good
if (collection.length) {
    // ......
}

// bad
if (collection.length > 0) {
    // ......
}
// 布尔不成立

// good
if (!notTrue) {
    // ......
}

// bad
if (notTrue === false) {
    // ......
}
// null 或 undefined

// good
if (noValue == null) {
  // ......
}

// bad
if (noValue === null || typeof noValue === 'undefined') {
  // ......
}
```
[建议] 对于相同变量或表达式的多值条件，用 switch 代替 if。
```js
// good
switch (typeof variable) {
    case 'object':
        // ......
        break;
    case 'number':
    case 'boolean':
    case 'string':
        // ......
        break;
}

// bad
var type = typeof variable;
if (type === 'object') {
    // ......
}
else if (type === 'number' || type === 'boolean' || type === 'string') {
    // ......
}
```
[建议] 如果函数或全局中的 else 块后没有任何语句，可以删除 else。
```js
// good
function getName( ) {
    if (name) {
        return name;
    }

    return 'unnamed';
}

// bad
function getName( ) {
    if (name) {
        return name;
    }
    else {
        return 'unnamed';
    }
}
```
## 类型转换

[建议] 转换成 string 时，使用 + ''。
```js
// good
num + '';

// bad
new String(num);
num.toString();
String(num);
```
[建议] 转换成 number 时，通常使用 +。
```js
// good
+str;

// bad
Number(str);
```
[建议] string 转换成 number，要转换的字符串结尾包含非数字并期望忽略时，使用 parseInt。
```js
var width = '200px';
parseInt(width, 10);
```
[强制] 使用 parseInt 时，必须指定进制。
```js
// good
parseInt(str, 10);

// bad
parseInt(str);
```
[建议] 转换成 boolean 时，使用 !!。
```js
var num = 3.14;
!!num;
```
[建议] number 去除小数点，使用 Math.floor / Math.round / Math.ceil，不使用 parseInt。
```js
// good
var num = 3.14;
Math.ceil(num);

// bad
var num = 3.14;
parseInt(num, 10);
```