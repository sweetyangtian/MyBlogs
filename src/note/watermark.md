---
title: 前端生成水印
date: 2019-12-08
categories:
    - 学习笔记
tags:
 - 前端水印
 - pdf水印
---

为了防止信息泄露、保护知识产权，我们经常会在系统中添加水印。水印可以由前端添加，也可以由后端添加。可以添加显性水印，也可以添加隐性水印。

<b>前端方案：</b>

-   优点：简单方便
-   缺点：安全性低，懂技术的人很容易消除水印或者直接获取到源文件
-   适用场景：内部使用的系统、面向业务人员的系统，全系统加水印，进行公司或员工标识

<b>后端方案：</b>

-   优点：安全性高，无法获取源文件
-   缺点：对于大批量的加水印需求或是复杂水印，占用服务器内存、运算量
-   适用场景：重要的、系统中有下载需求的文件、图片；机密文件、内部文件

## 网页水印

在很多内部使用的系统中，为了防止信息泄露，经常会需要添加公司或员工标识，那就需要添加全系统的页面水印。

### 通过 canvas 生成水印

使用 canvas 来生成 base64 图片，toDataURL 方法返回一个包含图片展示的 data URI，直接赋值给一个全屏的 div 容器做背景图即可。代码如下：

```js
function watermark({
    container = document.body,
    content,
    zIndex = 1000,
    width = "200px",
    height = "150px",
    textAlign = "center",
    fontSize = "14px",
    fillStyle = "rgba(184, 184, 184, 0.7)",
    content = "xiaotiantian",
    rotate = "45",
}) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    var ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.fontSize = fontSize;
    ctx.fillStyle = fillStyle;
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
    var base64Url = canvas.toDataURL();
    const watermarkDiv = document.createElement("div");
    watermarkDiv.setAttribute(
        "style",
        `
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${url}')`
    );

    container.style.position = "relative";
    container.insertBefore(watermarkDiv, container.firstChild);
}
```

这样貌似达到了我们想要的效果，如果系统是公司内部业务人员使用也足够了，可以起到“心理震慑”效果。但是对于懂技术的人员来说，用浏览器的开发者工具更改 dom
的属性或删除 dom 结构就可以去掉了。这里有两种解决方式:

-   1. 监测水印 div 的变化，每隔几秒重新生成水印，但这种方式会影响性能；
-   2. 使用 MutationObserver，来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动都可以监测到，但是如果本身被删除，是没有办法
       的，只能监测父节点变化。

优化代码如下：

```js
function watermark(options = {}) {
    const {
        container = document.body,
        content,
        zIndex = 1000,
        width = "200px",
        height = "150px",
        textAlign = "center",
        fontSize = "14px",
        fillStyle = "rgba(184, 184, 184, 0.7)",
        content = "xiaotiantian",
        rotate = "45",
    } = options;

    container.style.position = "relative";

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    var ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.fontSize = fontSize;
    ctx.fillStyle = fillStyle;
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
    var base64Url = canvas.toDataURL();
    const _watermark = document.querySelector("._watermark"); //选择器
    const watermarkDiv = _watermark || document.createElement("div");
    const styleStr = `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${url}')`;

    watermarkDiv.setAttribute("style", styleStr);
    watermarkDiv.classList.add("_watermark");

    if (!_watermark) {
        container.insertBefore(watermarkDiv, container.firstChild);
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    // 检查浏览器是否支持这个API
    if (MutationObserver) {
        let mo = new MutationObserver(function() {
            const _watermark = document.querySelector("._watermark");
            // 监测_watermark元素变动
            if ((_watermark && _watermark.getAttribute("style") !== styleStr) || !_watermark || container.style.position !== "relative") {
                // 避免一直触发
                mo.disconnect();
                mo = null;
                watermark(options);
            }
        });
        mo.observe(container, {
            attributes: true, // 观察目标节点的属性节点
            subtree: true, // 观察目标节点的所有后代节点
            childList: true, // 观察目标节点的子节点
        });
    }
}
```

### 通过 SVG 生成水印

相比 Canvas，SVG 有更好的浏览器兼容性，使用 SVG 生成水印与 Canvas 的方式类似，只是 base64Url 的生成方式换成了 SVG。代码如下：

```js
function watermark({
    container = document.body,
    content = "xiaotiantian",
    width = "300px",
    height = "200px",
    opacity = "0.6",
    fontSize = "14px",
    zIndex = 1000,
} = {}) {
    const args = arguments[0];
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                    <text x="50%" y="50%" dy="12px"
                        text-anchor="middle"
                        stroke="#000000"
                        stroke-width="1"
                        stroke-opacity="${opacity}"
                        fill="none"
                        transform="rotate(-45, 120 120)"
                        style="font-size: ${fontSize};">
                        ${content}
                    </text>
                    </svg>`;
    const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
    const watermark = document.querySelector(".watermark");

    const watermarkDiv = watermark || document.createElement("div");
    // ...
    // 与 canvas 的一致
    // ...
}
```
### 插件推荐

[watermark-dom](https://github.com/saucxs/watermark-dom)：基于DOM对象实现的BS系统的水印，确保系统保密性，安全性，降低数据泄密风险，简单轻量，支持多属性配置，动态计算水印，水印防被删（监听水印组件元素删除并重新添加，监听改变水印的属性并重新添加）。

## 图片水印

除了给网页加水印之外，有时我们也需要给图片加水印，这样用户保存的是带水印的图片，既可以保护版权，也可以防止泄密。

### 通过 canvas 生成水印

代码如下：

```js
function watermarkImg({
    url = "",
    textAlign = "center",
    font = "14px Microsoft Yahei",
    fillStyle = "rgba(184, 184, 184, 0.7)",
    content = "xiaotiantian",
    textX = 100,
    textY = 30,
} = {}) {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.fillText(content, img.width - textX, img.height - textY);

        const base64Url = canvas.toDataURL();
        return base64Url;
    };
}

// 将base64Url赋值给img标签的src属性即可
```

<!-- ## 隐水印

通过Canvas给图片加上“隐水印”，这样一来用户偷偷保存的图片，技术人员可以轻松还原里面隐含的内容，但不适用于截图或者处理过的图片。

### 加密

1. 用 canvas 在画布上打印文字，获取像素信息。

```js

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

ctx.font = '30px Microsoft Yahei';
ctx.fillText('广告位招租u', 60, 130);
let textData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;

```

2. 

### 解密 -->




## pdf加水印

最优方案：交给后端！！！

前端提交文件、水印文案给后端，然后由后端返回制作好的带水印的 pdf 链接，url直接赋值给a标签供下载，或者iframe、embed供预览。


### pdf-lib库

如果实在没办法，一定要前端生成，推荐使用pdf-lib库，由Mozilla团队维护，API丰富、功能强大。

美滋滋官网demo走一波：

```js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

async function createPdf() {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()
}

```

嗯~ 完美！

换成我想要生成的水印，中文姓名+工号：

```js
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function modifyPdf({ waterText = '小甜甜-1234', url = '', fileName = '' }) {
    // 处理源文件
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica); // 字体

    const textSize = 160; // 一个水印占据空间
    const pages = pdfDoc.getPages();

    for (let index = 0; index < pages.length; index++) {
        const currentPage = pages[index];
        const { width, height } = currentPage.getSize();
        // 循环加水印
        for (let h = 0; h < height; h += textSize) {
            for (let w = 0; w < width; w += textSize) {
              
                currentPage.drawText(waterText, {
                    x: w + 100,
                    y: h + 100,
                    size: 14,
                    font: helveticaFont,
                    color: rgb(0.2, 0.2, 0.2),
                    rotate: degrees(-45),
                    opacity: 0.3
                });
            }
        }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const newUrl = URL.createObjectURL(blob);

    return { newUrl, nameBytes };
}

```

叮~~ ，报错！

经过我一通扒文档之后发现pdf-lib支持将图片和pdf合成，so，我采用了“曲线救国”方案：先用canvas化一个中文水印图，然后将图片跟pdf合成得到新的pdf。

代码如下：

```js
import { degrees, PDFDocument } from 'pdf-lib';

// 生成水印图
export function getNameImg(waterText) {
    let canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 100;
    context.font = '16px';
    context.textAlign = 'center';

    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillText(waterText, 60, 60);

    return canvas.toDataURL('image/png');
}

export async function modifyPdf({ waterText = '', url = '', fileName = '' }) {
    // 处理源文件
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const textSize = 160; // 一个水印占据空间
    const pages = pdfDoc.getPages();
    const nameBytes = getNameImg(waterText); // 生成水印图
    const nameImage = await pdfDoc.embedPng(nameBytes);

    for (let index = 0; index < pages.length; index++) {
        const currentPage = pages[index];
        const { width, height } = currentPage.getSize();
        // 循环加水印
        for (let h = 0; h < height; h += textSize) {
            for (let w = 0; w < width; w += textSize) {
                currentPage.drawImage(nameImage, {
                    x: w,
                    y: h,
                    width: 100,
                    height: 100,
                    rotate: degrees(-45)
                });
            }
        }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const newUrl = URL.createObjectURL(blob);

    //下载
    // const a = document.createElement('a');
    // a.href = URL.createObjectURL(blob);
    // a.download = fileName; // 这里填保存成的文件名
    // a.click();
    // URL.revokeObjectURL(a.href);
    // a.remove();

    return { newUrl, nameBytes };
}


```




## 参考文章

- [QQ 音乐团队-前端水印生成方案](https://juejin.im/entry/6844903645155164174)
- [前端pdf加水印解决方案](https://juejin.im/post/6844904183858987021)
- [Web前端水印方案](https://zhuanlan.zhihu.com/p/111331319)
- [AlloyTeam-前端也能玩的图片隐写术](http://www.alloyteam.com/2016/03/image-steganography/)
- [数字水印技术在前端落地的思考](https://zhuanlan.zhihu.com/p/68623135)