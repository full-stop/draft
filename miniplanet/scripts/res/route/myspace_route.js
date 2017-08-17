MPT.addRoute('myspace', function () {

    this.mystage = function () {
    	
    	var jsArray = [ MPT.Config['js_tpl'] + '/mystage.js' ]

		var callback = function() {

			jQuery("#contenter").replaceWith(MPT.getTmpl('mystage'));

			// -- 激活该HTML action --
			MPT.excAction(jQuery("#contenter").get(0));

			document.title = '我的空间 ';
		}

		require(jsArray, callback);
    };

    this.myphoto = function() {		

	};
	
});