$(function() {
		   page="activityNav"
		   navSelected("activity");
		   
		   $("#automationConfig").die('click');
		   $("#automationConfig").live('click', function() {
			$.ajax({
				url : "engagement.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#engagement";
		});
		   
		    $("#automationEventHandling").die('click');
		   $("#automationEventHandling").live('click', function() {
			$.ajax({
				url : "activityAutomation.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#activityAutomation";
		});
		   })