$(function() {
	page = "networkNav";
	navSelected("network");
	$("#influenceAnalysis").click(function() {
		pos = "dash";
		networkNav2("networkInluence");
	});

	// social network insight
	$("#sentimentAnalysis").click(function() {
		pos = "network";
		networkNav2("networkSentiment");
	});
	// media mediation
	$("#costAnalysis").click(function() {
		pos = "media";
		networkNav2("networkCost");
	});

	$(".arrowRight1").click(function() {
		moveRight();
		$(".arrowLeft1").show();
		$(".networkArrowRight ").hide();
	});

	$(".arrowLeft1").click(function() {
		moveLeft();
		$(".arrowLeft1 ").hide();
		$(".networkArrowRight ").show();
	});

	function moveRight() {
		$(".networkRightNav").css("margin-left", "-10px");
		$(".networkRightNav").css("opacity", "1");
		$(".rightNav").css("margin-right", "1290px");
		$('#inluenceCompanyGroup').unbind('click');
		$("#inluenceCompanyGroup").bind('click', function() {
			$("#wrapper").load("companyGroup.html", null, function() {
			});
			window.location.hash = "#companyGroup";
		});
		$("#inluenceCompany").unbind('click');
		$("#inluenceCompany").bind('click', function() {
			 $("#wrapper").load("company.html", null, function() { });			
		});

		$("#inluenceBrandGroup").unbind('click');
		$("#inluenceBrandGroup").bind('click', function() {
			$("#wrapper").load("brandGroup.html", null, function() {
			});
			window.location.hash = "#brandGroup";
		});

		$("#inluenceBrand").unbind('click');
		$("#inluenceBrand").bind('click', function() {
			 $("#wrapper").load("brand.html", null, function() { });
		});

		$("#inluenceProductGroup").unbind('click');
		$("#inluenceProductGroup").bind('click', function() {
			$("#wrapper").load("productGroup.html", null, function() {
			});
			window.location.hash = "#productGroup";
		});

		$("#inluenceProduct").unbind('click');
		$("#inluenceProduct").bind('click', function() {
		   $("#wrapper").load("product.html", null, function() { });
		});

		$("#sentimentCompany").unbind('click');
		$("#sentimentCompany").bind('click', function() {
			 $("#wrapper").load("companySentiment.html", null, function() { });			
		});

		$("#sentimentBrand").unbind('click');
		$("#sentimentBrand").bind('click', function() {
			 $("#wrapper").load("brandSentiment.html", null, function() { });
		});

		$("#sentimentProduct").unbind('click');
		$("#sentimentProduct").bind('click', function() {
			$("#wrapper").load("productSentiment.html", null, function() { });
		});

		$("#costCompany").unbind('click');
		$("#costCompany").bind('click', function() {
			$("#wrapper").load("companyCost.html", null, function() { });
		});

		$("#costBrand").unbind('click');
		$("#costBrand").bind('click', function() {
			$("#wrapper").load("brandCost.html", null, function() { });
		});

		$("#costProduct").unbind('click');
		$("#costProduct").bind('click', function() {
			$("#wrapper").load("productCost.html", null, function() { });
		});

		$("#inluenceCampaign").unbind('click');
		$("#inluenceCampaign").bind('click', function() {
			$("#wrapper").load("campaign.html", null, function() { });
		});

		$("#inluenceCampaignGroup").unbind('click');
		$("#inluenceCampaignGroup").bind('click', function() {
			$("#wrapper").load("campaignGroup.html", null, function() { });
			window.location.hash = "#campaignGroup";
		});

		$("#costCampaign").unbind('click');
		$("#costCampaign").bind('click', function() {
			$("#wrapper").load("campaignCost.html", null, function() { });
			
		});
	}

	function moveLeft() {
		$(".networkRightNav").css("margin-left", "850px");
		$(".networkRightNav").css("opacity", "0.5");
		$(".rightNav").css("margin-right", "770px");
	}
});
