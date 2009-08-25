jQuery.fn.repeatedclick = function (f, options) {
    var defaults = {
        duration  : 350,
        speed     : 0.85,
        min       : 50
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

    return this.each(function () {
        repeatedEvent = function (eventNum, duration) {
            jQuery.repeatedElements[eventNum].each(
                jQuery.repeatedEvents[eventNum]
            );

            repeatedEventTimer = setTimeout(
                'repeatedEvent(' + eventNum + ', ' +
                (duration > opts.min ? duration * opts.speed : duration) + ')',
                duration
            );
        };

        jQuery(this).mousedown(function () {
            jQuery.repeatedEventDuration = opts.duration;
            repeatedEvent(eventNum, opts.duration);
        });

        var clearRepeatedEvent = function () {
            if (typeof repeatedEventTimer !== 'undefined') {
                clearInterval(repeatedEventTimer);
            }
        };

        jQuery(this).mouseout(clearRepeatedEvent);
        jQuery(this).mouseup(clearRepeatedEvent);
    });
};
