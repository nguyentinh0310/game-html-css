// Use this variable to check is click on the prize modal or not
var touchMoved = false;
var isTouchedThumb = false;
var isTouchedPrizeModal = false;

var isJustClosed=false;
$(document).ready(function() {
	
	init();
	
	/**
	 * Init
	 */
	function init() {
		
		// Fix bug on Firefox for the home page
		var currentUrl = window.location.href;
		if (currentUrl && currentUrl.includes("skillGame")) {
			$([ document.documentElement, document.body ]).animate({
				scrollTop : $("#skillGame").offset().top
			}, 1);
		}
		// End fix bug on Firefox for the home page
	}

	$('#btn-more-upcoming').click(function() {
		$('#more-upcoming').toggleClass('hidden');
	});
	
	/**
	 * show modal prize where click more
	 */
	$("div .show-prize-more").click(function() {
		
		var prizeModal = $(this).parent().parent().parent().find('.item-prize-ranking-modal');

		// Hide the modal
		prizeModal.css({
			"display" : "block",
			"opacity" : "0"
		});

		// Show the modal
		prizeModal.animate({
			opacity : '1'
		}, '5000', function() {

		});
	});
	
	
	
	/**
	 * handling the event whenever we hover the mouse on prize-info, thumb,
	 */
	
	$(".ranking-info-ongoing").mousemove(function( event ) {	
		console.log("scroll");
		// showPrizeModal(this);	
		hideAllModal();
	});
	
	$( ".swiper-container .thumb" ).mousemove(function( event ) {	
		isJustClosed=false;
		if(!isJustClosed){
			// showPrizeModal(this);	
		}
	});

	$(".swiper-container .title-ongoing").hover(
	// the over event
	function(e) {
		// showPrizeModal(this);
	}),
	// hover thump result
	$('.swiper-container .thumb-result').hover(
		function(e) {
			// showPrizeModal(this);
	}),
	/**
	 * 
	 */
	$('.swiper-container .prize-info, .swiper-container .thumb').bind('touchmove', function(e) {
		console.log("Touch Move");
		touchMoved = true;
	});

	/**
	 * 
	 */
	$('body').bind('touchend', function(e) {
		console.log("Body Touch End");
		if (!isTouchedThumb && !isTouchedPrizeModal)
			hideAllModal();

		isTouchedThumb = false;
		isTouchedPrizeModal = false;
	});

	/**
	 * 
	 */
	$('.swiper-container .prize-info, .swiper-container .thumb').bind('touchend', function(e) {
		console.log("Touch End");
		e.preventDefault();
		if (!touchMoved)
			showPrizeModal(this);

		// Reset
		touchMoved = false;
		isTouchedThumb = true;
	});

	/**
	 * 
	 */
	$('.item-prize-ranking-modal').bind('touchstart', function(e) {
		console.log("Prize Modal Touch Start");
		isTouchedPrizeModal = true;
	});

	/**
	 * Hide the modal when hover out of the modal
	 */
	$(".item-prize-ranking-modal").hover(
	// The over event
	function() {
		// do nothing
	},
	// the out event
	function() {
		hideAllModal();
	});

	/**
	 * Close the prize modal
	 */
	$(".item-prize-ranking-modal .close").click(function(e) {
		isJustClosed=true;
		hideAllModal();
		e.stopPropagation();
	});

	$('.item-prize-ranking-modal .close').bind('touchstart', function(e) {
		hideAllModal();
		e.stopPropagation();
	});

	/**
	 * Show prize modal
	 */
	function showPrizeModal(currElement) {
		// Get modal object
		var prizeModal = $(currElement).parent().parent().find('.item-prize-ranking-modal');

		// Hide the modal
		prizeModal.css({
			"display" : "block",
			"opacity" : "0"
		});

		// Show the modal
		prizeModal.animate({
			opacity : '1'
		}, '5000', function() {

		});
	}

	/**
	 * Hide all the modal in every items
	 */
	function hideAllModal() {
		// Hide all another modal
		$('.item-prize-ranking-modal').css({
			"display" : "none"
		});
	}
});