
var App_configurator = (function($){

	var productGalleryThumbsSliderInitialized = false,
		productGalleryThumbsSlider = $('.more-views__mobile-slider'),
		resizeTimeOut;

	// product fancy gallery

	function initFancyGallery()
	{
		var slides = $('.configurator-more-views-item');
		
		if ( slides.length > 0 )
		{
			slides.fancybox({
				keyboard: true,
				loop: true,
				arrows: true,
				infobar: true,
				smallBtn: "auto",
				toolbar: "auto",
				baseClass: "configurator-product__gallery-fancybox",
				title: "Gaming PC Konfigurator Intel (9. Gen.) (So. 1151)"
			});
		}
	}

	function initSlickProductGallerySlider()
	{
		if ( productGalleryThumbsSlider.length > 0 && !productGalleryThumbsSliderInitialized )
		{
			productGalleryThumbsSliderInitialized = true;

			var prevArrow = productGalleryThumbsSlider.siblings('#more-views__arrow--prev'),
				nextArrow = productGalleryThumbsSlider.siblings('#more-views__arrow--next');
			
				productGalleryThumbsSlider.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				mobileFirst: true,
				vertical: true,
				verticalSwiping: true,
				nextArrow: nextArrow,
				prevArrow: prevArrow,
				responsive: [
					{
						breakpoint: 760,
						settings: {
							vertical: false,
							slidesToShow: 5
						}
					},
					{
						breakpoint: 992,
						settings: "unslick"
					}
				]
			});
		}
	}

	function dropdownTooltip()
	{
		var links = $('.dropdown-tooltip__trigger');

		links.on('click', function(e){
			e.preventDefault();

			var targetTooltip = $(this).siblings('.dropdown-tooltip');

			if ( targetTooltip.hasClass('dropdown-tooltip--active') )
			{
				$(this).removeClass('dropdown-tooltip__trigger--active');
				targetTooltip.removeClass('dropdown-tooltip--active');
			}
			else
			{
				links.not($(this)).removeClass('dropdown-tooltip__trigger--active');
				$(this).addClass('dropdown-tooltip__trigger--active');
				$('.dropdown-tooltip').not(targetTooltip).removeClass('dropdown-tooltip--active');
				targetTooltip.addClass('dropdown-tooltip--active');
			}
		});
	}



	function _init() {
		initFancyGallery();
		initSlickProductGallerySlider();
		dropdownTooltip();
    }

	function resizePcFunctions() {		
		productGalleryThumbsSliderInitialized = false;
	}
	
	function resizeMobileFunctions() {
		if ( !productGalleryThumbsSliderInitialized ) initSlickProductGallerySlider();
	}

	window.addEventListener('resize', function(e){		
		if ( WINDOW_WIDTH > 991 )
		{
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( resizePcFunctions, 100);
		}
		else
		{
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( resizeMobileFunctions, 100);
		}
	});

    
    return {
        init: _init
    }



}(jQuery));

jQuery(function () {


	
	App_configurator.init();

    // jQuery(scrollElement).on('scroll', function () {
    //     App.mobile.nav.fixedNav();
    // });
});