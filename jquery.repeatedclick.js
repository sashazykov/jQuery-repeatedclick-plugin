/**
 * jQuery repeatedclick
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by: Alexandr Zykov <alexandrz@gmail.com>
 *
 * Repeated events if holding mouse button
 *
 */

$.fn.repeatedclick = function(f, options) {
  var defaults = {
    duration  : 350, 
    speed     : 0.85,
    min       : 50
  };
  var opts = $.extend(defaults, options);
  
  if (typeof jQuery.repeatedEvents == 'undefined')
    jQuery.repeatedEvents = [];
  
  jQuery.repeatedEvents.push(f)
  
  var eventNum = jQuery.repeatedEvents.length - 1;
 
  return this.each(function () {
    
    repeatedEvent = function (eventNum, duration) {
      jQuery(this).each(jQuery.repeatedEvents[eventNum])
      repeatedEventTimer = setTimeout(
        'repeatedEvent('+eventNum+', '+(duration > opts.min ? duration * opts.speed : duration)+')', duration)
    }
    
    jQuery(this).mousedown(function() {
      jQuery.repeatedEventDuration = opts.duration;
      repeatedEvent(eventNum, opts.duration)
    })

  	var clearRepeatedEvent = function() {
    	if (typeof repeatedEventTimer != 'undefined')
    	  clearInterval(repeatedEventTimer)
    }

    jQuery(this).mouseout(clearRepeatedEvent);
    jQuery(this).mouseup(clearRepeatedEvent);
  })
}