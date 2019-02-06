

var App_customizer = (function($) {

	// step tabs
	var stepTabs = $('.step-tabs'),
		stepTabsNavWrapper = stepTabs.find('.step-tabs-nav'),
		stepTabsNav = stepTabs.find('.step-tabs-nav__list'),
		stepTabsNavLinks = stepTabs.find('.step-tabs-nav__item'),
		stepTabsContentBlocks = stepTabs.find('.step-tab'),
		stepTabsAccordionLinks = $('.step-tabs-submenu__link'),
		mobileTabHeadingsWrappers = $('.step-tab-mobile-heading'),
		stepTabsViewState = '',
		configuratorCustomizer = $('.configurator');

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
				$('.step-tab-content').show();
				mobileTabHeadingsWrappers.eq(activeTabIndex).addClass('active');
			}
			else
			{
				stepTabsNavLinks.eq(0).addClass('active');
				mobileTabHeadingsWrappers.eq(0).addClass('active');
				stepTabsContentBlocks.eq(0).addClass('active');
				$('.step-tab-content').show();
			}
			stepTabsViewState = "pc-view";
		}
		else if ( WINDOW_WIDTH < 768 && stepTabsViewState == "pc-view" )
		{
			stepTabsViewState = "mobile-view";
			
			if ( activeTabIndex != '-1' )
			{
				stepTabsContentBlocks.not(stepTabsContentBlocks.eq(activeTabIndex)).find('.step-tab-content').hide();
				stepTabsContentBlocks.eq(activeTabIndex).find('.step-tab-content').show();
				mobileTabHeadingsWrappers.eq(activeTabIndex).addClass('active');
			}
			else
			{
				mobileTabHeadingsWrappers.removeClass('active');
				stepTabsContentBlocks.find('.step-tab-content').hide();
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
		var stepTabItemNavTarget = $('.step-tabs-nav__item').eq(index);

		targetTab.toggleClass('active')
			.siblings('.step-tab-content').slideToggle(200);

		mobileTabHeadingsWrappers
			.not(targetTab)
			.removeClass('active')
			.siblings('.step-tab-content').slideUp(200);

		if ( stepTabsContentBlocks.eq(index).hasClass('active') )
		{
			stepTabsContentBlocks.eq(index).removeClass('active');
		}
		else
		{
			stepTabsContentBlocks.not(stepTabsContentBlocks.eq(index)).removeClass('active');
			stepTabsContentBlocks.eq(index).addClass('active');
		}

		$('.step-tabs-nav__item').not(stepTabItemNavTarget).removeClass('active');
		stepTabItemNavTarget.toggleClass('active');

		if ( stepTabItemNavTarget.hasClass('active') ) {
			setTimeout(function(){
				mobileScrollToTab(targetTab);
			}, 250);
		}
	}

	function mobileScrollToTab(elem)
	{
		var userMenuHeight = WINDOW_WIDTH > 768 ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
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
		var sidebarContainer = $('.sidebar-accordion-links__list');
		var listItems = '';
		var accordionItemsCounter = 0;

		stepTabsContentBlocks.each(function(tabIndex){
			var tabAccordionItems = $(this).find('.accordion__item');
			tabAccordionItems.each(function(){
				var current = $(this);

				listItems += '\n\
					<li class="sidebar-accordion-item" data-tab-index="' + tabIndex + '" data-accordion-item="' + accordionItemsCounter++ + '" data-item-input-name="' + current.find('input:first').attr('name') +'"> \n\
						<a href="#" class="sidebar-accordion-item__link"> \n\
							<span class="sidebar-accordion-item__title">' + $.trim(current.find('.accordion-title-info__text').text()) +'</span> \n\
							<span class="sidebar-accordion-item__status">' + $.trim(current.find('.accordion-title__status').text()) + '</span> \n\
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
		var sidebarAccordionLinks = $('.sidebar-accordion-item');

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
		$('.sidebar-product-img__link').on('click', function(e){
			e.preventDefault();
			$('.product-image__link.more-views__fancy-item').click();
		});
	}

	function setSidebarAccordionItemsListHeight()
	{
		var height = WINDOW_HEIGHT - $('.sidebar-heading').outerHeight() 
					- $('.sidebar-product').outerHeight()
					- $('.sidebar-config-btn-wrapper').outerHeight()
					- $('.header-sticky').outerHeight();
		
		if ( !$('body').hasClass('scroll') )  height -= $('.sidebar-product-img').outerHeight();

		$('.sidebar-accordion-links__list').height(height);
	}

	function summaryAddLinksHandler()
	{
		var summaryAddLinks = $('.configurator-summary-article__link');

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
		var accordionItemTarget = $('.step-tab').eq(tabIndex).find('.accordion__item').eq(0);

		if ( accordionItemTarget.length == 0 ) return false;

		if ( accordionItemTarget.find('.accordion-title.open').length == 0 )
		{
			var accordionTargetSiblings = $('.step-tab').eq(tabIndex).find('.accordion__item').not(accordionItemTarget);
		
			accordionTargetSiblings.find('.accordion-title').removeClass('open').siblings('.accordion-content').hide();
			accordionItemTarget.find('.accordion-title').addClass('open').siblings('.accordion-content').show();
			loadOriginalImages(accordionItemTarget.find('.accordion-content'));
		}
		scrollToAccordionTargetItem(accordionItemTarget);
	}

	function openAccordionItemByIndex(tabIndex, accordionItemIndex)
	{
		var accordionItemTarget = $('.accordion__item').eq(accordionItemIndex);
		var accordionItemTargetParentTab = $('.step-tab').eq(tabIndex);

		
		
		
		if ( accordionItemTarget.find('.accordion-title.open').length == 0 )
		{
			
			var accordionTargetSiblings = accordionItemTargetParentTab.find('.accordion__item').not(accordionItemTarget);
		
			accordionTargetSiblings.find('.accordion-title').removeClass('open').siblings('.accordion-content').hide();
			accordionItemTarget.find('.accordion-title').addClass('open').siblings('.accordion-content').show();
			loadOriginalImages(accordionItemTarget.find('.accordion-content'));
		}
		scrollToAccordionTargetItem(accordionItemTarget);
	}

	function scrollToAccordionTargetItem(accordionItemTarget)
	{
		var userMenuHeight = WINDOW_WIDTH > 768 ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
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
		var userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
		var contentBlockWidth = $('.step-tab-content').width();
		
		window.addEventListener('scroll', function(){
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
		
		window.addEventListener('resize', function(){
			console.log('RESIZE');
			userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
			contentBlockWidth = $('.step-tab-content').width();
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
	}

	function rebootStepTabs()
	{
		window.addEventListener('resize', function(){
			userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
			contentBlockWidth = $('.step-tab-content').width();
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
	}

	// grid switcher
	function initGridSwitcherHandler()
	{
		$('.catalog-grid-switcher__btn').on('click', function(e){
			e.preventDefault();
			var catalogBlock = $(this).closest('.configurator-catalog');
			
			if ( !catalogBlock.hasClass($(this).data('grid-switcher')) )
			{
				catalogBlock.attr('class', 'configurator-catalog ' + $(this).data('grid-switcher'));
			}
		});
	}

	// customizer filter btns
	function initFilterBtnsHandler()
	{
		$('.catalog-filter__btn').on('click', function(e){
			e.preventDefault();
			
			if ( $(this).hasClass('catalog-filter__btn--close') )
			{
				$(this).siblings().removeClass('active');
			}
			else
			{	
				$(this).toggleClass('active');
			}
		});

		$('.catalog-filter__btn--clear-mobile').on('click', function(){
			$(this).closest('.configurator-catalog__tools').find('.catalog-filter__btn').removeClass('active');
		});
	};

	function toggleFiltersList()
	{
		var toggleLinks = $('.catalog-filter-label__mob-arrow');

		toggleLinks.on('click', function(){
			$(this).parent().siblings('.catalog-filter-list').slideToggle('fast');
		});
	}


	// init accordion

	function initCustomizerAccordionHandler()
	{
		var accordionItemsTitles = $('.accordion-title');

		if ( accordionItemsTitles.length > 0 )
		{
			accordionItemsTitles.on('click', function(e){
				e.preventDefault();
				
				var choosenSiblingBlock = $(this).siblings('.accordion-content'),
					curTabAccordionSiblings = $(this).closest('.step-tab').find('.accordion-title.open').not($(this));
				
				loadOriginalImages(choosenSiblingBlock);

				curTabAccordionSiblings.removeClass('open').siblings('.accordion-content').slideUp('fast');
				choosenSiblingBlock.slideToggle('fast');
				$(this).toggleClass('open');
			});
		}
	}


	// product components selecting functions

	var productComponentsRadio = $('.configurator-article__input--radio');

	function componentClickHandler()
	{
		productComponentsRadio.on('change', function(){
			var self = $(this);
			if ( !self.closest('.configurator-article').hasClass('configurator-article--selected') )
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
		var target = $('.configurator-summary-article[data-item-input-name="'+ self.attr('name') +'"]');

		target.find('.configurator-summary-article__title').html(self.data('productName'));
		if (!target.hasClass('success')) target.attr('class', 'configurator-summary-article success');
		checkEmptySummaryGroups();
	}

	function checkEmptySummaryGroups()
	{
		var summaryLists = $('.configurator-summary-category');

		summaryLists.each(function(){
			if ( $(this).find('.configurator-summary-article.success').length == 0 )
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
		var switchBtns = $('.configurator-summary-filter__btn');
		var summaryContentWrapper = $('.configurator-summary-content');

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
			.closest('.accordion__item')
			.find('.accordion-title__status')
			.html(self.data('product-name'));
	}

	function changeSelectedComponent(self)
	{
		self
			.closest('.configurator-articles')
			.find('.configurator-article')
			.removeClass('configurator-article--selected');
		
		self.closest('.configurator-article').addClass('configurator-article--selected');
	};

	function changeSelectedComponentPreview(self)
	{
		var currentAccordionItem = self.closest('.accordion__item'),
			previewWrapper = currentAccordionItem.find('.configurator-sidebar__selected.selected--true');

		if ( !currentAccordionItem.hasClass('selected') ) currentAccordionItem.addClass('selected');

		previewWrapper.find('.configurator-sidebar__img').attr('src', self.data('product-image'));
		previewWrapper.find('.configurator-sidebar__title--product').html(self.data('product-name'));
		
	}

	function prepareSelectedComponents()
	{
		var choosenComponents = $('input.configurator-article__input--radio:checked');

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
		var currentVisiblePreviewBlock = $('.configurator-sidebar__fix:visible');
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
		var userMenuHeight = WINDOW_WIDTH > 992 ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
		var topOffset = userMenuHeight + $('.step-tabs-nav__list').height();

		$(window).on('scroll', function(){
			topOffset = userMenuHeight + $('.step-tabs-nav__list').height();

			fixPreviewSidebar(topOffset);
		});

		window.addEventListener('resize', function(){
			topOffset = userMenuHeight + $('.step-tabs-nav__list').height();
		});
	}

	function fixConfiguratorSidebar(topOffset)
	{
		var mainSidebar = $('.sidebar');
		
		if (
			$(window).scrollTop() >= mainSidebar.parent().offset().top && 
			$(window).scrollTop() <= (mainSidebar.parent().offset().top + mainSidebar.parent().height() - mainSidebar.height() - 50)
		) {
			console.log('1');
			
			mainSidebar.css({ 
				"top" : topOffset, 
				"bottom": "auto",
				"width": mainSidebar.parent().width(),
				"position": "fixed", 
				"z-index": "20"
			}).addClass('sidebar-fixed');
		} else if ( $(window).scrollTop() > (mainSidebar.parent().offset().top + mainSidebar.parent().height() - mainSidebar.height() - 50) ) {
			console.log('2');
            mainSidebar.css({ 
				"top" : "auto", 
				"bottom": 5,
				"width": mainSidebar.parent().width(),
				"position": "absolute", 
				"z-index": "20"
			});
		} else {
			console.log('3');
            mainSidebar.removeAttr("style").removeClass('sidebar-fixed');
		}

	}

	function initFixConfiguratorSidebar()
	{
		var topOffset = $(".header-sticky").outerHeight();

		$(window).on('scroll', function(){
			fixConfiguratorSidebar(topOffset);
		});

		window.addEventListener('resize', function(){
			topOffset = $(".header-sticky").outerHeight();
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
		var cummaryContent = $('.configurator-summary-categories__list').clone(true);
		$('#modal__configurator-summary__table').append(cummaryContent);
	}


	// detail modal variables

	var detailPrevArticleBtn = ('#modal__detail-article__nav--prev');
	var detailNextArticleBtn = ('#modal__detail-article__nav--next');
	var detailArticleTitle = $('#modal__detail-article__title');
	var detailTabBtns = $('.modal__detail-tabs__nav-btn');
	var detailTabContentTabs = $('.modal__detail-tabs__tab');
	var detailTopSlider = $('#modal__detail-gallery__slider-top');
	var detailBottomSlider = $('#modal__detail-gallery__slider-bottom');
	var detailSliderPrevImgBtn = $('#modal__detail-gallery__slider-top__arrow--prev');
	var detailSliderNextImgBtn = $('#modal__detail-gallery__slider-top__arrow--next');
	var detailPrice = $('#modal__detail-price');
	var detailMainInfoTitle = $('#modal__detail-main-info__title');
	var detailMainInfoText = $('#modal__detail-main-info__table-text');
	var detailMainInfoCaptionAttention = $('#modal__detail-main-info__table-caption--attention');
	var detailMainInfoTable = $('#modal__detail-main-info__table');
	var detailSlidersInitialized = false;
	var openDetailModalBtns = $('.js-product-details');
	var loadedDetails = {};
	

	window.addEventListener('resize', checkSliderLength);

	function checkSliderLength()
	{
		var slidesToShow = WINDOW_WIDTH > 768 ? 6 : 3;

		detailBottomSlider.find('img').length < slidesToShow ? detailBottomSlider.addClass('block-slide') : detailBottomSlider.removeClass('block-slide'); 
	}

	function prepareDetailInfo(productData)
	{

		detailArticleTitle.text(productData['name']);

		if (detailSlidersInitialized) destroyDetailSliders();

		var topSliderItemsStr = '';
		var bottomSliderItemsStr = '';

		var imagesLength = productData['images'].length;

		for ( var i = 0; i < imagesLength; i++ )
		{
			topSliderItemsStr += '<img class="modal__detail-gallery__slider-top__img" src="'+ productData['images'][i]['big_img_url'] +'" alt="">';
			bottomSliderItemsStr += '<img class="modal__detail-gallery__slider-bottom__img" src="'+ productData['images'][i]['small_img_url'] +'" alt="">';
		}

		detailTopSlider.html(topSliderItemsStr);
		detailBottomSlider.html(bottomSliderItemsStr);

		initDetailSliders();

		var detailTableOneRowStr = '';

		$.each(productData['details'], function(key, value){
			detailTableOneRowStr += '<li class="modal__detail-main-info__table-line">' +
				'<span class="modal__detail-main-info__table-line__parametr">'+ value['group_name'] +'</span>' +
				'<span class="modal__detail-main-info__table-line__value">'+ value['attributes'] +'</span>'
			'</li>';
		});
		
		detailMainInfoTable.html(detailTableOneRowStr);

		detailMainInfoText.html(productData['text']);
	}


	function getPrevNextArticlesIds(current, currentProductId)
	{
		var currentItem = current.closest('.configurator-article');
		var prevItemProdId;
		var nextItemProdId;
		
		if ( currentItem.prev().length == 0 )
		{
			console.log('currentItem.prev()');
			
			console.log(currentItem.parent());
			console.log(currentItem.parent().find('.configurator-article'));
			console.log(currentItem.parent().find('.configurator-article').last());
			

			prevItemProdId = currentItem.parent().find('.configurator-article').last().find('input').data('productId');
		}
		else
		{
			prevItemProdId = currentItem.prev().find('input').data('productId');
		}

		if ( currentItem.next().length == 0 )
		{
			nextItemProdId = currentItem.parent().find('.configurator-article').first().find('input').data('productId');
		}
		else
		{
			nextItemProdId = currentItem.next().find('input').data('productId');
		}

		console.log(prevItemProdId, nextItemProdId);
		

	}

	function DetailBtnsHandler(instance, current)
	{	
		
		var productId = current.opts.$orig.data('productId');
		
		getPrevNextArticlesIds(current.opts.$orig, productId);

		if ( loadedDetails[productId] != undefined )
		{
			prepareDetailInfo(loadedDetails[productId]);
		}
		else
		{
			productDetailInfoRequest(productId);
		}
	}

	function initDetailTabs()
	{
		detailTabBtns.on('click',function(){
			var index = $(this).index();

			if ( detailTabContentTabs.eq(index).hasClass('active') ) return false;

			detailTabBtns.not($(this)).removeClass('active');
			$(this).addClass('active');
			detailTabContentTabs.not(detailTabContentTabs.eq(index)).removeClass('active');
			detailTabContentTabs.eq(index).addClass('active');
		});
	}

	function destroyDetailSliders()
	{
		detailTopSlider.slick('unslick');
		detailBottomSlider.slick('unslick');
		detailSlidersInitialized = !detailSlidersInitialized;
	}

	function initDetailSliders()
	{
		if ( detailSlidersInitialized ) return false;
		
		detailSlidersInitialized = !detailSlidersInitialized;

		detailBottomSlider.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			arrows: false,
			asNavFor: detailTopSlider,
			focusOnSelect: true,
			mobileFirst: true,
			responsive: [
				{
					breakpoint: 760,
					settings: {
						slidesToShow: 6
					}
				}
			]
		});

		detailTopSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			arrows: true,
			adaptiveHeight: true,
			prevArrow: detailSliderPrevImgBtn,
			nextArrow: detailSliderNextImgBtn,
			asNavFor: detailBottomSlider
		});

		checkSliderLength();
	}

	function initDetalsFancyModal()
	{
		var defaults = {
			// Close existing modals
			// Set this to false if you do not need to stack multiple instances
			closeExisting: false,
		  
			// Enable infinite gallery navigation
			loop: false,
		  
			// Horizontal space between slides
			gutter: 50,
		  
			// Enable keyboard navigation
			keyboard: false,
		  
			// Should allow caption to overlap the content
			preventCaptionOverlap: false,
		  
			// Should display navigation arrows at the screen edges
			arrows: false,
		  
			// Should display counter at the top left corner
			infobar: false,
		  
			// Should display close button (using `btnTpl.smallBtn` template) over the content
			// Can be true, false, "auto"
			// If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
			smallBtn: "auto",
		  
			// Should display toolbar (buttons at the top)
			// Can be true, false, "auto"
			// If "auto" - will be automatically hidden if "smallBtn" is enabled
			toolbar: false,
		  
			// What buttons should appear in the top right corner.
			// Buttons will be created using templates from `btnTpl` option
			// and they will be placed into toolbar (class="fancybox-toolbar"` element)
			buttons: [
			  "close"
			],
		  
			// Detect "idle" time in seconds
			idleTime: 3,
		  
			// Disable right-click and use simple image protection for images
			protect: false,
		  
			// Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
			modal: true,
		  
			image: {
			  // Wait for images to load before displaying
			  //   true  - wait for image to load and then display;
			  //   false - display thumbnail and load the full-sized image over top,
			  //           requires predefined image dimensions (`data-width` and `data-height` attributes)
			  preload: false
			},
		  
			// Open/close animation type
			// Possible values:
			//   false            - disable
			//   "zoom"           - zoom images from/to thumbnail
			//   "fade"
			//   "zoom-in-out"
			//
			animationEffect: "fade",
		  
			// Duration in ms for open/close animation
			animationDuration: 366,
		  
			// Loading indicator template
			spinnerTpl: '<div class="fancybox-loading"></div>',
		  
			// Error message template
			errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
		  
			btnTpl: {
			  close:
				'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
				"</button>",
		  
			  // This small close button will be appended to your html/inline/ajax content by default,
			  // if "smallBtn" option is not set to false
			  smallBtn:
				'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
				'<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
				"</button>"
			},
		  
			// Container is injected into this element
			parentEl: "body",
		  
			// Hide browser vertical scrollbars; use at your own risk
			hideScrollbar: true,
		  
			// Focus handling
			// ==============
		  
			// Try to focus on the first focusable element after opening
			autoFocus: false,
		  
			// Do not let user to focus on element outside modal content
			trapFocus: false,
		  
			// Module specific options
			// =======================
		  
			fullScreen: {
			  autoStart: false
			},
		  
			// Set `touch: false` to disable panning/swiping
			touch: false,
		  
			// Hash value when initializing manually,
			// set `false` to disable hash change
			hash: null,
		  
		  
		  
			// Use mousewheel to navigate gallery
			// If 'auto' - enabled for images only
			wheel: false,
		  
		  
			onInit: $.noop, // When instance has been initialized
		  
			beforeLoad: $.noop, // Before the content of a slide is being loaded
			afterLoad: $.noop, // When the content of a slide is done loading
		  
			beforeShow: function(instance, current){
				DetailBtnsHandler(instance, current, this)
			}, // Before open animation starts
			afterShow: $.noop, // When content is done loading and animating
		  
			beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
			afterClose: $.noop, // After instance has been closed
		  
			onActivate: $.noop, // When instance is brought to front
			onDeactivate: $.noop, // When other instance has been activated
		  
			// Clicked on the content
			clickContent: function(current, event) {
				console.log(current, current.type, event);
			  return current.type === "image" ? "zoom" : false;
			},
		  
			// Clicked on the slide
			clickSlide: false,
		  
			// Clicked on the background (backdrop) element;
			// if you have not changed the layout, then most likely you need to use `clickSlide` option
			clickOutside: "close",
		  
			// Same as previous two, but for double click
			dblclickContent: false,
			dblclickSlide: false,
			dblclickOutside: false,
		  
			// Custom options when mobile device is detected
			// =============================================
		  
			mobile: {
			  preventCaptionOverlap: false,
			  idleTime: false,
			  clickContent: function(current, event) {
				return current.type === "image" ? "toggleControls" : false;
			  },
			  clickSlide: function(current, event) {
				return current.type === "image" ? "toggleControls" : "close";
			  },
			  dblclickContent: function(current, event) {
				return current.type === "image" ? "zoom" : false;
			  },
			  dblclickSlide: function(current, event) {
				return current.type === "image" ? "zoom" : false;
			  }
			},
		  
		  };
		  
		  openDetailModalBtns.fancybox(defaults);
	}

	function productDetailInfoRequest(productId)
	{
		var response = {
			"name": "be quiet! Dark Rock Pro 4 | 135mm+120mm PWM-Lüfter",
			"images": 
			[
				{
					"main_image":"true",
					"big_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n0.jpg",
					"main_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/366x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n0.jpg",
					"small_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/140x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n0.jpg"
				},
				{
					"main_image":"false",
					"big_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n1.jpg",
					"main_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/366x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n1.jpg",
					"small_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/140x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n1.jpg"
				},
				{
					"main_image":"false",
					"big_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n2.jpg",
					"main_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/366x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n2.jpg",
					"small_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/140x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n2.jpg"
				},
				{
					"main_image":"false",
					"big_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n3.jpg",
					"main_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/366x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n3.jpg",
					"small_img_url":"https://www.mifcom.de/media/catalog/product/cache/1/image/140x/9df78eab33525d08d6e5fb8d27136e95/1/7/1794846-n3.jpg"
				}
			],
			"details": 
			{
				"cpufan_type_compare": 
				{
					"group_name":"Bauart",
					"attributes":"Luftkühler (Turm)"
				},
				"cpufan_size_compare": 
				{
					"group_name":"Abmessungen",
					"attributes":"136x163x146mm"
				},
				"cpufan_fanspecs_compare": 
				{
					"group_name":"Lüfter",
					"attributes":"135x135x22mm, 1200rpm, 24.3dB(A) + 120x120x25, 1500rpm, 16.4dB(A)"
				},
				"cpufan_tdp_compare": 
				{
					"group_name":"TDP",
					"attributes":"<b>250W</b>"
				},
				"cpufan_material_compare": 
				{
					"group_name":"Material",
					"attributes":"Kupfer, Aluminum"
				},
				"cpufan_weight_compare": 
				{
					"group_name":"Gewicht",
					"attributes":"1.13kg"
				},
				"cpufan_compintel_compare": 
				{
					"group_name":"Kompatibilität (Intel)",
					"attributes":"1150, 1151, 1155, 1156, 2011, 2011-3, 2066-"
				},"cpufan_compamd_compare": 
				{
					"group_name":"Kompatibilität (AMD)",
					"attributes":"AM2, AM2+, AM3, AM3+, AM4, FM1, FM2, FM2+"
				},
				"warranty_compare": {
					"group_name":"Herstellergarantie",
					"attributes":"3 Jahre"
				},
				"cpufan_special_compare": {
					"group_name":"Besonderheiten",
					"attributes":"- "
				}
			},
			"text":"<p>Das Bitfenix Enso besitzt ein minimalistisches Design mit einer Front aus Metall, einem Seitenteil aus Glas und einer RGB LED-Beleuchtung. Die Beleuchtung ist ASUS Aura Sync-kompatibel, sodass sich die Beleuchtung der einzelnen Komponenten mit dem Geh&auml;use synchronisieren l&auml;sst, sofern ein passendes ASUS-Mainboard mit 3-Pin-Konnektor verbaut wird.</p><p>Der Innenraum l&auml;sst sich dank verschiedener Funktionen aufger&auml;umt gestalten. Auf der R&uuml;ckseite des Mainboards ist mit 23 Millimetern ausreichend Platz f&uuml;r Kabelmanagement und drei 2,5&ldquo;-Festplatten. Hinter einer Blende k&ouml;nnen Netzteil und zwei 3,5&ldquo;-Festplatten verbaut werden.</p><p>An der Front verstecken sich gleich 3 Lufteinl&auml;sse, hinter denen Platz f&uuml;r zwei 140mm-L&uuml;fter oder einen 280mm-Radiator ist. An der Oberseite ist Platz f&uuml;r zwei 120mm-L&uuml;fter und an der R&uuml;ckseite kann ein weiterer montiert werden. CPU-K&uuml;hler bis zu einer H&ouml;he von 160mm passen ins Bitfenix Enso. Herausziehbare Staubfilter an der Vorder- und Unterseite verhindern das Eindringen von Staub ins Geh&auml;use und lassen eine einfache Reinigung zu.</p>",
			"current_price":84,
			"old_price":"€ 84,00",
			"is_in_stock":true
		};

		loadedDetails[productId] = response;
		
		prepareDetailInfo(response);

	}


	window.addEventListener('resize', function(){
		toggleTabContentOnResize();
	});


	window.onload = function(){
		setSidebarAccordionItemsListHeight();
	}


	$(document).ready(function(){
		prepareSelectedComponents();
		loadOriginalImages($('.accordion-title.open').siblings('.accordion-content'));
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

		initDetailTabs();
		initDetalsFancyModal();
	};
    
    return {
        init: _init
    };

}(jQuery));

jQuery(function () {
	
	App_customizer.init();	

});
