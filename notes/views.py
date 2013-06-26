from django.shortcuts import render
from utils.decorators import active_and_login_required
from api import NoteResource


@active_and_login_required
def list(request):
    # use API to load bootstrapped model data into HTML
    res = NoteResource()
    request_bundle = res.build_bundle(request=request)
    queryset = res.obj_get_list(request_bundle)

    bundles = []
    for obj in queryset:
        bundle = res.build_bundle(obj=obj, request=request)
        bundles.append(res.full_dehydrate(bundle, for_list=True))

    json = res.serialize(None, bundles, "application/json")

    return render(request, "notes/note_list.html", {"notes_json": json})
