from django.utils.dateformat import format
from tastypie.api import Api
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized
from tastypie.resources import ModelResource
from tastypie.serializers import Serializer
from .models import Note


class UserObjectsOnlyAuthorization(Authorization):

    def read_list(self, object_list, bundle):
        return object_list.filter(user=bundle.request.user)

    def read_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def create_list(self, object_list, bundle):
        raise Unauthorized("unsupported")

    def create_detail(self, object_list, bundle):
        return True

    def update_list(self, object_list, bundle):
        allowed = []

        for obj in object_list:
            if obj.user == bundle.request.user:
                allowed.append(obj)

        return allowed

    def update_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def delete_list(self, object_list, bundle):
        raise Unauthorized("unsupported")

    def delete_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user


class UnixTimestampDateSerializer(Serializer):

    def format_datetime(self, data):
        return format(data, "U")


class NoteResource(ModelResource):

    class Meta:
        serializer = UnixTimestampDateSerializer()
        authentication = SessionAuthentication()
        authorization = UserObjectsOnlyAuthorization()
        queryset = Note.objects.all()
        resource_name = 'note'
        max_limit = None
        always_return_data = True

    def dehydrate(self, bundle):
        # import time
        # time.sleep(1.5)

        return bundle

    def hydrate(self, bundle):
        bundle.obj.user = bundle.request.user

        return bundle


v1 = Api(api_name="v1")
v1.register(NoteResource())
