MPT.addObject('Template', function () {

    var loadJS = function (_jsArray, callback) {
        require(_jsArray, callback);
    }


    this.loadModule = function (_jsArray, _tmplName, _pageTitle) {

        var callback = function () {

            jQuery("#contenter").replaceWith(MPT.getTmpl(_tmplName));

            // -- 激活该HTML action --
            MPT.excAction(jQuery("#contenter").get(0));

            document.title = _pageTitle;
        }

        loadJS(_jsArray, callback);
    };

    this.loadLayout = function (_jsArray, _tmplName, _route_fun) {

        var callback = function () {

            $("#layout").replaceWith(MPT.getTmpl(_tmplName));

            if (_tmplName != "ly_index") {
                $("#layout").prepend(MPT.getTmpl('header'));

                $("#layout").append(MPT.getTmpl('footer'));
            }

            $("#layout").append(MPT.getTmpl('dialog'));

            $("#layout").append(MPT.getTmpl('hidden'));

            // -- 模板默认执行代码 --
            MPT.excAction(jQuery("#layout").get(0));
            _route_fun();
        };

        loadJS(_jsArray, callback);
    };

});
