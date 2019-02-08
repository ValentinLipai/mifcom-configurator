var configuratorPageScripts = (function($){

	/**
	 * initialization product slider & fancybox
	 */

	var productGalleryThumbsSliderInitialized = false,
		productGalleryThumbsSlider = $('.more-views__mobile-slider'),
		resizeTimeOut;

	/**
	 * initialization product thumbs slider 
	 */
	function initFancyGallery()
	{
		var slides = $('.more-views__fancy-item');
		
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

	/**
	 * initialization product thumbs fancybox
	 */
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
	};

	/**
	 * initialization product bundle description colapsing
	 */
	function initBundleDescriptionToggle()
	{
		var bundleDescriptionToggleBtn = $('.bundle-description__toggle-btn');
		
		if ( bundleDescriptionToggleBtn.length > 0)
		{
			bundleDescriptionToggleBtn.on('click', function(){
				$(this).toggleClass('open');
				$(this).parent().siblings('.bundle-description__value').slideToggle('fast');
			});
		}
	};

	/**
	 * 
	 * STEP TABS
	 * 
	 */

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

	/**
	 * initialization step tabs
	 */
	function initStepTabs()
	{
		if ( Body.hasClass('body-mobile') ) 
		{
			stepTabsViewState = 'mobile-view';
		}
		else
		{
			stepTabsNavLinks.eq(0).addClass('active');
			stepTabsContentBlocks.eq(0).addClass('active');
			stepTabsViewState = 'pc-view';
		}
		
		stepTabsNavLinks.on('click', function(e){
			e.preventDefault();

			Body.hasClass('body-mobile') ? switchStepTabMobile($(this).index()) : switchStepTab($(this).index());
		});
	}

	/**
	 * transforming tab view on resizeing
	 */
	function toggleTabContentOnResize()
	{
		var activeTabIndex = stepTabsNav.find('.active').index();

		if ( !Body.hasClass('body-mobile') && stepTabsViewState == "mobile-view" )
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
		else if ( Body.hasClass('body-mobile') && stepTabsViewState == "pc-view" )
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

	/**
	 * initializing tabs switching on mobile devices
	 */
	function initMobileStepTabsSwitcher()
	{
		mobileTabHeadingsWrappers.on('click', function(){
			switchStepTabMobile($(this).parent().index());
		});
	}

	/**
	 * tabs switching on mobile devices
	 */
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

	/**
	 * animate scrolling to choosen tab
	 */
	function mobileScrollToTab(elem)
	{
		var userMenuHeight = Body.hasClass('body-mobile') ? $(".header-main").outerHeight() : $(".header-sticky").outerHeight();
		var offset = elem.offset().top - userMenuHeight - stepTabsNav.height() 
		
		$('body,html').stop().animate({scrollTop: offset}, 1500);
	}

	/**
	 * tabs switching on PC
	 */
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

	/**
	 * add click event handler to accordion navigation links
	 */
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

	/**
	 * add accordion items to main sidebar panel
	 */
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

	/**
	 * add click event handler to accordion links in main sidebar panel
	 */
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

	/**
	 * add click handler to product preview image in main sidebar (open product fancy gallery)
	 */
	function sidebarProductPreviewLinkHandler()
	{
		$('.sidebar-product-img__link').on('click', function(e){
			e.preventDefault();
			$('.product-image__link.more-views__fancy-item').click();
		});
	}

	/**
	 * set height to accordion links list in main sidebar
	 */
	function setSidebarAccordionItemsListHeight()
	{
		var height = WINDOW_HEIGHT - $('.sidebar-heading').outerHeight() 
					- $('.sidebar-product').outerHeight()
					- $('.sidebar-config-btn__wrapper').outerHeight()
					- $('.header-sticky').outerHeight();
		
		if ( !$('body').hasClass('scroll') )  height -= $('.sidebar-product-img').outerHeight();

		$('.sidebar-accordion-links__list').height(height);
	}
	/**
	 * add click event handler to links in summary list
	 */
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
	
	/**
	 * opening first accordion item in target tab
	 * @param {number} tabIndex 
	 */
	function openFirstAccordioninTab(tabIndex)
	{
		var accordionItemTarget = $('.step-tab').eq(tabIndex).find('.accordion__item').eq(0);

		if ( accordionItemTarget.length == 0 ) return false;

		if ( accordionItemTarget.find('.accordion-title.open').length == 0 )
		{
			var accordionTargetSiblings = $('.step-tab').eq(tabIndex).find('.accordion__item').not(accordionItemTarget);
		
			accordionTargetSiblings.find('.accordion-title').removeClass('open').siblings('.accordion-content').hide();
			accordionItemTarget.find('.accordion-title').addClass('open').siblings('.accordion-content').show();
		}
		scrollToAccordionTargetItem(accordionItemTarget);
		loadOriginalImages();
	}

	/**
	 * opening target accordion item by index
	 * @param {number} tabIndex 
	 * @param {number} accordionItemIndex 
	 */
	function openAccordionItemByIndex(tabIndex, accordionItemIndex)
	{
		var accordionItemTarget = $('.accordion__item').eq(accordionItemIndex);
		var accordionItemTargetParentTab = $('.step-tab').eq(tabIndex);

		if ( accordionItemTarget.find('.accordion-title.open').length == 0 )
		{
			
			var accordionTargetSiblings = accordionItemTargetParentTab.find('.accordion__item').not(accordionItemTarget);
		
			accordionTargetSiblings.find('.accordion-title').removeClass('open').siblings('.accordion-content').hide();
			accordionItemTarget.find('.accordion-title').addClass('open').siblings('.accordion-content').show();
		}
		scrollToAccordionTargetItem(accordionItemTarget);
		loadOriginalImages();
	}

	/**
	 * animating scroll to target accordion item
	 * @param {number} accordionItemTarget 
	 */
	function scrollToAccordionTargetItem(accordionItemTarget)
	{
		var userMenuHeight = !Body.hasClass('body-mobile') ? $(".header-sticky").outerHeight() : $(".header-main").outerHeight();
		var offset = accordionItemTarget.offset().top - userMenuHeight - stepTabsNav.height() 
		
		$('body,html').stop().animate({scrollTop: offset}, 1500);
	}


	/**
	 * toggle fixed state of step tabs navigation bar
	 * @param {number} userMenuHeight 
	 * @param {number} contentBlockWidth 
	 */
	function fixStepTabsNav(userMenuHeight, contentBlockWidth)
	{
        if ( 
			$(window).scrollTop() >= stepTabsNavWrapper.offset().top && 
			!Body.hasClass('body-mobile') &&
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
	/**
	 * initiaizing fixation step tabs navigation 
	 */
	function initFixTabsNav()
	{
		var userMenuHeight = Body.hasClass('body-tablet') ? $(".header-main").outerHeight() : $(".header-sticky").outerHeight();
		var contentBlockWidth = $('.step-tabs-content').width();
		
		window.addEventListener('scroll', function(){
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
		
		window.addEventListener('resize', function(){
			userMenuHeight = Body.hasClass('body-tablet') ? $(".header-main").outerHeight() : $(".header-sticky").outerHeight();
			contentBlockWidth = $('.step-tabs-content').width();
			fixStepTabsNav(userMenuHeight, contentBlockWidth);
		});
	}
	
	/**
	 * initialization catalog grid switcher
	 */
	function initGridSwitcherHandler()
	{
		$('.catalog-grid-switcher__btn').on('click', function(e){
			e.preventDefault();
			var catalogBlock = $(this).closest('.configurator-catalog');
			
			if ( !catalogBlock.hasClass($(this).data('grid-switcher')) )
			{
				catalogBlock.attr('class', 'configurator-catalog ' + $(this).data('grid-switcher'));
			}
			loadOriginalImages();
		});
	}

	/**
	 * add click handler to catalog filter buttons
	 */
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

	/**
	 * show/hide filters list on mobile devices
	 */
	function toggleFiltersList()
	{
		var toggleLinks = $('.catalog-filter-label__mob-arrow');

		toggleLinks.on('click', function(){
			$(this).parent().siblings('.catalog-filter-list').slideToggle('fast');
		});
	}


	/**
	 * accordion initialization
	 */
	function initCustomizerAccordionHandler()
	{
		var accordionItemsTitles = $('.accordion-title');

		if ( accordionItemsTitles.length > 0 )
		{
			accordionItemsTitles.on('click', function(e){
				e.preventDefault();
				
				var choosenSiblingBlock = $(this).siblings('.accordion-content'),
					curTabAccordionSiblings = $(this).closest('.step-tab').find('.accordion-title.open').not($(this));
				
					
				curTabAccordionSiblings.removeClass('open').siblings('.accordion-content').slideUp('fast');
				choosenSiblingBlock.slideToggle('fast');
				$(this).toggleClass('open');
			});
		}
		loadOriginalImages();
	}


	/**
	 * add change handler to components inputs
	 */
	
	function componentClickHandler()
	{
		var productComponentsRadio = $('.configurator-article__input--radio');

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

	/**
	 * changing information in summary lists
	 * @param {string} self 
	 */
	function changeSummaryList(self)
	{		
		var target = $('.configurator-summary-article[data-item-input-name="'+ self.attr('name') +'"]');

		target.find('.configurator-summary-article__title').html(self.data('productName'));
		if (!target.hasClass('success')) target.attr('class', 'configurator-summary-article success');
		checkEmptySummaryGroups();
	}

	/**
	 * toggle classes empty summary groups lists
	 */
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

	/**
	 * show/hide empty groups in summary 
	 */
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

	/**
	 * changing articles group heading
	 * @param {object} self 
	 */
	function changeComponentsBlockHeading(self)
	{
		self
			.closest('.accordion__item')
			.find('.accordion-title__status')
			.html(self.data('product-name'));
	}

	/**
	 * change view of selected article and his siblings
	 * @param {object} self 
	 */
	function changeSelectedComponent(self)
	{
		self
			.closest('.configurator-articles')
			.find('.configurator-article')
			.removeClass('configurator-article--selected');
		
		self.closest('.configurator-article').addClass('configurator-article--selected');
	};

	/**
	 * changing preview information on articles group sidebar
	 * @param {object} self 
	 */
	function changeSelectedComponentPreview(self)
	{
		var currentAccordionItem = self.closest('.accordion__item'),
			previewWrapper = currentAccordionItem.find('.configurator-sidebar__selected.selected--true');

		if ( !currentAccordionItem.hasClass('selected') ) currentAccordionItem.addClass('selected');

		previewWrapper.find('.configurator-sidebar__img').attr('src', self.data('product-image'));
		previewWrapper.find('.configurator-sidebar__title--product').html(self.data('product-name'));
		
	}

	/**
	 * add selected components information to group headings and sidebar preview when page load
	 */
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

	/**
	 * fixation articles group sidebar on srolling
	 * @param {number} topOffset 
	 */
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

	/**
	 * initialize fixation of current visible atricles preview sidebar
	 */
	function initFixPreviewSidebar()
	{
		var userMenuHeight = Body.hasClass('body-tablet') ? $(".header-main").outerHeight() : $(".header-sticky").outerHeight();
		var topOffset = userMenuHeight + $('.step-tabs-nav__list').height();

		$(window).on('scroll', function(){
			topOffset = userMenuHeight + $('.step-tabs-nav__list').height();

			fixPreviewSidebar(topOffset);
		});

		window.addEventListener('resize', function(){
			topOffset = userMenuHeight + $('.step-tabs-nav__list').height();
		});
	}
	/**
	 * fixation main sidebar on scrolling
	 * @param {number} topOffset 
	 */
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

	/**
	 * initialize fixation main sidebar
	 */
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

	/**
	 * delayed images loading
	 */
	function loadOriginalImages()
	{		
		$('.options-lazy-img:visible').each(function(){
			$(this).attr('src', $(this).data('original')).removeClass('options-lazy-img');
		});
	}

	/**
	 * copy summary table to modal window
	 */
	function copySummaryToModal()
	{
		var cummaryContent = $('.configurator-summary-categories__list').clone(true);
		$('#modal-configurator-summary__table').append(cummaryContent);
	}


	/**
	 * 
	 * DETAIL MODAL
	 * 
	 */

	var detailPrevArticleBtn = ('.modal-detail-article__nav-btn--prev');
	var detailNextArticleBtn = ('.modal-detail-article__nav-btn--next');
	var detailArticleTitle = $('.modal-detail-article__title');
	var detailTabBtns = $('.modal-detail-tabs-nav__btn');
	var detailTabContentTabs = $('.modal-detail-tab');
	var detailTopSlider = $('.modal-detail-slider-big');
	var detailBottomSlider = $('.modal-detail-slider-thumbs');
	var detailSliderPrevImgBtn = $('.modal-detail-slider-big__arrow--prev');
	var detailSliderNextImgBtn = $('.modal-detail-slider-big__arrow--next');
	var detailPrice = $('.modal-detail-price');
	var detailMainInfoText = $('.modal-detail-info-table__text');
	var detailMainInfoTable = $('.modal-detail-info-table');
	var detailSlidersInitialized = false;
	var openDetailModalBtns = $('.js-product-details');
	var loadedDetails = {};
	
	/**
	 * fix horizontal scrolling of thums slider when slides count less then need 
	 */
	function checkSliderLength()
	{
		var slidesToShow = Body.hasClass('body-mobile') ? 3 : 6;

		detailBottomSlider.find('img').length < slidesToShow ? detailBottomSlider.addClass('block-slide') : detailBottomSlider.removeClass('block-slide'); 
	}

	/**
	 * preparing article information and add it to detail modal and reinit sliders
	 * @param {object} productData 
	 */
	function prepareDetailInfo(productData)
	{

		detailArticleTitle.text(productData['name']);

		if (detailSlidersInitialized) destroyDetailSliders();

		var topSliderItemsStr = '';
		var bottomSliderItemsStr = '';

		var imagesLength = productData['images'].length;

		for ( var i = 0; i < imagesLength; i++ )
		{
			topSliderItemsStr += '<img class="modal-detail-slider-big__img" src="'+ productData['images'][i]['big_img_url'] +'" alt="">';
			bottomSliderItemsStr += '<img class="modal-detail-slider-thumbs__img" src="'+ productData['images'][i]['small_img_url'] +'" alt="">';
		}

		detailTopSlider.html(topSliderItemsStr);
		detailBottomSlider.html(bottomSliderItemsStr);

		initDetailSliders();

		var detailTableOneRowStr = '';

		$.each(productData['details'], function(key, value){
			detailTableOneRowStr += '<li class="modal-detail-table__line">' +
				'<span class="modal-detail-table__parametr">'+ value['group_name'] +'</span>' +
				'<span class="modal-detail-table__value">'+ value['attributes'] +'</span>'
			'</li>';
		});
		
		detailMainInfoTable.html(detailTableOneRowStr);

		detailMainInfoText.html(productData['text']);
	}

	/**
	 * getting previous and next articles id in articles group
	 * @param {object} current 
	 * @param {string} currentProductId 
	 */
	function getPrevNextArticlesIds(current, currentProductId)
	{
		var currentItem = current.closest('.configurator-article');
		var prevItemProdId;
		var nextItemProdId;
		
		if ( currentItem.prev().length == 0 )
		{
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
	}

	/**
	 * add click event handler to articles detail button
	 * @param {object} instance 
	 * @param {object} current 
	 */
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

	/**
	 * initializing tabs in detail modal
	 */
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

	/**
	 * destroing sliders in detail modal
	 */
	function destroyDetailSliders()
	{
		detailTopSlider.slick('unslick');
		detailBottomSlider.slick('unslick');
		detailSlidersInitialized = !detailSlidersInitialized;
	}

	/**
	 * initializing sliders in detail modal
	 */
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
			// adaptiveHeight: true,
			prevArrow: detailSliderPrevImgBtn,
			nextArrow: detailSliderNextImgBtn,
			asNavFor: detailBottomSlider
		});

		checkSliderLength();
	}

	/**
	 * initializing fancy box detail modal
	 */
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

	/**
	 * do: simulates a response to a request
	 * must do: get article detail information from server
	 * @param {string} productId 
	 */
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

	/**
	 * function to PC devices
	 */
	function resizePcFunctions() {		
		productGalleryThumbsSliderInitialized = false;
	}
	
	/**
	 * function to mobile devices
	 */
	function resizeMobileFunctions() {
		if ( !productGalleryThumbsSliderInitialized ) initSlickProductGallerySlider();
	}

	/**
	 * call resize functions
	 */
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
		toggleTabContentOnResize();
		checkSliderLength();
	});

	/**
	 * functions that must be initialized after the page is fully loaded
	 */
	window.onload = function(){
		setSidebarAccordionItemsListHeight();
		loadOriginalImages();
	}

	/**
	 * init function
	 */
    function _init() {
		initDetailTabs();
		initDetalsFancyModal();
		initBundleDescriptionToggle();

		initFancyGallery();
		initSlickProductGallerySlider();
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
		prepareSelectedComponents();
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


/**
 * add click handler to dropdouw tooltips
 */
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




jQuery(function () {
	configuratorPageScripts.init();
	dropdownTooltip();
});