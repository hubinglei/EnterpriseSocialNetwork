function showRightNav(id) {
	$(".rightNav").each(function() {
		$(this).hide();
	})
	$("#" + id).show();

}
function navSelected(id) {
	$("#nav > .navItem").removeClass("navActive");
	if($("#" + id)){
	$("#" + id).addClass("navActive");
	}
}

function networkNav2(id) {
	$(".networkRightNav").each(function() {
		$(this).hide();
	})
	$("#" + id).show();
}
function navActive(page) {
	if ( page == null||page==""||page.indexOf("login") > -1) {
		$("#userInfor").hide();
		$("#authorcontent").show();
	} else {
		$("#userInfor").show();
		$("#authorcontent").hide();
	if (page.indexOf("home") > -1) {
		$("#home").addClass("navActive");
	} else if (page.indexOf("config") > -1) {
		$("#config").addClass("navActive");
	} else if (page.indexOf("dash") > -1 || page.indexOf("Dash") > -1) {
		$("#dash").addClass("navActive");
	} else if (page.indexOf("network") > -1 || page.indexOf("group") > -1
			|| page.indexOf("brand") > -1 || page.indexOf("product") > -1
			|| page.indexOf("company") > -1 || page.indexOf("Sentiment") > -1
			|| page.indexOf("Cost") > -1 || page.indexOf("Cost") > -1
			|| page.indexOf("campaign") > -1) {
		$("#network").addClass("navActive");
	} else if (page.indexOf("paln") > -1) {
		$("#paln").addClass("navActive");
	} else if (page.indexOf("activity") > -1) {
		$("#activity").addClass("navActive");
	} else if (page.indexOf("media") > -1) {
		$("#media").addClass("navActive");
	} else if (page.indexOf("channel") > -1) {
		$("#channel").addClass("navActive");
	}
   }
}

function reload(page) {
	navActive(page)
	$("#wrapper").load(page + ".html");
}

$(function() {
	$(".arrowLeft").click(function() {
		$("#wrapper").load("homeNav.html", null, function() { });
		window.location.hash="#homeNav"
	})

	// top button
	$(".topButton").click(function() {
		window.scrollTo(0, 0);
		return false;
	});

})