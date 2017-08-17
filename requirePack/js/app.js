require.config({
	"paths": {
		'a': 'a',
		'b': 'b',
		'jquery': "http://hd.tzj.iwgame.com/js/jquery.min"
	},
	'shim': {
		'b': {
			'deps': ["jquery"]
		}
	}
});

define(['jquery', 'b'], function($) {
	
})