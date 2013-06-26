from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.utils.html import strip_tags


class LoginForm(AuthenticationForm):
    pass


class RegisterForm(UserCreationForm):
    pass
