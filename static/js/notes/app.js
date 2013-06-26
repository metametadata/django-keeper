"use strict";

define(["jquery", "jquery_cookie", "handlebars", "moment", "notes/views/notetoolbar", "notes/views/appview"],

function($, jquery_cookie, Handlebars, moment, NoteToolbar, AppView) {
    var App = {
        init: function() {
            setupCsrfForAjax();
            addTemplateEngineHelpers();

            NoteToolbar.init();
            new AppView();
        }
    };

    function setupCsrfForAjax() {
        function csrfSafeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        $.ajaxSetup({
            crossDomain: false,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
                }
            }
        });
    }

    function addTemplateEngineHelpers() {
        Handlebars.registerHelper('date_from_epoch', function(object) {
            return moment.unix(parseInt(object)).calendar();
        });
    }

    return App;
});