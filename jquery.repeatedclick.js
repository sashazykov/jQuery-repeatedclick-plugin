/**
* jQuery repeatedclick v1.0.5
*
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* Written by: Alexandr Zykov <alexandrz@gmail.com>
*
* Repeated events if holding mouse button
*
* Benvium 16-06-2011: The function run as a result of the repeated click now contains the 'event' 
* object as a parameter. This means you can check the shiftKey status, for example.
* Also repeatedEventTimer and repeatedEvent are no longer implicity declared as global vars
*
*/
jQuery.fn.repeatedclick = function(f, options) {
    var defaults = {
        duration  : 350,
        speed     : 0.85,
        min       : 50
    };

    var opts = jQuery.extend(defaults, options);

    if (typeof jQuery.repeatedEvents === 'undefined') {
        jQuery.repeatedEvents = [];
    }

    jQuery.repeatedEvents.push(f);

    var eventNum = jQuery.repeatedEvents.length - 1;

    // defined here rather than globally..
    var repeatedEvent;
    var repeatedEventTimer;

    return this.each(function() {
        repeatedEvent = function(eventNum, duration, event) {
            var that = this;
            jQuery.repeatedEvents[eventNum].call(that, event);
            repeatedEventTimer = setTimeout(function() {
                    repeatedEvent.call(that, eventNum, duration > opts.min ? duration * opts.speed: duration, event)
                }, duration);
        };

        jQuery(this).mousedown(function(e) {
            repeatedEvent.call(this, eventNum, opts.duration, e);
        });

        var clearRepeatedEvent = function() {
            if (typeof repeatedEventTimer !== 'undefined') {
                clearInterval(repeatedEventTimer);
            }
        };

        jQuery(this).mouseout(clearRepeatedEvent);
        jQuery(this).mouseup(clearRepeatedEvent);
    });
};