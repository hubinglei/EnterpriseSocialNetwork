$(function() {
	page = "dashNav"
	navSelected("dash");
	// Influence Insight
	$('#influenceDash').unbind('click');
	$('#influenceDash').bind('click', function() {
		// window.open("influenceDash.html", "_self")
		page = "influenceDash"
		$.ajax({
			url : "influenceDash.html",
			cache : true,
			success : function(result) {
				$("#wrapper").html(result);
			}
		});
		// $("#wrapper").load("influenceDash.html", null, function() { });
		// $("#wrapper").empty();
		// $("#wrapper").load("influenceDash.html");
		window.location.hash = "#influenceDash"

	})

	// Influence Insight
	$("#sentimentDash").unbind('click');
	$("#sentimentDash").bind('click', function() {
		$.ajax({
			url : "sentimentDash.html",
			cache : true,
			success : function(result) {
				$("#wrapper").html(result);
			}
		});
		// $("#wrapper").load("sentimentDash.html", null, function() { });
		window.location.hash = "#sentimentDash"
		page = "sentimentDash"
	})

})