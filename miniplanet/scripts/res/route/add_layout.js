/* 首页布局 */
MPT.addLayout('ly_index', function(_route_fun) {

	var jsArray = [ MPT.Config['js_tpl'] + '/public.js', MPT.Config['js_tpl'] + '/layout.js' ];

	var callback = function() {

		$("#layout").replaceWith(MPT.getTmpl("ly_index"));

		$("#layout").prepend(MPT.getTmpl('header'));

		$("#layout").append(MPT.getTmpl('footer'));

		// -- 模板默认执行代码 --
		MPT.excAction(jQuery("#layout").get(0));
		_route_fun();
	};

	require(jsArray, callback);

});

/* 我的空间布局 */
MPT.addLayout('ly_myspace', function(_route_fun) {
	var jsArray = [ MPT.Config['js_tpl'] + '/public.js', MPT.Config['js_tpl'] + '/layout.js' ];

	var callback = function() {

		$("#layout").replaceWith(MPT.getTmpl("ly_myspace"));

		$("#layout").prepend(MPT.getTmpl('header'));

		$("#layout").append(MPT.getTmpl('footer'));

		// -- 模板默认执行代码 --
		MPT.excAction(jQuery("#layout").get(0));
		_route_fun();
	};

	require(jsArray, callback);
});
