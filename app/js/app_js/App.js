/**
 * Create global variable
 */



var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;
var Body = $('body');

function retakeWinWidthHeight(){
	WINDOW_WIDTH = window.innerWidth;
	WINDOW_HEIGHT = window.innerHeight;
};

function bodyToggleScrollClass()
{
	$(window).scrollTop() > 10 ? Body.addClass('scroll') : Body.removeClass('scroll');
};

function bodyAdaptiveBreakpointsClasses()
{
	WINDOW_WIDTH < 992 ? Body.addClass('body-tablet') : Body.removeClass('body-tablet');
	WINDOW_WIDTH < 768 ? Body.addClass('body-mobile') : Body.removeClass('body-mobile');
};

$(window).on('resize load', function(){
	retakeWinWidthHeight();
	bodyAdaptiveBreakpointsClasses();
});

window.addEventListener('scroll', function(event) { 
	bodyToggleScrollClass();
})
