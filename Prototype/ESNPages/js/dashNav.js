$(function() {
	page="dashNav"
	// Influence Insight
	$("#influenceDash").click(function(event) {
		//window.open("influenceDash.html", "_self")
		event.stopPropagation();
		page="influenceDash"
		$("#wrapper").load("influenceDash.html");
		
	})

	// Influence Insight
	$("#sentimentDash").click(function(event) {
		event.stopPropagation();
		$("#wrapper").load("sentimentDash.html");	
		page="sentimentDash"
	})
	
		   })