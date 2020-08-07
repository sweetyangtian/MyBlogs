---
title: 工具类
date: 2019-12-08
tags:
 - 工具类
---

## 文件下载

```js
/**
 * （工具类）文件下载
 *
 * @param {Object} config Ajax配置
 *     @param {String} url 必填，请求地址
 *     @param {String} method 可选，请求方式（默认为GET）
 *     @param {Object} params 可选，请求参数
 *     @param {String} filename 可选，指定文件名
 *
 */

const exportAjax = ({ url, method = 'GET', params, filename }) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.responseType = 'blob'; // 返回类型blob
        xhr.timeout = 200000;
        xhr.onload = res => {
            if (res.target.status === 200) {
                // 根据response的type判断
                let data = res.target.response;
                if (isJsonData(data)) return reject('导出失败!（可能导出的数据为空，可重新选择筛选条件后再试）');

                let reader = new FileReader();
                reader.readAsDataURL(data); // 转换为base64，可以直接放入a-href
                reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                    let a = document.createElement('a');
                    a.download = (filename || '导出数据') + '.xlsx'; // 必须指定文件名
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    return resolve('导出成功!')
                };
            } else {
                return reject('请求出错!')
            }
        };
        xhr.ontimeout = e => reject('请求超时!');
        xhr.onerror = e => reject('请求出错!');

        if (method === 'GET') {
            let _params = getParams(params);
            let urlParam = new URLSearchParams(_params).toString();
            urlParam && (url = `${url}?${urlParam}`);
            xhr.send();
        } else {
            xhr.setRequestHeader('Content-type','application/json; charset=UTF-8');
            xhr.send(JSON.stringify(params));
        }
    })
};

// 处理下载参数
const getParams = params => {
    let _params = params;
    Object.keys(_params).forEach(key => !_params[key] && delete _params[key])

    return _params;
}

// 判断返回值为blob还是json
const isJsonData = res => res.type.includes('json')

export default exportAjax;
```

## 获取url中的参数
```js

export const getParams = (url = location.href) => {
    let reg = /(\w+)=([^&]+)/g,
        params = {},
        result = [],
        index = url.indexOf('?');

    url = decodeURIComponent(url.slice(index + 1, url.length) || '');
    while ((result = reg.exec(url))) {
        params[result[1]] = result[2];
    }
    return params;
};

```

## 复制文字
```js
//复制文字(当前地址链接)
export const copyTextOrUrl = (data, timer = 500) => {
    const copyFun = ({ text, tips }) => {
        const _text = text || window.location.href;
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', _text);
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            message.success(tips || 'Copy success!');
        }
        document.body.removeChild(input);
    };
    setTimeout(() => {
        copyFun(data);
    }, timer);
};

```