from django.conf.urls import patterns, include, url
from django.http import HttpResponse
from . import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', "keeper.views.home", name="home"),
                       url(r'^login/$', "keeper.views.login", name="login"),
                       url(r'^register/$', "keeper.views.register", name="register"),
                       url(r'^logout/$', "django.contrib.auth.views.logout", {"next_page": "/"}, name="logout"),
                       url(r'^notes/', include("notes.urls", namespace="notes")),
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^robots\.txt$', lambda r: HttpResponse("User-agent: *\nDisallow: /", mimetype="text/plain")),
                       )
