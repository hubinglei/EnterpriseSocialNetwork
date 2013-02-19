$(function() {
		   page="mediaNav"
		   navSelected("media");
		   
		$("#mediaGeneration").die('click');
		$("#mediaGeneration").live('click', function() {
			$.ajax({
				url : "mediaGeneration.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#mediaGeneration";
		});
		
		$("#mediaOptimization").die('click');
		$("#mediaOptimization").live('click', function() {
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