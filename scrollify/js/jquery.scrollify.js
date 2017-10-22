(function($, window, document) {

	'user strict';

	var whellEvt = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
	var $window = $(window);
	var $document = $(document);
	var easing = 'easeOutExpo';
	var sHeight = $window.height();
	var top = $window.scrollTop();
	var heights = [];
	var elements = [];
	var index = 0;
	var isMove = false;
	var target = 'body,html';
	var scrollBar = false;
	var timeout = null;
	var isRelaod = true;
	var _isIE = false;
	var _TIMEOUT_ID_ONE = 0;
	var _TIMEOUT_ID_TWO = 0;

	var settings = {
		extraSelector: '',
		selector: 'section',
		minHeight: 0,
		scrollingSpeed: 8e2,
		easing: 'easeInOutQuart',
		target: 'body,html',
		before: function() {},
		after: function() {}
	};

	function sizePanles() {
		if (settings.selector) {

			var selector = '.' + settings.selector,
				winHeight = $window.height();

			$(selector).each(function() {

				var $this = $(this);

				if (!$this.is('.' + settings.extraSelector)) {

					if (settings.minHeight < winHeight) {
						$this.css('height', winHeight);
					} else {
						$this.css('height', settings.minHeight);
					}
				}

			});

		}
	}

	function calcePosition() {

		if (settings.selector) {
			var selector = '.' + settings.selector;

			if (settings.extraSelector) {
				selector += ',.' + settings.extraSelector;
			}

			$(selector).each(function(i) {
				var $this = $(this);

				if ($this.is(settings.extraSelector)) {
					heights[i] = heights[heights.length - 1] + $this.height();
				} else {
					heights[i] = $this.offset().top;
				}
			});
		}
	}

	function isScrollEnd(detail) {

		var scrollBarTime = new Date().getTime(),
			diff = 0;

		top = $window.scrollTop();
		sHeight = $window.height();

		if (settings.minHeight <= sHeight) {
			return true;
		}

		if (detail > 0) {

			if (top > 0 && index === 0) {
				animateScroll(index);
				return false;
			} else {
				return true;
			}

		} else {

			diff = (settings.minHeight - sHeight) + settings.minHeight * index;

			if (scrollBarTime - _TIMEOUT_ID_ONE >= 10 && !isMove) {

				if (top < diff) {
					$window.scrollTop(top += 60);
					if (top >= diff) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}

				_TIMEOUT_ID_ONE = scrollBarTime;
			}
		}

	}

	function getIndex(callback) {

		var i = 1,
			l = heights.length,
			closet = 0,
			sHeight = $window.height(),
			calcHeight = sHeight / 2,
			time = time || 100;

		top = $window.scrollTop();

		for (; i < l; i++) {
			if (top + calcHeight >= heights[i]) {
				closet = i;
			}
		}

		if (settings.extraSelector) {

			var $extraSelector = $('.' + settings.extraSelector),
				extraHeight = $extraSelector.height();

			if (top + sHeight > heights[l - 1] + extraHeight / 2) {
				closet = l - 1;
			}
		}

		index = closet;
		callback && callback();

	}


	function isIE() {

		var b = document.createElement('b');
		b.innerHTML = '<!--[if IE]><b></b><![endif]-->';
		return !!b.getElementsByTagName('b').length;

	}

	function animateScroll(index) {
		isMove = true;
		settings.before(index);
		$(settings.target).stop().animate({
			scrollTop: heights[index]
		}, settings.scrollingSpeed, settings.easing, function() {
			settings.after(index);
			isMove = false;
		});
		//$(settings.target).promise().done(function(){settings.after(index);});
	}

	$.scrollify = function(options) {

		var core = {

			init: function() {
				top = $window.scrollTop();
				_isIE = isIE();
				$window.on('scroll', core.scrollHandle);
				$window.on('mousedown', core.mousedown);
				$window.on('mouseup', core.mouseup);
				$document.on(whellEvt, core.wheelHandle);

			},
			mousedown: function() {
				scrollBar = true;
			},
			mouseup: function() {
				scrollBar = false;
				if (top > 0) {
					animateScroll(index);
				}
			},
			wheelHandle: function(e) {

				var detail = (-e.originalEvent.detail || e.originalEvent.wheelDelta),
					time = new Date().getTime();

				if (scrollBar) {
					scrollBar = false;
					return true;
				}

				isRelaod = false;

				if (isScrollEnd(detail)) {

					if (time - _TIMEOUT_ID_TWO > settings.scrollingSpeed) {

						if (_isIE) {
							getIndex();
						}

						if (detail < 0) {
							if (index < heights.length - 1) {
								index++;
								animateScroll(index);
								_TIMEOUT_ID_TWO = time;
							}
						} else {

							if (index > 0) {
								index--;
								animateScroll(index);
								_TIMEOUT_ID_TWO = time;
							}
						}
					}
				}

				e.preventDefault();
				e.returnValue = false;

			},
			scrollHandle: function(e) {

				if (isRelaod) {
					isRelaod = false;
					getIndex(function() {
						animateScroll(index);
					});

				} else {
					if (scrollBar) {
						if (timeout) {
							clearTimeout(timeout);
							timeout = null;
						}
						timeout = setTimeout(function() {
							getIndex();
						}, 100);

					}
				}
			}
		}

		settings = $.extend(settings, options);
		sizePanles();
		calcePosition();

		if (heights.length) {

			$window.on('resize', function() {
				sizePanles();
				calcePosition();
				$window.scrollTop(heights[index]);
			});
			core.init();
		}

	};


	$.scrollify.move = function(idx) {

		if (idx >= 0 && idx < heights.length) {
			index = idx;
			animateScroll(index);
		}

	}


}(jQuery, window, document));