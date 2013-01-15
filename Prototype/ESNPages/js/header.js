$(function() {
$("#nav > .navItem").click(function(event) {
		event.stopPropagation();
		$("#nav > .navItem").removeClass("navActive");
		$(this).addClass("navActive");
		if ($("#author").hasClass("navActive")) {
			 $("#userInfor").hide();
		}else{
			 $("#userInfor").show();
		}
	});
});