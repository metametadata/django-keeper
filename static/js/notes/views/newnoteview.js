"use strict";

define(["jquery", "backbone", "notes/views/editablenoteview"], function($, Backbone, EditableNoteView) {
    // Warning: view is always bound to the existing DOM element
    var NewNoteView = EditableNoteView.extend({
        collection: undefined, // new notes will be added to this collection

        el: $(".new-note")[0],

        additionalEvents: {},

        submitEditedChanges: function() {
            console.log("create note...");

            var title = this.$(".title").val();
            var content = this.$(".content").val();

            if (title==="" && content==="") {
                this._setEdited(false);
                return;
            }

            var that = this;

            this.collection.create({title: title, content: content}, {
                wait: true,
                success: function() {
                    that._setEdited(false);
                    that._resetFields();
                },
                error: function() {
                    alert("Error on creating new note");
                }
            });
        },

        _resetFields: function() {
            this.$(".title").val("");
            this.$(".content").val("").trigger('autosize.resize');
        }
    });

    return NewNoteView;
});