MPT.addAction("header", function (_elm) {

	var test_jQ = $('.test', _elm);
	
	test_jQ.html('我是在模板加载完毕后，通过Action加进来的');
    
});
