$(function() {
	navActive("#dash")
	// even table rows style
	$(".socialTable tr:odd").css("background-color", "#FFFFFF");
	$(".sentimentTable tr:odd").css("background-color", "#FFFFFF");

	$('.esn-chart', $("#" + $(this).attr("id") + ("content"))).each(function(i) {
		$.data(this, 'chart').jqplot.replot();
	});
	
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