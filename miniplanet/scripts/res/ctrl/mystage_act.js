MPT.addAction("mystage", function(_elm) {

	var back_jQ = $('.e_back', _elm);

	back_jQ.click(function() {
		MPT.Hash('#!/index');
	})

});
