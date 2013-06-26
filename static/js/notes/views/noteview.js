"use strict";

define(["jquery", "backbone", "handlebars", "notes/views/editablenoteview", "notes/views/notetoolbar"],

function($, Backbone, Handlebars, EditableNoteView, NoteToolbar) {
    var NoteView = EditableNoteView.extend({
        className: "note",
        _template: Handlebars.compile($("#note-template").html()),

        additionalEvents: {
            "mouseenter": "_showToolbar",
            "mouseleave": "_hideToolbar",
        },

        initialize: function() {
            this.listenTo(this.model, "destroy", this.remove);
        },

        render: function() {
            //console.log("NoteView render");
            var html = this._template(this.model ? this.model.toJSON() : undefined);
            this.$el.html(html);

            return this;
        },

        submitEditedChanges: function() {
            // console.log("submitEditedChanges");

            var that = this;

            // TODO: optimize? submit only if there were changes
            this.model.save({
                title: this.$(".title").val(),
                content: this.$(".content").val()
            }, {
                patch: true,
                error: function() {
                    alert("Error on editing note.");
                }
            });

            that._setEdited(false);
        },

        _showToolbar: function() {
            var that = this;
            NoteToolbar.show(this.$el, function() {
                that.model.destroy({
                    error: function() {
                        alert("Error on deleting note.");
                    }
                });

                NoteToolbar.hideAndUndbindDeleteCallback();
            });
        },

        _hideToolbar: function() {
            NoteToolbar.hide();
        }
    });

    return NoteView;
});