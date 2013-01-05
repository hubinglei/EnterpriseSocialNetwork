$(function() {
	$("#loginButton").click(function(event) {
		$("#authorcontent").css("display", "none");
		$("#homecontent").show();
		$("#nav > .navItem").removeClass("navActive");
		$("#home").addClass("navActive")
	})

	//change nav
	$("#nav > .navItem").click(function(event) {
		event.stopPropagation();
		$("#nav > .navItem").each(function(i) {
			if ($(this).hasClass("navActive")) {
				$("#" + $(this).attr("id") + ("content")).hide()
			}
		});
		$("#nav > .navItem").removeClass("navActive");

		$(this).addClass("navActive");

		$("#" + $(this).attr("id") + ("content")).show()
	});

	// start click
	$(".startDetail").click(function(event) {
		event.stopPropagation();
		if ($(this).parent().find(".dropdown-menu").css("display") == "none") {
			$(this).parent().find(".dropdown-menu").show();
		} else {
			$(this).parent().find(".dropdown-menu").hide();
		}

	})
	$(document).click(function() {
		$(".dropdown-menu").hide();
	})

	//show tips 
	$("ul li").mouseenter(
			function() {
				$(this).find(".tips").find(".value").html(
						$(this).find(".earlierdata").text());
				$(this).find(".tips").show();
			}).mouseleave(function() {
		$(this).find(".tips").hide();
	});

	// home page nav
	//social dash board 
	$("#socialDash").click(function() {
		$("#nav #dash").click();
	})

	//social network insight 
	$("#socialNetwork").click(function() {
		$("#nav #network").click();
	})

	//social campaingn plan 
	$("#socialCampaign").click(function() {
		$("#nav #plan").click();
	})

	//activity automation 
	$("#activityAutomation").click(function() {
		$("#nav #activity").click();
	})

	//media mediation
	$("#mediaMediation").click(function() {
		$("#nav #media").click();
	})

	//channel maintenace
	$("#channelMaintenace").click(function() {
		$("#nav #channel").click();
	})
	//even table rows style
	$("#socialTable tr:odd").css("background-color", "#FFFFFF");

	// socail dash board -anlaysis 
	// area click
	$("#area").click(function() {
		$("#overview").addClass("overview1");
	})

	$("#date").click(function() {
		$("#overview").removeClass("overview1")
		$("#overview").addClass("overview")
	})

});