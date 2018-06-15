;(function(){
		function addCookie(key, value, day) {
	        var date = new Date(); //创建日期对象
	        date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
	        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
	    }
	
	    function getCookie(key) {
	        var str = decodeURI(document.cookie);
	        var arr = str.split('; ');
	        for (var i = 0; i < arr.length; i++) {
	            var arr1 = arr[i].split('=');
	            if (arr1[0] == key) {
	                return arr1[1];
	            }
	        }
	    }
	
	    function delCookie(key) {
	        addCookie(key, '', -1); //添加的函数,将时间设置为过去时间
	    }
		
			var $id=getCookie('id');
			$.ajax({
				url:"../../php/details.php",
				data:{
					pid:$id
				},
				dataType:'json'
			}).done(function(data){
				$.each(data, function(index,value) {
					$picurl=value.url;
					$price=value.price;
				});
				$arr=$picurl.split(',');

				var $smallpic=$('#ulist ul li img');
				var $spic=$('#spic img');
				var $bpic=$('#bpic');
				var $jiage=$('.price dd');
				$jiage.html($price);
				$.each($arr, function(index,value) {
					if(index>=1){
						$smallpic.eq(index-1).attr({src:value});
					}
				});
				$spic.eq(0).attr({src:$arr[1]});
				$bpic.attr({src:$arr[1]});
				//delCookie('id');
			});
			
			
			
			
		$nav=$('.mtop-lnav');
		$('.fenlei').hover(function(){
			$nav.css('display','block');
		},function(){
			$nav.css('display','none');
		})
		$nav.hover(function(){
			$(this).css('display','block');
		},function(){
			$(this).css('display','none');
		})
		$add=$('.num_up');
		$down=$('.num_down');
		$num=$('.num');
		$add.on('click',function(){
			var s=$num.val();
			s++;
			$num.val(s);
		})
		$down.on('click',function(){
			var s=$num.val();
			s--;
			if(s<=1){
				s=1;
			}
			$num.val(s);
		})
		
		//判断用户名是否存在,存在现实欢迎词
	    if(getCookie('uname')){
	    	$('.login').hide();
	    	$('.admin').show().find('i').html(getCookie('uname'));
	    }
	
	    //点击退出按钮，清除cookie，显示请登录和请注册。
	    $('.admin a').on('click',function(){
	    	delCookie('uname');
	    	$('.admin').hide();
	    	$('.login').show();
	    	location.reload();
	    });
	    
	    if($('.admin').css('display')=='none'){
	    	alert('请先登录');
	    	location.href='login.html';
	    }
})();