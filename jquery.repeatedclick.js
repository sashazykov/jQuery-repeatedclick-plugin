/**
* jQuery repeatedclick v1.0.3
*
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* Written by: Alexandr Zykov <alexandrz@gmail.com>
*
* Repeated events if holding mouse button
*
*/
jQuery.fn.repeatedclick = function(f, options) {
    var defaults = {
        duration: 350,
        speed: 0.85,
        min: 50
    };

    var opts = jQuery.extend(defaults, options);

    if (typeof jQuery.repeatedEvents === 'undefined') {
        jQuery.repeatedEvents = [];
    }

    if (typeof jQuery.repeatedElements === 'undefined') {
        jQuery.repeatedElements = [];
    }

    jQuery.repeatedEvents.push(f);
    jQuery.repeatedElements.push(this);

    var eventNum = jQuery.repeatedEvents.length - 1;

    return this.each(function() {
        repeatedEvent = function(eventNum, duration) {
            var that = this;
            jQuery.repeatedEvents[eventNum].call(that);
            repeatedEventTimer = setTimeout(function() {
                repeatedEvent.call(that, eventNum, duration > opts.min ? duration * opts.speed: duration)
            },
            duration);
        };

        jQuery(this).mousedown(function() {
            jQuery.repeatedEventDuration = opts.duration;
            repeatedEvent.call(this, eventNum, opts.duration);
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