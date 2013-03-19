$(function() {
		   page="mediaNav"
		   navSelected("media");
		   
		$("#mediaGeneration").unbind('click');
		$("#mediaGeneration").bind('click', function() {
			$.ajax({
				url : "mediaGeneration.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#mediaGeneration";
		});
		
		$("#mediaOptimization").unbind('click');
		$("#mediaOptimization").bind('click', function() {
			$.ajax({
				url : "mediaOptimization.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#mediaOptimization";
		});
		
		   })