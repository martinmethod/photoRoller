/*!
  jQuery PhotoRoller Plugin v1.0.2
  http://photoroller.martinmetodiev.com

  Copyright (c) 2015 Martin Metodiev
  Licensed under the MIT license.
*/

;(function($) {

'use strict';

// Defining PhotoRoller
$.photoroller = function(options) {
    // Preparing options
    options = $.extend({startpoint: 1}, options);

    var defineTarget = function() {
            var main = $('#photoroller');

            return target = options.target ? options.target :
                main.length > 0 ? main : null;
        },
        defineNodes = function () {
            return options.nodes ? target.find(options.nodes) :
                target.children().length > 0 ? target.children() : null;
        },
        defineStartpoint = function() {
            return options.startpoint ? options.startpoint : 1;
        },
        getWidth = function() {
            return target.width();
        },
        setActive = function(obj) {
            nodes.removeClass('pr-active');
            $(obj).addClass('pr-active');
            
            return $(obj);
        };

    var target = defineTarget(); if (!target) { return false; }
    var nodes  = defineNodes();  if (!nodes)  { return false; }

    // Setting classes
    target.addClass('photoroller');
    nodes.addClass('pr-img');

    var width = getWidth(),
        startpoint = defineStartpoint(),
        activeNumber = startpoint-1;

    // Showing the startpoint
    setActive(nodes[activeNumber]);
    
    // Binding mousemove event
    target.mousemove(function(e) {
        var columnNumber = parseInt(e.offsetX / (width / nodes.length));
        if (columnNumber !== activeNumber) {
            if (e.offsetX >= width) {columnNumber--;}
            activeNumber = columnNumber;
            setActive(nodes[columnNumber]);
        }
    });

    // Binding resize event
    $(window).resize(function() {
        width = getWidth();
    });
    
    return target;
};

// Defining PhotoRoller method
$.fn.photoroller = function(options) {
    return this.each(function() {
        this.opt = {
            nodes: options && options.nodes ? $(this).find(options.nodes) :
                   $(this).children().length > 0 ? $(this).children() : null,
            startpoint: options && options.startpoint ? options.startpoint : 1
        };

        $.photoroller($.extend(this.opt, {target: $(this)}));
    });
};

}(jQuery));