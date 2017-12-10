(function($) {

    /*
     *@ version :  0.9.3
     *@ datetime:  2017/12/10
     *@ author  :  gtshen
    */

    var defaultOption = {
        'dom': '',
        'close': '.pop-close',
        'zIndex': 100,
        'mutex': 0,
        'before': null,
        'after': null,
        'callback': null
    };
    var $body = $('body');
    var popClose = function(params) {

        var $dom = params.dom;
        var $mask = params.$mask;

        $dom.stop().fadeOut(200, function() {
            $dom.removeAttr('style').removeClass('pop-container');
            params.callback && params.callback(params);

            if ($dom.is('.pop-layout')) {
                $dom.remove();
            }
            params = $dom = null;
        });

        $mask.stop().fadeOut(200, function() {
            $mask.remove();
            $mask = null;
        });

        return;

    };
    var popCloseAll = function() {

        var $dom = $('.pop-container');
        var $mask = $('.pop-mask');

        $dom.removeAttr('style').removeClass('pop-container');
        $mask.removeAttr('style').remove();

        if ($dom.is('.pop-layout')) {
            $dom.remove();
        }
        $dom = $mask = null;

    };
    var popHandle = function(params, str) {

        var $dom = params.dom;
        var $mask = $('<div class="pop-mask"></div>');
        var zIndex = params.zIndex;
        var popNum = $('.pop-container').length;

        params.$mask = $mask;
        params.before && params.before(params);

        $dom.css({
            'position': 'fixed',
            'left': '50%',
            'top': '50%',
            'margin-left': -params.width / 2,
            'margin-top': -params.height / 2,
            'zIndex': zIndex + popNum
        });

        $mask.css({
            'position': 'fixed',
            'left': '0',
            'top': '0',
            'width': '100%',
            'height': '100%',
            'background': '#000',
            'opacity': .5,
            'filter': 'alpha(opacity=50)',
            'zIndex': zIndex + popNum
        }).hide();

        if (str) {
            $dom.css({
                'width': params.width,
                'height': params.height
            });
            $dom.html(str);
            $dom.children().first().show();
            $body.append($dom);
        }


        $dom.find(params.close).off('click').on('click', function(e) {
            popClose(params);
        });

        $dom.before($mask).addClass('pop-container').stop().fadeIn(200, function() {
            params.after && params.after(params);
        });

        $mask.stop().fadeIn(200);
    };


    function popup(params) {

        var option = $.extend({}, defaultOption, params);

        option.mutex ? popCloseAll() : '';

        if (!option.dom || !option.width || !option.height) {
            throw 'Parameter incomplete: please check if there is a DOM or if it has a WIDTH and a HEIGHT parameter';
        }

        if (option.dom && typeof option.dom === 'object') {
            if (!option.dom.is('.pop-container').length) {
                popHandle(option);
            }
        }

        if (option.dom && typeof option.dom === 'string') {
            var string = option.dom;
            option.dom = $('<div class="pop-layout hide"></div>');
            popHandle(option, string);
        }

        this.close = function() {
            popClose(option)
        };
        return '';
    };



    if (typeof module != 'undefined' && typeof exports === 'object') {
        exports.open = function(params) {
            return new popup(params);
        };
        exports.closeAll = popCloseAll;
    } else if (typeof define != 'undefined' && define.amd) {
        define(['jquery'], function(require, exports, module) {
            exports.open = function(params) {
                return new popup(params);
            };
            exports.closeAll = popCloseAll;
        });
    } else if (typeof $ === 'function') {
        $.popup = function(params) {
            return new popup(params);
        }
        return;
    }


}(jQuery))
