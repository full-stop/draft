(function(a) {
	a.MPT = new function() {
		var e = {};
		var c = function(f) {

			var l = [];
			if (f.getElementsByClassName) {
				var j = f.getElementsByClassName("mpt")
			} else {
				var j = f.getElementsByTagName("*")
			}
			var n = j.length;
			for (var g = 0; g < n; g++) {
				var m = j[g].getAttribute("class") || j[g].getAttribute("classname");
				if (!m) {
					continue
				}
				var h = /\sa_(\w+)/;
				var k = m.match(h);

				if (k && k[1]) {
					if (e[k[1]]) {
						l.push({
							action_name: k[1],
							element: j[g]
						})
					} else {
						alert("[错误]动作列表中未找到" + k[1] + "方法")
					}
				}
			}
			return l
		};
		var b = function(g, f, i, h) {
			if (g.hasOwnProperty(f)) {
				throw i;
				return
			} else {
				h()
			}
		};

		this.bind = function(h, g, f) {
			if (h.attachEvent) {
				h.attachEvent("on" + g, f)
			} else {
				h.addEventListener(g, f, false)
			}
		};
		this.addAction = function(f, g) {

			if (e[f]) {
				alert("[错误]您新增的动作名已经存在！");
				return
			} else {
				e[f] = g;
				if(typeof define==='function' && define.amd){
					a.MPT.excAction(document);
				}else{
					a.MPT.bind(a, "load", function() {
						a.MPT.excAction(document)
					});
				}
			}

			
		};
		this.excAction = function(f) {
			var h = c(f);
			for (var g = 0; g < h.length; g++) {
				e[h[g]["action_name"]](h[g]["element"])
			}
		};

		var d = {};
		this.addTmpl = function(f, g) {
			b(d, f, 'addTmpl("' + f + '", ...) 添加模板重名！', function() {
				d[f] = g
			})
		};
		this.getTmpl = function(f, g) {
			return d[f]((!g ? {} : g))
		};

	};


})(window);