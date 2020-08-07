---
title: 检查工具
date: 2019-12-08
tags:
 - 代码规范
---

优秀的代码检查工具，让代码规范的推行更丝滑，你值得拥有。

## ESLint

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。官方网站：[eslint.org/](https://eslint.org/)   ，中文网站：[eslint.cn/](https://eslint.cn/)

<b>先决条件：Node.js (>=6.14), npm version 3+。</b>
```
npm install eslint --save-dev

eslint --init
```
#### 配置ESLint的两种主要的方法：

1、配置注释 - 使用JavaScript注释将配置信息直接嵌入到文件中。

2、配置文件 - 使用下面任一的文件来为全部的目录和它的子目录指定配置信息。

&emsp;&emsp;A、<b>javascript：使用.eslintrc.js文件并导出一个包含配置的对象。</b>  
&emsp;&emsp;B、YAML：.eslintrc.yaml或者.eslintrc.   
&emsp;&emsp;C、yml JSON：.eslintrc.json，并且此文件允许使用JS形式的注释   
&emsp;&emsp;D、废弃的用法：.eslintrc，此文件可以是JSON或者YAML   
&emsp;&emsp;E、package.json：在package.json文件中创建eslintConfig属性，所有的配置包含在此属性中。

Ps： 这些文件的优先级则是按照以上出现的顺序（.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json）。

使用官方推荐的 .eslintrc.js 格式就好。

#### 规则的错误等级有三种：

- "off" 或者 0：关闭规则。
- "warn" 或者 1：打开规则，并且作为一个警告（不影响exit code）。
- "error" 或者 2：打开规则，并且作为一个错误（exit code将会是1）。

#### 配置文件
- <b>插件</b>

在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。

支持 JSX 语法并不等同于支持 React，官方推荐使用 [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)。

- <b>语言选项</b>

支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型:  
&emsp;&emsp;对于 ES6 语法，使用 { "parserOptions": { "ecmaVersion": 6 } }；  
&emsp;&emsp;对于新的 ES6 全局变量，使用 { "env":{ "es6": true } }

- <b>解析器</b>

ESLint 默认使用Espree作为其解析器，与 ESLint 兼容的解析器有：  
    &emsp;&emsp; - [Esprima](https://www.npmjs.com/package/esprima)  
    &emsp;&emsp; - [Babel-ESLint](https://www.npmjs.com/package/babel-eslint) - 一个对Babel解析器的包装，使其能够与 ESLint 兼容。  
    &emsp;&emsp; - [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。  



.eslintrc.js 文件示例：
```js
{
    parser: "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```

```json
//  package.json
{
    "scripts":{
        "eslint": "eslint --fix --ext .js,.jsx src"
    }
}
```
#### 项目应用

Eslint 提供了 ECMAScript/JavaScript 规范的代码校验，我们可以根据团队的代码风格进行配置，也可以使用开源的配置方案，例如 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) 来配置。

eslint-config-airbnb 默认包含eslint，eslint-plugin-react，eslint-plugin-import，eslint-plugin-jsx-a11y，和eslint-plugin-react-hooks。

推荐以下插件：  
[eslint-plugin-html](https://www.npmjs.com/package/eslint-plugin-html)：校验 html  
[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) ：校验 React   
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)：校验 import/export 语法，防止文件路径错误及导出名称的问题  
[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)：提供 jsx 元素可访问性校验  
[eslint-plugin-flowtype](https://www.npmjs.com/package/eslint-plugin-flowtype)：js 静态类型检查工具。  
[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)：根据 Hooks API 校验 Hooks 的使用  

解析器选择 [Babel-ESLint](https://www.npmjs.com/package/babel-eslint)。   


文件示例：
```js
// .eslintrc.js 
{
    extends: ["airbnb", "eslint:recommended"], // 使用开源的配置方案 airbnb
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            "jsx": true
        }
    },
    plugins: ['react-hooks'],
    rules: {
        "semi": "error"
    }
}
```

```json
//  package.json
{
    "scripts":{
        "eslint": "eslint --fix --ext .js,.jsx src"
    }
}
```
## Stylelint

比较流行且开源的CSS lint方案：csslint、SCSS-Lint、Stylelint。

Stylelint优势：
- 其支持 Less、Sass 这类预处理器。
- 团队使用less在社区活跃度上，有非常多的第三方插件。
- 在Facebook，Github，WordPress 等公司得到实践，能够覆盖很多场景。

```json
//  package.json
{
    "scripts":{
        "stylelint": "stylelint \"./src/**/*.{css,less}\" --fix"
    }
}
```

## Prettier

Prettier是一个代码风格统一工具，支持js,jsx,css风格统一。

安装：
```
npm i -D prettier
```
配合ESLint检测代码风格，安装插件：

```
npm i -D eslint-plugin-prettier
```
eslint-plugin-prettier 插件会调用prettier对代码进行风格检查，原理是先使用prettier对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被prettier进行标记。
接下来，我们需要在rules中添加，"prettier/prettier": "error"，表示被prettier标记的地方抛出错误信息。

```js
//.eslintrc.js
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

```json
// package.json
{
    "scripts":{
        "format": "prettier --write \"./src/**/*.{js,jsx,json}\""
    }
}
```



## husky

husky是一个代码提交前的检测工具，能够防止不规范代码被commit、push、merge等等。


良好的代码规范有助于项目的维护，为了防止一些不规范的代码 commit并push到远端,我们可以在git命令执行前用一些钩子来检测并阻止。现在主要有两种git钩子插件：husky（jquery与next.js都在用），pre-commit(antd在用)。

下载：
```
npm install husky --save-dev
```
或
```
yarn add husky --dev
```

```json
// package.json
    {
        "husky": {
            "hooks": {
                "pre-commit": "npm test",
                "pre-push": "npm test",
                "...": "..."
            }
        }
    }
```

