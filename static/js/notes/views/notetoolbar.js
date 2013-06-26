"use strict";

define(["jquery"], function($) {
    var NoteToolbar = {
        init: function() {
            console.log("toolbar init");
            this.$toolbar = $('#note-toolbar');
            this.$deleteButton = this.$toolbar.find(".note-delete");
            this.$archiveButton = this.$toolbar.find(".note-archive");

            // keep visible on hover
            this.$toolbar.hover(function() {
                $(this).finish().show();
            }, function() {
                $(this).fadeOut("fast");
            });

            // archive button
            this.$archiveButton.click(function () {
                alert("Archiving... kind of.");
            });
        },

        show: function(note, deleteCallback) {
            var $note = $(note);
            var offset = $note.offset();
            var width = $note.outerWidth();

            this.$toolbar.css({
                top: offset.top,
                left: offset.left + width - 1
            }).finish().show();

            this.$deleteButton.unbind("click").click(deleteCallback);
        },

        hide: function() {
            this.$toolbar.fadeOut("fast");
            // do not unbind callback here, because maybe user just moves cursor from note to toolbar
        },

        // call this method to remove reference to target note
        // TODO: not the best decision - see how bootstrap popover is implemented/use delay before hiding and unbinding (view will just announce that toolbar is free to hide now)
        hideAndUndbindDeleteCallback: function() {
            this.$toolbar.hide();
            this.$deleteButton.unbind("click");
        },
    };

    return NoteToolbar;
});