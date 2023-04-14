$(document).ready(function () {

	// Validate form.
	$('#register-email-form').validate({
		rules: {
			'userInfo.email': {
				required: true,
				email: true
			}
		},
		messages: {
			'userInfo.email': {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD,
				email: OpenResourceMessage.MSG_EMAIL_FEILD
			}
		}
	});

	// Validate checked state.
	$('.groupChecked').click(function () {

		var checkboxes = $('.groupChecked');
		var count = 0;
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				count++;
			}
		}
		if (count == 2) {
			$('#send_mail').removeAttr('disabled');
		}
		else {
			$('#send_mail').attr('disabled', 'disabled');
		}
	});
});