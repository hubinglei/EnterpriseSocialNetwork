$(function() {
	function replotChart() {
		$('.esn-chart').each(function(i) {
			$.data(this, 'chart').jqplot.replot();
		});
	}
	// bind table tr event
	$("table tr:not(:first)").click(function() {
		var instanceName = $(this).find("td").html();
		$("#instanceName").html("&nbsp;" + instanceName);
		if (instanceName.indexOf("Samsung") > -1) {
			$("#lgData").hide();
			$("#samsungData").show();
			replotChart();
			
		} else {
			$("#samsungData").hide();
			$("#lgData").show();
			replotChart();
		}
	})

	// socail dash board -anlaysis
	// area click
	$("#area").click(function() {
		$("#overview").addClass("overview1");
		$("#areaView").show();
		$("#dateView").hide();
	})

	$("#date").click(function() {
		$("#overview").removeClass("overview1")
		$("#overview").addClass("overview")
		$("#dateView").show();
		$("#areaView").hide();
	})


})