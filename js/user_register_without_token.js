$(document).ready(function() {
	
	$("#registButton").on('click', function(event) {
		regist_user(event);
	});

});

function regist_user(event) {
	// Prevent default processing.
	event.preventDefault();
	var data = $('#registForm').serialize();
	$('#error_message').html('');
	$('#message').html('');
	
	$.ajax({
		type : "POST",
		url : "regist.do",
		data : data,
		dataType : "json",
		success : function(dataResponse) {

			// Return.
			if (!OpenPF.isValidAjaxResponse(dataResponse)) {
				// Add error alert.
				$('#error_message').html(OpenPF.createAlertMessage(dataResponse.details));
			} else {
				// show pop up.		
				$('#message').html(OpenPF.createSuccessMessage(dataResponse.details));
			}
		},
		error : function() {
			
			// Add error alert.
			$('#error_message').html(OpenPF.createAlertMessage(OpenResourceMessage.MSG_COMMON_UNKNOWN_ERROR));
		}
	});
}
