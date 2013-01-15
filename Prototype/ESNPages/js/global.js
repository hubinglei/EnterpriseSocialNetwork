//content page height
function iframeResize() {
	var obj = parent.document.getElementById("content");
	var headerHeight = parent.document.getElementById("header").height;
	obj.height = this.document.body.scrollHeight - headerHeight - 10;

}
// nav change
function navActive(id) {
	$("#nav > .navItem").removeClass("navActive");
	$(id).addClass("navActive");
}

function moveRight() {
	$("#homecontent").css("margin-left", "-985px");
	$(".rightNav").css("margin-right", "890px");
	$(".arrowLeft").show();
	$(".rightNav").each(function() {
		if ($(this).css("display") == "block") {
			showRightNav($(this).attr("id"));
			$(".networkRightNav").hide();
			if ($(this).attr("id").indexOf("dash") > -1) {
				navActive("#dash")
			} else if ($(this).attr("id").indexOf("network") > -1) {
				$("#networkInluence").show();
				navActive("#network")
			} else if ($(this).attr("id").indexOf("media") > -1) {
				navActive("#media")
			}
		}
	});
	$(".rightNav").css("opacity", "1");

}
function moveLeft() {
	$(".arrowLeft").hide();
	$("#homecontent").css("margin-left", "-120px");
	$(".rightNav").css("margin-right", "-120px");
	hideRightNav();
	navActive("#home")
}
function showRightNav(id) {
	$(".rightNav").each(function() {
		$(this).hide();
	})
	$("#" + id).show();

}
function hideRightNav() {
	$(".rightNav").css("opacity", "0.5");
}
$(function() {
	// config nav
	$("#config").click(function() {
		showRightNav("configNav");
		moveRight();
	})
	// dash nav
	$("#dash").click(function() {
		showRightNav("dashNav");
		moveRight();
	})
	// media nav
	$("#media").click(function() {
		showRightNav("mediaNav");
		moveRight();
	})
});