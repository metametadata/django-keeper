from django.db import models
from django.contrib.auth.models import User

from utils.models import TimeStampedModel


class Note(TimeStampedModel):
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return "'{}' '{}'".format(self.title, self.content)
