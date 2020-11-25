from django.conf import settings
from django.db import models
from uuid import uuid4

class LandZone(models.Model):
    """
    Landzone defined area including a unique id for each location, and the geoJSON
    that corresponds to every defined zone - relies on a user to be the foreign key

    :author     Munir Safi
    :since      2020-11-18
    """
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    geo_json = models.JSONField(default=None, verbose_name='geo json')
    owner = models.ForeignKey(default=None, to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
