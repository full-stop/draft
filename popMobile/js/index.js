/**
 * @Date:   2017-09-19T09:49:24+08:00
 * @Filename: index.js
 * @Last modified time: 2017-09-29T16:11:53+08:00
 */

(function(slef, $) {

    function onAnimationEnd(element, callback) {

        var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
        var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
        var styles = document.createElement('div').style;
        var event;

        function handle(e) {
            if (e.target === this) {
                callback && callback();
            }
            element.removeEventListener(event, handle, false);
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

    function popClose(params, $mask) {

        var $dom = params.dom;

        if (params.hideClass) {

            $dom.removeClass(params.showClass).addClass(params.hideClass);
            onAnimationEnd($dom[0], function() {

                $dom.removeAttr('style').removeClass('pop-mobile-container').removeClass(params.hideClass);
                $mask.remove();
                params.after && params.after();

                $dom = $mask = null;
            });
        } else {
            $dom.removeAttr('style').removeClass('pop-mobile-container');
            $mask.remove();
            $dom = $mask = null;
        }

    }

    function popOpen(params) {

        var $dom = params.dom;
        var $mask = $('<div class="mask"></div>');
        var $close = params.close ? $(params.close) : $dom.find('.pop-close');
        var zindex = params.zindex || 0;
        var popNum = $('.pop-mobile-container').length;
        var indep = params.indep || 0;

        if (indep) {
            popMobileCloseAll(params);
        }

        if (!$dom.is('.pop-mobile-container')) {

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

            if (params.showClass) {
                onAnimationEnd($dom[0], function() {
                    params.before && params.before();
                });
                $dom.show().addClass(params.showClass);
            } else {
                $dom.show();
            }

            $dom.before($mask);

            $dom.addClass('pop-mobile-container');

            $close.off('tap');
            $close.on('tap', function() {
                popClose(params, $mask);
            });

            $dom.off('touchmove');
            $dom.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }

    function popMobile(params) {
        new popOpen(params);
    }

    if (typeof module != 'undefined' && typeof exports === 'object') {
        exports.popMobile = popMobile;
        exports.popMobileCloseAll = popMobileCloseAll;
        return;
    }

    if (typeof define != 'undefined' && define.amd) {
        define(['jquery'], function(require, exports, module) {
            exports.popMobile = popMobile;
            exports.popMobileCloseAll = popMobileCloseAll;
        });
        return;
    }

    if (typeof $ === 'function') {
        $.popMobile = popMobile;
        $.popMobileCloseAll = popMobileCloseAll;
        return;
    }

}(this, jQuery));


$('.revice-btn').tap(function() {
    $.popMobile({
        'dom': $('.pop-mobile'),
        'showClass': 'bounceIn animated',
        'hideClass': 'bounceOut animated'
    });
})

$('.mobile-btn').tap(function() {
    $.popMobile({
        'dom': $('.pop-alert')
    });
})
