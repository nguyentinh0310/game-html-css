var exchange_history_table = undefined;
var exchange_history_from_date = undefined;
var exchange_history_to_date = undefined;

$(document).ready(function () {

	// This week.
	exchange_history_from_date = moment().subtract('days', 6);
	exchange_history_to_date = moment();
	$('#point-report-range').daterangepicker($.extend({
		startDate: exchange_history_from_date,
		endDate: exchange_history_to_date,
		format: OpenResourceText.DATE_RANGE_PICKER_FORMAT,
		ranges: OpenResourceText.DATE_PICKER_COMMON_RANGE(),
	}, OpenResourceText.DATE_RANGE_PICKER_COMMON_CONFIG), function (start, end) {

		// Store to global.
		exchange_history_from_date = start;
		exchange_history_to_date = end;

		// Update time.
		$('#point-report-range .date-range').html(start.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT) + ' ~ ' + end.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT));

		// Reload table data.
		exchange_history_table_reload();

	});

	// Set the initial state.
	$('#point-report-range .date-range').html(exchange_history_from_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT) + ' ~ ' + exchange_history_to_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT));
	// Load data for table
	exchange_history_table_load();
});

/**
 * Reload wallet transaction table.
 */

function exchange_history_table_reload() {

	if (exchange_history_table != undefined && $('#transaction_table').html() != undefined) {
		exchange_history_table.fnReloadAjax();
	}
}

/**
 * Realod transaction table.
 */

function exchange_history_table_load() {

	// Init database table.
	exchange_history_table = $('#transaction_table').dataTable({
		"bFilter": false,
		'bProcessing': true,
		'bServerSide': true,
		'sAjaxSource': 'history_database.do',
		'fnServerData': function (sSource, aoData, fnCallback, oSettings) {

			aoData.push({
				"name": "sFromDate",
				"value": exchange_history_from_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT)
			});
			aoData.push({
				"name": "sToDate",
				"value": exchange_history_to_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT)
			});
			oSettings.jqXHR = $.ajax({
				'dataType': 'json',
				'type': 'POST',
				'url': sSource,
				'data': aoData,
				'success': function (res) {

					fnCallback(res);
				}
			});
		},
		'aaSorting': [
			[
			0, 'desc']
		],
		'aoColumns': [{
			'sClass': 'text-left td-middle',
			'mRender': function (data, type, full) {

				var dtStart = new Date(data);
				var dtStartWrapper = moment(dtStart);
				return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.YYYYMMDD_HH_mm_ss_SSS_GMT);
			},
			'mData': 'recordCreatedTime',
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'type',
			'mRender': function (data, type, full) {

				return OpenResourceText.PLAY_HISTORY_TYPE[data];
			},
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'type',
			'mRender': function (data, type, full) {

				return OpenResourceText.PLAY_HISTORY_STATE[data];
			},
			'bSortable': true
		}, {
			'sClass': 'text-left td-right',
			'mData': 'systemName',
			'bSortable': false
		}, {
			'sClass': 'text-left td-right',
			'mData': 'exSysUserId',
			'bSortable': false
		}, {
			'sClass': 'text-right td-middle',
			'mData': 'amount',
			'mRender': function (data, type, full) {

				if (full.type == OpenConstant.POINT_EXCHANGE_TYPE_DEBIT) {
					return '<span class="badge red">-{0}</span>'.format($.number(data));
				}
				else {
					return '<span class="badge blue">+{0}</span>'.format($.number(data));
				}
			},
			'bSortable': false
		}],

		'fnCreatedRow': function (row, data, index) {

			if (data.state == 0) {
				$(row).addClass('danger');
			}
			else {
				$(row).addClass('success');
			}
		}
	});
}