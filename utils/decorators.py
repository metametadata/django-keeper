from django.contrib.auth.decorators import user_passes_test, login_required


def active_and_login_required(view_func):
    active_required = user_passes_test(lambda u: u.is_active, login_url="/", redirect_field_name="")

    decorated_view_func = login_required(active_required(view_func), login_url="/", redirect_field_name="")
    return decorated_view_func