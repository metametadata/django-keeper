"use strict";

define(["backbone", "jquery_autosize", "jquery_focus", "notes/views/notetoolbar"],

function(Backbone, jquery_autosize, jquery_focus, NoteToolbar) {
    // Parent class for note views. Triggers "willStartEditingNote" event.
    var EditableNoteView = Backbone.View.extend({
        edited: false,

        originalEvents: {
            "click": "_startEditing",
            "click .done": "_beforeEdit"
        },

        // override this event hash in a child view
        additionalEvents: {},

        events : function() {
            return _.extend({}, this.originalEvents, this.additionalEvents);
        },

        // override in child view
        submitEditedChanges: function() {
        },

        // must be called after adding view to DOM
        autosize: function() {
            this.$(".content").autosize();
            return this;
        },

        // overriding method in order to trigger custom event
        remove: function() {
            this.trigger("willRemove");
            this.$(".content").trigger("autosize.destroy");
            Backbone.View.prototype.remove.call(this);
        },

        _startEditing: function(e) {
            // console.log("startEditing");
            e.stopPropagation();

            if (this.edited) {
                return;
            }

            this.trigger("willStartEditingNote");

            this._setEdited(true);
        },

        _setEdited: function(isEdited) {
            var $title = this.$(".title");

            if (isEdited) {
                this.$el.addClass("note-edited");

                $title.show();

                if (!this._hasFocus()) {
                    this._focus();
                }
            }
            else {
                this.$el.removeClass("note-edited");

                if (!$title.val()) {
                    $title.hide();
                }
            }

            this.edited = isEdited;
        },

        _hasFocus: function() {
            return (this.$el.has(":focus").length > 0);
        },

        _focus: function() {
            this.$(".content").focusAtTheEnd();
        },

        _beforeEdit: function(e) {
            // console.log("beforeEdit");
            e.stopPropagation();

            this.submitEditedChanges();
        },

        isTargetOfEvent: function(e) {
            return (this.$el.is(e.target) || this.$el.has(e.target).length != 0);
        }
    });

    return EditableNoteView;
});