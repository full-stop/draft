MPT.addRoute('index', function() {

	this.index = function() {

		var jsArray = [ MPT.Config['js_tpl'] + '/index.js' ]

		var callback = function() {

			jQuery("#contenter").replaceWith(MPT.getTmpl('index'));

			// -- 激活该HTML action --
			MPT.excAction(jQuery("#contenter").get(0));

			document.title = '首页 ';
		}

		require(jsArray, callback);

	};

});