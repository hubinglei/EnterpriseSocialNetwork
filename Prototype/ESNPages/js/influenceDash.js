$(function() {
	page = "influenceDash"
	navSelected("dash");
	
	$('#tableContent').load('influenceDashView.html');
	payOrDeleteAttention();
	
	
	
	// socail dash board -anlaysis
	// area click
	$("#area").click(function() {
		$("#overview").addClass("overview1");
		$(this).css('color','black');
		$('#date').css('color','#23A0D8');
		$("#areaView").show();
		replotMap();
		$("#dateView").hide();
	})

	$("#date").click(function() {
		$("#overview").removeClass("overview1")
		$("#overview").addClass("overview")
		$(this).css('color','black');
		$('#area').css('color','#23A0D8');
		$("#dateView").show();
		$("#areaView").hide();
	})

})