;
(function(){
	var $onelunbo=$('.onelunbo');
	var $picli=$('.onelunbo ul li');
	var $btnli=$('.onelunbo ol li');
	var $left=$('#left');
	var $right=$('#right');
	var $piclilength=$picli.size();//size():jQuery 对象中元素的个数。
	var num=0;
	var timer=0;
	$btnli.on('click',function(){//on:在选择元素上绑定一个或多个事件的事件处理函数。on(events,[selector],[data],fn)events:添加多个事件类型，中间空格分开
		num=$(this).index();//将点击图片的下标，赋值给num
		tabswitch();
	});
	function tabswitch(){
		$btnli.eq(num).addClass('active').siblings($btnli).removeClass('active');
		//eq:获取第N个元素
		$picli.eq(num).animate({opacity:1}).siblings($picli).animate({opacity:0});
		/*animate:用于创建自定义动画的函数。 animate(params,[speed],[easing],[fn])
		params:运动的属性
		speed:运动的速度ms(slow-600,normal-400,fast-200);
		easing:运动的形式(swing缓冲默认,linear匀速)
		fn:回调函数*/
	}
	$right.on('click',function(){
		num++;
		if(num>$piclilength-1){
			num=0;
		}
		tabswitch();
	});
	$left.on('click',function(){
		num--;
		if(num<0){
			num=$piclilength-1;
		}
		tabswitch();
	});
	timer=setInterval(function(){
		$right.click();
	},2000);
	/*hover:一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。 hover([over,]out)
	over:移入
	out:移出*/
	$onelunbo.hover(function(){
		clearInterval(timer);
	},function(){
			timer=setInterval(function(){
			$right.click();
		},2000);
	})
	}
)(jQuery);