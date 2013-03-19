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
	
		function replotChart() {
		$('.esn-chart').each(function(i) {
			$(this).esnDraw();
		});
	}
	function replotMap() {
		$('.esn-plat').each(function(i) {
			$(this).esnMapDraw();
		})
	}
	
	$(function() {
			   
	 // bind table tr event
	$("table tr:not(:first)").click(function() {
		var instanceName = $(this).find("td").html();
		$("table tr:not(:first)").removeClass("trActive");
		$(this).addClass("trActive");
		var hashLocation =window.location.hash;
			if(hashLocation.indexOf('influence')>-1){
		$("#instanceName").html("&nbsp;" + instanceName);
		if (instanceName.indexOf("Samsung") > -1) {
			$("#lgData").hide();
			$("#samsungData").show();
			replotChart();

		} else {
			$("#samsungData").hide();
			$("#lgData").show();
			replotChart();
		}
			}
	})
	//go to edit page 
	$('.browserBg').click(function(){
			var hashLocation =window.location.hash;
			if(hashLocation.indexOf('influence')>-1){
			$('#tableContent').load('influenceDashEdit.html');
			}else{
				$('#tableContent').load('sentimentEdit.html');
				}
				 })
			   
	 $('.eyeBg').click(function(){
				var hashLocation =window.location.hash;				
				if(hashLocation.indexOf('influence')>-1){			
				$('#tableContent').load('influenceDashView.html');
				}else{
					$('#tableContent').load('sentimentView.html');
					}
											  })
			  
	
			   })
	