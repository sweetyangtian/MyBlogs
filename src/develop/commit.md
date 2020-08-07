---
title: 代码提交检查
date: 2019-12-08
tags:
 - 代码规范
---

## .eslintrc.js

```js
module.exports = {
    extends: ['react-app', 'eslint:recommended'],
    parser: "babel-eslint", // 解析器,默认使用Espree解析器
    parserOptions: {
        ecmaVersion: 6, //ES的版本，默认为5
        sourceType: 'module', //指定源代码存在的位置，script | module，默认为script。
        ecmaFeatures: {  //指定要使用其他那些语言对象
            'jsx': true 
        } 
    },

    plugins: ['prettier', 'react-hooks'],

    rules: {
        'prettier/prettier': 'warn', // 对于prettier报错进行warn提醒
        'arrow-parens': ['error', 'as-needed'], // 箭头函数参数只有一个时，可以省略参数的括号，否则error提示
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境中不允许使用
        'no-console': 'off', // 允许使用console
        'react/jsx-no-target-blank': 'off', // a链接允许直接使用_blank
        'jsx-a11y/anchor-has-content': 'off',
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        'jsx-a11y/anchor-is-valid': 'off'
    }
}

```

## .stylelintrc

```js
{
    "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
    "ignoreFiles": ["src/**/*.jsx"],
    "rules": {
        "indentation": 4,

        "number-leading-zero": "never",

        "string-quotes": "double",

        "declaration-block-trailing-semicolon": "always",

        "length-zero-no-unit": true,

        "declaration-empty-line-before": [
            "never",
            { ignore: [ "after-declaration" ] }
        ],
        "rule-empty-line-before": [
            "always",
            { except: [ "after-single-line-comment", "first-nested" ] }
        ],
        "block-closing-brace-empty-line-before": [ "never" ],
        "at-rule-empty-line-before": [
            "always",
            { ignore: [ "inside-block", "blockless-after-same-name-blockless" ] }
        ],
        "max-empty-lines": 1,
        "no-eol-whitespace": true,
        "no-missing-end-of-source-newline": true,

        "unit-case": "lower",
        "color-hex-case": "upper",
        "value-keyword-case": "lower",
        "function-name-case": "lower",
        "property-case": "lower",
        "at-rule-name-case": "lower",
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-element-case": "lower",
        "selector-type-case": "lower",
        "media-feature-name-case": "lower",

        "block-opening-brace-space-before": "always",
        "comment-whitespace-inside": "always",
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "declaration-block-semicolon-space-before": "never",
        "function-comma-space-after": "always",
        "selector-combinator-space-before": "always",
        "selector-combinator-space-after": "always",
        "selector-list-comma-space-before": "never",
        "selector-descendant-combinator-no-non-space": true,
        "value-list-comma-space-after": "always",
        "value-list-comma-space-before": "never",
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "no-descending-specificity": null
    }
}

```

## .prettierrc.js

```js
module.exports = {
    printWidth: 150, // 设置prettier单行输出（不折行）（最大）长度

    tabWidth: 4, // 设置工具每一个水平缩进的空格数

    useTabs: false, // 使用tab（制表位）缩进而非空格

    semi: true, // 在语句末尾添加分号

    singleQuote: true, // 使用单引号而非双引号

    trailingComma: 'none', // 在任何可能的多行中输入尾逗号

    bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格

    arrowParens: 'avoid', // 为单行箭头函数的参数添加圆括号，参数个数为1时可以省略圆括号

    jsxBracketSameLine: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）

    rangeStart: 0, // 只格式化某个文件的一部分

    rangeEnd: Infinity, // 只格式化某个文件的一部分

    filepath: 'none', // 指定文件的输入路径，这将被用于解析器参照

    requirePragma: false, // (v1.7.0+) Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码，这些注释称为“require pragma”(必须杂注)

    insertPragma: false, //  (v1.8.0+) Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。

    proseWrap: 'preserve', // (v1.8.2+)

    jsxBracketSameLine: false, // jsx闭合标签在同一行
}

```

## package.json

```json
{
    "scripts": {
        "format": "prettier --write \"./src/**/*.{js,jsx,json}\"",
        "lint": "run-p eslint stylelint", // 需要下载 npm-run-all 插件
        "eslint": "eslint --fix --ext .js,.jsx src",
        "stylelint": "stylelint \"./src/**/*.{css,less}\" --fix"
    },
    "husky": {
        "hooks": {
            "pre-commit": "npm run format && npm run lint && git add ."
        }
    },
    "devDependencies": {
        "babel-eslint": "^10.0.3",
        "eslint": "^6.8.0",
        "eslint-config-react-app": "^5.1.0",
        "eslint-plugin-flowtype": "^4.6.0",
        "eslint-plugin-html": "^6.0.0",
        "eslint-plugin-import": "^2.20.0",
        "eslint-plugin-jsx-a11y": "^6.2.3",
        "eslint-plugin-prettier": "^3.1.2",
        "eslint-plugin-react": "^7.18.0",
        "eslint-plugin-react-hooks": "^2.3.0",
        "eslint-friendly-formatter": "^4.0.1",
        
        "prettier": "^1.19.1",
        "stylelint": "^13.0.0",
        "stylelint-config-recess-order": "^2.0.3",
        "stylelint-config-standard": "^19.0.0",
        ...
    }
    
}
```

