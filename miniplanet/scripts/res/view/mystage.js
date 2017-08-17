MPT.addTmpl('mystage', function (_data) {

    var html = [];

    html.push('    <div class="contenter index mpt a_mystage" id="contenter">');    
    html.push('        <p>我是contenter</p>');  
    html.push('        <p><a href="#!/index" target="hashtarget">返回首页，通过a标签的href属性跳转页面</a></p>');   
    html.push('        <p><a href="javascript:;" class="e_back">返回首页，通过MPT.Hash()方法跳转页面</a></p>');     
    html.push('    </div>');


    return html.join('');

});