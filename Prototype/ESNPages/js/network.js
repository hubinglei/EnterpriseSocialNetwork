$(function() {
	page = "networkNav"
	navSelected("network");
	$("#influenceAnalysis").click(function() {
		pos = "dash"
		networkNav2("networkInluence");
	})

	// social network insight
	$("#sentimentAnalysis").click(function() {
		pos = "network"
		networkNav2("networkSentiment");
	})
	// media mediation
	$("#costAnalysis").click(function() {
		pos = "media"
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

	function moveRight() {
		$(".networkRightNav").css("margin-left", "-10px");
		$(".networkRightNav").css("opacity", "1");
		$(".rightNav").css("margin-right", "1290px");
		$('#inluenceCompanyGroup').die('click');
		$("#inluenceCompanyGroup").live('click', function() {
			$("#wrapper").load("companyGroup.html", null, function() {
			});
			window.location.hash = "#companyGroup";
		});
		$("#inluenceCompany").die('click');
		$("#inluenceCompany").live('click', function() {
			$.ajax({
				url : "company.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("company.html", null, function() { });
			$.ajax({
				url : "company.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			window.location.hash = "#company";
		});

		$("#inluenceBrandGroup").die('click');
		$("#inluenceBrandGroup").live('click', function() {
			$("#wrapper").load("brandGroup.html", null, function() {
			});
			window.location.hash = "#brandGroup";
		});

		$("#inluenceBrand").die('click');
		$("#inluenceBrand").live('click', function() {
			$.ajax({
				url : "brand.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("brand.html", null, function() { });
			window.location.hash = "#brand";
		});

		$("#inluenceProductGroup").die('click');
		$("#inluenceProductGroup").live('click', function() {
			$("#wrapper").load("productGroup.html", null, function() {
			});
			window.location.hash = "#productGroup";
		});

		$("#inluenceProduct").die('click');
		$("#inluenceProduct").live('click', function() {
			$.ajax({
				url : "product.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("product.html", null, function() { });
			window.location.hash = "#product";
		});

		$("#sentimentCompany").die('click');
		$("#sentimentCompany").live('click', function() {
			$.ajax({
				url : "companySentiment.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("companySentiment.html", null, function() {
			// });
			window.location.hash = "#companySentiment";
		});

		$("#sentimentBrand").die('click');
		$("#sentimentBrand").live('click', function() {
			$.ajax({
				url : "brandSentiment.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("brandSentiment.html", null, function() { });
			window.location.hash = "#brandSentiment";
		});

		$("#sentimentProduct").die('click');
		$("#sentimentProduct").live('click', function() {
			$.ajax({
				url : "productSentiment.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("productSentiment.html", null, function() {
			// });
			window.location.hash = "#productSentiment";
		});

		$("#costCompany").die('click');
		$("#costCompany").live('click', function() {
			$.ajax({
				url : "companyCost.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("companyCost.html", null, function() { });
			window.location.hash = "#companyCost";
		});

		$("#costBrand").die('click');
		$("#costBrand").live('click', function() {
			$.ajax({
				url : "brandCost.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("brandCost.html", null, function() { });
			window.location.hash = "#brandCost";
		});

		$("#costProduct").die('click');
		$("#costProduct").live('click', function() {
			$.ajax({
				url : "productCost.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("productCost.html", null, function() { });
			window.location.hash = "#productCost";
		});

		$("#inluenceCampaign").die('click');
		$("#inluenceCampaign").live('click', function() {
			$.ajax({
				url : "campaign.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("campaign.html", null, function() { });
			window.location.hash = "#campaign";
		});

		$("#inluenceCampaignGroup").die('click');
		$("#inluenceCampaignGroup").live('click', function() {
			$.ajax({
				url : "campaignGroup.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("campaignGroup.html", null, function() { });
			window.location.hash = "#campaignGroup";
		});

		$("#costCampaign").die('click');
		$("#costCampaign").live('click', function() {
			$.ajax({
				url : "campaignCost.html",
				cache : true,
				success : function(result) {
					$("#wrapper").html(result);
				}
			});
			// $("#wrapper").load("campaignCost.html");
			window.location.hash = "#campaignCost";
		});
	}

	function moveLeft() {
		$(".networkRightNav").css("margin-left", "850px");
		$(".networkRightNav").css("opacity", "0.5");
		$(".rightNav").css("margin-right", "870px");
	}
});
