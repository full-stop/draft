MPT.addTmpl('index', function (_data) {

    var html = [];

    html.push('    <div class="contenter index mpt a_index" id="contenter">');    
    html.push('        <p>我是contenter</p>');  
    html.push('        <p><a href="#!/myspace/mystage/9527" target="hashtarget">进入空间，通过a标签的href属性跳转页面</a></p>');   
    html.push('        <p><a href="javascript:;" class="e_space">进入空间，通过MPT.Hash()方法跳转页面</a></p>');     
    html.push('    </div>');


    return html.join('');

});