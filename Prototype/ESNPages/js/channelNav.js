$(function() {
	navSelected("channel");  
	$("#channelMaintenance").unbind('click');
	$("#channelMaintenance").bind('click', function() {
		$.ajax({
			url : "channelMaintenance.html",
			cache : true,
			success : function(result) {
				$("#wrapper").html(result);
			}
		});
		window.location.hash = "#channelMaintenance";
	});
});