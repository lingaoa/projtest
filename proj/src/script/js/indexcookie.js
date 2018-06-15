;(function(){
    //判断用户名是否存在,存在现实欢迎词
    if(getCookie('uname')){
    	$('.login').hide();
    	$('.admin').show().find('i').html(getCookie('uname'));//将获取的cookie值添加到span元素中
    }

    //点击退出按钮，清除cookie，显示请登录和请注册。
    $('.admin a').on('click',function(){
    	delCookie('uname');
    	$('.admin').hide();
    	$('.login').show();
    });
    
    
    $('.floor a').on('click',function(){
    	delCookie('id');
    	var $dis=$('.login').css('display');
    	if($dis!='none'){
    		alert('请先登录');
    		return false;
    	}else{
    		var $x=$(this).find('img').attr('x');
			$.cookie('id',$x);
    	}
    })
  	$dianji=$('.yao-nav li');
  	$dianji.on('click',function(){
  		var $x=$(this).index();
  		//alert($x);
  		location.href='details.html?id='+$(this).find('img').attr('x');
  	})
  	
  	$d=location.search.split("?")[0];
})();