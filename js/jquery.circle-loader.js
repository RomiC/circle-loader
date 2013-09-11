(function($) {
	$.fn.circleLoader = function(params) {
		var settings = {
			stroke: "#F00",
			"stroke-width": 20
		};

		return this.each(function() {
			$(this).html("<svg height=\""+ Math.min($(this).width(), $(this).height()) +"\" version=\"1.1\" width=\""+ Math.min($(this).width(), $(this).height()) +"\" xmlns=\"http://www.w3.org/2000/svg\" style=\"overflow: hidden; position: relative;\"></svg>");
		});
	};
})(jQuery)
