MPT.Config['res'] = "";
MPT.Config['css_lib'] = MPT.Config['res'] + 'styles/lib';
MPT.Config['css_res'] = MPT.Config['res'] + 'styles/res';

MPT.Config['js_lib'] = MPT.Config['res'] + 'scripts/lib';
MPT.Config['js_res'] = MPT.Config['res'] + 'scripts/res';
MPT.Config['js_tpl'] = MPT.Config['res'] + 'scripts/res/view';

MPT.Config['img'] = MPT.Config['res'] + 'styles/res/img';

// Hash映射表，记录网站所有的Hash
MPT.Config["hash"] = {
    "index": '#!/index',
    "myspace-index": '#!/myspace/mystage'
};

// 必选，布局映射表，记录网站所有的布局
MPT.Config["layout"] = {
    "index": "ly_index",
    "myspace": "ly_myspace"
};

MPT.Config["route_list"] = [

    // route	
	'index_route.js',
	'myspace_route.js',

    // layout
	'add_layout.js'
];

MPT.Config["ctrl_list"] = [

    // controller
	'index_act.js',
	'mystage_act.js',

	'header_act.js'
];

MPT.Config["model_list"] = [

    // object
    "template_object.js",

    //entity
    'travelInfo_entity.js',

    // class
    'paginate_class.js',
];


//========================= 加载JS =========================
for(var i=0; i<MPT.Config["route_list"].length; i++)
{
    document.write('<sc' + 'ript language="javascript" type="text/javascript" src="scripts/res' + '/route/' + MPT.Config["route_list"][i] + '"></sc' + 'ript>');
}

for(var i=0; i<MPT.Config["model_list"].length; i++)
{
    document.write('<sc' + 'ript language="javascript" type="text/javascript" src="scripts/res' + '/model/' + MPT.Config["model_list"][i] + '"></sc' + 'ript>');
}

for(var i=0; i<MPT.Config["ctrl_list"].length; i++)
{
    document.write('<sc' + 'ript language="javascript" type="text/javascript" src="scripts/res' + '/ctrl/' + MPT.Config["ctrl_list"][i] + '"></sc' + 'ript>');
}

