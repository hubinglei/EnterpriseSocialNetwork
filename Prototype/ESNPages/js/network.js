$(function() {
page="networkNav"	
$("#influenceAnalysis").click(function() {
		pos="dash"
		networkNav2("networkInluence");
	})

	// social network insight
	$("#sentimentAnalysis").click(function() {
		pos="network"
		networkNav2("networkSentiment");
	})
	// media mediation
	$("#costAnalysis").click(function() {
	 pos="media"
	 networkNav2("networkCost");
	})
	
	$(".arrowRight1").click(function() {
		moveRight();
		$(".arrowleft1 ").show();
		$(".networkArrowRight ").hide();
								});
	
		$(".arrowLeft1").click(function() {
		moveLeft();
		$(".arrowleft1 ").hide();
			$(".networkArrowRight ").show();
								});
	
	
	function moveRight(){
		$(".networkRightNav").css("margin-left", "-10px");
		$(".networkRightNav").css("opacity", "1");
		$(".rightNav").css("margin-right", "1290px");
		$("#inluenceCompanyGroup").click(function() {
								 $("#wrapper").load("companyGroup.html");	
											  });
	$("#inluenceCompany").click(function() {
								 $("#wrapper").load("company.html");	
											  });
	
	$("#inluenceBrandGroup").click(function() {
								 $("#wrapper").load("brandGroup.html");	
											  });
	$("#inluenceBrand").click(function() {
								 $("#wrapper").load("brand.html");	
											  });
	$("#inluenceProductGroup").click(function() {
								 $("#wrapper").load("productGroup.html");	
											  });
	$("#inluenceProduct").click(function() {
								 $("#wrapper").load("product.html");	
											  });
		}
		
		
		$("#sentimentCompany").click(function() {
											   $("#wrapper").load("companySentiment.html");
											  });
			$("#sentimentBrand").click(function() {
												$("#wrapper").load("brandSentiment.html");
											  });
				$("#sentimentProduct").click(function() {
											 $("#wrapper").load("productSentiment.html");		 
											  });
		
			$("#costCompany").click(function() {
											   $("#wrapper").load("companyCost.html");
											  });
			$("#costBrand").click(function() {
												$("#wrapper").load("brandCost.html");
											  });
				$("#costProduct").click(function() {
											 $("#wrapper").load("productCost.html");		 
											  });
		
	function moveLeft(){
		$(".networkRightNav").css("margin-left", "850px");
		$(".networkRightNav").css("opacity", "0.5");
		$(".rightNav").css("margin-right", "890px");
		}
		   });
