
var bundleDescription = (function($) {

	var bundleDescriptionToggleBtn = $('.bundle-description__toggle-btn');
	
	function initBundleDescriptionToggle()
	{
		if ( bundleDescriptionToggleBtn.length > 0)
		{
			bundleDescriptionToggleBtn.on('click', function(){
				$(this).toggleClass('open');
				$(this).parent().siblings('.bundle-description__value').slideToggle('fast');
			});
		}
	};


    function _init() {
		initBundleDescriptionToggle();
	};
    
    return {
        init: _init
    };

}(jQuery));

jQuery(function () {
	
	bundleDescription.init();

});
