$('.revice-btn').tap(function() {
    $.popMobile({
        'dom': '<div class="pop pop-test "><a href="javascript:;" class="close pop-close"></a><button>click</button></div></div>',
        'width': 5.8,
        'height': 3.5,
        'before': function(params) {
            console.log(params)
        },
        'after': function(params) {
            console.log(params);
        },
        'callback': function(params) {
            console.log(params);
        }
    });

    $('.pop-test button').tap(function() {
        $.popMobile({
            'showClass': 'bounceIn animated',
            'before': function(params) {
                console.log(params)
            },
            'after': function(params) {
                console.log(params);
            },
            'callback': function(params) {
                console.log(params);
            },
            'hideClass': 'bounceOut animated',
            'dom': $('.pop-alert')
        });
    });

});


$('.mobile-btn').tap(function() {

})
