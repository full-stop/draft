$('.revice-btn').tap(function() {
    var popAlert = $.popMobile({
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
