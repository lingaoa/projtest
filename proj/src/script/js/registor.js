;(function(){
		var $uname=$('#username');
		var $pwd=$('#password');
		var $repwd=$('#repwd');
		var $check=$('#argee');
		var $usernamelock = false;
	    var $passwordlock = false;
	    var $repasswordlock = false;
	    var $checklock=true;
	    
			
	    $uname.on('focus',function(){
			$('p').eq(0).css('color','#a5a5a5').html('请输入3-15位字符(汉字、字母、下划线)');
		})
	    $uname.focus();
	    
	    $uname.on('blur', function() {
	        //用户名：3-15字符长度，支持汉字、字母、数字及_
	        var reg1 = /^([\u4e00-\u9fa5]|\w){3,15}$/;
	        var $username = $(this).val();
	        if ($username != '') {
	            if (reg1.test($username)) { //通过的
	                //将用户名传给后端进行匹配用户名是否存在
	                $.ajax({
	                    type: 'post',
	                    url: '../../php/reg.php',
	                    async: true, //异步
	                    data: {
	                        repeatname: $username
	                    }
	                }).done(function(d) { //成功--success  后端返回的结果
	                    if (!d) { //没有重复
	                       $('p').eq(0).css('color', 'green').html('√');
	                        $usernamelock = true;
	                    } else { //有重复
	                        $('p').eq(0).next('span').css('color', 'red').html('该用户名已存在');
	                        $usernamelock = false;
	                    }
	                });
	            } else { //不通过
	                $('p').eq(0).css('color', 'red').html('请检查输入是否错误');
	                $usernamelock = false;
	            }
	
	        } else { //不通过
	            $('p').eq(0).css('color', 'red').html('用户名不能为空');
	            $usernamelock = false;
	        }
	    });
	    
	    $pwd.on('focus',function(){
	    	$('p').eq(1).css('color','#a5a5a5').html('请输入6位以上的密码');
	    })
	    $pwd.on('blur', function() {
        	//密码：非中文
	        var reg2 = /.{6,}/;
	        var $password = $(this).val();
	        if ($password != '') {
	            if (reg2.test($password)) { //通过的
	                $('p').eq(1).css('color', 'green').html('√');
	                $passwordlock = true;
	            } else { //不通过
	                 $('p').eq(1).css('color', 'red').html('密码格式有误');
	                $passwordlock = false;
	            }
	        } else { //不通过
	             $('p').eq(1).css('color', 'red').html('密码不能为空');
	            $passwordlock = false;
	        }
    	});
    	//验证密码强度
		$pwd.on('input',function(){
			$passvalue=$pwd.val();
			var level = 0;
			var reg1 = /\d+/
			var reg2 = /[a-zA-Z]+/
			var reg3 = /\W+/
			if (reg1.test($passvalue)) {
				level++;
			}
			if ($passvalue.length>=6&&reg2.test($passvalue)) {
				level++;
			}
			if ($passvalue.length>=7&&reg3.test($passvalue)) {
				level++;
			}
			switch (level) {
				case 1:
					$('p').eq(1).css('color','red').html('密码简单,不推荐您使用');
					break;
				case 2:
					$('p').eq(1).css('color','orange').html('密码安全程度适中');
					break;
				case 3:
					$('p').eq(1).css('color','green').html('密码安全度高，可放心使用');
					break;
			}
		})
    	
    	$repwd.on('focus',function(){
    		$('p').eq(2).css('color','#a5a5a5').html('请再次确认密码');
    	})
    	//确认密码
    	$repwd.on('blur', function() {
    		var $repass=$(this).val();
	        if ($repass != '') {
	            if ($passwordlock) {//密码重复验证需要密码格式正确。
	                if ($repass == $('#password').val()) {
	                    $('p').eq(2).css('color', 'green').html('√');
	                    $repasswordlock = true;
	                } else {
	                    $('p').eq(2).css('color', 'red').html('密码不一致');
	                    $repasswordlock = false;
	                }
	            } else { //不通过
	                $('p').eq(2).css('color', 'red').html('密码格式错误');
	                $repasswordlock = false;
	            }
	        } else {
	            $('p').eq(2).css('color', 'red').html('确认密码不能为空');
	            $repasswordlock = false;
	        }
    	});
    	
    	$check.on('click',function(){
	    	if($check.is(':checked')){
				$checklock=true;
				$('#agree-ts').html(' ');
			}else{
				$checklock=false;
				$('#agree-ts').html('必选').css('color','red');
			}
	    })
    	
    	$('form').on('submit', function() {
	        if ($('#username').val() == '') {
	            $('p').eq(0).css('color', 'red').html('用户名不能为空');
	            $('#username').focus();
	            return false;
	        }
	        if ($('#password').val() == '') {
	            $('p').eq(1).css('color', 'red').html('密码不能为空');
	            return false;
	        }
	        if ($('#password').val() != $('#repwd').val()) {
	            $('p').eq(2).css('color', 'red').html('密码不一致');
	            return false;
	        }
	        //所有的表单通过验证才有效果
	        if (!$usernamelock || !$passwordlock || !$repasswordlock || !$checklock) { //如果namelock为false，阻止跳转。
	            return false;
	        } else {
	
	        }
    });
})();