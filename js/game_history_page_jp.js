var game_calendar = undefined;
var events = undefined;
var gameId = $("#gameId").text();
var date_actives = undefined;
var current_date = undefined;
var play_history_table = undefined;
$(document).ready(function () {

	/*--------------------------------------- PAGE PROCESSING -------------------------------*/
	var date = new Date();
	current_date = date;
	// Init database table.
	play_history_table = $('#play_history_table').dataTable({
		'sDom': '<"row"<"col-xs-6">>rt<"row"<"col-xs-6"i><"col-xs-6"p>>',
		'bProcessing': true,
		'bServerSide': true,
		'sAjaxSource': 'play_history_datatable.do',
		'fnServerData': function (sSource, aoData, fnCallback, oSettings) {

			aoData.push({
				"name": "iGame",
				"value": $('#gameId').text()
			});
			aoData.push({
				"name": "lDate",
				"value": current_date
			});
			oSettings.jqXHR = $.ajax({
				'dataType': 'json',
				'type': 'POST',
				'url': sSource,
				'data': aoData,
				'success': fnCallback
			});
		},
		'aaSorting': [
			[
			0, 'desc']
		],
		'aoColumns': [{
			'sClass': 'text-center td-middle',
			'mRender': function (data, type, full) {

				var dtStart = new Date(data);
				var dtStartWrapper = moment(dtStart);
				return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.HH_mm_ss);
			},
			'mData': 'recordCreatedTime',
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'entryPoint',
			'mRender': function (data, type, full) {
				var html = '<span class="badge red">';
				html += $.number(data) + '</span>';
				return html;
			},
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'prizePoint',
			'mRender': function (data, type, full) {

				var value = '';
				// Check state
				if (full.state == OpenConstant.PLAY_HISTORY_STATE_DONE) {
					value += $.number(data);
				}
				else {
					value = OpenResourceText.PLAY_HISTORY_STATE[full.state];
				}

				return '<span class="badge blue">{0}</span>'.format(value);
			},
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'bSortable': false,
			'mData': function () {

				return '';
			},
			// Render operation action.
			'mRender': function (data, type, full) {

				var html = '';
				html += '<button type="button" onclick="show_history_detail({0});" class="btn btn-xs btn-square btn-green"><i class="fa fa-eye"></i>{1}</button>'.format(full.id, OpenResourceText.GAME_HISTORY_DETAILS_VIEW);
				return html;
			}
		}]
	});
	// Load calendear.
	game_calendar = $('#calendar').fullCalendar({
		header: {
			left: '',
			center: 'title',
			right: ''
		},
		editable: false,
		droppable: false,
		selectable: true,
		allDayDefault: false,
		buttonText: {
			today: '今日'
		},
		titleFormat: {
			month: 'yyyy年MM月'
		},
		dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
		dayRender: function (date, cell) {

			var dateString = $.fullCalendar.formatDate(date, 'yyyy-MM-dd');
			if (date_actives != undefined && date_actives.length > 0) {
				var i = 0;
				do {
					if (date_actives[i].date == dateString) {
						// Schedule.
						if ($('.schedule-mark-schedule', cell) == undefined || $('.schedule-mark-schedule', cell).length == 0) {
							$('.fc-day-content', cell).append('<div class="schedule-mark-schedule"></div>');
						}
					}
					i = i + 1;
				} while (i < date_actives.length);
			}
			var today = new Date();
			if ($.fullCalendar.formatDate(date, 'yyyy-MM-dd') === $.fullCalendar.formatDate(today, 'yyyy-MM-dd')) {
				$('.fc-day-number', cell).addClass('fc-mytoday');
			}
		},
		dayClick: function (date, allDay, jsEvent, view) {

			// Show history by date
			focusDay(date);
			current_date = date;
			play_history_table_reload();
		}
	});
	// Replace button prev in calendar
	$('td.fc-header-left').append('<span id="btn-prev" class="fc-button fc-button-prev fc-state-default fc-corner-left" unselectable="on"><span class="fc-text-arrow">‹</span></span>');
	// Replace button next in calendar
	$('td.fc-header-right').append('<span id="btn-next" class="fc-button fc-button-next fc-state-default fc-corner-right" unselectable="on"><span class="fc-text-arrow">›</span></span>');
	$('#btn-next').click(function () {

		$('#calendar').fullCalendar('next');
		// Reload events
		getDateHasSchedule(gameId, $('#calendar').fullCalendar('getView').start);
	});
	$('#btn-prev').click(function () {

		$('#calendar').fullCalendar('prev');
		// Reload events
		getDateHasSchedule(gameId, $('#calendar').fullCalendar('getView').start);
	});
	// Start load play history.
	getDateHasSchedule(gameId, $('#calendar').fullCalendar('getView').start);
});
/**
 * Function is used to get date which has schedule.
 */

