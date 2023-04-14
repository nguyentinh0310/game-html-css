var wallet_transaction_table = undefined;
var wallet_transaction_from_date = undefined;
var wallet_transaction_to_date = undefined;
var orderByClause = undefined;
var limit = undefined;
var offset = undefined;
var game_id = 0;

$(document).ready(function () {

	// Remove attr when people click back event
	$('#btnDownloadPdf').removeAttr('disabled');

	// Add even click for download button.
	$('#btnDownloadPdf').click(function () {

		to = wallet_transaction_to_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT);
		form = wallet_transaction_from_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT);
		$('#btnDownloadPdf').attr('disabled', 'disabled');
		window.location.href = 'download_pdf_wallet_transaction_id.do?dFrom=' + form + '&dTo=' + to;
	});

	// This week.
	wallet_transaction_from_date = moment().subtract('days', 6);
	wallet_transaction_to_date = moment();
	$('#point-report-range').daterangepicker($.extend({
		startDate: wallet_transaction_from_date,
		endDate: wallet_transaction_to_date,
		format: OpenResourceText.DATE_RANGE_PICKER_FORMAT,
		ranges: OpenResourceText.DATE_PICKER_COMMON_RANGE(),
	}, OpenResourceText.DATE_RANGE_PICKER_COMMON_CONFIG), function (start, end) {

		// Store to global.
		wallet_transaction_from_date = start;
		wallet_transaction_to_date = end;

		// Update time.
		$('#point-report-range .date-range').html(start.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT) + ' ~ ' + end.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT));

		// Reload table data.
		wallet_transaction_table_reload();

	});

	// Set the initial state.
	$('#point-report-range .date-range').html(wallet_transaction_from_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT) + ' ~ ' + wallet_transaction_to_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT));
	// Load data for table
	wallet_transaction_table_load();
});

/**
 * Reload wallet transaction table.
 */

function wallet_transaction_table_reload() {

	if (wallet_transaction_table != undefined && $('#transaction_table').html() != undefined) {
		wallet_transaction_table.fnReloadAjax();
	}
}

/**
 * Realod transaction table.
 */

function wallet_transaction_table_load() {

	// Init database table.
	wallet_transaction_table = $('#transaction_table').dataTable({
		"bFilter": false,
		'bProcessing': true,
		'bServerSide': true,
		'sAjaxSource': 'wallet_history_database.do',
		'fnServerData': function (sSource, aoData, fnCallback, oSettings) {

			aoData.push({
				"name": "sFromDate",
				"value": wallet_transaction_from_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT)
			});
			aoData.push({
				"name": "sToDate",
				"value": wallet_transaction_to_date.format(OpenResourceText.DATE_RANGE_PICKER_FORMAT)
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
			'mData': 'title',
			'bSortable': false
		}, {
			'sClass': 'text-left td-right hidden-xs',
			'mData': 'summary',
			'bSortable': false
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'amount',
			'mRender': function (data, type, full) {

				var html = '';
				if (full.amount < 0) {
					html += '<span class="badge red">';
				}
				else {
					html += '<span class="badge blue">+';
				}

				html += full.amount + '</span>';

				return html;
			},
			'bSortable': false
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'afterPoint',
			'mRender': function (data, type, full) {

				return $.number(data);
			},
			'bSortable': false
		}, {
			'bSortable': false,
			'mData': function () {

				return '';
			},
			// Render operation action.
			'sClass': 'span2',
			'mRender': function (data, type, full) {

				var html = '';
				html += '<button type="button" class="btn btn-xs btn-square btn-green"><i class="fa fa-eye"></i> {0}</button>'.format(OpenResourceText.GAME_HISTORY_DETAILS_VIEW);

				return html;
			},
			// Set on-click action.
			'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {

				$('button', $(nTd)).data('trans-data-id', oData.transactionRef);
				$('button', $(nTd)).on('click', function () {

					game_history_show_detail($(this).data('trans-data-id'));
				});
			}
		}]
	});
}

/**
 * Show history detail.
 * 
 * @param id
 */

function game_history_show_detail(id) {

	// Load modal.
	$('#trans-history-detail-modal').load('load_wallet_history_detail.do', {
		transactionId: id
	}, function () {

		// Show modal.
		$('#trans-history-detail-modal').modal('show');
	});
}