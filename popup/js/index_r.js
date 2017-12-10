/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var popup = __webpack_require__(1);

$('#click1').click(function() {
    var popAlert = popup.open({
        'dom': $('.pop-alert'),
        'width': 500,
        'height': 300,
        'callback': function(data) {
            console.log(data);
        },
        'before': function(data) {
            console.log(data);
        },
        'after': function(data) {
            console.log(data);
        }
    });

    $('#click3').click(function() {
        popAlert.close();
    });

});

$('#click2').click(function() {
    popup.open({
        'dom': '<div class="pop pop-alert2 hide"><a href="javascript::" class="close pop-close"></a><div class="pop-in"><a href="javascript:;" class="close pop-close">&#10005;</a></div></div>',
        'width': 500,
        'mutex': 1,
        'height': 500
    });
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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



    if (true) {
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


/***/ })
/******/ ]);