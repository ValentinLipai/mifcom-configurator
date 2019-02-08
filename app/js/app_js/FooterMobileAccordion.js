
var FooterMobileAccordion = (function($) {

	var footerNavLinkToggleBtn = $('.footer-nav-list__mobile-toggle-link');

	function footerMobileNavToggle()
	{
		footerNavLinkToggleBtn.on('click', function(){
			var parentList = $(this).closest('.footer-nav-list');

			if ( parentList.hasClass('open') )
			{
				$(this).parent().siblings().slideUp('fast');
				parentList.removeClass('open');
			}
			else if ( $('.footer-nav-list.open').length > 0 )
			{
				$('.footer-nav-list.open').removeClass('open').find('.footer-nav-list__item').slideUp('fast');
				$(this).parent().siblings().slideDown('fast');
				parentList.addClass('open');
			}
			else
			{
				$(this).parent().siblings().slideDown('fast');
				parentList.addClass('open');
			}
		});

		
	}

    function _init() {
		footerMobileNavToggle();
	};
    
    return {
        init: _init
    };

}(jQuery));

jQuery(function () {
	
	FooterMobileAccordion.init();

});
