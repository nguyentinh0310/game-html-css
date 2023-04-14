$(document).ready(function () {
	
	// Reload a page when using browser back button
	window.addEventListener( "pageshow", function ( event ) {
	  var historyTraversal = event.persisted || 
	                         ( typeof window.performance != "undefined" && 
	                              window.performance.navigation.type === 2 );
	  if ( historyTraversal ) {
	    window.location.reload();
	  }
	});

	// Initial a validator for the form of login modal
	$('#formLoginModal').validate({
		// Rule:
		rules: {
			// User name.
			j_username: {
				required: true
			},

			// Password.
			j_password: {
				required: true
			}
		},

		// Message.
		messages: {
			// User name.
			j_username: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD
			},

			// Password.
			j_password: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD
			}
		}
	});

	// Initial a validator for the form of login page
	$('#formLoginPage').validate({
		// Rule:
		rules: {
			// User name.
			j_username: {
				required: true
			},

			// Password.
			j_password: {
				required: true
			}
		},

		// Message.
		messages: {
			// User name.
			j_username: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD
			},

			// Password.
			j_password: {
				required: OpenResourceMessage.MSG_REQUIRED_FIELD
			}
		}
	});
	
});