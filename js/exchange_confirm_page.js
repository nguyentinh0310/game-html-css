$(document).ready(function () {

	// Initial validator
	$('form').validate({
		// Rule:
		rules: {
			// Pin input
			pin: {
				required: true
			}
		},

		// Message.
		messages: {
			// User name.
			pin: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD
			}
		}
	});
});