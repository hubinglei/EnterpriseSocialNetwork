$(function() {
		   page="planNav"
		   navSelected("plan");
		   
		   $("#planFormulation").die('click');
		   $("#planFormulation").live('click', function() {
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