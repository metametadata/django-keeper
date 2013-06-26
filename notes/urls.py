from django.conf.urls import patterns, include, url
from . import views
from . import api

from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', "notes.views.list", name="list"),
                       (r'^api/', include(api.v1.urls)),
                       )