function getDateHasSchedule(gameId, date) {

	// Get user's played date
	var data = {
		gameId: gameId,
		dateInMonth: date
	};
	$.ajax({
		type: "POST",
		url: "get_date_has_play_history.do",
		data: data,
		dataType: "json",
		success: function (dataResponse) {

			// Return.
			date_actives = dataResponse;
			$('#calendar').fullCalendar('render');
		}
	});
}
/**
 * Hightlight the date
 */

function highlightDate(date) {

	$(".fc-cell-myoverlay").removeClass("fc-cell-myoverlay");
	var dateString = $.fullCalendar.formatDate(date, 'yyyy-MM-dd');
	var dateElementContainer = $('.fc-day[data-date="' + dateString + '"]');
	$('.fc-day-number', $(dateElementContainer)).addClass('fc-cell-myoverlay');
}
/**
 * On forcus a day
 */

function focusDay(date) {

	if (date.getMonth() < $('#calendar').fullCalendar('getView').start.getMonth()) {
		$('#calendar').fullCalendar('prev');
		getDateHasSchedule(gameId, $('#calendar').fullCalendar('getView').start);
	}
	else if (date.getMonth() > $('#calendar').fullCalendar('getView').start.getMonth()) {
		$('#calendar').fullCalendar('next');
		getDateHasSchedule(gameId, $('#calendar').fullCalendar('getView').start);
	}
	// Highlight Date
	highlightDate(date);
}
// Reload datatable


function play_history_table_reload() {

	if (play_history_table != undefined) {
		play_history_table.fnReloadAjax();
	}
}
var g_play_history_id = undefined;
/**
 * Show history's details
 * 
 * @param id
 */

function show_history_detail(id) {

	g_play_history_id = id;
	// Load modal.
	$('#play_history-detail-modal').load('load_play_history_detail.do', {
		id: id
	}, function () {

		// Init database table.
		g_entry_detail_table = $('#play_history-detail-modal #entry-detail-table').dataTable({
			'sDom': '<"row"<"col-sm-6">>rt<"row"<"col-sm-6"i><"col-sm-6"p>>',
			'bProcessing': true,
			'bServerSide': true,
			'sAjaxSource': 'load_play_history_entry.do',
			'fnServerData': function (sSource, aoData, fnCallback, oSettings) {

				aoData.push({
					"name": "id",
					"value": g_play_history_id
				});
				oSettings.jqXHR = $.ajax({
					'dataType': 'json',
					'type': 'POST',
					'url': sSource,
					'data': aoData,
					'success': fnCallback
				});
			},
			'aaSorting': [
				[
				0, 'desc']
			],
			'aoColumns': [{
				'mData': 'id',
				'bSortable': true
			}, {
				'mData': 'startTime',
				'sClass': 'text-center td-middle',
				'mRender': function (data, type, full) {

					if (data == null) {
						return OpenResourceText.NONE;
					}
					var dtStart = new Date(data);
					var dtStartWrapper = moment(dtStart);
					return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.HH_mm_ss);
				},
				'bSortable': true
			}, {
				'mData': 'endTime',
				'sClass': 'text-center td-middle',
				'mRender': function (data, type, full) {

					if (data == null) {
						return OpenResourceText.NONE;
					}
					var dtStart = new Date(data);
					var dtStartWrapper = moment(dtStart);
					return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.HH_mm_ss);
				},
				'bSortable': true
			}, {
				'mData': 'score',
				'sClass': 'text-right td-middle',
				'mRender': function (data, type, full) {

					return $.number(data);
				},
				'bSortable': true
			}]
		});
		// Show modal.
		$('#play_history-detail-modal').modal('show');
	});
}