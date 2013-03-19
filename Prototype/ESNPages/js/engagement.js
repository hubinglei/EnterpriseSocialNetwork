$(function() {
		   navSelected("activity");
		   
	// show widget button 	   
	$('.widgetGroup').mouseenter(function(){
					$(this).find(".widget").find('img').show();	
					}).mouseleave(function() {
				$(this).find(".widget").find('img').hide();
			});	   
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
							$(this).attr('src','image/manage.png')
							$(this).parent().find(".manage").show();
							}else if(imgSrc.indexOf('ignore')>-1){
								$(this).parent().find(".ignore").show();
								$(this).attr('src','image/ignore.png')
							}else{
								$(this).parent().find(".distribution").show();
								$(this).attr('src','image/distribution.png')
								}
						
					}).mouseleave(function() {
						$(this).each(function() {
							var imgSrc =$(this).attr('src');
							if(imgSrc.indexOf('manage')>-1){
							$(this).attr('src','image/manage_gray.png')
							}else if(imgSrc.indexOf('ignore')>-1){
								$(this).attr('src','image/ignore_gray.png')
							}else{
								$(this).attr('src','image/distribution_gray.png')
								}
	})		
				$(this).parent().find(".tips").hide();
			});
			
		
		   })