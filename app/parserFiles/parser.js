function parseGroupsData(selector)
{
	var $ = jQuery;
	var oneTab = $(selector);
	var groups = oneTab.find('.c-step-content');
	var groupsData = [];

	var imagesPaths = [];

	groups.each(function(){
		var groupItem = $(this);
		var groupHeading = $.trim(groupItem.find('h2').text());
		var accodrItems = groupItem.find('.c-step-level-4');

		groupItemData = {
			"heading": groupHeading,
			"data": []
		};

		accodrItems.each(function(){
			var stepItem = $(this);
			var stepItemHeadingIcon = stepItem.find('.c-step-header-icon .image').attr('src');
			var stepItemHeading = stepItem.find('.c-step-header-text').text();
			var stepItemBanner = stepItem.find('.c-category-info img').attr('src');

			if ( stepItemBanner != undefined )
			{	
				imagesPaths.push(stepItemBanner);
				var tempVar = stepItemBanner.split('/'); 
				stepItemBanner = 'img/customizer-items/thumbs/' + tempVar[tempVar.length - 1]; 
			}

			var stepItemfilters = (function(){
				var filters = [];
				stepItem.find('.olp-filter-conditions li').each(function(){
					filters.push($.trim($(this).text()));
				});
				return filters;
			}());
			var stepItemComponentsGroups = stepItem.find('.c-step-level-5, .c-step-level-4');
			
			stepItemData = {
				"heading-icon": stepItemHeadingIcon,
				"heading-text": stepItemHeading,
				"banner": stepItemBanner,
				"filters": stepItemfilters,
				"stepItemGroupData": []
			}

				stepItemComponentsGroups.each(function(){
					var stepItemGroupItem = $(this);
					var stepItemGroupHeading = stepItemGroupItem.find('.c-step-level-header').text().split('-');
					var options = stepItemGroupItem.find('.options-list-item');
					var stepItemGroupItemData = {
						"heading": stepItemGroupHeading,
						"options": []
					};
					options.each(function(){
						var oItem = $(this);

						var oItemData = {
							"disabled": $(this).hasClass('option-list-disabled'),
							"input" : {
								"id": oItem.find('input').attr('id'),
								"name": oItem.find('input').attr('name'),
								"value" : oItem.find('input').val(),
								"data": oItem.find('input').data(),
								"type": oItem.find('input').attr('type'),
								"checked": oItem.find('input').is(':checked')
							},
							"img": {
								"path": oItem.find('.options-item-img').attr('src'),
								"alt": oItem.find('.options-item-img').attr('alt'),
								"data": oItem.find('.options-item-img').data()
							},
							"name": oItem.find('.options-item-name-span').text(),
							"labels": oItem.find('.options-item-name').find('.bundle-option-labels-gallery').html(),
							"out-of-stock": oItem.find('.out-of-stock').length,
							"price-notice": oItem.find('.price-notice').html(),
							"bundle-attributes": oItem.find('.bundle-attributes').html()
						}

						
						if ( oItemData['img']['path'] != undefined )
						{	
							imagesPaths.push(oItemData['img']['path']);
							var tempVar = oItemData['img']['path'].split('/'); 
							oItemData['img']['path'] = 'img/customizer-items/thumbs/' + tempVar[tempVar.length - 1]; 
						}


						stepItemGroupItemData['options'].push(oItemData);
					});
					stepItemData["stepItemGroupData"].push(stepItemGroupItemData);
				});

			groupItemData["data"].push(stepItemData);
		});

		
		groupsData.push(groupItemData);
	});

	$('.breadcrumbs').html(imagesPaths);
	

	return groupsData;
}

var firstTabData = parseGroupsData('#tab-category-216');

