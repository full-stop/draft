(function(win, doc) {

    /*
     *@ version :  0.2.2
     *@ datetime:  2017/12/10
     *@ author  :  gtshen
     */

    function smllClipBorad(obj) {

        var value = '';
        var isNoFormElement = false;

        if (/input|textarea/.test(obj.nodeName.toLowerCase())) {
            value = obj.value;
        } else {
            var input = document.createElement('input');
            value = obj.innerHTML || ' ';
            input.type = 'text';
            input.value = value;
            input.style.cssText = 'opacity:0;filter:alpha(opacity=0);position:absolute;z-index:-1;';
            document.body.appendChild(input);
            obj = input;
            isNoFormElement = true;
        }

        if (win.clipboardData) {
            clipboardData.setData('Text', value);
            alert('复制成功');
            return;
        }

        try {
            obj.select();
            doc.execCommand('copy');
            obj.parentNode.removeChild(obj);
            isNoFormElement = false;
            alert('复制成功！');
        } catch (e) {
            alert('抱歉，复制失败，请你尝试手动复制:Ctrl+C');
        }

    }

    if (typeof module != 'undefined' && typeof exports === 'object') {
        module.exports = smllClipBorad;
    }

    if (typeof define != 'undefined' && define.amd) {
        define(function(require, exports, module) {
            return smllClipBorad;
        });
    }

    if (typeof $ === 'function') {
        $.fn.smllClipBorad = smllClipBorad;
    }

    win.smllClipBorad = smllClipBorad;

}(window, document))
