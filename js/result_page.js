$(document).ready(function () {
	
	$('#game-select').change(function() {
		var month = $('#month').val();
		var gameId = $(this).val();
		
		var url = OpenConstant.LINK_ROOT_URL + "home/result.do?game_id=" + gameId + "&month="+month;
		window.location = url;
	});
});