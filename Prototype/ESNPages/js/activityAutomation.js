$(function() {
		   navSelected("activity");
		   
		   // show widget button 	   
	$('.widgetGroup').mouseenter(function(){
					$(this).find(".widget").find('img').show();	
					}).mouseleave(function() {
				$(this).find(".widget").find('img').hide();
			});	
		   
		   	// show dailog
			$(".edit").click(function(){
				showHideMask('show');  
        		letDivCenter(".dailog"); 
									  
									  })
			$('.cancleButton').click(function(){
											  showHideMask('hide');
											  $('.dailog').hide();
											  })
			$('.saveButton').click(function(){
											  showHideMask('hide');
											   $('.dailog').hide();
											  })
   function showHideMask(show){  
        $("#mask").css("height",$(document).height());  
        $("#mask").css("width",$(document).width()); 
		if(show=='show'){
        $("#mask").show(); 
		}else{
			 $("#mask").hide(); 
			}
    }  
  
  
    function letDivCenter(divName){   
        var top = ($(window).height() - $(divName).height())/2;   
        var left = ($(window).width() - $(divName).width())/2;   
        var scrollTop = $(document).scrollTop();   
        var scrollLeft = $(document).scrollLeft();   
        $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();  
    }  
   
   
    $("#tabmenu dl a").click(function(){
						var tabId =$(this).parent().attr('id');
						for(i =1 ;i <5;i ++){
							$("#con"+i).hide();
							$("#tab"+i).css('border','#dbdbdb 1px solid');
							$("#tab"+i).css('background','#e4e5e4');
							$("#tab"+i).css('color','#23A0D8');
						if(tabId.indexOf(i)>-1){
							$("#con"+i).show();
							$(this).parent().css('border-bottom','0');
							$(this).parent().css('color','black');
							$(this).parent().css('background','#F3F3F3');
							}
						}
						
						})

   
		   })