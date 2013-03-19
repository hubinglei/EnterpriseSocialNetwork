$(function() {
	//$(".navigate").css("margin-top", "-" + $("#wrapper").height());
	navSelected("network");
	// scroll to my content
	$('.navList li a').click(
			function() {
				$('.navList li a').each(function() {
					$(this).find("img").attr("src", "image/nav.png");
					$(this).css("margin-right", "-190px");
				});
				$(this).find("img").attr("src", "image/nav3.png");
				$(this).css("margin-right", "-165px");
				var myclass = $(this).attr('class');
				var content = myclass + ("Content");
				window.scrollTo($('.' + content).position().left, $(
						'.' + content).position().top - 88);
				return false;
			});
});