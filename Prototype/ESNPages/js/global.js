
	//content page height
	function iframeResize(){
		var obj = parent.document.getElementById("content"); 
		var headerHeight=parent.document.getElementById("header").height; 
		obj.height = this.document.body.scrollHeight-headerHeight-10;  
		
	}
	// nav change
	function navActive(id){
		$("#nav > .navItem").removeClass("navActive");
		$(id).addClass("navActive");
		/*if ($("#author").hasClass("navActive")) {
			 $("#userInfor").hide();
		}else{
			 $("#userInfor").show();
		}*/
	}