function prepareTabMarkup(TabDataObj)
{

	var tabStr = '\n\
		<div class="step-tabs__tab active"> \n\
			<div class="step-tabs__tab-content"> \n\
	';

	$.each(TabDataObj, function(){

		var oneTab = $(this)[0];
		var tabHeading = oneTab['heading'];
		var tabData = oneTab['data'];
		var accordionItemsStr = '';

		$.each(tabData, function(){

			var accordItem = $(this)[0];
			var accordItemHeading = accordItem['heading-text'];
			var accordItemIcon = accordItem['heading-icon'];
			var accordCompGroups = accordItem['stepItemGroupData'];
			var accordItemBanner = (function(){
				return  accordItem['banner'] == undefined ? 
					'' : 
					'<div class="customizer-catalog__banner"> \n\
						<a href="#" class="customizer-catalog__banner-link"> \n\
							<img src="' + accordItem['banner'] + '" alt="" class="customizer-catalog__banner-img"> \n\
						</a> \n\
					</div>';
			}());
			var accordItemFilters = (function(){
				var filtersStr = '';
				var accordItemFiltersLength = accordItem['filters'].length;
				if ( accordItemFiltersLength > 0 )
				{
					accordItem['filters'].pop();

					for (var i = 0; i < accordItemFiltersLength; i++) {
						filtersStr +=  '<li class="customizer-catalog__filter-btn">' + accordItem['filters'][i] + '</li>' + '\r\n';	
					}
				}
				return filtersStr;
			}()); 
			var compGroupsStr = '';


			$.each(accordCompGroups, function(){
				var compGroup = $(this)[0];
				var compGroupHeading = compGroup['heading'];
				var compGroupOptions = compGroup['options'];
				var optionsStr = '';

				$.each(compGroupOptions, function(){
					
					var curOpt = $(this)[0];
					var input = curOpt['input']; 
					var bundleAttributes = curOpt['bundle-attributes']; 
					var img = curOpt['img']; 
					var labels = curOpt['labels']; 
					var name = curOpt['name']; 
					var outOfStock = curOpt['out-of-stock'] == 0 ? '' : '<span class="out-of-stock">Nicht verfügbar</span>'; 
					var checked = input['checked'] ? 'checked="checked"' : ''; 
					var price = curOpt['price-notice'];
					var disabled = curOpt['disabled'];

					optionsStr += ' \n\
						<li class="customizer-catalog__options-item' + ((disabled == true) ? " customizer-catalog__options-item--disabled" : "" ) +'"> \n\
							<input  \n\
								type="'+ input['type'] +'"  \n\
								class="customizer-catalog__options-input customizer-catalog__options-input--radio bundle-option-83860' + ((disabled == true) ? " customizer-catalog__options-input--disabled" : "" ) +'"  \n\
								id="'+ input['id'] +'"	  \n\
								name="'+ input['name'] +'"  \n\
								value="'+ input['value'] +'"  \n\
								data-product-category="'+ input['data']['productCategory'] +'"  \n\
								data-product-image="'+ input['data']['productImage'] +'"  \n\
								data-product-name="'+ input['data']['productName'] +'"  \n\
								data-product-id="'+ input['data']['productId'] +'"  \n\
								autocomplete="off" \n\
								'+ checked +' \n\
								' + ((disabled == true) ? "disabled='disabled'" : "" ) +' \n\
							> \n\
							<label class="customizer-catalog__options-label" for="'+ input['id'] +'"> \n\
								<span class="customizer-catalog__options-img-wrapper"> \n\
									<img class="customizer-catalog__options-img options-lazy-img"  \n\
										data-original="'+ img['data']['original'] +'"  \n\
										src="'+ img['path'] +'"  \n\
										alt="'+ img['alt'] +'"  \n\
										width="133"  \n\
										style="display: block;" \n\
									> \n\
								</span> \n\
								<span class="customizer-catalog__options-item-name-wrapper"> \n\
									<span class="customizer-catalog__options-item-labels customizer-catalog__options-item-labels--gallery"> \n\
										'+ labels +' \n\
									</span> \n\
									<span class="customizer-catalog__options-item-name js-options-item-name">' + name + '</span> \n\
								</span> \n\
								'+ outOfStock +'  \n\
							</label> \n\
							<span class="b-details js-product-details" data-product-id="8422"> \n\
								<span>[Details]</span> \n\
							</span> \n\
							<span class="price-notice"> \n\
								'+ price +'\n\
							</span> \n\
							<div class="customizer-catalog__options-bundle-attributes"> \n\
								'+ bundleAttributes +' \n\
							</div> \n\
							<div class="customizer-catalog__options-bundle-option-description" style="overflow-wrap: break-word;">inkl. 2x RGB-Stripes &amp; 3x Silent Wings 3 </div> \n\
						</li> \n\
						<!-- /.customizer-catalog__options-item --> \n\
					';

				});

				compGroupsStr += ' \n\
					<div class="customizer-catalog__group"> \n\
						<h4 class="customizer-catalog__group-heading"> \n\
							<span class="customizer-catalog__group-heading__label">' + $.trim(compGroupHeading[0]) + ' - </span> \n\
							<span class="customizer-catalog__group-heading__description">' + $.trim(compGroupHeading[1]) + '</span> \n\
						</h4> \n\
						<ul class="customizer-catalog__options-list"> \n\
							'+ optionsStr +' \n\
						</ul> \n\
					</div> \n\
					<!-- /.customizer-catalog__group --> \n\
				';
			});



			accordionItemsStr += ' \n\
				<div class="configurator-customizer-accordion__item customizer-accordion__item"> \n\
					<div class="customizer-accordion__title-block"> \n\
						<h3 class="customizer-accordion__title-heading"> \n\
							<span class="customizer-accordion__title-info"> \n\
								<span class="customizer-accordion__title-info-img-wrapper"> \n\
									<img class="customizer-accordion__title-info-img" src="' + accordItemIcon + '" alt=""> \n\
								</span> \n\
								<span class="customizer-accordion__title">' + accordItemHeading + '</span> \n\
							</span> \n\
							<span class="customizer-accordion__title-status">AeroCool - Aero-500 Black Edition</span> \n\
						</h3> \n\
					</div> \n\
					<div class="customizer-accordion__content-block__wrapper"> \n\
						<div class="customizer-accordion__content-block customizer-catalog__wrapper"> \n\
							<div class="customizer-catalog__sidebar"> \n\
								<div class="customizer-catalog__sidebar-fix"> \n\
									<div class="customizer-catalog__sidebar-selected selected--false"> \n\
										<div class="customizer-catalog__sidebar-title">Noch nicht ausgewählt</div> \n\
									</div> \n\
									<div class="customizer-catalog__sidebar-selected selected--true"> \n\
										<img class="customizer-catalog__sidebar-img" src="img/customizer-items/thumbs/1322149-n0.jpg" alt=""> \n\
										<div class="customizer-catalog__sidebar-title">Deine Wahl</div> \n\
										<div class="customizer-catalog__sidebar-title--product">AeroCool - Aero-500 Black Edition</div> \n\
									</div> \n\
								</div> \n\
							</div> \n\
							<div class="customizer-catalog__block grid-view"> \n\
								'+ accordItemBanner +'\n\
								<div class="customizer-catalog__tools"> \n\
									<div class="customizer-catalog__filter"> \n\
										<span class="customizer-catalog__filter-label">Filtern nach</span> \n\
										<ul class="customizer-catalog__filter-list"> \n\
											' + accordItemFilters + ' \n\
											<li class="customizer-catalog__filter-btn customizer-catalog__filter-btn--close">X</li> \n\
										</ul> \n\
									</div> \n\
									<div class="customizer-catalog__grid-switcher"> \n\
										<span class="customizer-catalog__grid-switcher__label">Ansicht</span> \n\
										<ul class="customizer-catalog__grid-switcher__list"> \n\
											<li class="customizer-catalog__grid-switcher__btn list" data-grid-switcher="grid-view"></li> \n\
											<li class="customizer-catalog__grid-switcher__btn gallery" data-grid-switcher="gallery-view"></li> \n\
										</ul> \n\
									</div> \n\
								</div> \n\
								<div class="customizer-catalog"> \n\
									'+ compGroupsStr +'	\n\
								</div> \n\
								<!-- /.customizer-catalog --> \n\
							</div> \n\
						</div> \n\
					</div> \n\
				</div> \n\
			';
		});

		// start
		tabStr += '\n\
			<div class="step-tabs__tab-content-group"> \n\
				<h2 class="step-tabs__tab-content-group__title">' + tabHeading + '</h2> \n\
					<div class="step-tabs__tab-content-group__content"> \n\
						' + accordionItemsStr + ' \n\
				</div> \n\
			</div> \n\
			';
		// end
	});
	
		// start
		tabStr += ' \n\
				</div> \n\
			</div> \n\
		';
	return tabStr;
}

var tabString = prepareTabMarkup(firstTabData);