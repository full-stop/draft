MPT.addTmpl('ly_index', function (_data) {

    var html = [];

    html.push('<div id="layout" style="background-color:yellow">');
    html.push('    <div>我是ly_index布局</div>');
    html.push('    <div style="background-color:#FFFFDD; margin:10px;">');
    html.push('       <div id="contenter" ></div>');
    html.push('    </div>');
    html.push('</div>');

    return html.join('');

});

MPT.addTmpl('ly_myspace', function(_data) {

    var html = [];

    html.push('<div id="layout" style="background-color:yellow">');
    html.push('    <p>我是ly_myspace布局，我有左边栏，我的ID是'+ MPT.getParam() +'</p>');
    html.push('    <div>');
    html.push('        <div style="float:left; width:20%; height:200px;">左边栏</div>');    
    html.push('        <div style="float:left; width:70%; height:200px; background-color:#FFFFDD;">');
    html.push('           <div id="contenter"></div>');
    html.push('        </div>');
    html.push('        <div style="clear:both;"></div>');    
    html.push('    </div>');
    html.push('</div>');

    return html.join('');

});