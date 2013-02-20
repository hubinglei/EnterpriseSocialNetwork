$(function() {
	navSelected("media");	   
	$(".descript").fadeOut(0);
	function click_down(){
	$(".click_down").toggle(function() {
		$(this).parent().find(".descript").fadeIn(0);
		navHeight();
		$(this).addClass('click_up');
	}, function() {
		$(this).parent().find(".descript").fadeOut(0);
		navHeight();
		$(this).removeClass('click_up');
	});
	}
	
	navHeight();
	click_down();
	function navHeight(){
	$(".navigate").css("margin-top", "-" + $("#wrapper").height()-5);
	}
	
	$('.navList li a').click(
			function() {
				$('.navList li a').each(function() {
					$(this).find("img").attr("src", "image/nav.png")
					$(this).css("margin-right", "0px")
					$(this).css("margin-left", "15px")
					
				})
				$(this).find("img").attr("src", "image/nav3.png")
				$(this).css("margin-left", "0px")
				$(this).css("margin-right", "30px")
				var myclass = $(this).attr('class')
				var content = myclass + ("Content")
				window.scrollTo($('.' + content).position().left, $(
						'.' + content).position().top - 88);
				return false;
			});
	
	
	$('#addMedia').click(function(){
			var mediaHtml ='<div class="mediaGroup newGroup"><div class="addMediatitle">Media Name</div><div class="click_down"></div><hr /><div class="descript"><div class="interface"></div><div class="filter"></div><div class="right"></div><div class="open"></div><p><img src="image/expand.png" />Media Name</p><input type="text" value="Add Media Name"></p><p><img src="image/expand.png" />Comment</p><input type="text" value="Add Comment"></p><p><img src="image/expand.png" />Related Entity</p><input type="text" value="Add Related Entity"></p><p><img src="image/expand.png" />Short Message</p><input type="text" value="Add Short Message"></p><p><img src="image/expand.png" />Long Message</p><input type="text" style="height:100px;" value="Add Long Message"></p><p><img src="image/expand.png" />Picture</p><p><img src="image/addpicture.png"/></p><img src="image/expand.png" />Video</p><img src="image/addvideo.png" /><p><img src="image/expand.png" />URL</p><input type="text" value="Add URL"></p><p><img src="image/expand.png" />Document</p><div class="addDocument">Add Document</div><p><img src="image/expand.png" />Vote</p><input type="text" value="Add Vote"></p><p><img src="image/expand.png" />Media Release</p><div class="imgList"><img src="image/twitter.png" /><img src="image/facebook.png" /><img src="image/onehp.png" /><img src="image/onehp.png" /><img src="image/hpconnect.png" /><img src="image/linkedin.png" /><img src="image/sharepoint.png" /></div><div class="cancleButton">Cancle</div><div class="saveButton">OK</div>';
			if(!$('.mediaGroup').last().hasClass("newGroup")){
			$(".navigate").before(mediaHtml);
			}
			 click_down();
			 $('.mediaGroup').last().find(".click_down").trigger("click");
			navHeight();
			$('.cancleButton').click(function(){
								  $('.newGroup').remove();
								  })
						 
						 })
	
	
})