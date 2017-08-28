/**
 * @Date:   2017-08-17T09:43:52+08:00
 * @Email:  sgt_ah@163.com
 * @Filename: marquee.js
 * @Last modified time: 2017-08-28T14:33:14+08:00
 * @License: MIT license
 * @Version: 0.1
 */

!(function(win, doc) {

    function vertical(box, scrollHeight, time, delay) {

        var scrollTop;
        var scrollHeight = scrollHeight || 0;
        var itmes = box.children;
        var len = itmes.length;

        box.appendChild(itmes[0].cloneNode(true));

        if (!scrollHeight) {
            scrollHeight = itmes[0].offsetHeight;
        }

        setTimeout(function() {

            scrollTop = box.scrollTop;

            if (scrollTop >= scrollHeight * len) {
                box.scrollTop = 0;
            } else {
                box.scrollTop++;
                if (box.scrollTop % scrollHeight == 0) {
                    setTimeout(arguments.callee, delay);
                    return;
                }
            }

            setTimeout(arguments.callee, time);

        }, time);

    }

    function marquee(params) {

        var box = params.box || '';
        var type = params.type || 'vertical';
        var time = params.time || 36;
        var delay = params.delay || 1000;
        var scrollHeight = params.scrollHeight || 0;

        if (box && type === 'vertical') {
            vertical(box, scrollHeight, time, delay);
        }

    }

    window.marquee = marquee;
}(window, document));
