$(function() {
	
  // header page selected home 
	navActive("#home")

	// start click
	$(".startDetail").click(function(event) {
		event.stopPropagation();
		if ($(this).parent().find(".dropdown-menu").css("display") == "none") {
			$(this).parent().find(".dropdown-menu").show();
		} else {
			$(this).parent().find(".dropdown-menu").hide();
		}

	})
	$(document).click(function() {
		$(".dropdown-menu").hide();
	})

	// show tips
	$("ul li").mouseenter(
			function() {
			var div=$(".tips")
			var self = $(this); 
				$(this).find(".tips").html(
						$(this).find(".earlierdata").text()+" updated items");
				var p = self.position()  
        var x = p.left + self.width()/2; 
        var docWidth = $(document).width();
		var y=p.top-self.height();
        div.css("left", x);  
        div.css("top", y);  
				$(this).find(".tips").show();
			}).mouseleave(function() {
		$(this).find(".tips").hide();
	});
	
	function showRightNav(id){
		$(".rightNav").each(function(){
			$(this).hide();
		})
		$("#"+id).show();

	}
	function hideRightNav(){
		$(".rightNav").css("opacity", "0.5");
	}
	// home page nav
	// social dash board
	$("#socialDash").click(function() {
		showRightNav("dashNav");		
	})
	// social network insight
	$("#socialNetwork").click(function() {
		showRightNav("networkNav");		
	})
	// media mediation
	$("#mediaMediation").click(function() {
		showRightNav("mediaNav");		
	})
	
		// social campaingn plan
	$("#socialCampaign").click(function() {
		
	})

	// activity automation
	$("#activityAutomation").click(function() {
		
	})


	// channel maintenace
	$("#channelMaintenace").click(function() {
		
	})
	function moveRight(){
		$("#homecontent").css("margin-left", "-985px");
		$(".rightNav").css("margin-right", "890px");
		$(".arrowLeft").show();
		$(".rightNav").each(function(){
			if($(this).css("display")=="block"){
				showRightNav($(this).attr("id"));
				$("#networkInluence").hide();
				if($(this).attr("id").indexOf("dash")>-1){
					navActive("#dash")
				}else if($(this).attr("id").indexOf("network")>-1){
					$("#networkInluence").show();
					navActive("#network")
				}else if($(this).attr("id").indexOf("media")>-1){
					navActive("#media")
				}
			}
		});
		$(".rightNav").css("opacity", "1");
		
	}
	function moveLeft(){
		$(".arrowLeft").hide();
		$("#homecontent").css("margin-left", "-120px");
		$(".rightNav").css("margin-right", "-120px");
		hideRightNav();	
		navActive("#home")
	}
	$("#arrowRight").click(function(){
		moveRight();
	})
	$(".arrowLeft").click(function(){
		moveLeft();
	})
	
	function networkNav2(id){
		$(".networkRightNav").each(function(){
			$(this).hide();
		})
		$("#"+id).show();
	}
	$("#influenceAnalysis").click(function(){
		networkNav2("networkInluence");
	});
	$("#sentimentAnalysis").click(function(){
		networkNav2("networkSentiment");
	});
	$("#costAnalysis").click(function(){
		networkNav2("networkCost");
	});
 // back home 
$("#homeNav").click(function(){
	moveLeft();
	})
//Influence Insight
$("#influenceDash").click(function(){
	window.open("influenceDash.html","_self")
	})

	//Influence Insight
$("#sentimentDash").click(function(){
	window.open("sentimentDash.html","_self")
	})
});