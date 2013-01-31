$(function() {

	$(".navigate").css("margin-top", "-" + $("#wrapper").height())
	navSelected("network");
	// scroll to my content
	$('.navList li').click(
			function() {
				$('.navList li').each(function() {
					$(this).find("a").find("img").attr("src", "image/nav.png")
					$(this).find("a").css("margin-right", "-190px")
				})
				$(this).find("a").find("img").attr("src", "image/nav3.png")
				$(this).find("a").css("margin-right", "-165px")
				var myclass = $(this).find("a").attr('class')
				var content = myclass + ("Content")
				window.scrollTo($('.' + content).position().left, $(
						'.' + content).position().top - 88);
				return false;
			});
});