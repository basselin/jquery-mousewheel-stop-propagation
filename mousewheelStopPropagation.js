/*!
 * jquery.stopScrollingPropagation.js v1.0.0
 * (c) 2014, Benoit Asselin contact(at)ab-d.fr
 * MIT Licence
 */
 
;(function($, window, undefined) {
	'use strict';
	
	$.fn.mousewheelStopPropagation = function(options) {
		options = $.extend({
			// defaults
			wheelstop: null // Function
			}, options);
		
		var docElt = document.documentElement,
		    mousewheelEventName = 'mousewheel';
		if('onmousewheel' in docElt) {
			mousewheelEventName = 'mousewheel';
		} else if('onwheel' in docElt) {
			mousewheelEventName = 'wheel';
		} else if('DOMMouseScroll' in docElt) {
			mousewheelEventName = 'DOMMouseScroll';
		}
		if(!mousewheelEventName) { return this; }
		
		var mousewheelPrevent = function(event) {
			event.preventDefault();
			event.stopPropagation();
			if('function' === typeof options.wheelstop) {
				options.wheelstop(event);
			}
		};
		var isMsIE = ('Microsoft Internet Explorer' === navigator.appName);
		
		return this.each(function() {
			var _this = this,
			    $this = $(_this);
			if(!isMsIE) {
				$this.on(mousewheelEventName, function(event) {
					var origiEvent = event.originalEvent;
					var scrollTop = _this.scrollTop,
					    scrollMax = _this.scrollHeight - $this.outerHeight(),
					    delta = -origiEvent.wheelDelta;
					if(isNaN(delta)) {
						delta = origiEvent.deltaY;
					}
					if((scrollTop <= 0 && delta < 0) || (scrollTop >= scrollMax && delta > 0)) {
						mousewheelPrevent(event);
					}
				});
			} else {
				$this.on(mousewheelEventName, function(event) {
					var origiEvent = event.originalEvent;
					var scrollTop = _this.scrollTop,
					    scrollHeight = _this.scrollHeight,
					    scrollMax = scrollHeight - $this.outerHeight(),
					    delta = -origiEvent.wheelDelta;
					if(-delta > scrollTop && delta < 0) {
						$this.scrollTop(0);
						mousewheelPrevent(event);
					} else if(delta > scrollMax - scrollTop && delta > 0) {
						//$this.scrollTop(scrollMax);
						$this.scrollTop(scrollHeight);
						mousewheelPrevent(event);
					}
				});
			}
		});
	};
	
})(jQuery, window);


