// pay attention or delete attention
	function payOrDeleteAttention(){
	$(".attention").click(function(){
			var This =$(this);
			 if(This.find('img').length>0){
				 This.html('Delete Attention');
				 }else{
					This.html('<img src="image/plus-transparent.png"> Pay Attention');
					 }
								  })
    
	}
	
	function changeBg(className){
		var backgroudImg =$(className).css('background-image');
				if(backgroudImg.indexOf('browser_bg')>-1){
				$(className).css('background','url(image/eye_bg.png)');
				}else{
					$(className).css('background','url(image/browser_bg.png)');
					}
		}
	$(function() {
			   $('.browserBg').click(function(){
							changeBg('.browserBg')	
							changeBg('.eyeBg')
				
											  })
			   
			    $('.eyeBg').click(function(){
							changeBg('.eyeBg')				  
							changeBg('.browserBg')	
											  })
			  
	
			   })
	