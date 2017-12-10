$('#click1').click(function() {
    var popup = $.popup({
        'dom': $('.pop-alert'),
        'width': 500,
        'height': 300,
        'callback': function(data) {
            console.log(data);
        },
        'before': function(data) {
            console.log(data);
        },
        'after': function(data) {
            console.log(data);
        }
    });


});

$('#click2').click(function() {
    $.popup({
        'dom': '<div class="pop pop-alert2 hide"><a href="javascript::" class="close pop-close"></a><div class="pop-in"><a href="javascript:;" class="close pop-close">&#10005;</a></div></div>',
        'width': 500,
        'height': 500
    });
})
