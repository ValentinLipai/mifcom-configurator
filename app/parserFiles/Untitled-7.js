var $ = jQuery;
var list = $('.options-list').eq(0);

var items = [];


list.find('.options-list-item').each(function(){
var self = $(this);
    items.push({
        "input" : {
            "id": self.find('input[type="radio"]').attr('id'),
			"name": self.find('input[type="radio"]').attr('name'),
            "value" : self.find('input[type="radio"]').val(),
            "data": self.find('input[type="radio"]').data(),
        },
		"img": {
			"path": self.find('.options-item-img').attr('src'),
			"alt": self.find('.options-item-img').attr('alt'),
			"data": self.find('.options-item-img').data()
        },
		"name": self.find('.options-item-name-span').text(),
		"labels": self.find('.options-item-name').find('.bundle-option-labels-gallery').html(),
		"price-notice": self.find('.price-notice').html(),
		"bundle-attributes": self.find('.bundle-attributes').html()
    });
});

var itemsStr = '';

$.each(items, function(){
	var self = $(this);
	
	itemsStr += '<li class="customizer-catalog__options-item"> \n\
	<input \n\
		type="radio" \n\
		class="customizer-catalog__options-input customizer-catalog__options-input--radio bundle-option-83860123 " \n\
		id="' + self[0]['input']['id'] + '"	 \n\
		name="' + self[0]['input']['name'] + '" \n\
		value="' + self[0]['input']['value'] + '" \n\
		data-product-category="' + self[0]['input']['data']['productCategory'] + '" \n\
		data-product-image="' + self[0]['input']['data']['productImage'] + '" \n\
		data-product-name="' + self[0]['input']['data']['productName'] + '" \n\
		data-product-id="' + self[0]['input']['data']['productId'] + '" \n\
		autocomplete="off"\n\
	>\n\
	<label class="customizer-catalog__options-label" for="' + self[0]['input']['id'] + '">\n\
		<span class="customizer-catalog__options-img-wrapper">\n\
			<img class="customizer-catalog__options-img options-lazy-img" \n\
				data-original="' + self[0]['img']['data']['original'] + '" \n\
				src="' + self[0]['img']['path'] + '" \n\
				alt="' + self[0]['img']['alt'] + '" \n\
				width="133" \n\
				style="display: block;"\n\
			>\n\
		</span>\n\
		<span class="customizer-catalog__options-item-name-wrapper">\n\
		' + (function(){
			return self[0]['labels'] == undefined ?
			'' :
			'<span class="customizer-catalog__options-item-labels customizer-catalog__options-item-labels--gallery">\n\
			' + (self[0]['labels'] != undefined ? self[0]['labels'] : '') + '\n\
			</span>';
		}()) + ' \n\
			<span class="customizer-catalog__options-item-name js-options-item-name">' + self[0]['name'] + '</span>\n\
		</span>\n\
	</label>\n\
	<span class="b-details js-product-details" data-product-id="8422">\n\
		<span>[Details]</span>\n\
	</span>\n\
	<span class="price-notice">\n\
	' + self[0]['price-notice'] + '\n\
	</span>\n\
	<div class="customizer-catalog__options-bundle-attributes">\n\
	' + self[0]['bundle-attributes'] + '\n\
	</div>\n\
	<div class="customizer-catalog__options-bundle-option-description" style="overflow-wrap: break-word;">inkl. 2x RGB-Stripes &amp; 3x Silent Wings 3 </div>\n\
</li>';
});