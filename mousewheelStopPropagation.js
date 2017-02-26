/*!
 * mousewheelStopPropagation.js v1.3.1
 * (c) 2017 - 161 SARL - https://161.io
 * MIT License
 */

;(function($, window, undefined) {
    'use strict';

    var animOpt = { duration:200, easing:'linear' };

    $.fn.mousewheelStopPropagation = function(options) {
        options = $.extend({
            // defaults
            wheelstop: null, // Function
            emulateNaturalScrolling: true // Boolean
        }, options);

        // Compatibilities
        var ua = navigator.userAgent.toLowerCase(),
            isMsIE = /(trident|msie)/.test(ua);
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

        function mousewheelPrevent(event) {
            event.preventDefault();
            event.stopPropagation();
            if('function' === typeof options.wheelstop) {
                options.wheelstop(event);
            }
        }

        function emulateNaturalScrollIfNecessary($container, scrollTop) {
            if (options.emulateNaturalScrolling) {
                $container.stop(true).animate({scrollTop: scrollTop}, animOpt);
            } else {
                $container.get(0).scrollTop = scrollTop;
            }
        }

        return this.each(function() {
            var _this = this,
                $this = $(_this);
            $this.on(mousewheelEventName, function(event) {
                var origiEvent = event.originalEvent;
                var scrollTop = _this.scrollTop,
                    scrollMax = _this.scrollHeight - $this.outerHeight(),
                    delta = -origiEvent.wheelDelta;
                if(isNaN(delta)) {
                    delta = origiEvent.deltaY;
                }
                var scrollUp = delta < 0;
                if((scrollUp && scrollTop <= 0) || (!scrollUp && scrollTop >= scrollMax)) {
                    mousewheelPrevent(event);
                } else if(isMsIE) {
                    if(scrollUp && -delta > scrollTop) {
                        emulateNaturalScrollIfNecessary($this, 0);
                        mousewheelPrevent(event);
                    } else if(!scrollUp && delta > scrollMax - scrollTop) {
                        emulateNaturalScrollIfNecessary($this, scrollMax);
                        mousewheelPrevent(event);
                    }
                }
            });
        });
    };

})(jQuery, window);


