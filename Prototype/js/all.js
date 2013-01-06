$(function() {
	//page refesh , remember this page
	window.onunload=function(){
		
	}	   
	window.onload=function(){
		//$("#nav #dash").click();
		}		   
    // show or hide user infor (img setting)
	showHideUserInfor();
	function showHideUserInfor(){
		  if($("#authorcontent").css("display")=="block"){
		   $("#userInfor").hide();
		   }else{
			    $("#userInfor").show();
			   }
			   }
			   
	//click "enter" key		   
	$("input[name='password']").keydown(function(e) {
		if (e.keyCode == 13) {
			$("#loginButton").click();
		}
	});
	// login event 
	$("#loginButton")
			.click(
					function(event) {
						var userAccout = $("input[name='userAccout']").val();
						var password = $("input[name='password']").val();
						if (userAccout == "") {
							$("input[name='userAccout']").focus();
							$("#userLogin span").first().show();
						} else {
							$("#userLogin span").first().hide();
							if (password == "") {
								$("input[name='password']").focus();
								$("#userLogin span").last().show();
							} else if ((password != "" && password !== "admin")
									|| (userAccout != "" && userAccout !== "admin")) {
								$("#userLogin span")
										.html(
												"The  User Account or password you entered is incorrect.")
										.last().show();
							}

							if (userAccout == "admin" && password == "admin") {
								$("#authorcontent").css("display", "none");
								showHideUserInfor();
								$("#fristName").html(userAccout)
								$("#lastName").html(userAccout)
								//$("#userImg img").first().attr("src",
								//		"image/photo.png");
								$("#homecontent").show();
								$("#nav > .navItem").removeClass("navActive");
								$("#home").addClass("navActive")
							}
						}
					})



	// change nav
	$("#nav > .navItem").click(function(event) {
		event.stopPropagation();
		$("#nav > .navItem").each(function(i) {
			if ($(this).hasClass("navActive")) {
				$("#" + $(this).attr("id") + ("content")).hide();
			}
		});
		$("#nav > .navItem").removeClass("navActive");

		$(this).addClass("navActive");

		$("#" + $(this).attr("id") + ("content")).show();
		showHideUserInfor();
	});

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


	// home page nav
	// social dash board
	$("#socialDash").click(function() {
		$("#nav #dash").click();
	})

	// social network insight
	$("#socialNetwork").click(function() {
		$("#nav #network").click();
	})

	// social campaingn plan
	$("#socialCampaign").click(function() {
		$("#nav #plan").click();
	})

	// activity automation
	$("#activityAutomation").click(function() {
		$("#nav #activity").click();
	})

	// media mediation
	$("#mediaMediation").click(function() {
		$("#nav #media").click();
	})

	// channel maintenace
	$("#channelMaintenace").click(function() {
		$("#nav #channel").click();
	})
	// even table rows style
	$(".socialTable tr:odd").css("background-color", "#FFFFFF");
	$(".sentimentTable tr:odd").css("background-color", "#FFFFFF");

	// socail dash board -anlaysis
	// area click
	$("#area").click(function() {
		$("#overview").addClass("overview1");
	})

	$("#date").click(function() {
		$("#overview").removeClass("overview1")
		$("#overview").addClass("overview")
	})

});