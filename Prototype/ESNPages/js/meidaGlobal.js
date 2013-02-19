$(function() {
	navSelected("media");	   
	$(".descript").fadeOut(0);

	$(".click_down").toggle(function() {
		$(this).parent().find(".descript").fadeIn(0);
		$(this).addClass('click_up');
	}, function() {
		$(this).parent().find(".descript").fadeOut(0);
		$(this).removeClass('click_up');
	});

})