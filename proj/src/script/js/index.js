;
(function(){
	var $lbpic=$('.onelunbo ul li a img');//轮播图
	var $stapic=$('.watch ul li a img');//限时抢购图片
	var $floorstapic=$('.floor-two a img');//轮播右边的两张图
	var $pricepic=$('.yao-nav li a:first-child img');//轮播下面的五张图
	var $pricename=$('.yao-nav li a:nth-of-type(2)');//五张图的药品名字
	var $pricemoney=$('.yao-nav li span');//五张图的药品价格
	
	console.log($pricepic.size());
	var $num=0;//获取从第五张开始时，只有两个长度时，$floorstapic的下标
		$.ajax({
			url:"http://localhost/projtest/proj/php/master.php",
			dataType:'json'
		}).done(function(data){
			var $lunboshuju=data.lunbo;
			var $stashuju=data.sta;
			var $shop=data.pricepic;
			$.each($lunboshuju, function(index, value) {
			    $lbpic.eq(index).attr({src:value.url})
			});
			/*$.each($stashuju, function(index, value) {
			    $stapic.eq(index).attr({src:value.url})
			});*/
			
			//限时抢购的图
			for(var i=0;i<$stapic.length;i++){
				$stapic.eq(i).attr({src:$stashuju[i].url})
			}
			
			//楼层轮播右边的两张图
			for(var i=4;i<$stashuju.length;i++){
				$floorstapic.eq($num).attr({src:$stashuju[i].url})
				$num++;
			}
			
			//楼层轮播下面的五张图
			$.each($shop, function(index, value) {
			    $pricepic.eq(index).attr({src:value.url});
			    $pricename.eq(index).html(value.shopname);
			    $pricemoney.eq(index).html(value.price);
			});
		})
	}
)(jQuery);