;(function(){
	//楼层轮播
	var $banner = $('.banner'); //盒子
    var $btn = $('.one .btn span'); //轮播按钮
    var $pic = $('.one .scroll img'); //轮播图片
    var $index = 0; //当前索引
    var $qindex = 0; //前一个索引
    var $timer1 = null;

    //添加按钮事件
    $btn.on('click', function(ev) {
        $index = $(this).index(); //当前索引赋值
        changepic(ev);
        $qindex = $index; //将当前的索引给前一个索引。
    });
    $timer1 = setInterval(function(ev) {
        $index++;
        if ($index > 2) {
            $qindex = 2;
            $index = 0;
        }
        //console.log($index);
        changepic(ev);
        $qindex = $index;
    }, 1500);

    function changepic(ev) {
        //当前的按钮添加类
        $btn.eq($index).addClass('hover').siblings('.btn span').removeClass('hover');
        /*if ($qindex == 2 && $index == 0) {
            if (ev.target.nodeName == 'SPAN') {
                $pic.eq($qindex).animate({
                    left: 605
                });
                $pic.eq($index).css('left', '-605px').animate({
                    left: 0
                });
            } else {
                $pic.eq($qindex).animate({
                    left: -605
                });
                $pic.eq($index).css('left', '605px').animate({
                    left: 0
                });
            }

        } else */
       if ($qindex == 0 && $index == 2) {
            if (ev.target.nodeName == 'SPAN') {
                $pic.eq($qindex).animate({
                    left: -605
                });
                $pic.eq($index).css('left', '605px').animate({
                    left: 0
                });
            } else {
                $pic.eq($qindex).animate({
                    left: 605
                });
                $pic.eq($index).css('left', '-605px').animate({
                    left: 0
                });
            }

        } else if ($index > $qindex) { //从前往后    左
            $pic.eq($qindex).animate({
                left: -605
            });
            $pic.eq($index).css('left', '605px').animate({
                left: 0
            });
        } else if ($index < $qindex) { //从后往前    右
            $pic.eq($qindex).animate({
                left: 605
            });
            $pic.eq($index).css('left', '-605px').animate({
                left: 0
            });
        }

    }
})(jQuery);
