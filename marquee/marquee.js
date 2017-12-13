/**
 * @Date:   2017-08-17T09:43:52+08:00
 * @Filename: marquee.js
 * @Last modified time: 2017-09-02T23:25:36+08:00
 * @Version：v1.0
 */

!(function(root) {

    function vertical(params) {

        var box = params.box;
        var boxHegiht = 0;
        var scrollHeight = scrollHeight || 0;
        var time = params.time || 36;
        var delay = params.delay || 1000;
        var scrollTop;
        var itmes = box.children;
        var len = itmes.length;
        var multiLine = params.multiLine || 0;

        scrollHeight ? '' : scrollHeight = itmes[0].offsetHeight;

        if (multiLine) { //如果有多行的情况

            var itemNum = Math.ceil(box.offsetHeight / scrollHeight); //计算多行情况下，会直接暴露出来的item数量

            if (itmes.length * scrollHeight < box.offsetHeight) { //判断item数量是否被box全部显示完。
                return;
            }

            for (var i = 0; i < itemNum; i++) { //循环暴露出来的数量
                box.appendChild(itmes[i].cloneNode(true)); //复制直接暴露出来的item，防止滚动时断裂效果。
                len++;
            }

            boxHegiht = box.offsetHeight;

        } else {
            box.appendChild(itmes[0].cloneNode(true));
        }

        setTimeout(function() {

            scrollTop = box.scrollTop;

            if (scrollTop >= scrollHeight * len - boxHegiht) {
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
