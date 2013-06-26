"use strict";

define(["jquery", "bootstrap", "backbone", "notes/models/notes", "notes/views/newnoteview", "notes/views/noteview"],

function($, Bootstrap, Backbone, Notes, NewNoteView, NoteView) {
    // Top app view, renders notes as well as implements creation and searching, supports routes for search results
    var AppView = Backbone.View.extend({
        el: "body",

        events: {
            "click": "_click",
            "submit #search-form": "_beforeSearch",
            "keyup #search-form": "_beforeSearch"
        },

        initialize: function() {
            console.log("AppView init");

            this.model = new Notes();
            this.model.comparator = function(note) {
                return -note.get("created");
            };

            this.noteViews = [];
            this.$noteContainer = $("#notes");
            this.$userNoteContainer = $("#user-notes");
            this.$searchField = $("input[name='q']");
            this.$noSearchResultsAlert = $("#no-search-results");

            this.$("*").tooltip({ container: "body" }); // https://github.com/twitter/bootstrap/issues/5865#issuecomment-10244573
            this._addNewNoteView();

            this.listenTo(this.model, "reset", this._resetNotes);
            this.listenTo(this.model, "add", this._addNote);
            this._startRouting();

            // OK, let's populate model with bootstrapped data
            this.model.reset(bootstrapped_notes);
        },

        _startRouting: function() {
            this.router = new Backbone.Router();

            var that = this;
            this.router.route("search/:q", "search", function(q) {
                console.log("ROUTE -> " + q);

                that.$searchField.val(q);
                that._filterSearchResults(true);
            });

            Backbone.history.start();
        },

        _addNewNoteView: function() {
            console.log("render AppView");

            this.newNoteView = new NewNoteView({ collection: this.model });
            this.newNoteView.autosize();
            this.newNoteView.$el.show();

            this.listenTo(this.newNoteView, "willStartEditingNote", this._finishEditingNotes);
        },

        _click: function(e) {
            console.log("click body");

            var clickedNote = false;
            $.each(this.noteViews.concat(this.newNoteView), function(i, view) {
                if (view.isTargetOfEvent(e)) {
                    clickedNote = true;
                    return false;
                }
            });

            if (!clickedNote) {
                this._finishEditingNotes();
            }
        },

        _resetNotes: function() {
            console.log("resetNotes");

            this.noteViews.length = 0;
            this.$userNoteContainer.empty();

            this.model.each(function(note) {
                this._addNoteView(note, false);
            }, this);

            this._filterSearchResults(false);
        },

        _addNote: function(note) {
            console.log("addNote");

            this._addNoteView(note, true);
            // that's it, we don't want to filter added note based on current search query
        },

        _addNoteView: function(note, atTheBeginnning) {
            var view = new NoteView({ model: note });
            view.render();

            if (atTheBeginnning) {
                this.$userNoteContainer.prepend(view.el);
            }
            else {
                this.$userNoteContainer.append(view.el);
            }

            view.autosize();

            var that = this;
            this.noteViews.push(view);
            this.listenTo(view, "willStartEditingNote", this._finishEditingNotes);
            this.listenTo(view, "willRemove", function () {
                console.log("appview: willRemove!");
                that.stopListening(view);

                var index = that.noteViews.indexOf(view);
                that.noteViews.splice(index, 1);
            });
        },

        _finishEditingNotes: function() {
            // console.log("finishEditingNotes");

            if (this.newNoteView.edited) {
                this.newNoteView.submitEditedChanges();
            }

            $.each(this.noteViews, function(i, view) {
                if (view.edited) {
                    view.submitEditedChanges();
                }
            })
        },

        _beforeSearch: function(e) {
            console.log("beforeSearch");
            e.preventDefault();

            var q = this.$searchField.val();
            this.router.navigate("search/" + encodeURIComponent(q)); // TODO: duplicated URL
            this._filterSearchResults(true);
        },

        _filterSearchResults: function(animated) {
            var q = this.$searchField.val();

            console.log("search -> " + q);

            var allNotesAreHidden = true;

            $.each(this.noteViews, function(i, view) {
                if (view.model.containsText(q)) {
                    allNotesAreHidden = false;
                    animated ? view.$el.fadeIn("fast") : view.$el.show();
                }
                else {
                    animated ? view.$el.fadeOut("fast") : view.$el.hide();
                }
            });

            if (q && this.noteViews.length && allNotesAreHidden) {
                this.$noSearchResultsAlert.show();
            }
            else {
                this.$noSearchResultsAlert.hide();
            }
        }
    });

    return AppView;
});