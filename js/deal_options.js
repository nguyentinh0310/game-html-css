$(document).ready(function() {
	// Get language	
	$("#formDealOption").validate({
		rules : {
			"fccAmount" : {
				required : true,
			}
		},
		messages : {
			fccAmount : {
				required : $("#msgRequireFcc").val(),
			}
		},
		success: function(label) {
			$('#btnSubmitBuy').removeClass('button_disabled').prop('disabled', false);
		},
	});
});