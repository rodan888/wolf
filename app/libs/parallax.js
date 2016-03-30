(function($) {
	$.fn.parallax = function(options){
		var settings = $.extend({
			speed: 0.8, // 0 -> 1 : slowly, 1 -> 2 : falster
			minWidth : 992
		}, options);
		$(this).each(function(){
			var thisSpeed = settings.speed;

			var that = $(this);
			var image = that.find('img.background');
			var prallaxHeight = that.outerHeight(); //container height
			var prallaxTop = that.offset().top; //page top -> container

			if(typeof(that.data('speed')) !== undefined){
				var speed = Math.abs(parseFloat(that.data('speed')));
				if(speed > 2){
					console.log('Too mutch speed for parallax (use 0...2)!'); //default value used
				}else if(speed == 1){
					return false; //no sense run parallax
				}else{
					thisSpeed = speed;
				}
			}

			var y = 0; //image position relatively parallax container
			var moveImage = function() {
				if($(window).width() < settings.minWidth){
					return false; //not run parallax on mobile devices
				}
				var scrTop = $(window).scrollTop(); //scrolling position document top -> window top
				var scrBottom = scrTop + $(window).innerHeight(); //scrolling position document top -> window bottom

				if(thisSpeed >= 1){
					//if faster
					y = (prallaxTop - scrBottom)*(thisSpeed-1);
				}else{
					//if slowly
					y = (prallaxTop - scrTop)*(thisSpeed-1);
					if(y < 0 && scrTop < prallaxHeight) {
						y = 0;
					}
				}

				var topBorderVisible = false; //image top edge visibility
				var bottomBorderVisible = false; //image bottom edge visibility
				if(prallaxTop > scrTop && prallaxTop < scrBottom){
					topBorderVisible = true;
					if(y > 0) y = 0;
				}

				//fix speed if image does not fit to container
				if(topBorderVisible){
					//speed -= 0.1;
					//moveImage();
					//return false;
				}

				image.css('transform','translate(0, '+ parseInt(y) +'px)');
			};

			moveImage();

			$(window).scroll(function() {
				moveImage();
			});
			$(window).resize(function() {
				moveImage();
			});
		});
	};
})(jQuery);