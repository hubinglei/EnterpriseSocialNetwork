$(function() {
		   page="planNav"
		   navSelected("plan");
		   
		   $("#planFormulation").unbind('click');
		   $("#planFormulation").bind('click', function() {
			$.ajax({
				url : "planFormulation.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#planFormulation";
		});
		   })