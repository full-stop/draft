MPT.addTmpl('header', function (_data) {

    var html = [];

    html.push('<div class="mpt a_header" style="background-color:red;">');
    html.push('我是header');
    html.push('<p class="test"></p>');
    html.push('</div>');

    return html.join('');

});

MPT.addTmpl('footer', function(_data) {

    var html = [];

    html.push('<div style="background-color:blue;">');
    html.push('我是footer');
    html.push('</div>');

    return html.join('');

});