({
	dir: '../dist',
	baseUrl: './',
	paths: {
		b: "b",
		a: "a",
		app: 'app',
		jquery: 'jquery.min'
	},
	fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,
	modules: [{
		name: 'app',
		exclude: ['jquery']
	}],
	shim: {
		'a': {
			'deps': ['b']
		}
	},
	wrapShim: true
})