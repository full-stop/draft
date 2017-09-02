/**
 * @Date:   2017-08-17T09:43:52+08:00
 * @Filename: marquee.js
 * @Last modified time: 2017-09-02T23:25:36+08:00
 * @Version：v1.0
 */

!(function(root) {

    function vertical(params) {

        var box = params.box;
        var scrollHeight = scrollHeight || 0;
        var time = params.time || 36;
        var delay = params.delay || 1000;
        var scrollTop;
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

    function horizontal(params) {

        var scrollLeft;
        var scrollWidth = 0;
        var box = params.box;
        var time = params.time || 36;
        var itmes = box.children;

        for (var i = 0; i < itmes.length; i++) {
            scrollWidth += itmes[i].offsetWidth * 1;
        }

        box.appendChild(itmes[0].cloneNode(true));

        setTimeout(function() {

            scrollLeft = box.scrollLeft;

            if (scrollLeft >= scrollWidth) {
                box.scrollLeft = 0;
            } else {
                box.scrollLeft++;
            }

            setTimeout(arguments.callee, time);

        }, time);


    }


    function marquee(params) {

        var type = params.type || 'vertical';

        if (!params.box) throw new Error('_NOT_FIND_ELEMENT_');

        type === 'vertical' ? vertical(params) : horizontal(params);

    }


    if (typeof module != 'undefined' && typeof exports === 'object') {
        //CommonJS
        module.exports = marquee;
    } else if (typeof define != 'undefined' && define.amd) {

        //AMD
        define(function() {
            return marquee;
        });

    } else if (typeof $ === 'function') {
        //jQuery
        $.fn.marquee = marquee;

    } else {

        root.marquee = marquee;
    }

}(this));
