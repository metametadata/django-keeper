"use strict";

define(["jquery"], function($) {
    $.fn.focusAtTheEnd = function() {
        // hack to put cursor at the end:
        var val = this.val();
        this.val('');
        this.focus();
        this.val(val);
    };
});