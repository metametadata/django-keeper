"use strict";

require.config({
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        bootstrap: {
          deps: ["jquery"],
          exports: "$.fn.tooltip"
        },
        handlebars: {
            exports: "Handlebars"
        },
        jquery_autosize: {
            deps: ["jquery"],
            exports: "$.fn.autosize"
        },
        jquery_cookie: {
            deps: ["jquery"],
            exports: "$.fn.cookie"
        },
        underscore: {
            exports: "_"
        }
    },
    paths: {
        backbone: "vendor/backbone",
        bootstrap: "vendor/bootstrap.min",
        handlebars: "vendor/handlebars",
        jquery: "vendor/jquery",
        jquery_autosize: "vendor/jquery.autosize-min",
        jquery_cookie: "vendor/jquery.cookie",
        jquery_focus: "notes/util/jquery.focusAtTheEnd",
        moment: "vendor/moment.min",
        underscore: "vendor/underscore.min"
    }
});

require(["notes/app"], function(App) {
    $(function() {
        App.init();
    });
});