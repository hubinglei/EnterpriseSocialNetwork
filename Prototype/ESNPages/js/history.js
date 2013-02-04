(function($){
    var origContent = "";

    function loadContent(hash) {
        if(hash != "") {
            if(origContent == "") {
                origContent = $('#wrapper').html();
            }
            $('#wrapper').load(hash +".html");
        } else if(origContent != "") {
			$('#userInfor').hide();
            $('#wrapper').load('login.html');
        }
    }

    $(document).ready(function() {
            $.history.init(loadContent);
            $('#nav > .navItem').not('.external-link').click(function(e) {
                    var url = $(this).attr('href');
					var id=$(this).attr('id');
                    url = url.replace(/^.*#/, '');
                    $.history.load(url);
                    return false;
                });
		
        });
})(jQuery);