"use strict";

define(["backbone", "notes/models/note"], function(Backbone, Note) {
    var Notes = Backbone.Collection.extend({
        model: Note,
        url: "/notes/api/v1/note/",

        parse: function(response) {
            return response.objects || response;
        }
    });

    return Notes;
});