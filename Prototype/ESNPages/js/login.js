$(function() {		   
	//click "enter" key		
	$("#userInfor").hide();
	$("input[name='password']").keydown(function(e) {
		if (e.keyCode == 13) {
			$("#loginButton").click();
		}
	});
	// login event 
	$("#loginButton")
			.click(
					function(event) {
						var userAccout = $("input[name='userAccout']").val();
						var password = $("input[name='password']").val();
						if (userAccout == "") {
							$("input[name='userAccout']").focus();
							$("#userLogin span").first().show();
						} else {
							$("#userLogin span").first().hide();
							if (password == "") {
								$("input[name='password']").focus();
								$("#userLogin span").last().show();
							} else if ((password != "" && password !== "admin")
									|| (userAccout != "" && userAccout !== "admin")) {
								$("#userLogin span")
										.html(
												"The  User Account or password you entered is incorrect.")
										.last().show();
							}

							if (userAccout == "admin" && password == "admin") {
								$("#wrapper").load("homeNav.html");
								
							}
						}
					})
})