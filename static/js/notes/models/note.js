"use strict";

define(["backbone"], function(Backbone) {
    var Note = Backbone.Model.extend({
        containsText: function (text) {
            return this.get("title").indexOf(text) != -1 || this.get("content").indexOf(text) != -1;
        }
    });

    return Note;
});