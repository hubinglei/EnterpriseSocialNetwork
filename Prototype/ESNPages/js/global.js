function showRightNav(id) {
	$(".rightNav").each(function() {
		$(this).hide();
	})
	$("#" + id).show();

}

function networkNav2(id) {
		$(".networkRightNav").each(function() {
			$(this).hide();
		})
		$("#" + id).show();
	}
	$(function() {
	$(".arrowLeft").click(function() {
								   $("#wrapper").load("homeNav.html");
								   })
	
	$("#inluenceCompanyGroup").click(function() {
								 $("#wrapper").load("companyGroup.html");	
											  });
	$("#inluenceCompany").click(function() {
								 $("#wrapper").load("company.html");	
											  });
	
	$("#inluenceBrandGroup").click(function() {
								 $("#wrapper").load("brandGroup.html");	
											  });
	$("#inluencebrand").click(function() {
								 $("#wrapper").load("brand.html");	
											  });
	$("#inluenceProductGroup").click(function() {
								 $("#wrapper").load("productGroup.html");	
											  });
	$("#inluenceProduct").click(function() {
								 $("#wrapper").load("product.html");	
											  });
		// top button
	$(".topButton").click(function() {
								   alert("ss")
		$('body,html').animate({
			scrollTop : 0
		}, 0);
		return false;
	});

	 })