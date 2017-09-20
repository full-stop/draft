/**
 * @Date:   2017-09-19T09:49:24+08:00
 * @Filename: index.js
 * @Last modified time: 2017-09-20T09:54:23+08:00
 */

(function(slef, $) {

    function onAnimationEnd(element, callback) {

        var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
        var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
        var styles = document.createElement('div').style;
        var event, f;
        var n = true;

        function handle(e) {
            if (n && e.target === this) {
                callback && callback();
                n = false;
            }
        }

        if ('onanimationend' in window) {
            event = 'animationend';
        } else if ('onwebkitanimationend' in window) {
            event = 'webkitAnimationEnd';
        } else {
            for (var i = 0, len = verdors.length; i < len; i++) {
                f = verdors[i] + 'nimation';
                if (f in styles) {
                    event = endEvents[i];
                    break;
                }
            }
        }

        if (event && element) {
            element.removeEventListener(event, handle, false);
            element.addEventListener(event, handle, false);
        } else {
            callback && callback();
        }

    }

    function popMobileCloseAll(params) {

        var $pop = $('.pop-mobile-container');
        var $mask = $('.mask');

        if (params.hideClass) {
            $pop.removeAttr('style').removeClass(params.hideClass).removeClass('pop-mobile-container');
        } else {
            $pop.removeAttr('style').removeClass('pop-mobile-container');
        }

        $mask.remove();
        $pop = $mask = null;

    }

    function popClose(d, m, params) {

        if (params.hideClass) {

            d.removeClass(params.showClass).addClass(params.hideClass);
            onAnimationEnd(d[0], function() {
                d.removeAttr('style').removeClass('pop-mobile-container').removeClass(params.hideClass);
                m.remove();
                params.after && params.after();
                d = m = null;
            });
        } else {
            d.removeAttr('style').removeClass('pop-mobile-container');
            m.remove();
            d = m = null;
        }

    }

    function popOpen(params) {

        var $dom = params.dom;
        var $mask = $('<div class="mask"></div>');
        var $close = params.close ? $(params.close) : $dom.find('.pop-close');
        var zindex = params.zindex || 0;
        var popNum = $('.pop-mobile-container').length;
        var indep = params.indep || 0;

        $dom.css({
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'right': 0,
            'bottom': 0,
            'margin': 'auto',
            'zIndex': zindex + popNum
        });

        $mask.css({
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'right': 0,
            'bottom': 0,
            'width': '100%',
            'height': '100%',
            'background': 'rgba(0,0,0,.5)',
            'zIndex': zindex + popNum
        });

        if (indep) {
            popMobileCloseAll(params);
        }

        if (!$dom.is('.pop-mobile-container')) {
            if (params.showClass) {
                $dom.show().addClass(params.showClass);
                onAnimationEnd($dom[0], function() {
                    params.before && params.before();
                });
            } else {
                $dom.show();
            }
            $dom.before($mask);
        }

        $dom.addClass('pop-mobile-container');

        $close.off('click');
        $close.on('click', function() {
            popClose($dom, $mask, params);
        });

        $dom.off('touchmove');
        $dom.on('touchmove', function(e) {
            e.preventDefault();
        });

    }

    function popMobile(params) {
        new popOpen(params);
    }

    if (typeof module != 'undefined' && typeof exports === 'object') {
        module.exports = popMobile;
        return;
    }

    if (typeof define != 'undefined' && define.amd) {
        define(['jquery'], function() {
            return popMobile;
        });
        return;
    }

    if (typeof $ === 'function') {
        $.fn.popMobile = popMobile;
        $.fn.popMobileCloseAll = popMobileCloseAll;
    }

}(this, jQuery))
