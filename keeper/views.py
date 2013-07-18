from django.contrib.auth import login as auth_login, authenticate
from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_POST

from .forms import LoginForm, RegisterForm


def home(request, login_form=None, register_form=None):
    login_form = login_form or LoginForm()
    register_form = register_form or RegisterForm()

    context = {"login_form": login_form, "register_form": register_form, "user": request.user}

    return render(request, "index.html", context)


@require_POST
@never_cache
def login(request):
    form = LoginForm(data=request.POST)

    if not form.is_valid():
        return home(request, login_form=form)

    _perform_login(request, form.get_user(), request.POST.get("remember_me", None))

    return redirect("home")


@require_POST
def register(request):
    form = RegisterForm(data=request.POST)

    if not form.is_valid():
        return home(request, register_form=form)

    username = form.clean_username()
    password = form.clean_password2()
    form.save()

    user = authenticate(username=username, password=password)

    _perform_login(request, user, request.POST.get("remember_me", None))

    return redirect("home")


def _perform_login(request, user, remember):
    if not remember:
        request.session.set_expiry(0)

    auth_login(request, user)