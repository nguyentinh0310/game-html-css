$(document).ready(function () {

	// Nick name validate form.
	$('#update-nickname-form').validate({
		rules: {
			'userInfo.nickName': {
				required: true
			}
		},
		messages: {
			'userInfo.nickName': {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD,
			}
		}
	});

	// Password validate form.
	$('#update-password-form').validate({
		rules: {
			password: {
				required: true
			},
			rePassword: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			password: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD,
			},
			rePassword: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD,
				equalTo: OpenResourceMessage.MSG_RE_PASSWORD_FIELD
			}
		}
	});
});