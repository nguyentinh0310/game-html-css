/* Slick */
$(function() {
	if($('.slick').length){
		$('.slick').slick({
			speed: 800,
			infinite: false,
			fade:false,
			arrows: true,
			dots: false,
			pauseOnHover: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			cssEase: 'linear',
			swipe:false,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
				}
			}]
		});
	}
});




/* メニュー */
$(function() {
	$('#btnmenu').click(function(e) {
		$('header nav .main').fadeToggle('normal');
		$('#btnmenu').toggleClass('close');
	});
	$('header nav ul li a').click(function(e) {
		if($('.only_smart').css('display')=="block")$('header nav').fadeToggle('normal');
		$('#btnmenu').toggleClass('close');
	});
});

$(window).resize(function() {
	if(navigator.userAgent.indexOf('iPhone')>0 || navigator.userAgent.indexOf('iPad')>0 || navigator.userAgent.indexOf('iPod')>0 || navigator.userAgent.indexOf('Android')>0 || navigator.userAgent.indexOf('Windows Phone')>0)return;
	if($('.only_smart').css('display')=="none"){
		$('header nav .main').show();
		$('#btnmenu').removeClass('close');
	}else{
		$('header nav .main').hide();
		$('#btnmenu').removeClass('close');
	}
});


/* スムーススクロール */
$(function(){
	$('a[href^="#"]').click(function(){
		var adjust = 0;
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top + adjust;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
});


/* 固定表示 */
$(window).on('load scroll',function(){
	var scr_count = $(document).scrollTop();
	
	if(scr_count>300){
		if($('.only_smart').css('display')=='none'){
			$('#topbtn').css('bottom','60px');
		}else{
			$('#topbtn').css('bottom','20%');
		}
	}else{
		$('#topbtn').css('bottom','-150px');
	}
});


