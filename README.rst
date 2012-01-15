jQuery repeatedclick plugin
===========================

This plugin allows developers to bind a function to a ``repeatedclick`` event which occurs when the mouse button is held. Like all `jQuery`_ functions, it is bound for all matching elements.

The ``repeatedclick`` event is fired when the pointing device button is clicked over an element. A ``repeatedclick`` is defined as a sustained ``mousedown`` event over the same screen location. The sequence of these events is:

* ``mousedown``
* ``repeatedclick``

The function run as a result of the repeated click contains the 'event' object as a parameter. This means you can check the shiftKey status, for example.

Example
-------

The following event will be repeated if the mouse button is held::

    $('.counter .minus').repeatedclick(function () {
        // body...
    });

You can also pass arguments::

    $('.counter .plus').repeatedclick(function () {
        // body...
    }, {
        duration  : 500, // starting duration
        speed     : 0.8, // duration multiplier
        min       : 100  // minimum duration
    });

Demonstration
-------------

http://be-q.com/jQuery-repeatedclick-plugin/demo.html


Compatability
-------------

Tested with the following:

`jQuery`_ 1.2.6 - 1.7.x

.. _jQuery: http://jquery.com/
