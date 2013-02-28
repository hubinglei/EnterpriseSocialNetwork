$(function() {
	navSelected("channel");   
	$("#channelDiv .nav div").each(function(i){
		$(this).unbind('click');
		var fun = (function(pageUrl){
			return function() {
				$.ajax({
					url : pageUrl,
					cache : true,
					success : function(result) {
						$("#channelRightContentDiv").html(result);
					}
				});
			  };
		})("channel_" + $(this).attr("id") + ".html");
		$(this).bind('click',fun);
	});
});

	