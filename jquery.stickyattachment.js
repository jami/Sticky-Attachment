/*
 * stickyattachment 1.0 - Automatic swaps from floating to sticky behaviour
 *
 * Copyright (c) 2011 Jan Michalowsky
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 *
 */
(function($){
    $.fn.stickyAttachment = function(options) {  
        return this.each(function() {
            var element  = $(this);
            var settings = $.extend({
                absoluteTop: 0,
                fixedTop: 0,
                absoluteClass: 'saFloatClass',
                fixedClass: 'saStickyClass'
            }, options);

            var onSwapBehaviorHandler = function() {
                var elementTop = element.offset().top;
                var scrollTop  = $(window).scrollTop();
                var isFixed    = element.hasClass(settings.fixedClass);

                var diff = isFixed ? 
                    settings.absoluteTop - scrollTop - settings.fixedTop : 
                    elementTop - scrollTop - settings.fixedTop;

                if (diff < 0 && !isFixed) {
                    element.removeClass(settings.absoluteClass);
                    element.addClass(settings.fixedClass);
                } else if (diff > 0 && isFixed) {
                    element.removeClass(settings.fixedClass);
                    element.addClass(settings.absoluteClass);
                }
            };

            $(window).resize(onSwapBehaviorHandler).scroll(onSwapBehaviorHandler);
        });
    };
})(jQuery);
