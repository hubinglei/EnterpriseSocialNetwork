$(function() {
	page = "influenceDash"

	function replotChart() {
		$('.esn-chart').each(function(i) {
			$(this).esnDraw();
		});
	}
	function replotMap() {
		$('.esn-plat').each(function(i) {
			$(this).esnMapDraw();
		})
	}
	// bind table tr event
	$("table tr:not(:first)").click(function() {
		var instanceName = $(this).find("td").html();
		$("table tr:not(:first)").removeClass("trActive");
		$(this).addClass("trActive");
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
		replotMap();
		$("#dateView").hide();
	})

	$("#date").click(function() {
		$("#overview").removeClass("overview1")
		$("#overview").addClass("overview")
		$("#dateView").show();
		$("#areaView").hide();
	})

})