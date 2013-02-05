$(function() {
	pos="dash"
	page="homeNav"
	navSelected("home")
	// header page selected home
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

	// show tips
	$("ul li")
			.mouseenter(
					function() {
						var div = $(".tips")
						var self = $(this);
						$(this).find(".tips").html(
								$(this).find(".earlierdata").text()
										+ " updated items");
						var p = self.position()
						var x = p.left + self.width() / 2;
						var docWidth = $(document).width();
						var y = p.top - self.height();
						div.css("left", x);
						div.css("top", y);
						$(this).find(".tips").show();
					}).mouseleave(function() {
				$(this).find(".tips").hide();
			});

	// home page nav
	// social dash board
	$("#socialDash").click(function() {
		pos="dash"
		showRightNav("dashNav");
	})

	// social network insight
	$("#socialNetwork").click(function() {
		pos="network"
		showRightNav("networkNav");
	})
	// media mediation
	$("#mediaMediation").click(function() {
	 pos="media"
	 showRightNav("mediaNav");
	})

	// social campaingn plan
	$("#socialCampaign").click(function() {
	 //pos="plan"
	// showRightNav("planNav");
	})

	// activity automation
	$("#activityAutomation").click(function() {
	 pos="activity"
	 showRightNav("activityNav");
	})

	// channel maintenace
	$("#channelMaintenace").click(function() {

	})

	$(".arrowRight").click(function() {
		navSelected(pos)
		$("#wrapper").load(pos+"Nav.html");
		window.location.hash="#"+pos+"Nav";
								});
	
});