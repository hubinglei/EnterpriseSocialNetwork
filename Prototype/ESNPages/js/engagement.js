$(function() {
		   navSelected("activity");
		   
		   
		   	// show tips
	$(".widget img")
			.mouseenter(
					function() {
						var div = $(".tips")
						var self = $(this);
						var p = self.position()
						var x = p.left + self.width() / 2;
						var docWidth = $(document).width();
						var y = p.top - self.height();
						div.css("left", x);
						div.css("top", y+5);
						var imgSrc =$(this).attr('src');
						if(imgSrc.indexOf('manage')>-1){
							$(this).parent().find(".manage").show();
							}else if(imgSrc.indexOf('ignore')>-1){
								$(this).parent().find(".ignore").show();
							}else{
								$(this).parent().find(".distribution").show();
								}
						
					}).mouseleave(function() {
				$(this).parent().find(".tips").hide();
			});
		   })