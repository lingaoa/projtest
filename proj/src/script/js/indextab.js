;
(function(){
	var $tabtop=$('.tab1-top div');
	var $tabbottom=$('.tab1-bottom div');
	$tabtop.on('click',function(){
		var $ind=$(this).index();
		$(this).addClass('tab1active').siblings().removeClass('tab1active');
		$tabbottom.eq($ind).css('display','block').siblings().css('display','none');
	})
})();