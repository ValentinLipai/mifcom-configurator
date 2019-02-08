
var App_nav = (function($) {

	var $header = $('header'),
		$mainNav = $('.header-nav'),
		$mainNavParentLinks = $mainNav.find('.nav-item__parent'),
		$mainNavBackLinks = $mainNav.find('.nav-item__back'),
		$mainNavBurger = $('.header-nav__burger'),
		$mainNavLists = $mainNav.find('.nav-list, .nav-submenu__menus, .nav-submenu__menus li ul'),
		headerHeight,
		parentLinkHandlerEnabled = false,
		initializedMobileDefaultHandlers = false,
		resizeTimeOut; 


	function setNavListHeight(){		
		$mainNavLists.css('height', WINDOW_HEIGHT - headerHeight);
	}
	function removeNavListHeight(){
		$mainNavLists.css('height', 'auto');
	}
	
	function takeHeaderHeight(){
		headerHeight = $header.height();
	}

	function addBurgerHandler(){
		$mainNavBurger.on('click', function(){
			$(this).hasClass('active') ? closeMainNav($(this)) : openMainNav($(this));
		});
	}

	function closeMainNav(btn){		
		btn.removeClass('active');
		$mainNav.find('.show').removeClass('show');
		$mainNav.removeClass('open');
	}

	function openMainNav(btn){
		btn.addClass('active')
		$mainNav.addClass('open');
	}

	function addParentLinksHandler(){
		if ( !parentLinkHandlerEnabled ) {
			parentLinkHandlerEnabled = true;
			$mainNavParentLinks.on('click', function(e){
				e.preventDefault();
				var self = $(this);

				if ( self.hasClass('nav-item__level-top') )
				{
					self.find('.nav-submenu__menus').addClass('show')
					self.closest('ul').addClass('o-hidden');
				}
				else
				{
					self.find('ul').addClass('show')

					if (self.closest('ul').hasClass('nav-submenu'))
					{
						self.closest('.nav-submenu__menus').addClass('o-hidden');
					}
					else
					{
						self.closest('ul').addClass('o-hidden');
					}
				}
			});
		}
	}
	function removeParentLinksHandler(){
		if ( parentLinkHandlerEnabled ) {
			parentLinkHandlerEnabled = false;
			$mainNavParentLinks.off('click');
		}
	}

	function addBackLinkHandler(){	
		$mainNavBackLinks.on('click', function(e){
			e.stopPropagation();
			if ( e.target != $(this).find('a').get(0) ) {
				$(this).closest('.show').removeClass('show');
				$(this).closest('.o-hidden').removeClass('o-hidden');
			}
		});
	}

	function initMobileDefaultHandlers()
	{
		addBackLinkHandler();
		addBurgerHandler();
		setNavListHeight();
		addParentLinksHandler();
		initializedMobileDefaultHandlers = true;
	}

    function _init() {
		takeHeaderHeight();
		
		if ( Body.hasClass('body-tablet') )
		{
			initMobileDefaultHandlers();
		}
    }

	function resizePcFunctions() {		
		removeNavListHeight();
		removeParentLinksHandler();
		if ( $mainNav.hasClass('open') ) closeMainNav($mainNavBurger);
	}
	
	function resizeMobileFunctions() {
		takeHeaderHeight();
		addParentLinksHandler();
		initializedMobileDefaultHandlers ? setNavListHeight() : initMobileDefaultHandlers();
	}

	window.addEventListener('scroll', function(){		
		if ( Body.hasClass('body-mobile') ) {
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( resizeMobileFunctions, 100);
		}
	});

	window.addEventListener('resize', function(e){
		if ( Body.hasClass('body-tablet') )
		{
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( resizeMobileFunctions, 100);
		}
		else
		{
			clearTimeout(resizeTimeOut);
			resizeTimeOut = setTimeout( resizePcFunctions, 100);
		}
	});

    
    return {
        init: _init
    }

}(jQuery));

jQuery(function () {
	App_nav.init();
});
