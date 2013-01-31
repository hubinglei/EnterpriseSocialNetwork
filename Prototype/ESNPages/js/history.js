(function($){
    var origContent = "";

    function loadContent(hash) {
        if(hash != "") {
            if(origContent == "") {
                origContent = $('#wrapper').html();
            }
            $('#wrapper').load(hash +".html");
        } else if(origContent != "") {
            $('#wrapper').html(origContent);
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
			window.onload = function() {
				var newHash=window.location.hash;
				navActive(newHash)
		
	       }
		
        });
})(jQuery);