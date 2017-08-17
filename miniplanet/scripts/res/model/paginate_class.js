/**
 * 分页类
 */
MPT.addClass('Paginate', function () {

    //分页条
    this.createPageBar = function (_param, _callback) {
        var html = [];

        var page_no = _param.pageNo;
        var page_size = _param.pageSize;
        var total_pages = _param.totalPages;
        var total_records = _param.totalRecords;

        var first, last, pre, next;
        var beforeArray = [], afterArray = [];

        //首页和末页
        first = 1;
        last = total_pages;

        //矫正当前页码
        page_no == page_no < 1 ? 1 : page_no;
        page_no == page_no > total_pages ? total_pages : page_no;

        //前一页和后一页
        pre = page_no - 1; pre = (pre < 1 ? -1 : pre);
        next = page_no + 1; next = (next > total_pages ? -1 : next);

        var start = page_no - 2 < 1 ? 1 : page_no - 2;
        var end = page_no + 2 > total_pages ? total_pages : page_no + 2;

        if (page_no <= 2) {   // 前2页时，补齐5个标签
            var s_end = total_pages > 5 ? 5 : total_pages;
            end = end < s_end ? s_end : end;
        } else if (page_no >= total_pages - 1) {  // 最后2页时，补齐5个标签
            var s_start = total_pages - 4 < 1 ? 1 : total_pages - 4;
            start = start > s_start ? s_start : start;
        };

        for (var i = start; i <= page_no - 1; i++) {
            beforeArray.push(i);
        }

        for (var i = page_no + 1; i <= end; i++) {
            afterArray.push(i);
        }

        if (first != last) {
            html.push('<a class="first" href="javascript:;" page="' + first + '" title="首页">首页</a>');
            html.push('<a class="long" href="javascript:;" page="' + pre + '" title="上一页">上一页</a>');
            $.each(beforeArray, function (_i, _p) { html.push('<a class="short" href="javascript:;" page="' + _p + '">' + _p + '</a>'); });
            html.push('<a href="javascript:;" page="' + page_no + '" class="short active">' + page_no + '</a>');
            $.each(afterArray, function (_i, _p) { html.push('<a class="short" href="javascript:;" page="' + _p + '">' + _p + '</a>'); });
            html.push('<a class="long" href="javascript:;" page="' + next + '" title="下一页">下一页</a>');
            html.push('<a class="last" href="javascript:;" page="' + last + '" title="末页">末页</a>');
        }

        var tab_jQs = $(html.join(''));
        var cur_page = $(tab_jQs.filter("[class*=active]")).attr('page');

        tab_jQs.each(function (_i, _t) {
            var tab_jQ = $(_t);
            var page = tab_jQ.attr('page');
            if (page != undefined && page != -1 && page != cur_page) {
                tab_jQ.click(function () {
                    _callback(page);
                });
            } else if ((page == -1 || page == cur_page) && !tab_jQ.hasClass('active')) {
                var className = tab_jQ.attr('class');
                tab_jQ.removeClass(className).addClass(className + "-un");
            }
        });

        return tab_jQs;
    };

    //滑动分页
    this.createPageShift = function (_shift_r_jQ, _shift_l_jQ, _body_jQ, _shift_dist, _shift_times, _speed) {

        var shift_l_jQ = _shift_l_jQ
        var shift_r_jQ = _shift_r_jQ;
        var body_jQ = _body_jQ;
        var shift_dist = _shift_dist;
        var shift_times = _shift_times;
        var speed = _speed;

        var cur_index = 1;
        var cur_left = 0;
        var new_index;
        var new_left;

        var shift_right = function () {

            new_index = cur_index + 1;
            new_left = cur_left - shift_dist;

            Debug.info(new_index.toString() + "   " + new_left.toString());

            body_jQ.animate({ left: new_left + 'px' }, speed, function () {

                shift_l_jQ.removeClass('last').addClass('last_on').unbind('click').one('click', shift_left);

                cur_index = new_index;
                cur_left = new_left;

                //滑动到最右端，关闭右滑功能
                if (cur_index == shift_times) {
                    shift_r_jQ.removeClass('next_on').addClass('next');
                } else {
                    shift_r_jQ.one('click', shift_right);
                }
            });
        };

        var shift_left = function () {

            new_index = cur_index - 1;
            new_left = cur_left + shift_dist;

            Debug.info(new_index.toString() + "   " + new_left.toString());

            body_jQ.animate({ left: new_left + 'px' }, speed, function () {
                shift_r_jQ.removeClass('next').addClass('next_on').unbind('click').one('click', shift_right);

                cur_index = new_index;
                cur_left = new_left;

                //滑动到最左端，关闭左滑功能
                if (cur_index == 1) {
                    shift_l_jQ.removeClass('last_on').addClass('last');
                } else {
                    shift_l_jQ.one('click', shift_left);
                }
            });
        };

        //初始化
        body_jQ.css({ "left": 0 });
        shift_l_jQ.removeClass('last_on').addClass('last').unbind('click');
        shift_r_jQ.removeClass('next_on').addClass('next').unbind('click');

        if (_shift_times > 1) {
            shift_r_jQ.removeClass('next').addClass('next_on').one('click', shift_right);
        }
    };

    //滑动分页 -- 纵向
    this.createPageVerShift = function (_shift_r_jQ, _shift_l_jQ, _body_jQ, _shift_dist, _shift_times, _speed) {

        var shift_l_jQ = _shift_l_jQ
        var shift_r_jQ = _shift_r_jQ;
        var body_jQ = _body_jQ;
        var shift_dist = _shift_dist;
        var shift_times = _shift_times;
        var speed = _speed;

        var cur_index = 1;
        var cur_left = 0;
        var new_index;
        var new_left;

        var shift_right = function () {

            new_index = cur_index + 1;
            new_left = cur_left - shift_dist;

            Debug.info(new_index.toString() + "   " + new_left.toString());

            body_jQ.animate({ top: new_left + 'px' }, speed, function () {

                shift_l_jQ.removeClass('last').addClass('last-on').unbind('click').one('click', shift_left);

                cur_index = new_index;
                cur_left = new_left;

                //滑动到最右端，关闭右滑功能
                if (cur_index == shift_times) {
                    shift_r_jQ.removeClass('next-on').addClass('next');
                } else {
                    shift_r_jQ.one('click', shift_right);
                }
            });
        };

        var shift_left = function () {

            new_index = cur_index - 1;
            new_left = cur_left + shift_dist;

            Debug.info(new_index.toString() + "   " + new_left.toString());

            body_jQ.animate({ top: new_left + 'px' }, speed, function () {
                shift_r_jQ.removeClass('next').addClass('next-on').unbind('click').one('click', shift_right);

                cur_index = new_index;
                cur_left = new_left;

                //滑动到最左端，关闭左滑功能
                if (cur_index == 1) {
                    shift_l_jQ.removeClass('last-on').addClass('last');
                } else {
                    shift_l_jQ.one('click', shift_left);
                }
            });
        };

        //初始化
        body_jQ.css({ "top": 0 });
        shift_l_jQ.removeClass('last-on').addClass('last').unbind('click');
        shift_r_jQ.removeClass('next-on').addClass('next').unbind('click');

        if (_shift_times > 1) {
            shift_r_jQ.removeClass('next').addClass('next-on').one('click', shift_right);
        }
    }; 
});
