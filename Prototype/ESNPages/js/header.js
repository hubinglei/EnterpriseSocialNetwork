$(function() {
$("#nav > .navItem").click(function(event) {
		event.stopPropagation();
		$("#nav > .navItem").removeClass("navActive");
		$(this).addClass("navActive");
	    $("#userInfor").show();
		$("#wrapper").load($(this).attr("id")+"Nav.html");
	});
});