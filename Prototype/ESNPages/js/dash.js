$(function() {
	// even table rows style
	$(".socialTable tr:odd").css("background-color", "#FFFFFF");
	$(".sentimentTable tr:odd").css("background-color", "#FFFFFF");
	
	function replotChart() {
		$('.esn-chart').each(function(i) {
		    $("#"+$(this).attr("id")).empty();
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
			$("#lgData").show();
			replotChart();
			$("#samsungData").hide();
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