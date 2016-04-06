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

if ($(window).width() < 992) {
	$('header .top-nav nav>ul>li>a').on('click',function(event){
		event.preventDefault();
		$('header .top-nav nav>ul>li>a').not(this).next().slideUp('fast');
		$(this).next().slideToggle('fast');
	});
};



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




jQuery('.tabs .tab-link').click(function(){		                    
jQuery('.tabs').find('.active').removeClass('active');
jQuery(this).addClass('active');
	var dataShow = $(this).attr('data-show');
	jQuery('.w-tabs .tab').css('display', 'none');
	jQuery('#'+dataShow).fadeIn(1000);
});




	var main = {
			grid: $('.grid'),
			owl: $("#owl-slider"),
			togBtn: $('#implement .btn'),
			options: {
				itemSelector: '.grid-item',
				gutter: 4		
			},
			owlOption: {
				autoPlay: 3000,
				navigation: true,
				items : 3,
				autoPlay: false,		
				pagination: false,
				scrollPerPage: false,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
				itemsDesktop : [1090,3],	
				itemsDesktopSmall : [979,3] 
			},
			loadBtn: $('#packery .btn'),
			packeryGrid: [],	
			flag: true,		
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
				this.grid.packery(main.options);
				this.ajaxLoad();
			},
			ajaxLoad: function(){
				this.loadBtn.on('click',function(event){
						event.preventDefault();
						main.ajaxPackery();
				});
			},
			toggleInfo: function(btn){				
			var thisText = '<i class="fa fa-angle-right"></i> find how',
					btnText = '<i class="fa fa-angle-left"></i> close',
					infoList = btn.next(),
					infoItem = infoList.find('li');

				for(i = 0; i < infoItem.length; i++){
					var index = infoItem.eq(i).index();
					infoItem.eq(i).attr('data-index', index+1);
				};

				if (this.flag == true) {
						this.flag = false; 						
						btn.html(btnText);
					}else{
						btn.html(thisText);
						this.flag = true;
					}				
					infoList.slideToggle('slow');
			},
			toggleInfoInit: function(){
				this.togBtn.on('click', function(event){
					event.preventDefault();
					main.toggleInfo($(this));					
				});
			},
			init: function(){
				// Packery grid
				this.initPackery();
				//owl init
				this.owl.owlCarousel(this.owlOption);
				// toggle info Solutions-import page
				this.toggleInfoInit();
				
			}
};
main.init();
});