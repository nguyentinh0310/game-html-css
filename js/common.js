$(document)
		.ready(
				function() {

					// Current active menu.
					var currentUrl = window.location.pathname;
					var currentActiveA = $('#navbar-collapse a[href*="{0}"]'.format(currentUrl));
					if (currentActiveA != null && currentActiveA != undefined) {
						$(currentActiveA).addClass("active");

						// Get parent.
						if ($(currentActiveA).parent().tagName != 'li') {
							$($(currentActiveA).parent().parent()).removeClass('collapse');
							$($(currentActiveA).parent().parent()).addClass('in');
						}
					}
					;

					// $('#my3dCarousel').Carousel3d('rotate', 4);

					var pathname = window.location.pathname; // Returns path
					// only

					if (pathname.indexOf('login.do') >= 0) {
						$('#header-login-form').hide();
						$('#menu-toggle').hide();
					}

					if (pathname.indexOf('promote.do') >= 0) {
						$('.main-slider').hide();
					}

					// form-login on mobile
					$("#menu-close").click(function(e) {
						e.preventDefault();
						$("#sidebar-wrapper").toggleClass("active");
					});
					$("#menu-toggle").click(function(e) {
						e.preventDefault();
						if ($('#navbar-collapse').attr('aria-expanded') == 'true') {
							$('button.navbar-toggle').click();
						}
						$("#sidebar-wrapper").toggleClass("active");
					});

					$(".navbar-toggle").click(function(e) {
						$("#sidebar-wrapper").removeClass("active");
					});

					$("[rel='tooltip']").tooltip();

					$('.thumbnail').hover(function() {
						$(this).find('.caption').slideDown(250); // .fadeIn(250)
					}, function() {
						$(this).find('.caption').slideUp(250); // .fadeOut(205)
					});

					// Start pooling login status if need.
					if (OpenConstant.LOGIN_ID != undefined && OpenConstant.LOGIN_ID != null) {
						// Ajax setup.
						mypage_common_pool_setup();

						// Set interval for pool stats.
						window.setTimeout(function() {

							mypage_common_pool_stats();
						}, 5000);
					}
					// Prevent multi click button for type submit.
					$('form').on('submit', function() {

						$("input[type='submit']", this).each(function() {

							$('<input type="hidden" name="{0}"></input>'.format($(this).attr('name'))).appendTo(this.form);
							this.disabled = true;
						});

						$("button[type='submit']", this).each(function() {

							$('<input type="hidden" name="{0}"></input>'.format($(this).attr('name'))).appendTo(this.form);
							this.disabled = true;
						});

					});
					// Global setting validation.
					if (jQuery.validator != undefined) {
						jQuery.validator.setDefaults({
							// Highlight.
							highlight : function(element) {

								$(element).closest('.input-item').addClass('has-error');
							},

							// Highlight.
							unhighlight : function(element) {

								$(element).closest('.input-item').removeClass('has-error');
							},

							// Error placement.
							errorElement : 'span',
							errorPlacement : function(error, element) {

								error.appendTo($(element).closest('.input-item'));
							},

							// Error class.
							errorClass : 'help-block text-right',

							// Callback
							invalidHandler : function(event, validator) {

								$("input[type='submit']", this).each(function() {

									this.disabled = false;
								});

								$("button[type='submit']", this).each(function() {

									this.disabled = false;
								});
							}
						});
					}
					// format date from server
					$('.news-media').each(function(i, obj) {
						$(obj).text(convertDateString($(obj).text()));
					});
					$(".language")
							.load(
									OpenConstant.LINK_ROOT_URL + "common/load_language.do",
									function(data, status, xhr) {
										var jsonData = JSON.parse(data);
										var languages = jsonData.ajaxOutBaseModel.language;
										var htmlF = [];
										$
												.each(
														languages,
														function(i) {
															var html = '';
															html = '<a href="javascript:OpenPF.changeCurrrentPage({2}, {3}{0}{3});"><img class="flag-icon" src= "{1}/static/common/images/flags/{0}.png" alt={0} /></a>'
																	.format(languages[i].languageCode, OpenConstant.RESOURCE_URL, "'language'", "'");

															htmlF.push(html);
														});

										$(".language").html(htmlF);
									});

				});

