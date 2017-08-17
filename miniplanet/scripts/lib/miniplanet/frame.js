/*==============================
 * 项目：JS结构性开发框架
 * 作者：胡炯（炯炯侠）
 * QQ：41200414
 * 最后修改时间：20120521
 * 修改目标：增加启动信息
==============================*/

(function(_w) {

	// var is_route = false;
	var is_route = true;

	// var is_debug = false;
	var is_debug = false;

	_w.Debug = new function() {

		var console = {
			'info' : function() {
			},
			'time' : function() {
			},
			'timeEnd' : function() {
			},
			'runtimeobj' : {}
		};

		if (!is_debug)
			return console;

		if (window.console) {
			console = window.console;
		} else {
			console = {
				'info' : function(_msg) {
					var divConsole = document.getElementById('div_console')
					if (!divConsole) {
						divConsole = document.createElement('div');
						divConsole.id = 'div_console';
						document.body.appendChild(divConsole);
					}
					divConsole.innerHTML += _msg + '<br />';
				},
				'time' : function() {
				},
				'timeEnd' : function() {
				},
				'runtimeobj' : {}
			};
		}

		return console;
	};

	_w.MPT = new function() {
		this.Config = {};

		var _self = this;
		var current_layout = null;
		var current_param = null;

		// 术语映射表（model暂无用）
		var actions = {};
		var layout_list = {};
		var route_list = {};
		var tmpl_list = {};
		var model_list = {};
		var class_list = {};
		var object_list = {};

		this.getIsDebug = function() {
			return is_debug;
		};

		this.excAction = function(_context) {
			var actions_and_elms = getActionsAndElms(_context);

			for ( var i = 0; i < actions_and_elms.length; i++) {
				Debug.info("[frame excAction] execute Action " + actions_and_elms[i]['action_name']);
				actions[actions_and_elms[i]['action_name']](actions_and_elms[i]['element']);
			}
		};

		this.excRoute = function(_hash, _no_set_hash) {

			var layout_map = MPT.Config["layout"];

			Debug.info("[frame excRoute] _hash: " + _hash);

			var hash_A = _hash.replace('#!/', '').split('?')[0].split('/');

			if (hash_A.length >= 1 && hash_A.length <= 3) {
				if (hash_A.length == 1)
					hash_A.push('index');

				var route = hash_A[0];
				var layout = layout_map[hash_A[0]];
				var func = hash_A[1];
				var param = hash_A[2];

				if (!layout_list[layout]) {
					throw "[frame excRoute] 未定义 " + layout + " Layout";
					return;
				}

				if (!route_list[route]) {
					throw "[frame excRoute] 未定义 " + route + " route";
					return;
				}

				if (!route_list[route][func]) {
					throw "[frame excRoute] " + route + ' route 未定义 ' + func + " 方法";
					return;
				}

				if (current_layout != layout) { // 布局不同，则切换布局吗，再执行Action
					Debug.info("[frame excRoute] " + layout + " replace #layout");
					layout_list[layout](function() {
						Debug.info("[frame excRoute] " + route + "_" + func + " replace #contenter");
						route_list[route][func](param);
					});

					current_layout = layout;

				} else if (current_param != param) { // 布局相同，但参数不同，布局也会发生变化（例如upper_my_info），所以也要重新切换布局，再执行Action

					Debug.info("[frame excRoute] " + layout + " replace #layout");
					layout_list[layout](function() {
						Debug.info("[frame excRoute] " + route + "_" + func + " replace #contenter");
						route_list[route][func](param);
					});
				} else { // 布局相同，参数相同，则直接执行Action
					route_list[route][func](param);
				}

				current_param = param;
			}
		};

		this.bind = function(_obj, _type, _fun) {
			if (_obj.attachEvent)
				_obj.attachEvent("on" + _type, _fun);
			else
				_obj.addEventListener(_type, _fun, false);
		};

		this.addAction = function(_name, _fun) {
			Debug.info("[frame addAction] add Action " + _name);
			if (actions[_name]) {
				throw "动作 " + _name + " 重复定义！";
				return;
			} else {
				actions[_name] = _fun;
			}
		};

		this.addLayout = function(_name, _fun) {
			Debug.info("[frame addLayout] add Layout " + _name);

			checkObjProperty(layout_list, _name, "addLayout(\"" + _name + "\", ...) 添加布局重名！", function() {
				layout_list[_name] = _fun;
			});
		};

		this.addRoute = function(_name, _fun) {
			Debug.info("[frame addRoute] add Route " + _name);

			checkObjProperty(route_list, _name, "addRoute(\"" + _name + "\", ...) 添加路由重名！", function() {
				route_list[_name] = new _fun;
			});
		};

		this.addTmpl = function(_name, _fun) {
			Debug.info("[frame addTmpl] load templete " + _name + " success");

			checkObjProperty(tmpl_list, _name, "addTmpl(\"" + _name + "\", ...) 添加模板重名！", function() {
				tmpl_list[_name] = _fun;
			});
		};

		this.getTmpl = function(_name, _data) {
			return tmpl_list[_name]((!_data ? {} : _data));
		};

		this.addModel = function(_name, _fun) {
			Debug.info("[frame addModel] add Model " + _name);

			checkObjProperty(model_list, _name, "addModel(\"" + _name + "\", ...) 添加数据模型重名！", function() {
				model_list[_name] = new _fun;
			});
		};

		this.addClass = function(_name, _fun) {
			Debug.info("[frame addClass] add Class " + _name);

			checkObjProperty(class_list, _name, "addClass(\"" + _name + "\", ...) 添加类包重名！", function() {
				class_list[_name] = _fun;
			});
		};

		this.addObject = function(_name, _fun) {
			Debug.info("[frame addObject] add Object " + _name);

			checkObjProperty(object_list, _name, "addObject(\"" + _name + "\", ...) 添加对象重名！", function() {
				object_list[_name] = new _fun;
			});
		};

		this.getParam = function() {
			return current_param;
		}

		var checkObjProperty = function(_obj, _key, _msg, _callbakck) {
			if (_obj.hasOwnProperty(_key)) {
				throw _msg;
				return;
			} else {
				_callbakck();
			}
		};

		var getActionsAndElms = function(_context) {
			var actions_and_elms = [];

			var jqs = $(_context).find('.mpt');

			if ($(_context).hasClass('mpt'))
				jqs.push($(_context));

			Debug.info(jqs);

			$.each(jqs, function(i, d) {
				var classname = $(d).attr('class');
				if (classname) {
					var reg = /\sa_(\w+)/;
					var action = classname.match(reg);

					if (action && action[1]) {
						if (actions[action[1]]) {
							actions_and_elms.push({
								"action_name" : action[1],
								"element" : $(d).get()
							});
						}
					}
				}
			});

			return actions_and_elms;
		};

		var assignClass = function() {
			for ( var model_name in model_list) {
				_w[model_name] = model_list[model_name];
			}
			for ( var class_name in class_list) {
				_w[class_name] = class_list[class_name];
			}
			for ( var object_name in object_list) {
				_w[object_name] = object_list[object_name];
			}
		};

		// -------------------------------------Hash切换相关--------------------------------------------------

		var default_hash = '#!/index';

		var curHash = default_hash;

		// 对hash进行过滤
		var filterHash = function(hash, _callback) {

			var pureHash = hash.split('?')[0];

			var hash_A = pureHash.split('/');

			if (hash_A[3]) { // 去掉第三个参数
				hash_A.pop();
			}

			pureHash = hash_A.join('/');

			if (notFound(pureHash)) { // 找不到页面，跳转到404

				MPT.Hash(MPT.Config["hash"]['404']);

			} else { // 正常情况下访问页面
				_callback();
			}
		}

		// 检测Hash是否合法（需要预定义一个Hash的列表）
		var notFound = function(hash) {

			var notFound = true;

			$.each(MPT.Config["hash"], function(k, v) {
				if (hash == v) {
					notFound = false;
				}
			})

			return notFound;
		}

		// 执行hash
		var exeHash = function(hash) {

			if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode >= 8)) {

				_self.excRoute(hash);

			} else {

				document.getElementById("hashtarget").src = 'hp.html?_=' + Math.random() + hash;
			}
		}

		// 路由规则初始化
		var initHashAction = function() {

			jQuery("a[target='hashtarget']").live('click', function(event) {
				curHash = jQuery(this).attr('href').match(/\#\!.*/)[0];

				MPT.Hash(curHash);

				event.preventDefault();
			});

			// 初始页面的Hash
			var curHash = MPT.getHash();

			if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode >= 8)) { // 支持onhashchange

				// 其余浏览器
				window.onhashchange = function() {
					curHash = MPT.getHash();
					filterHash(curHash, function() {
						_self.excRoute(curHash);
					});
				};

			} else {

				// IE6浏览器
				setInterval(MPT.checkHash, 100);

				jQuery('body').append('<iframe frameborder="0" id="hashtarget" name="hashtarget" width="1" height="1"></iframe>');
			}

			filterHash(curHash, function() {
				exeHash(curHash);
			});

		};

		// 切换Hash（框架中的所有页面转向，必须通过MPT.Hash()方法）
		this.Hash = function(hash) {

			filterHash(hash, function() {

				curHash = hash;
				window.location.hash = curHash; // 切换导航栏上的URL

				if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode >= 8)) {

					// 走onhashchange事件

				} else {

					document.getElementById("hashtarget").src = 'hp.html?_=' + Math.random() + curHash;
				}
			});
		};

		// IE6专用，检测当前页面的Hash是否发生变化
		this.checkHash = function() {

			var hash = MPT.getHash();

			if (hash != curHash) {
				curHash = hash;
				filterHash(curHash, function() {
					exeHash(curHash);
				});
			}
		}

		// 获取当前页面的Hash
		this.getHash = function() {

			return window.location.hash.replace('#!', '') ? window.location.hash : default_hash;
		}

		// 框架入口
		this.start = function() {

			assignClass();

			if (is_route && !MPT.Config["HttpCode"]) {
				initHashAction();
			} else {
				_self.excAction(document);
			}
		};
	};

	_w.MPT.bind(_w, "load", function() {
		_w.MPT.start();
	});

})(window);
