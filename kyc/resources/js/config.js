/* input[type="file"]でアップロードした画像ファイルを表示 */
$(function() {
	$('#file1').on("change", function (e) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#preview1').attr('src', e.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	});
	$('#file2').on("change", function (e) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#preview2').attr('src', e.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	});
	$('#file3').on("change", function (e) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#preview3').attr('src', e.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	});
});


/* input[type="file"]でアップロードしたファイルのファイル名を表示 */
$(function() {
	$('input[type="file"]').on('change', function () {
		var file = $(this).prop('files')[0];
		$(this).parent().next('p').text(file.name);
		if(file.name==''){
			$(this).parent().removeClass('upload');
		}else{
			$(this).parent().addClass('upload');
		}
	});
});


/* .accordion */
$(function() {
	$('.accordion dt').click(function(e) {
		$(this).toggleClass('open');
		$(this).next('dd').slideToggle();
	});
});


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


