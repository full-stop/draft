(function(slef, $) {

    /*
     *@ version :  0.9.3
     *@ datetime:  2017/12/09
     *@ author  :  gtshen
     */

    var $body = $('body');
    var popMobileDefaultOpt = {
        'dom': '',
        'close': '.pop-close',
        'zIndex': 100,
        'mutex': 0,
        'showClass': '',
        'before': null,
        'after': null,
        'callback': null
    };


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

    function popClose(params, $mask) {

        var $dom = params.dom;
        var isLayout = $dom.is('.pop-mobile-layout');

        if (params.hideClass) {
            $dom.removeClass(params.showClass).addClass(params.hideClass);
            onAnimationEnd($dom[0], function() {
                $dom.removeAttr('style').removeClass('pop-mobile-container').removeClass(params.hideClass);
                $mask.remove();
                params.callback && params.callback(params);
                isLayout ? $dom.remove() : '';
                params = $dom = $mask = null;
            });
        } else {
            $dom.removeAttr('style').removeClass('pop-mobile-container');
            $mask.remove();
            params.callback && params.callback(params);
            isLayout ? $dom.remove() : '';
            params = $dom = $mask = isLayout = null;
        }
    }

    function popMobileCloseAll() {

        var $pop = $('.pop-mobile-container');
        var $popLayout = $('.pop-mobile-layout');
        var $mask = $('.mask');

        $pop.removeAttr('style').removeClass(popMobileDefaultOpt.showClass).removeClass('pop-mobile-container');
        $mask.remove();
        $popLayout.remove();
        $pop = $mask = $popLayout = null;

    }

    function popOpen(params) {

        var $mask = $('<div class="mask"></div>');
        var popNum = $('.pop-mobile-container').length;
        var $dom = params.dom || popMobileDefaultOpt.dom;
        var close = params.close ? params.close : popMobileDefaultOpt.close;
        var zIndex = params.zIndex || popMobileDefaultOpt.zIndex;
        var mutex = params.mutex || popMobileDefaultOpt.mutex;
        var before = params.before || popMobileDefaultOpt.before;
        var after = params.after || popMobileDefaultOpt.after;
        var width = params.width || 0;
        var height = params.height || 0;
        var showClass = params.showClass || '';
        var popMobileHandleCore = function($dom, str) {

            $dom.css({
                'position': 'fixed',
                'left': 0,
                'top': 0,
                'right': 0,
                'bottom': 0,
                'margin': 'auto',
                'zIndex': zIndex + popNum
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
                'zIndex': zIndex + popNum
            });

            if (showClass) {
                if (popMobileDefaultOpt.showClass.indexOf(showClass) == -1) {
                    popMobileDefaultOpt.showClass += showClass;
                }
                $dom.addClass(showClass);
            }

            if (str) {
                $dom.css({
                    'width': width + 'rem',
                    'height': height + 'rem'
                });
                $dom.html(str);
                $body.append($dom);
                params.dom = $dom;
                before && before(params);
            }

            $dom.off('touchmove').on('touchmove', function(e) {
                e.preventDefault();
            });

            $dom.find(close).off('tap').on('tap', function(e) {
                popClose(params, $mask);
            });

        }


        mutex ? popMobileCloseAll(params) : '';

        if ($dom && typeof $dom == 'string') {
            var $popMobileContainer = $('<div class="pop-mobile-container pop-mobile-layout hide"></div>');
            popMobileHandleCore($popMobileContainer, $dom);
            $popMobileContainer.before($mask).show();
        }

        if ($dom && typeof $dom === 'object') {

            if (!$dom.is('.pop-mobile-container')) {
                popMobileHandleCore($dom);
                $dom.before($mask).addClass('pop-mobile-container').show();
            }

        }

        after && after(params);
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
