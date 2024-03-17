// ==UserScript==
// @name         lessMess
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  some little shit I'm sick of doing manually
// @author       the universe
// @match        https://*/*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let w = window;

    // автоскрытие шапки на mangalib.me. переключение шапки на кнопку "="
    if (/https:\/\/mangalib.me/.test(w.location.href)) {
        let header = document.getElementsByClassName('header_reader')[0];
        let likePanel = document.getElementsByClassName('reader-review')[0];
        let isHidden = false;

        if (header) {
            toggleHeader();

            document.onkeyup = key => {
                if (key.code === 'Equal' && header) {
                    toggleHeader();
                }
            };
        }

        function toggleHeader() {
            if (!isHidden) {
                header.style.visibility = 'hidden';
                likePanel.style.display = 'none';
                isHidden = true;
            } else {
                header.style.visibility = 'visible';
                likePanel.style.display = 'flex';
                isHidden = false;
            }
            console.log('header toggled.');
        }

        // удаление анимированного шарика у кнопки "правила"
        /*let redBalloonDeletion = setInterval(() => {
            let isShown = !document.getElementById('comments');
            if (isShown) {
                let redBalloon = document.getElementsByClassName('rules-btn__dot')[0];
                if (redBalloon) {
                    redBalloon.remove();
                }

                clearInterval(redBalloonDeletion);
            }
        }, 500);*/

        console.log('lessMess mangalib.me');
    }

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

    // какая-то хрень справа внизу от результатов поиска duckduckgo
    if (/https:\/\/duckduckgo.com/.test(w.location.href)) {
        let noisyBlock = document.getElementsByClassName('js-serp-bottom-right')[0];
        if (noisyBlock) {
            noisyBlock.remove();
            console.log('lessMess duckduckgo.com');
        }
    }

    // рекламное объявление справа от плеера на ютубе
    if (/https:\/\/www.youtube.com/.test(w.location.href)) {
        let ad = document.getElementById('player-ads');
        if (ad) {
            ad.remove();
            console.log('lessMess youtube');
        }
    }

    // назойливая кнопка пожертвования на сайте Perspektivy.ru
    if (/https:\/\/perspektivy.ru/.test(w.location.href)) {
        let btn = document.getElementById('goody_widget_container');
        if (btn) {
            btn.remove();
            console.log('lessMess Perspektivy.ru');
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
        const ads = document.querySelectorAll("AdvRsya-Slot");
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
