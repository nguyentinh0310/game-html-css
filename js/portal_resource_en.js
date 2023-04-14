/**
 * Open Resource.
 */
var OpenResourceMessage = {
	MSG_NUMBER_FIELD : "It's needed to input a number value.",
	MSG_REQUIRED_FIELD : "This field is required.",
	MSG_EMAIL_FEILD : "Format of e-mail address is invalid.",
	MSG_RE_PASSWORD_FIELD : "Password and confirmation password does not match.",
};

/**
 * Open Resource Text.
 */
var OpenResourceText = {
	GAME_HISTORY_DETAILS_GAME: "Game",
	GAME_HISTORY_DETAILS_VIEW: "Details",
	// Datatable language config.
	DT_LANGUAGE: {
		'sLengthMenu': '_MENU_/page',
		'sZeroRecords': 'Data not found.',
		'sInfo': 'Displaying from _START_ to _END_ in total _TOTAL_ records.',
		'sInfoEmpty': 'Displaying from 0 to 0 in total 0 records.',
		'sInfoFiltered': '(Searched from total _MAX_ records.)',
		'sProcessing': 'Loading',
		'sSearch': 'Quick Search:',
		"oPaginate": {
			"sFirst": "«",
			"sLast": "»",
			"sNext": "→",
			"sPrevious": "←"
		}
	},

	// Date Range Language config
	DATE_RANGE_PICKER_COMMON_CONFIG: {
		'showDropdowns': 'true',
		'showWeekNumbers': 'true',
		'timePicker': 'false',
		'timePickerIncrement': '1',
		'timePicker12Hour': 'true',
		'opens': 'left',
		'buttonClasses': ['btn btn-default'],
		'applyClass': 'btn-small btn-primary',
		'cancelClass': 'btn-small',
		'separator': ' to ',
		'locale': {
			'applyLabel': 'Submit',
			'fromLabel': 'From',
			'toLabel': 'To',
			'customRangeLabel': 'Custom Range',
			'daysOfWeek': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			'firstDay': '1'
		}
	},

	// Common predefined range.
	DATE_PICKER_COMMON_RANGE: function () {

		var commonRange = {
			'This week' : [ moment().startOf('week'), moment().endOf('week') ],
			'Last 2 weeks' : [ moment().subtract('days', 14), moment() ],
			'This month' : [ moment().startOf('month'), moment().endOf('month') ],
		};
		return commonRange;
	},
	DATE_RANGE_PICKER_FORMAT: 'YYYY/MM/DD',

	// Date format
	YYYYMMDD_HH_mm_ss_SSS_GMT: 'YYYY/MM/DD <br> HH:mm:ss.SSS [GMT] Z',
	YYYYMMDD_HH_mm_ss: 'YYYY/MM/DD <br> HH:mm:ss',
	YYYYMMDD_HH_mm_ss_SSS: 'YYYY/MM/DD <br> HH:mm:ss.SSS',
	HH_mm_ss_SSS: 'HH:mm:ss.SSS',
	HH_mm_ss: 'HH:mm:ss',

	// Invite state
	INVITE_STATE: ['Waiting for registration', 'Registered'],

	// Play history state
	PLAY_HISTORY_STATE: ['Waiting', 'Accumulated'],

	// Exchange type
	PLAY_HISTORY_TYPE: ['Payment', 'Deposit'],

	// Exchange state.
	PLAY_HISTORY_STATE: ['First', 'Complete', 'Failure', 'Waiting'],

	NONE: 'None',
};