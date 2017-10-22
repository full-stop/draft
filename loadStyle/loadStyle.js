function loadStyle(node, callback, timeout) {

	var isLoaded = false,
		timeout = timeout || 6e3,
		time = new Date().getTime(),
		curTime,

		function poll() {

			// 通过link对象的属性判断,但无法检测跨域的CSS文件，以及非HTTP环境。
			if (node['sheet'] || node['stylesheet']) {
				if (node['sheet'] && node['sheet']['cssRules'] || node['stylesheet'] && node['stylesheet']['rules']) {
					isLoaded = true;
				} else {
					curTime = new Date().getTime();
				}
			} else {
				curTime = new Date().getTime();
			}

			// 尝试是否可执行onload，对于Firefox可能不兼容
			node.addEventListener('load', function(e) {
				isLoaded = true;
			}, false);

			// 6s钟的超时时间
			if (curTime - time > timeout) {
				isLoaded = true;
			}

			if (isLoaded) {
				callback && callback();
			} else {
				setTimeout(arguments.callee, 100);
			}
		}

	if (node.attachEvent) { // IE 6 ~ 8 直接绑定onload事件
		node.attachEvent('onload', callback);
	} else {
		setTimeout(poll(node),0)
	}
}

var linkTag = document.getElementsByTagName('link')[0];
loadStyle(linkTag, function() {
	alert('success')
});