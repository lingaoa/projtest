;(function(){
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