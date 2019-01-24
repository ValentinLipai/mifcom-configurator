
var App_bundle_description = (function($) {

	var toggleInitialized = false;
	var bundleDescriptionItemsLabel = $('.bundle-description__item-label');
	var resizeTimeOut;
	
	function initBundleDescriptionToggle()
	{
		if ( bundleDescriptionItemsLabel.length > 0 && !toggleInitialized)
		{
			toggleInitialized = true;
			bundleDescriptionItemsLabel.on('click', function(){
				$(this).toggleClass('open');
				$(this).siblings('.bundle-description__item-value').slideToggle('fast');
			});
		}
	};

	function removeClickHandler()
	{
		bundleDescriptionItemsLabel.off('click');
		toggleInitialized = false;
	};

	window.addEventListener('resize', function(e){		
		if ( WINDOW_WIDTH > 767 )
		{
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( function(){
				removeClickHandler();
			}, 100);
		}
		else
		{
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( function(){
				initBundleDescriptionToggle();
			}, 100);
		}
	});

    function _init() {
		if ( WINDOW_WIDTH < 768 )
		{
			initBundleDescriptionToggle();
		}
	};
    
    return {
        init: _init
    };

}(jQuery));

jQuery(function () {
	
	App_bundle_description.init();

});