function startTime(endTime) {	
	
	if (endTime == 'undefined')
		return;

	// var endTime = Date.parse(new Date(endTime));
	/*var currentTime = Date.parse(new Date());
	var timeLeft = endTime - currentTime;
	var seconds, minutes, hours;
	var h, m, s;

	var countTime = function() {
		timeLeft -= 1000;
		seconds = (timeLeft / 1000) % 60;
		minutes = (timeLeft / (1000 * 60)) % 60;
		hours = (timeLeft / (1000 * 60 * 60)) % 24;

		m = checkTime(Math.floor(minutes));
		s = checkTime(Math.floor(seconds));
		h = checkTime(Math.floor(hours));

		document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
	};
	countTime();
	setInterval(countTime, 1000);*/
}
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	; // add zero in front of numbers < 10
	return i;
}

var last_pool_time = undefined;
/**
 * Ajax setup for pool setup.
 */

function mypage_common_pool_setup() {

	// Get CSRF Token
	var csrf_token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	// Setup pool time.
	$.ajaxSetup({
		beforeSend : function(xhr) {

			// Set CSRF Token.
			xhr.setRequestHeader(header, csrf_token);

			// Update last request time.
			if (!this.url.contains('common/pool_stats.do')) {
				last_pool_time = new Date().getTime();
			}
		}
	});
}

/**
 * Common function which is used by my page for pooling login status.
 */

function mypage_common_pool_stats() {

	// Get current time.
	var now = new Date().getTime();

	// Over 1 hour without any action.
	if (now - last_pool_time > OpenConstant.AJAX_POOLING_TIME) {
		// Force logout.
		$('#logout_form').submit();
		return;
	}

	$.ajax({
		url : OpenConstant.LINK_ROOT_URL + 'common/pool_stats.do?id=' + OpenConstant.LOGIN_ID,
		// Success.
		success : function response(data) {

			// NOT OK, reload page.
			if (data.statusCode == undefined) {
				location.reload();
			}

			// Validate status code.
			if (data.statusCode != OpenConstant.AJAX_STATUS_CODE_OK) {
				var alertData = {};
				alertData.title = 'Warning';
				alertData.message = data.details;

				// Reload page on close.
				alertData.onModalClose = function() {

					// Reload page.
					window.location.reload();
				};

				// Button list.
				alertData.buttons = [ {
					id : 'reload',
					title : 'Close',
					exClass : 'btn-green',
					iconClass : 'glyphicon glyphicon-remove',
					handle : function(event, modal, button) {

						// Reload page.
						window.location.reload();
					}
				} ];

				mypage_common_alert(alertData);
			} else {
				// Set timeout.
				window.setTimeout(function() {

					mypage_common_pool_stats();
				}, 2500);
			}
		},

		// Error case.
		error : function error() {

			// Reload page.
			location.reload();
		},

		dataType : 'json',
		async : true
	});
};

/**
 * Function is used to display alert.
 * 
 * @param alertData
 * @returns
 */

function mypage_common_alert(alertData) {

	// Set modal data.
	$('#common_modal').data('z-modal-data', alertData);

	// Set title.
	$('#common_modal .modal-title').html(alertData.title);
	$('#common_modal #message').html(alertData.message);

	// Create button.
	$('#common_modal .modal-footer').html('');
	$('#common_modal #error-message').html('');

	if (alertData.onModalClose != undefined) {
		$('#common_modal').on('hidden.bs.modal', function() {

			var alertData = $('#common_modal').data('z-modal-data');
			alertData.onModalClose();
		});
	}

	for (var i = 0; i < alertData.buttons.length; i++) {
		// Button.
		var button = alertData.buttons[i];

		// Create button.
		var html = '<button type="button" class="btn {0} btn-square" id="{1}"><span class="{2}"></span>&nbsp;{3}</button>'.format(button.exClass,
				button.id, button.iconClass, button.title);

		// Appends.
		$('#common_modal .modal-footer').append(html);

		// Add event.
		$('#common_modal .modal-footer #' + button.id).data('z-data-onclick', button);
		$('#common_modal .modal-footer #' + button.id).on('click', function(event) {

			var buttonData = $(this).data('z-data-onclick');
			buttonData.handle(event, '#common_modal', this);
		});
	}
	// Shown.
	$('#common_modal').modal('show');
};

