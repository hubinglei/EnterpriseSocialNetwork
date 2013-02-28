$(function() {
	page = "influenceDash"
	navSelected("dash");
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
	
	payOrDeleteAttention();
	
	//go to edit page 
	$('.browserBg').click(function(){
				$('#tableContent').load('influenceDashEdit.html');
								   })
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