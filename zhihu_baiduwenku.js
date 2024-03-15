// ==UserScript==
// @name         zhihu-baiduwenku
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  使用智狐解析百度文库并下载，优化智狐tool界面，并增加PDF格式转化工具。
// @author       Djx_Ybelove
// @match        https://wenku.zhihupe.com/tool/*
// @match        https://wenku.baidu.com/view/*
// @icon         https://wenku.zhihupe.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let host = window.location.href.split('/')[2];
    switch (host) {
        case 'wenku.zhihupe.com':
            (function () {
                let ad = document.querySelectorAll('.card')[1];
                ad.style.display = 'none';
                let body = document.querySelector('body');
                let div_b = '<div id="zhihu">口令:852963147</div>';
                body.insertAdjacentHTML('beforeend', div_b);
                let b = document.querySelector('#zhihu');
                b.style.backgroundColor = 'skyblue';
                b.style.borderRadius = '12px';
                b.style.color = 'white';
                b.style.padding = '15px 32px';
                b.style.position = 'fixed';
                b.style.margin = '4px 2px';
                b.style.fontSize = '16px';
                b.style.zIndex = '99999997';
                b.style.bottom = '100px';
                b.style.right = '50px';
                let div_t = '<div id="tool">PDF转换工具</div>'
                b.insertAdjacentHTML('beforebegin', div_t);
                let t = document.querySelector('#tool');
                t.style.backgroundColor = 'skyblue';
                t.style.borderRadius = '12px';
                t.style.color = 'white';
                t.style.padding = '15px 32px';
                t.style.position = 'fixed';
                t.style.margin = '4px 2px';
                t.style.fontSize = '16px';
                t.style.zIndex = '99999997';
                t.style.bottom = '160px';
                t.style.right = '50px';
                t.onclick = function(){
                    window.open('https://tools.pdf24.org/zh/all-tools');
                }
            })()
            break;
        case 'wenku.baidu.com':
            (function () {
                'use strict';
                let body = document.querySelector('body');
                let bnt = '<button>下载文档</button>';
                body.insertAdjacentHTML('afterbegin', bnt);
                let b = document.querySelector('body button');
                b.setAttribute('id', 'download');
                b.style.backgroundColor = 'skyblue';
                b.style.borderRadius = '12px';
                b.style.color = 'white';
                b.style.padding = '15px 32px';
                b.style.position = 'fixed';
                b.style.margin = '4px 2px';
                b.style.fontSize = '20px';
                b.style.zIndex = '99999997';
                b.style.bottom = '100px';
                b.style.right = '50px';
                b.style.fontWeight = 'bold';
                let url = location.href
                let key_1 = url.split('.')[2].split('/')[2];
                let key_2 = url.split('=')[2];
                b.onclick = function () {
                    window.open(`https://wenku.zhihupe.com/tool/index?url=https%3A%2F%2Fwenku.baidu.com%2Fview%2F${key_1}.html%3Ffr%3Dhp_doclist%26_wkts_%3D${key_2}`);
                }
                // Your code here...
            })();
            break;
    }
    // Your code here...
})();