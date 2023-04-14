$(document).ready(function () {

	// Boostrap switch.
	$(".on_off").bootstrapSwitch();

	// Initial validator
	$('form').validate({
		// Rule:
		rules: {
			// Email item.
			email: {
				required: true,
				email: true
			}
		},

		// Message.
		messages: {
			// Email item.
			email: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD,
				email: OpenResourceMessage.MSG_EMAIL_FEILD
			}
		}
	});
});