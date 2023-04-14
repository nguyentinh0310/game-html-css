$(document).ready(function() {
	$("#btnChangePassword").on('click', function(event) {
		change_password(event);
		$("#passwordChange").val("");
		$("#rePasswordChange").val("");
		$('#error_message_change_user').html('');
	});
	$(".affiliate-url").focus(function(event) {
		event.currentTarget.select();
	});
	$("#btnCopyAffiliateUrl").click(function(event) {
		var copyText = document.getElementById("iptAffiliateUrl");
		const isIOSDevice = navigator.userAgent.match(/ipad|iphone/i);
	    if (isIOSDevice) {
	    	copyText.setSelectionRange(0, copyText.value.length);
	    } else {
	    	copyText.select();
	    }
		document.execCommand("copy");		
	});
});

function change_password(event) {
	// Prevent default processing.
	event.preventDefault();
	var data = $('#update-password-form').serialize();
	$('#error_message_change_password').html('');

	$
			.ajax({
				type : "POST",
				url : OpenConstant.LINK_ROOT_URL + 'home/profile.do',
				data : data,
				dataType : "json",
				success : function(dataResponse) {
					// Return.
					if (!OpenPF.isValidAjaxResponse(dataResponse)) {
						// Add error alert.
						$('#error_message_change_password')
								.html(
										OpenPF
												.createAlertMessage(dataResponse.details));
					} else {
						$('#error_message_change_password')
								.html(
										OpenPF
												.createSuccessMessage(dataResponse.details));
					}
				},
				error : function() {
					// Add error alert.
					$('#error_message_change_password')
							.html(
									OpenPF
											.createAlertMessage(OpenResourceMessage.MSG_COMMON_UNKNOWN_ERROR));
				}
			});
}
