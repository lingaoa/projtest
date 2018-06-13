;
(function(){
	var $box=$('.floor-right');
	var $arr=['#92c4ff','#ffa27a','#ff6b6b','#f6c89e','#aee177'];
	var $arrfloor=['1F','2F','3F','4F','5F','↑'];
	var $arrname=['家庭常备','专科用药','滋补保健','维生素钙','医疗器械','回到顶部'];
	$.each($arr,function(index,value){
		$box.eq(index).css('border-top', '2px solid'+value);
	})
	
	var $louti = $('.louceng'); //楼梯
    var $lca= $('.louceng a'); //楼层
    var $louceng=$('.floor');
    var $floornum=$('.floornum');
    //1.拖动滚动条到适当的位置显示楼梯。
    $lca.hover(function(){
    	var $x=$(this).index();
    	$(this).addClass('blue').html($arrname[$x]);
    },function(){
    	var $x=$(this).index();
    	$(this).removeClass('blue').html($arrfloor[$x]);
    	$(window).scroll();
    })
    
    
    
    $(window).on('scroll', function() {
        var $scrolltop = $(this).scrollTop();//滚动的距离
        if ($scrolltop >= 550) {
            $louti.show();
        } else {
            $louti.hide();
        }
        //4.拖动滚动条，楼梯和楼层进行匹配。
        $louceng.each(function(index,element){
        	var $top=$(this).offset().top+260;
        	$('.louceng a').eq(index).html($arrfloor[index]);
        	if($top>$scrolltop && $scrolltop<3200){//滚动条的top值小于楼层的top值，给楼层对应的楼梯添加red
        		var $in=$(this).index('.floor');
        		$floornum.css({'background':'#ccc','color':'#fff'})
        		$floornum.eq($in).css({'background':$arr[$in],'color':'#fff'});
        		for(var i=$in;i<5;i++){
        			$('.louceng a').eq(i).removeClass('blue').html($arrfloor[i]);
        		}
        		$('.louceng a').removeClass('blue');//移出所有楼梯上面的类。
        		$('.louceng a').eq($in).addClass('blue').html($arrname[$in]);
        		
        		return false;
        	}else{
        		$('.louceng a').removeClass('blue');
        	}
        });

    });

    //2.点击对应的楼梯，将楼层的top赋值给滚动条
    $('.louceng a').not('.huiding').on('click', function() {
        $(this).addClass('blue').siblings('.louceng a').removeClass('blue');
        //获取每一个楼层的top值(楼梯和楼层一一对应的)
        var $top = $louceng.eq($(this).index('.louceng a')).offset().top;
        $('html,body').animate({ //兼容赋值
            scrollTop: $top
        })
    });

    //3.回到顶部
    $('.huiding').on('click', function(){
        $('html,body').animate({ //兼容赋值
            scrollTop: 0
        });
    });
})(jQuery);