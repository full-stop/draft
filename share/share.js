/**
 * @Author: gtShen
 * @Date:   2017-09-03T01:36:56+08:00
 * @Email:  sgt_ah@163.com
 * @Filename: share.js
 * @Last modified by:   gtShen
 * @Last modified time: 2017-09-03T16:55:52+08:00
 */

(function(root) {

    'use strict';

    function share(params) {

        this.params = params;
        this.dom = params.dom;
        this.type = params.type || ['weibo', 'qqweibo', 'qq', 'qqzone', 'wx', 'rr', 'bdtb', 'db', 'qqpy', 'kx'];
        this.config = {
            'weibo': ['新浪微博', 'http://service.weibo.com/share/share.php?'],
            'qqweibo': ['腾讯微博', 'http://share.v.t.qq.com/index.php?c=share&a=index'],
            'qq': ['QQ好友', 'http://connect.qq.com/widget/shareqq/index.html?'],
            'qqzone': ['QQ空间', 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'],
            'wx': ['微信分享', ''],
            'rr': ['人人分享', 'http://widget.renren.com/dialog/share?'],
            'bdtb': ['百度贴吧', 'http://tieba.baidu.com/f/commit/share/openShareApi?'],
            'db': ['豆瓣', 'http://shuo.douban.com/!service/share?'],
            'qqpy': ['朋友网', 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&'],
            'kx': ['开心网', 'http://www.kaixin001.com/login/open_login.php?']
        };
        (this.type && this.type.length) ? this.defa(): this.custom();
    }

    share.prototype.custom = function() {
        var str = '';
        for (var i = 0, l = this.type.length; i < l; i++) {
            str += '<a href="javascript:;" class="custom-share-' + this.type[i] + '" share-type="' + this.type[i] + '">' + this.config[this.type[i]][0] + '</a>';
        }
        this.dom.innerHTML = str;
        this.bind();
    };

    share.prototype.defa = function() {
        var str = '';
        for (var i = 0, l = this.type.length; i < l; i++) {
            str += '<a href="javascript:;" class="defautl-share-' + this.type[i] + '" share-type="' + this.type[i] + '">' + this.config[this.type[i]][0] + '</a>';
        }
        this.dom.innerHTML = str;
        this.bind();
    };

    share.prototype.bind = function() {
        var _this = this;
        this.dom.onclick = function(ev) {

            var e = ev || window.event;
            var oTarget = e.target || e.srcElement;

            (oTarget.nodeName === 'A' && _this.core(oTarget));
        }
    }

    share.prototype.core = function(o) {

        var _this = this;
        var type = o.getAttribute('share-type') || 'weibo';
        var ercode = '';
        var result = this.config[type][1];
        var urls = encodeURIComponent((this.params[type] && this.params[type].url) ? this.params[type].url : this.params.url);
        var title = encodeURIComponent((this.params[type] && this.params[type].title) ? this.params[type].title : (this.params.title) ? this.params.title : '');
        var images = encodeURIComponent((this.params[type] && this.params[type].images) ? this.params[type].images : (this.params.images) ? this.params.images : '');
        var desc = encodeURIComponent((this.params[type] && this.params[type].desc) ? this.params[type].desc : (this.params.desc) ? this.params.desc : '');
        var summary = encodeURIComponent((this.params[type] && this.params[type].summary) ? this.params[type].summary : (this.params.summary) ? this.params.summary : '');
        var site = encodeURIComponent((this.params[type] && this.params[type].site) ? this.params[type].site : '');

        function wx() {

            var e = document.getElementById('share-qrcode-box') || false;
            var shareWxCodeImg = document.getElementById('share-wx-qrcode-img') || null;
            var img = new Image();
            var _w = 0;
            var _h = 0;
            var oDiv = null;

            if(_this.params.target != 'blank' && shareWxCodeImg){
                shareWxCodeImg.parentNode.removeChild(shareWxCodeImg);
                return ;
            }

            if (!e) {
                if (_this.params.target == 'blank') {

                    img.onload = function() {

                        _w = this.width;
                        _h = this.height;

                        oDiv = document.createElement('div');
                        oDiv.className = 'share-qrcode';
                        oDiv.id = 'share-qrcode-box';
                        oDiv.innerHTML = '<img src="' + _this.params.qrcode + '" /><span href="javascript:;" class="share-close">&#10005;</span>';
                        oDiv.style.cssText = 'padding:5px;position:fixed;_position:absolute;left:50%;top:50%;margin-left:' + -(_w + 20) / 2 + 'px;margin-top:' + -(_h + 20) / 2 + 'px;';
                        document.body.appendChild(oDiv);
                        oDiv.children[1].style.cssText = "position:absolute;cursor:pointer;right:-20px;top:-15px;";
                        oDiv.children[1].onclick = function() {
                            var e = document.getElementById('share-qrcode-box');
                            document.body.removeChild(e);
                        }
                    }

                    img.src = _this.params.qrcode;

                } else {
                    img.src = _this.params.qrcode;
                    img.id = 'share-wx-qrcode-img';
                    _this.dom.style.cssText = 'position:relative';
                    _this.dom.appendChild(img);
                }

            }

        }

        if (type != 'wx') {
            switch (type) {
                case 'weibo':
                    result += 'title=' + title + '&url=' + urls + '&pic=' + images;
                    break;
                case 'qqweibo':
                    result += '&title=' + title + '&url=' + urls + '&pic=' + images;
                    break;
                case 'qq':
                    result += 'url=' + urls + '&title=' + title + '&desc=' + desc + '&summary=' + summary + '&pics=' + images + '&site=' + site;
                    break;
                case 'qqzone':
                    result += 'url=' + urls + '&title=' + title + '&desc=' + desc + '&summary=' + summary + '&pics=' + images + '&site=' + site;
                    break;
                case 'rr':
                    result += 'resourceUrl=' + urls + '&title=' + title + '&description=' + desc + '&pic=' + images;
                    break;
                case 'bdtb':
                    result += 'title=' + title + '&url=' + urls + '&pic=' + images + '&desc=' + desc;
                    break;
                case 'db':
                    result += 'image=' + images + '&href=' + urls + '&name=' + title + '&text=' + desc;
                    break;
                case 'qqpy':
                    result += 'pics=' + images + '&url=' + urls + '&title=' + title + '&desc=' + desc + '&summary=' + summary;
                    break;
                case 'kx':
                    result += '&url=' + urls + '&rtitle=' + title;
                    break;
            }

             window.open(result,'_blank','width=800px,height=500px,top='+(screen.height-500)/2+',left='+(screen.width-800)/2+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');

        } else {
            wx();
        }
    }

    if (typeof module != undefined && typeof exports === 'object') {
        //CommonJS
        module.exports = share;
        return;
    }

    if (typeof define != "undefined" && define.amd) {
        define(function() {
            return share;
        });
        return;
    }

    if (typeof $ === 'function') {
        $.fn.share = share;
        return;
    }

    root.share = share;

})(this);
