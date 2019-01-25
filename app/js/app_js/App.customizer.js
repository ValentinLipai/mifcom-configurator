

var App_customizer = (function($) {

	// step tabs
	var stepTabs = $('.step-tabs'),
		stepTabsNavWrapper = stepTabs.find('.step-tabs__nav-wrapper'),
		stepTabsNav = stepTabs.find('.step-tabs__nav'),
		stepTabsNavLinks = stepTabs.find('.step-tabs__nav-item'),
		stepTabsContentBlocks = stepTabs.find('.step-tabs__tab'),
		stepTabsAccordionLinks = $('.step-tabs__nav-item__submenu-link'),
		mobileTabHeadingsWrappers = $('.step-tabs__tab-mobile-heading__wrapper'),
		stepTabsViewState = '',
		configuratorCustomizer = $('.configurator-customizer');

	function initStepTabs()
	{
		if ( WINDOW_WIDTH >= 768 ) {
			stepTabsNavLinks.eq(0).addClass('active');
			stepTabsContentBlocks.eq(0).addClass('active');
			stepTabsViewState = 'pc-view';
		}
		else
		{
			stepTabsViewState = 'mobile-view';
		}
		
		stepTabsNavLinks.on('click', function(e){
			e.preventDefault();

			WINDOW_WIDTH >= 768 ? switchStepTab($(this).index()) : switchStepTabMobile($(this).index());
		});
	}

	function toggleTabContentOnResize()
	{
		var activeTabIndex = stepTabsNav.find('.active').index();

		if ( WINDOW_WIDTH >= 768 && stepTabsViewState == "mobile-view" )
		{
			if (activeTabIndex != '-1')
			{
				$('.step-tabs__tab-content').show();
				mobileTabHeadingsWrappers.eq(activeTabIndex).addClass('active');
			}
			else
			{
				stepTabsNavLinks.eq(0).addClass('active');
				mobileTabHeadingsWrappers.eq(0).addClass('active');
				stepTabsContentBlocks.eq(0).addClass('active');
				$('.step-tabs__tab-content').show();
			}
			stepTabsViewState = "pc-view";
		}
		else if ( WINDOW_WIDTH < 768 && stepTabsViewState == "pc-view" )
		{
			stepTabsViewState = "mobile-view";
			
			if ( activeTabIndex != '-1' )
			{
				stepTabsContentBlocks.not(stepTabsContentBlocks.eq(activeTabIndex)).find('.step-tabs__tab-content').hide();
				stepTabsContentBlocks.eq(activeTabIndex).find('.step-tabs__tab-content').show();
				mobileTabHeadingsWrappers.eq(activeTabIndex).addClass('active');
			}
			else
			{
				mobileTabHeadingsWrappers.removeClass('active');
				stepTabsContentBlocks.find('.step-tabs__tab-content').hide();
			}
		}
	}

	function initMobileStepTabsSwitcher()
	{
		mobileTabHeadingsWrappers.on('click', function(){
			switchStepTabMobile($(this).parent().index());
		});
	}

	function switchStepTabMobile(index)
	{ 
		var targetTab = mobileTabHeadingsWrappers.eq(index);
		var stepTabItemNavTarget = $('.step-tabs__nav-item').eq(index);

		targetTab.toggleClass('active')
			.siblings('.step-tabs__tab-content').slideToggle(200);

		mobileTabHeadingsWrappers
			.not(targetTab)
			.removeClass('active')
			.siblings('.step-tabs__tab-content').slideUp(200);

		if ( stepTabsContentBlocks.eq(index).hasClass('active') )
		{
			stepTabsContentBlocks.eq(index).removeClass('active');
		}
		else
		{
			stepTabsContentBlocks.not(stepTabsContentBlocks.eq(index)).removeClass('active');
			stepTabsContentBlocks.eq(index).addClass('active');
		}

		$('.step-tabs__nav-item').not(stepTabItemNavTarget).removeClass('active');
		stepTabItemNavTarget.toggleClass('active');

		if ( stepTabItemNavTarget.hasClass('active') ) {
			setTimeout(function(){
				mobileScrollToTab(targetTab);
			}, 250);
		}
	}

	function mobileScrollToTab(elem)
	{
		var userMenuHeight = WINDOW_WIDTH > 768 ? $(".header-top").outerHeight() : $(".header-bottom").outerHeight();
		var offset = elem.offset().top - userMenuHeight - stepTabsNav.height() 
		
		$('body,html').stop().animate({scrollTop: offset}, 1500);
	}

	function switchStepTab(tabIndex, accordionItemIndex)
	{
		if ( !stepTabsNavLinks.eq(tabIndex).hasClass('active') )
		{
			stepTabsNavLinks.removeClass('active');
			stepTabsNavLinks.eq(tabIndex).addClass('active');
			stepTabsContentBlocks.removeClass('active').eq(tabIndex).addClass('active');
			
			accordionItemIndex == undefined ? openFirstAccordioninTab(tabIndex) : openAccordionItemByIndex(tabIndex, accordionItemIndex);
		}
	}

	function accordionNavLinksHandler()
	{
		stepTabsAccordionLinks.on('click', function(e){
			e.preventDefault();
			var tabTargetIndex = $(this).data('stepTabIndex');
			var accordionItemTargetindex =  $(this).data('itemIndex');

			switchStepTab(tabTargetIndex);
			openAccordionItemByIndex(tabTargetIndex, accordionItemTargetindex);
		});
	}

	function addAccordionItemsToSidebar()
	{
		var sidebarContainer = $('.configurator-sidebar__accordion-items__list');
		var listItems = '';
		var accordionItemsCounter = 0;

		stepTabsContentBlocks.each(function(tabIndex){
			var tabAccordionItems = $(this).find('.configurator-customizer-accordion__item');
			tabAccordionItems.each(function(){
				var current = $(this);

				listItems += '\n\
					<li class="configurator-sidebar__accordion-items__item" data-tab-index="' + tabIndex + '" data-accordion-item="' + accordionItemsCounter++ + '" data-item-input-name="' + current.find('input:first').attr('name') +'"> \n\
						<a href="#" class="configurator-sidebar__accordion-items__item-link"> \n\
							<span class="configurator-sidebar__accordion-items__item-title">' + $.trim(current.find('.customizer-accordion__title').text()) +'</span> \n\
							<span class="configurator-sidebar__accordion-items__item-status">' + $.trim(current.find('.customizer-accordion__title-status').text()) + '</span> \n\
						</a> \n\
					</li>	\n\
					';
			});
		});
		sidebarContainer.html(listItems);
		sidebarAccordionItemsHandler();
	}

	function sidebarAccordionItemsHandler()
	{
		var sidebarAccordionLinks = $('.configurator-sidebar__accordion-items__item');

		sidebarAccordionLinks.eq(0).addClass('current');

		sidebarAccordionLinks.on('click', function(e){
			e.preventDefault();
			if ( $(this).hasClass('current') ) return false;

			switchStepTab( $(this).data('tabIndex') );
			openAccordionItemByIndex( $(this).data('tabIndex'), $(this).data('accordionItem') );
			$(this).siblings('.current').removeClass('current');
			$(this).addClass('current');
		});
	}

	function sidebarProductPreviewLinkHandler()
	{
		$('.configurator-sidebar__product-img__link').on('click', function(e){
			e.preventDefault();
			$('.configurator-product__main-image__link.configurator-more-views-item').click();
		});
	}

	function setSidebarAccordionItemsListHeight()
	{
		var height = WINDOW_HEIGHT - $('.configurator-sidebar__heading').outerHeight() 
					- $('.configurator-sidebar__product').outerHeight()
					- $('.configurator-sidebar__config-btn-wrapper').outerHeight()
					- $('.header-top').outerHeight();
		
		if ( !$('body').hasClass('scroll') )  height -= $('.configurator-sidebar__product-img__wrapper').outerHeight();

		$('.configurator-sidebar__accordion-items__list').height(height);
	}

	function summaryAddLinksHandler()
	{
		var summaryAddLinks = $('.customizer-catalog-summary__options-choose-link');

		summaryAddLinks.on('click', function(e){
			e.preventDefault();
			var tabTargetIndex = $(this).data('stepTabIndex');
			var accordionItemTargetindex =  $(this).data('itemIndex');

			switchStepTab(tabTargetIndex);
			openAccordionItemByIndex(tabTargetIndex, accordionItemTargetindex);
		});
	}

	function openFirstAccordioninTab(tabIndex)
	{
		var accordionItemTarget = $('.step-tabs__tab').eq(tabIndex).find('.customizer-accordion__item').eq(0);

		if ( accordionItemTarget.length == 0 ) return false;

		if ( accordionItemTarget.find('.customizer-accordion__title-block.open').length == 0 )
		{
			var accordionTargetSiblings = $('.step-tabs__tab').eq(tabIndex).find('.customizer-accordion__item').not(accordionItemTarget);
		
			accordionTargetSiblings.find('.customizer-accordion__title-block').removeClass('open').siblings('.customizer-accordion__content-block__wrapper').hide();
			accordionItemTarget.find('.customizer-accordion__title-block').addClass('open').siblings('.customizer-accordion__content-block__wrapper').show();
			loadOriginalImages(accordionItemTarget.find('.customizer-accordion__content-block__wrapper'));
		}
		scrollToAccordionTargetItem(accordionItemTarget);
	}

	function openAccordionItemByIndex(tabIndex, accordionItemIndex)
	{
		var accordionItemTarget = $('.customizer-accordion__item').eq(accordionItemIndex);
		var accordionItemTargetParentTab = $('.step-tabs__tab').eq(tabIndex);

		
		
		
		if ( accordionItemTarget.find('.customizer-accordion__title-block.open').length == 0 )
		{
			
			var accordionTargetSiblings = accordionItemTargetParentTab.find('.customizer-accordion__item').not(accordionItemTarget);
		
			accordionTargetSiblings.find('.customizer-accordion__title-block').removeClass('open').siblings('.customizer-accordion__content-block__wrapper').hide();
			accordionItemTarget.find('.customizer-accordion__title-block').addClass('open').siblings('.customizer-accordion__content-block__wrapper').show();
			loadOriginalImages(accordionItemTarget.find('.customizer-accordion__content-block__wrapper'));
		}
		scrollToAccordionTargetItem(accordionItemTarget);
	}

	function scrollToAccordionTargetItem(accordionItemTarget)
	{
		var userMenuHeight = WINDOW_WIDTH > 768 ? $(".header-top").outerHeight() : $(".header-bottom").outerHeight();
		var offset = accordionItemTarget.offset().top - userMenuHeight - stepTabsNav.height() 
		
		$('body,html').stop().animate({scrollTop: offset}, 1500);
	}


	// fix step tabs nav bar
	function fixStepTabsNav(userMenuHeight, contentBlockWidth)
	{
        if ( 
			$(window).scrollTop() >= stepTabsNavWrapper.offset().top && 
			WINDOW_WIDTH >= 768 &&
			$(window).scrollTop() <= (configuratorCustomizer.offset().top + configuratorCustomizer.height() -50 )
			) {
            stepTabsNavWrapper.css({ "height" : stepTabsNav.height()});
            stepTabsNav.css({ 
				"top" : userMenuHeight, 
				"width": contentBlockWidth,
				"position": "fixed", 
				"z-index": "20"
			});
        } else {
            stepTabsNavWrapper.removeAttr("style");
            stepTabsNav.removeAttr("style");
        }
	}

	function initFixTabsNav()
	{
		var userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-top").outerHeight() : $(".header-bottom").outerHeight();
		var contentBlockWidth = $('.step-tabs__content').width();
		
		window.addEventListener('scroll', function(){
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});

		window.addEventListener('resize', function(){
			userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-top").outerHeight() : $(".header-bottom").outerHeight();
			contentBlockWidth = $('.step-tabs__content').width();
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
	}

	function rebootStepTabs()
	{
		window.addEventListener('resize', function(){
			userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-top").outerHeight() : $(".header-bottom").outerHeight();
			contentBlockWidth = $('.step-tabs__content').width();
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
	}

	// grid switcher
	function initGridSwitcherHandler()
	{
		$('.customizer-catalog__grid-switcher__btn').on('click', function(e){
			e.preventDefault();
			var catalogBlock = $(this).closest('.customizer-catalog__block');
			
			if ( !catalogBlock.hasClass($(this).data('grid-switcher')) )
			{
				catalogBlock.attr('class', 'customizer-catalog__block ' + $(this).data('grid-switcher'));
			}
		});
	}

	// customizer filter btns
	function initFilterBtnsHandler()
	{
		$('.customizer-catalog__filter-btn').on('click', function(e){
			e.preventDefault();
			
			if ( $(this).hasClass('customizer-catalog__filter-btn--close') )
			{
				$(this).siblings().removeClass('active');
			}
			else
			{	
				$(this).toggleClass('active');
			}
		});

		$('.customizer-catalog__filter-clear-mobile-btn').on('click', function(){
			$(this).closest('.customizer-catalog__tools').find('.customizer-catalog__filter-btn').removeClass('active');
		});
	};

	function toggleFiltersList()
	{
		var toggleLinks = $('.customizer-catalog__filter-label__mob-arrow');

		toggleLinks.on('click', function(){
			$(this).parent().siblings('.customizer-catalog__filter-list').slideToggle('fast');
		});
	}


	// init accordion

	function initCustomizerAccordionHandler()
	{
		var accordionItemsTitles = $('.customizer-accordion__title-block');

		if ( accordionItemsTitles.length > 0 )
		{
			accordionItemsTitles.on('click', function(e){
				e.preventDefault();
				
				var choosenSiblingBlock = $(this).siblings('.customizer-accordion__content-block__wrapper'),
					curTabAccordionSiblings = $(this).closest('.step-tabs__tab').find('.customizer-accordion__title-block.open').not($(this));
				
				loadOriginalImages(choosenSiblingBlock);

				curTabAccordionSiblings.removeClass('open').siblings('.customizer-accordion__content-block__wrapper').slideUp('fast');
				choosenSiblingBlock.slideToggle('fast');
				$(this).toggleClass('open');
			});
		}
	}


	// product components selecting functions

	var productComponentsRadio = $('.customizer-catalog__options-input--radio');

	function componentClickHandler()
	{
		productComponentsRadio.on('change', function(){
			var self = $(this);
			if ( !self.closest('.customizer-catalog__options-item').hasClass('customizer-catalog__options-item--selected') )
			{
				changeSelectedComponent(self);
				changeSelectedComponentPreview(self);
				changeComponentsBlockHeading(self);
				changeSummaryList(self);
			}
		});
	};

	function changeSummaryList(self)
	{		
		var target = $('.customizer-catalog-summary__options-item[data-item-input-name="'+ self.attr('name') +'"]');

		target.find('.customizer-catalog-summary__options-item-title').html(self.data('productName'));
		if (!target.hasClass('success')) target.attr('class', 'customizer-catalog-summary__options-item success');
		checkEmptySummaryGroups();
	}

	function checkEmptySummaryGroups()
	{
		var summaryLists = $('.customizer-catalog-summary__options-categories__item');

		summaryLists.each(function(){
			if ( $(this).find('.customizer-catalog-summary__options-item.success').length == 0 )
			{
				$(this).addClass('empty-list');
			}
			else if ( $(this).hasClass('empty-list') )
			{
				$(this).removeClass('empty-list');
			}
		});
	}

	function switchVisibilityEmptyComponentsInSummary()
	{
		var switchBtns = $('.customizer-catalog-summary__options-filter__btn');
		var summaryContentWrapper = $('.customizer-catalog-summary__content');

		switchBtns.on('click', function(){
			if ( $(this).hasClass('active') ) return false;

			$(this).addClass('active').siblings('button').removeClass('active');
			$(this).data('action') == 'hide' ?
				 summaryContentWrapper.addClass('hide-empty'):
				 summaryContentWrapper.removeClass('hide-empty');
		});
	}

	function changeComponentsBlockHeading(self)
	{
		self
			.closest('.configurator-customizer-accordion__item')
			.find('.customizer-accordion__title-status')
			.html(self.data('product-name'));
	}

	function changeSelectedComponent(self)
	{
		self
			.closest('.customizer-catalog')
			.find('.customizer-catalog__options-item')
			.removeClass('customizer-catalog__options-item--selected');
		
		self.closest('.customizer-catalog__options-item').addClass('customizer-catalog__options-item--selected');
	};

	function changeSelectedComponentPreview(self)
	{
		var currentAccordionItem = self.closest('.customizer-accordion__item'),
			previewWrapper = currentAccordionItem.find('.customizer-catalog__sidebar-selected.selected--true');

		if ( !currentAccordionItem.hasClass('selected') ) currentAccordionItem.addClass('selected');

		previewWrapper.find('.customizer-catalog__sidebar-img').attr('src', self.data('product-image'));
		previewWrapper.find('.customizer-catalog__sidebar-title--product').html(self.data('product-name'));
		
	}

	function prepareSelectedComponents()
	{
		var choosenComponents = $('input.customizer-catalog__options-input--radio:checked');

		if ( choosenComponents.length > 0 )
		{
			choosenComponents.each(function(){
				var self = $(this);
				changeSelectedComponent(self);
				changeComponentsBlockHeading(self);
				changeSelectedComponentPreview(self);
			});
		}
	}

	function fixPreviewSidebar(topOffset)
	{
		var currentVisiblePreviewBlock = $('.customizer-catalog__sidebar-fix:visible');
		currentVisiblePreviewBlock.addClass('preview-fixed');
		
		if ( currentVisiblePreviewBlock.length == 0 ) return false;

		if (
			$(window).scrollTop() >= currentVisiblePreviewBlock.parent().offset().top && 
			$(window).scrollTop() <= (currentVisiblePreviewBlock.parent().offset().top + currentVisiblePreviewBlock.parent().height() - currentVisiblePreviewBlock.height() - 150)
		) {
            currentVisiblePreviewBlock.css({ 
				"top" : topOffset + 10, 
				"bottom": 'auto', 
				"width": currentVisiblePreviewBlock.parent().width(),
				"position": "fixed"
			});
        } else if ($(window).scrollTop() > currentVisiblePreviewBlock.parent().offset().top ) {
            currentVisiblePreviewBlock.css({ 
				"top" : 'auto',
				"bottom": 15, 
				"width": currentVisiblePreviewBlock.parent().width(),
				"position": "absolute"
			}).removeClass('preview-fixed');
        } else {
			currentVisiblePreviewBlock.removeAttr("style").removeClass('preview-fixed');
		}
		
		$('.preview-fixed').not(':visible').removeAttr("style").removeClass('preview-fixed');

	}

	function initFixPreviewSidebar()
	{
		var topOffset = $(".header-top").outerHeight() + $('.step-tabs__nav').height();

		$(window).on('scroll', function(){
			fixPreviewSidebar(topOffset);
		});

		window.addEventListener('resize', function(){
			topOffset = $(".header-top").outerHeight() + $('.step-tabs__nav').height()
		});
	}

	function fixConfiguratorSidebar(topOffset)
	{
		var configuratorSidebar = $('.configurator-sidebar-content');
		
		if (
			$(window).scrollTop() >= configuratorSidebar.parent().offset().top && 
			$(window).scrollTop() <= (configuratorSidebar.parent().offset().top + configuratorSidebar.parent().height() - configuratorSidebar.height() - 50)
			) {
            configuratorSidebar.css({ 
				"top" : topOffset, 
				"bottom": "auto",
				"width": configuratorSidebar.parent().width(),
				"position": "fixed", 
				"z-index": "20"
			}).addClass('sidebar-fixed');
        } else if ( $(window).scrollTop() > (configuratorSidebar.parent().offset().top + configuratorSidebar.parent().height() - configuratorSidebar.height() - 50) ) {
            configuratorSidebar.css({ 
				"top" : "auto", 
				"bottom": 5,
				"width": configuratorSidebar.parent().width(),
				"position": "absolute", 
				"z-index": "20"
			});
		} else {
            configuratorSidebar.removeAttr("style").removeClass('sidebar-fixed');
		}

	}

	function initFixConfiguratorSidebar()
	{
		var topOffset = $(".header-top").outerHeight();

		$(window).on('scroll', function(){
			fixConfiguratorSidebar(topOffset);
		});

		window.addEventListener('resize', function(){
			topOffset = $(".header-top").outerHeight();
		});
	}


	// lazy images

	function loadOriginalImages(accordionBlocks)
	{		
		if ( accordionBlocks.length > 0 )
		{
			accordionBlocks.each(function(){
				$(this).find('.options-lazy-img').each(function(){
					$(this).attr('src', $(this).data('original')).removeClass('options-lazy-img');
				});
			});
		}
	}

	function copySummaryToModal()
	{
		var cummaryContent = $('.customizer-catalog-summary__options-categories__list').clone(true);
		$('#modal__configurator-summary__table').append(cummaryContent);
	}

	window.addEventListener('resize', function(){
		toggleTabContentOnResize();
	});


	window.onload = function(){
		setSidebarAccordionItemsListHeight();
	}


	$(document).ready(function(){
		prepareSelectedComponents();
		loadOriginalImages($('.customizer-accordion__title-block.open').siblings('.customizer-accordion__content-block__wrapper'));
	});

    function _init() {
		initFixConfiguratorSidebar();
		initStepTabs();
		initMobileStepTabsSwitcher();
		accordionNavLinksHandler();
		initFixTabsNav();
		initFixPreviewSidebar();
		initCustomizerAccordionHandler();
		initGridSwitcherHandler();
		initFilterBtnsHandler();
		toggleFiltersList();
		componentClickHandler();
		summaryAddLinksHandler();
		checkEmptySummaryGroups();
		switchVisibilityEmptyComponentsInSummary();
		addAccordionItemsToSidebar();
		sidebarProductPreviewLinkHandler();
		copySummaryToModal();
	};
    
    return {
        init: _init
    };

}(jQuery));

jQuery(function () {
	
	App_customizer.init();	

});
