// ==UserScript==
// @name         lessMess
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  some little shit I'm sick of doing manually
// @author       the universe
// @match        https://*/*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let w = window;

    // Скрытие водяного знака HolaVPN
    const hideHolaWatermark = () => {
        const watermark = document.getElementById("_hola_popup_iframe__");
        if (!watermark || watermark.style.zIndex === "-1") {
            return;
        }
        watermark.style.zIndex = -1;
        watermark.style.visibility = "hidden";

        console.log("lessMess Hola Watermark");
    }
    const holaInterval = setInterval(hideHolaWatermark, 1 * 1000);
    setTimeout(() => clearInterval(holaInterval), 20 * 1000);

    if (/https:\/\/www.rulit.me\/books/.test(w.location.href)) {
        let textBlock = document.getElementsByClassName('page_content')[0];
        adjustText(textBlock, 650, true, 16);

        console.log('lessMess rulit.me');
    }

    if (/http:\/\/spiritual.ru/.test(w.location.href)) {
        let textBlock = document.getElementsByTagName('body')[0];
        adjustText(textBlock, 650, true, 16, 'Arial');
        let fontBlock = document.getElementsByTagName('font')[5];
        if (fontBlock) fontBlock.color = '#000';

        console.log('lessMess spiritual.ru');
    }

    // рекламное объявление справа от плеера на ютубе
    if (/https:\/\/www.youtube.com/.test(w.location.href)) {
        let ad = document.getElementById('player-ads');
        if (ad) {
            ad.remove();
            console.log('lessMess youtube');
        }
    }
    
    // удаление блока предложения подписки и блока рекламы на Yandex.Music
    if (/https:\/\/music.yandex.ru/.test(w.location.href)) {
        let blocks = [document.getElementsByClassName('bar-below_plus')[0], document.getElementsByClassName('d-overhead')[0]];
        if (blocks) {
            blocks.forEach(block => {
                block.remove();
            });
            console.log('lessMess Yandex.Music');
        }
    }

    // удаление рекламы справа от результатов поиска yandex.ru
    if (/https:\/\/yandex.ru/.test(w.location.href)) {
        const ads = document.querySelectorAll(".AdvRsya-Slot");
        Array.from(ads).forEach(ad => {
            ad.remove();
        });
        console.log('lessMess yandex.ru');
    }

    function adjustText(block, width, doLineHeight, font_size, font_family) {
        if (!block) return;

        let style = '';
        if (width) style += `margin: 0 auto; width: ${width}px;`;
        if (doLineHeight) style += `line-height: 1.5;`;
        if (font_size) style += `font-size: ${font_size}px;`;
        if (font_family) style += `font-family: ${font_family};`;

        block.setAttribute('style', style);
    }
})();
