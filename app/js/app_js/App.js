/**
 * Create global variable
 */



var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

function retakeWinWidthHeight(){
	WINDOW_WIDTH = window.innerWidth;
	WINDOW_HEIGHT = window.innerHeight;
};

function bodyToggleScrollClass()
{
	$(window).scrollTop() > 10 ? $('body').addClass('scroll') : $('body').removeClass('scroll');
}

window.addEventListener('resize', function(event) { 
	retakeWinWidthHeight();
})

window.addEventListener('load', function(event) { 
	bodyToggleScrollClass();
})

window.addEventListener('scroll', function(event) { 
	bodyToggleScrollClass();
})

var App = App || {};
App = {

    define: function (namespace) {
        var parts = namespace.split("."),
            parent = App,
            i;

        if (parts[0] == "App") {
            parts = parts.slice(1); // ['utils', 'dom']
        }

        for (i = 0; i < parts.length; i++) {
            if (typeof parent[parts[i]] == "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    },

    // @param container {HTMLElement} container you want to block with loader
    addLoader: function (container) {
        if (!jQuery(container).hasClass('js-loader-parent')) {
            var loader = jQuery('<div class="js-loader">' + Translator.translate("Please wait, loading...") + '</div>');
            jQuery(container).addClass('js-loader-parent').append(loader);
        }
    },

    // @param container {HTMLElement} container to remove loader
    removeLoader: function (container) {
        if (jQuery(container).hasClass('js-loader-parent')) {
            jQuery(container).find('.js-loader').remove();
            jQuery(container).removeClass('js-loader-parent');
        }
    },

    hasLoader: function (container) {
        return jQuery(container).hasClass('js-loader-parent') && jQuery(container).find('.js-loader').length;
    },

    removeAllButFirstClass: function (el) {
        var classArray = jQuery(el).attr("class").split(' ');
        for (var index = 0, len = classArray.size(); index < len; ++index) {
            if (index != 0) {
                jQuery(el).removeClass(classArray[index]);
            }
        }
    },

    checkVisible: function (elm, evalType) {
        evalType = evalType || "visible";

        var vpH = jQuery(window).height(), // Viewport Height
            st = jQuery(window).scrollTop(), // Scroll Top
            y = jQuery(elm).offset().top,
            elementHeight = jQuery(elm).height();

        if (evalType === "visible") {
            return ((y < (vpH + st)) && (y > (st - elementHeight)));
        }

        if (evalType === "above") {
            return ((y < (vpH + st)));
        }
    },

    memoizeIt: function (func) {
        var memo = {};
        var slice = Array.prototype.slice;

        return function () {
            var args = slice.call(arguments);

            if (args in memo)
                return memo[args];
            else
                return (memo[args] = func.apply(this, args));

        }
    },

    debounce: function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // @param anchor {String} anchor value, ex. #top
    // @param additional_height {Number} if there are fixed header on the page
    scrollAnimation: function (anchor, additional_height) {
        var additional = (typeof additional_height === "undefined") ? 0 : additional_height;
        jQuery('html, body').animate({scrollTop: jQuery(anchor).offset().top - additional}, 1000);
    },

    /**
     * @description Cache dom elements which are being accessed multiple times.
     */
    initUiCache:function() {
        App.ui = {
            mainNavigation  : jQuery("#nav"),
            main            : jQuery("#main"),
            header          : jQuery('.header-container')
        };
    },

    /**
	 * @description Apply event handlers to all elements that match one or more of the specified selectors.
	 */
    initializeEvents: function() {
        var $body = jQuery("body");
        $body
            .on("keydown", "textarea[data-character-limit]", function(e) {
                var text = jQuery.trim(jQuery(this).val()),
                    charsLimit = jQuery(this).data("character-limit"),
                    charsUsed = text.length;

                if ((charsUsed >= charsLimit) && (controlKeys.indexOf(e.which.toString()) < 0)) {
                    e.preventDefault();
                }
            })
            /*
            .on("click", ".scroll", function(e){
                e.preventDefault();
                var offset = jQuery(this.hash).offset(),
                    topMargin = 50;

                ( jQuery("#category-navigation").length > 0 ) ? topMargin = 90 : '';
                offset ? jQuery('html,body').animate({scrollTop: offset.top- topMargin }, 500) :'';
            })
            */
            .on("change keyup mouseup", "textarea[data-character-limit]", function(e) {
                var text = jQuery.trim(jQuery(this).val()),
                    charsLimit = jQuery(this).data("character-limit"),
                    charsUsed = text.length,
                    charsRemain = charsLimit - charsUsed;

                if(charsRemain < 0) {
                    jQuery(this).val( text.slice(0, charsRemain) );
                    charsRemain = 0;
                }

                jQuery(this).next('div.char-count').find('.char-remain-count').html(charsRemain);
            })
            // add generic toggle functionality
            .on('click', '.js-toggle', function(){
                jQuery(this).parent().toggleClass('expanded');
            });

        // enable custom select boxes
        // @note: When the value of "appendTo" option is null, the parents of the <select>
        //        are checked for a class name of ui-front.
        //        If an element with the ui-front class name is found, the menu is appended to that element.
        //        Regardless of the value, if no element is found, the menu is appended to the body.
        $body.find('.js-styled-selectbox').selectmenu();
        $body.find('.toolbar-sorting-select').selectmenu({
            appendTo: '.toolbar-buttons'
        });

        // enable tabs
        $body.find('.js-tabs-wrapper').tabs();
        jQuery(".breadcrumbs ol li:last-child a").on('click', function(e) {
            e.preventDefault();
        });

        //enable accordion
        $body.find('.js-accordion').accordion({
            header: '.accordion-item__anchor',
            collapsible: true,
            active: false,
            heightStyle: 'content',
            beforeActivate: function( event, ui ) {
                jQuery(ui.newHeader).addClass('active');
                jQuery(ui.oldHeader).removeClass('active');
            }
        });
    },

    _getDeviceType: function() {
        var width = jQuery(window).width();
        if(width < 768) {
            return 'mobile';
        }
        return 'tablet';
    },

    /**
     * @description Init carousels.
     */
    initializeCarousels: function() {
        jQuery(".js-carousel-3").owlCarousel({
            navigation : true,
            pagination : false,
            items : 3,
            responsive: false
        });

        jQuery(".js-carousel-pagination-3").owlCarousel({
            navigation : true,
            pagination : true,
            items : 3,
            responsive: false
        });
    },

    /**
     * @description Init print button.
     */
    // initializePrint: function() {
    //     jQuery('.js-product-print-button').on('click', function(){
    //         var config_content = jQuery('.js-configurations-content'),
    //             html = '<html>',
    //             config = jQuery(config_content).length ? jQuery(config_content) : jQuery('.product-configuration-list');

    //         if (!config){
    //             window.print();
    //             return;
    //         }

    //         var configurationCode = '';
    //         if (jQuery('.configuration-view-top').length) {
    //             configurationCode = jQuery('.c-panel-option.load').attr('href').substr(7);
    //         } else if (jQuery('.configurator-wrapper-main').length) {
    //             //App.configurator.save.sendData();
    //         }

    //         html += '<head>'+document.getElementsByTagName('head')[0].innerHTML+'</head>';
    //         html += '<body class="catalog-product-print">';
    //         html += jQuery('.js-fancybox-img').length ? jQuery('.js-fancybox-img').html() : jQuery('<div>').append(jQuery('.image-box').clone()).html();
    //         html += jQuery('.price-as-configured').html();
    //         html += configurationCode;
    //         html += config.html();
    //         html += '</body></html>';

    //         var printWindow = window.open('about:blank', 'product-print', 'width=600, height=600, top=200, scrollbars=yes, status=no, menubar=no, titlebar=no, toolbar=no, location=no');
    //         printWindow.document.write(html);
    //     });
    // },

    initializePdf: function(formEl, configurationCode) {
        if (!App.product.pdfUrl) {
            return;
        }
        jQuery('.js-product-pdf-button').on('click', function(){
            var form = jQuery(formEl).clone(),
                input;
            form.attr({
                action: App.product.pdfUrl,
            });
            if (typeof configurationCode != 'undefined') {
                input = jQuery('<input>');
                input.attr({
                    name: 'configuration_code',
                    value: configurationCode
                });
                form.append(input);
            }
            jQuery('body').append(form);
            form.submit();
            form.remove();
        });
    },

    initDecodeUrl: function(encodedString){
        var str,
            Base64;
        if (typeof window.atob == 'function') {
            str = window.atob(encodedString);
        } else {
            Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
            str = Base64.decode(encodedString);
        }

        return str.split('amp;').join('');
    },

    base64Encode: function(string){
        var str,
            Base64;
        if (typeof window.btoa == 'function') {
            str = window.btoa(unescape(encodeURIComponent(string)));
        } else {
            Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
            str = Base64.encode(unescape(encodeURIComponent(string)));
        }

        return str;
    },

    initDecodeLinkUrl: function(){
        var link = jQuery(".js-decode-link");

        link.each(function () {
            if (jQuery(this)[0].hasAttribute("href")) {
                var href = jQuery(this).attr("href");
                jQuery(this).removeAttr("href");
                jQuery(this).data("href" , href);
            }
        });

        jQuery('body').on('click', ".js-decode-link", function (e) {
            e.preventDefault();
            var encodedLink = null;

            if( e.which <= 4 && jQuery(this).data("href")) {
                encodedLink = jQuery(this).data("href");
            }

            else if (e.which <= 4 && jQuery(this).attr("href")) {
                encodedLink = jQuery(this).attr("href");
            }

            window.location = App.initDecodeUrl(encodedLink);
        });
    },

    generatePassword: function () {
        var passCheckbox = jQuery('#generate_password');
        passCheckbox.on('change', function (e) {
            if(jQuery(this).is(':checked')) {
                jQuery('.login-password-create').addClass('pass-disabled').find('input[type="password"]').val('').prop('disabled', true).removeClass('required-entry');
                jQuery("#password_meter").find('div').removeClass('active');
            } else {
                jQuery('.login-password-create').removeClass('pass-disabled').find('input[type="password"]').prop('disabled', false).addClass('required-entry');
            }
        });
    },

    createBulletsName: function (container) {
        var bullets = jQuery(container).parent().find('.tp-bullets'),
            bullet = null,
            slideName = '',
            slideThumbSrc = '';
        bullets.addClass('tp-bullets-text').css("height" , "auto");

        jQuery(container).find('>ul:first >li').each(function (i, slide) {
            slideName = jQuery(slide).data('title');


            bullet = jQuery(bullets).find('.bullet').get(i);

            slideThumbSrc = jQuery(bullet).css('background-image');

            jQuery(bullet).text("").append("<div class='thumb-wrapper'><div class='slide-thumb-container'><div class='slide-thumb-container-wrapper'><div class='slide-thumb'><div /></div></div></div><div class='slide-name'></div></div>")
                .find(".slide-name")
                .text(slideName);

            jQuery(bullet).find(".slide-thumb div").css({'background' : slideThumbSrc});
            jQuery(bullet).removeAttr('style');
           
          //  jQuery(bullet).css("width" ,jQuery(container).width()/jQuery(container).find('>ul:first >li').length);
            jQuery(bullets).delay( 1000 ).fadeTo( "slow" , 1);
        });
    },

    createBulletsNameMobile: function (container) {
        this.createBulletsName(container);
    },

    initFooterLinksAccordion: function () {
        jQuery(".footer-left-links ul, .footer-right-links ul").each(function () {
            var list = jQuery(this);
            list.find("li").each(function (index) {
                var items = jQuery(this);
                if (index != 0) {
                    items.addClass("slidedown-list");
                }
                else if (index == 0) {
                    var link = jQuery(this);
                    link.on("click" , function () {

                        if (!link.hasClass("active-link")) {
                            jQuery("li.active-link").removeClass("active-link");
                            jQuery(".slidedown-list-show").removeClass(".slidedown-list-show").slideUp();

                            jQuery(this).addClass("active-link");
                            jQuery(this).closest("ul").find("li").each(function () {
                               if (jQuery(this).hasClass("slidedown-list")) {
                                   jQuery(this).addClass("slidedown-list-show").slideDown();
                               }
                            });
                        }
                        else {
                            jQuery("li.active-link").removeClass("active-link");
                            jQuery(".slidedown-list-show").removeClass(".slidedown-list-show").slideUp();
                        }
                    });
                }
            });

        });
    },

    initFooterLinksAccordionCheckout: function () {
        jQuery(".column").each(function () {
            var list = jQuery(this);
            jQuery(this).find("ul").find("li").addClass("slidedown-list");

            list.find(".footer-headline").each(function () {
                var link = jQuery(this);
                link.on("click" , function () {

                    if (!link.hasClass("active-link")) {
                        jQuery("div.active-link").removeClass("active-link");
                        jQuery(".slidedown-list-show").removeClass(".slidedown-list-show").slideUp();

                        jQuery(this).addClass("active-link");
                        jQuery(this).closest(".column").find("ul").find("li").each(function () {
                            if (jQuery(this).hasClass("slidedown-list")) {
                                jQuery(this).addClass("slidedown-list-show").slideDown();
                            }
                        });
                    }
                    else {
                        jQuery("div.active-link").removeClass("active-link");
                        jQuery(".slidedown-list-show").removeClass(".slidedown-list-show").slideUp();
                    }
                });
            });

        });
    },

    initMoveFb: function () {
        var socFb = jQuery(".support-share");
        var footerFb = socFb.html();
        jQuery(".footer-social-icons").prepend(footerFb);
        socFb.empty();
    },

    initIosHeight: function () {
        if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
          // jQuery("html, body").css({"overflow-x":"hidden"});
        }
        else if( /Firefox/i.test(navigator.userAgent) ) {
            jQuery("html, body").css({"overflow-x":"hidden"});
            jQuery("body > .wrapper").css({"overflow-x":"hidden"});
        }
    },

    changeStreetFieldName: function () {
        jQuery('input[name*="street"]').each(function () {
            var name = jQuery(this).attr('name'),
                newName;

            newName = name.slice(0, -2) + (parseInt(name.slice(name.length-2, -1)) - 1) + ']';
            jQuery(this).attr('name', newName);
        });
    },


    /**
     * @name init
     * @function
     * @description Master page initialization routine
     */
    init: function () {

        // init global cache
        // App.initUiCache();

        // init global events
        // App.initializeEvents();

        // init global events
        // App.initializeCarousels();

        //init link decoding
        // App.initDecodeLinkUrl();

        //init password generation
        // App.generatePassword();

        //Init footer links accordion
        // App.initFooterLinksAccordion();

        //Init footer links accordion checkout
        // App.initFooterLinksAccordionCheckout();

        //init fb counter footer append
        // App.initMoveFb();

        //init ios height
        // App.initIosHeight();
        
    }
}
