$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send	
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {
	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

		//all images loaded
	jQuery(window).on('load', function(){	
			if(jQuery().parallax) jQuery('.parallax').parallax();
	});

		//mobile button
	jQuery('.btn-menu').on('click',function(){
		jQuery(this).toggleClass('open-menu');
		jQuery('header nav').slideToggle('fast');
	});

// search block
	jQuery('.search-block').on('click', function(){
		jQuery(this).next().toggleClass('active');		
	});
	jQuery(window).scroll(function(){
		jQuery('form#search').removeClass('active');		
	});


// Solutions-import block toggle
jQuery('#implement .btn').on('click', function(event){
	event.preventDefault();
	jQuery(this).next().slideToggle('slow');
});


//owl slider
jQuery("#owl-slider").owlCarousel({ 
	autoPlay: 3000,
	navigation: true,
	items : 3,
	autoPlay: false,		
	pagination: false,
	scrollPerPage: false,
	navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
	itemsDesktop : [1090,3],	
	itemsDesktopSmall : [979,3] 
});	

// packery grid
	var main = {
			grid: $('.grid'),
			options: {
				itemSelector: '.grid-item',
				gutter: 4		
			},
			loadBtn: $('#packery .btn'),
			packeryGrid: [],
			ajaxPackery: function(){
			 $.getJSON('ajax-load.json', function(data) { 					
					for(var i = 0; i < data.packeryList.length;i++){
							main.packeryGrid.push('<div class="grid-item">'+
										'<img src="'+ data.packeryList[i].img +'" alt="foto">'+
										'<div class="descr-block">'+
											'<a href="'+ data.packeryList[i].link +'" class="slug">'+ data.packeryList[i].slug +'</a>'+
											'<h3 class="title">'+ data.packeryList[i].title +'</h3>'+
											'<p>'+ data.packeryList[i].descr +'</p>'+
											'<a href="'+ data.packeryList[i].link +'" class="btn small"><i class="fa fa-chevron-circle-right"></i>more</a>'+
										'</div>'+
									'</div>');										
					};   		
			    main.grid.append( main.packeryGrid ).packery('reloadItems').packery( 'layout' );
				});
			},
			initPackery: function(){
				main.grid.packery(main.options);
			},
			ajaxLoad: function(){
				main.loadBtn.on('click',function(event){
						event.preventDefault();
						main.ajaxPackery();
				});
			},
			init: function(){
				main.initPackery();
				main.ajaxLoad();
			}
};
main.init();

// var $grid = $('.grid').packery({
// 		itemSelector: '.grid-item',
// 		gutter: 4
// 	});

// jQuery('#packery .btn').on('click', function(event){
// 	event.preventDefault();
// 	ajaxPackery();	
// });


// function ajaxPackery(){
//  $.getJSON('ajax-load.json', function(data) { 
// 			var packeryGrid = [];
// 		for(var i = 0; i < data.packeryList.length;i++){
// 				packeryGrid.push('<div class="grid-item">'+
// 							'<img src="'+ data.packeryList[i].img +'" alt="foto">'+
// 							'<div class="descr-block">'+
// 								'<a href="'+ data.packeryList[i].link +'" class="slug">'+ data.packeryList[i].slug +'</a>'+
// 								'<h3 class="title">'+ data.packeryList[i].title +'</h3>'+
// 								'<p>'+ data.packeryList[i].descr +'</p>'+
// 								'<a href="'+ data.packeryList[i].link +'" class="btn small"><i class="fa fa-chevron-circle-right"></i>more</a>'+
// 							'</div>'+
// 						'</div>');										
// 		};   		
//     $('.grid').append( packeryGrid ).packery('reloadItems').packery( 'layout' );
// 	});
// };

});

