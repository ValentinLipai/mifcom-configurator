
var App_footer = (function($) {

	var footerNavLinkHeadings = $('.footer-nav-links__list-heading');
	var mobileNavState = WINDOW_WIDTH > 991 ? false : true;

	function footerMobileNavToggle()
	{
		footerNavLinkHeadings.on('click', function(){
			if ( WINDOW_WIDTH > 991 ) return false;

			var parentList = $(this).closest('.footer-nav-links__list');

			if ( parentList.hasClass('open') )
			{
				$(this).siblings().slideUp('fast');
				parentList.removeClass('open');
			}
			else if ( $('.footer-nav-links__list.open').length > 0 )
			{
				$('.footer-nav-links__list.open').removeClass('open').find('.footer-nav-links__list-item').slideUp('fast');
				$(this).siblings().slideDown('fast');
				parentList.addClass('open');
			}
			else
			{
				$(this).siblings().slideDown('fast');
				parentList.addClass('open');
			}
		});

		
	}

	
	window.addEventListener('resize', function(e){		
		if ( WINDOW_WIDTH > 991 && mobileNavState )
		{
			mobileNavState = !mobileNavState;
			$('.footer-nav-links__list-item').show();
		}
		else if ( WINDOW_WIDTH < 992 && !mobileNavState )
		{
			$('.footer-nav-links__list-item').hide();
			mobileNavState = !mobileNavState;
		}
	});



    function _init() {
		footerMobileNavToggle();
	};
    
    return {
        init: _init
    };

}(jQuery));

jQuery(function () {
	
	App_footer.init();

});
