$(function() {
			navSelected("channel");   
		   
	$("#channelMaintenance").die('click');
	$("#channelMaintenance").live('click', function() {
		$.ajax({
			url : "channelMaintenance.html",
			cache : true,
			success : function(result) {
				$("#wrapper").html(result);
			}
		});
		window.location.hash = "#channelMaintenance"
	})
		   
		   })