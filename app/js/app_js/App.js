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
