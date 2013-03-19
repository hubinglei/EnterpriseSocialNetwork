$(function() {
	page = "activityNav";
	navSelected("activity");

	$("#automationConfig").unbind('click');
	$("#automationConfig").bind('click', function() {
		$.ajax({
			url : "engagement.html",
			cache : true,
			success : function(result) {
				$("#wrapper").html(result);
			}
		});
		window.location.hash = "#engagement";
	});

	$("#automationEventHandling").unbind('click');
	$("#automationEventHandling").bind('click', function() {
		$.ajax({
			url : "activityAutomation.html",
			cache : true,
			success : function(result) {
				$("#wrapper").html(result);
			}
		});
		window.location.hash = "#activityAutomation";
	});
});