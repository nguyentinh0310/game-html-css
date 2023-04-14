var affiliate_table = undefined;
var orderByClause = undefined;
var limit = undefined;
var offset = undefined;

$(document).ready(function () {

	// Load data for table
	affiliate_table_load();
});

/**
 * Reload affiliate table.
 */

function affiliate_table_reload() {

	if (affiliate_table != undefined && $('#affiliate_table').html() != undefined) {
		affiliate_table.fnReloadAjax();
	}
}

/**
 * Load affiliate table.
 */

function affiliate_table_load() {

	// Init database table.
	affiliate_table = $('#affiliate_table').dataTable({
		'bProcessing': true,
		'bServerSide': true,
		'sAjaxSource': 'load_affiliate_datatable.do',
		'fnServerData': function (sSource, aoData, fnCallback, oSettings) {

			oSettings.jqXHR = $.ajax({
				'dataType': 'json',
				'type': 'POST',
				'url': sSource,
				'data': aoData,
				'success': function (res) {

					// Outputs: ###,###
					fnCallback(res);

					// Set total bonus point
					$('#totalPoint').text($.number(res.totalBonus) + " Point");
				}
			});
		},
		'aaSorting': [
			[
			1, 'desc']
		],
		'aoColumns': [{
			'sClass': 'text-left td-middle',
			'mData': 'email',
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'inviteTime',
			'mRender': function (data, type, full) {

				var dtStart = new Date(data);
				var dtStartWrapper = moment(dtStart);
				return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.YYYYMMDD_HH_mm_ss_SSS_GMT);
			},
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'regTime',
			'mRender': function (data, type, full) {

				if (data == null) {
					return OpenResourceText.NONE;
				}
				var dtStart = new Date(data);
				var dtStartWrapper = moment(dtStart);
				return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.YYYYMMDD_HH_mm_ss_SSS_GMT);
			},
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mData': 'firstPlayTime',
			'mRender': function (data, type, full) {

				if (data == null) {
					return OpenResourceText.NONE;
				}
				var dtStart = new Date(data);
				var dtStartWrapper = moment(dtStart);
				return dtStartWrapper.tz(OpenConstant.SYS_TIMEZONE_ID).format(OpenResourceText.YYYYMMDD_HH_mm_ss_SSS_GMT);
			},
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mRender': function (data, type, full) {

				if (data == 0) {
					return '<span class="badge red">{0}</span>'.format(OpenResourceText.INVITE_STATE[data]);
				}
				else {
					return '<span class="badge blue">{0}</span>'.format(OpenResourceText.INVITE_STATE[data]);
				}

			},
			'mData': 'state',
			'bSortable': true
		}, {
			'sClass': 'text-center td-middle',
			'mRender': function (data, type, full) {

				if (data == null) {
					return OpenResourceText.NONE;
				}
				return $.number(data);
			},
			'mData': 'bonusPoint',
			'bSortable': true
		}],
		'fnCreatedRow': function (row, data, index) {

			switch (data.state) {
			case OpenConstant.POINT_EXCHANGE_STATE_FINISH:
				$(row).addClass('success');
				break;
			case OpenConstant.POINT_EXCHANGE_STATE_ERROR:
				$(row).addClass('danger');
				break;
			default:
				break;
			}
		}
	});
}