$("#anchor-rest-fields").click(function(e) {
	$(".contact-us-form").trigger("reset");

	return false;
});

function convertDateString(dateString) {
	return $.format.date(dateString, "yyyy.MM.dd");
}

/* SONG JAVASCRIPT */

$(document).ready(function() {
	/**
	 * 
	 */
	$("#btn-login, #btn-login-1").click(function() {
		$('#pills-register-tab').removeClass('active show');
		$('#pills-register').removeClass('active show');

		$('#pills-login-tab').addClass('active show');
		$('#pills-login').addClass('active show');

		$("#login-register-modal").modal("show");
	});

	/**
	 * Initial the swiper for the organizing slider
	 */
	var organizeSwiper = new Swiper('.result-rangking', {
		speed : 1000,
		slidesPerView : 4,
		centeredSlides : false,
		spaceBetween : 30,
		cssWidthAndHeight : true,
		visibilityFullFit : true,
		autoResize : true,
		allowTouchMove : true,
		keyboardControl : true,
		keyboard: {
			enabled: true,
		  },
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		  },
		navigation : {
			nextEl : '.swiper-button-next',
			prevEl : '.swiper-button-prev',
		},	
		// Responsive breakpoints
		breakpoints: {
		    // when window width is <= 767.98px
			767.98: {
		      slidesPerView: 1,
		      spaceBetween: 10,
		      centeredSlides:true
		    },
		    // when window width is <= 992px
			1200: {
		      slidesPerView: 2,
		      spaceBetween: 20,
		      centeredSlides:false
		    },
		    // when window width is <= 1920px
		    3000: {
		      slidesPerView: 3,
		      spaceBetween: 30,
		      centeredSlides:false
		    }
		}
	});
	
	var ongoingSwiper = new Swiper('.swiper-ongoing', {
		speed : 1000,
		slidesPerView : 4,
		centeredSlides : true,
		spaceBetween : 3,
		cssWidthAndHeight : true,
		visibilityFullFit : true,
		autoResize : true,
		allowTouchMove : true,
		keyboardControl : true,
		keyboard: {
			enabled: true,
		  },
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		  },
		navigation : {
			nextEl : '.swiper-button-next',
			prevEl : '.swiper-button-prev',
		},	
		// Responsive breakpoints
		breakpoints: {
		    // when window width is <= 767.98px
			767.98: {
		      slidesPerView: 1,
		      spaceBetween: 3,
		      centeredSlides:true
		    },
		    // when window width is <= 992px
			1200: {
		      slidesPerView: 2,
		      spaceBetween: 3,
		      centeredSlides:false
		    },
		    // when window width is <= 1920px
		    3000: {
		      slidesPerView: 2,
		      spaceBetween: 3,
		      centeredSlides:false
		    }
		}
	});	
	var tournamentSwiper = new Swiper('.swiper-tournament', {
		speed : 1000,
		slidesPerView : 4,
		centeredSlides : true,
		spaceBetween : 30,
		cssWidthAndHeight : true,
		visibilityFullFit : true,
		autoResize : true,
		allowTouchMove : true,
		keyboardControl : true,
		keyboard: {
			enabled: true,
		  },
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		  },
		navigation : {
			nextEl : '.swiper-button-next',
			prevEl : '.swiper-button-prev',
		},	
		// Responsive breakpoints
		breakpoints: {
		    // when window width is <= 767.98px
			767.98: {
		      slidesPerView: 1,
		      spaceBetween: 30,
		      centeredSlides:true
		    },
		    // when window width is <= 992px
			1200: {
		      slidesPerView: 2,
		      spaceBetween: 30,
		      centeredSlides:false
		    },
		    // when window width is <= 1920px
		    3000: {
		      slidesPerView: 2,
		      spaceBetween: 30,
		      centeredSlides:false
		    }
		}
	});	
});