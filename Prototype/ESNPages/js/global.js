function showRightNav(id) {
	$(".rightNav").each(function() {
		$(this).hide();
	})
	$("#" + id).show();

}
function navSelected(id){
	$("#nav > .navItem").removeClass("navActive");
	$("#"+id).addClass("navActive");
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
	
		// top button
	$(".topButton").click(function() {
		window.scrollTo(0,0);
		/*$('body,html').animate({
			scrollTop : 0,
			Top:0
		}, 0);
		*/
		return false;
	});

	 })