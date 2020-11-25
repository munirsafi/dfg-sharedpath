import json

from django.contrib import admin, auth
from django.core import serializers
from .models import LandZone

class LandZoneAdmin(admin.ModelAdmin):
    """
    Creates the land zone dashboard section

    :author     Munir Safi
    :since      2020-11-22
    """
    model = LandZone
    list_display = ('geo_json', 'owner')
    ordering = ('owner',)
    fieldsets = ()

    def change_view(self, request, object_id, form_url='', extra_context=None):
        land_zone = LandZone.objects.get(pk=object_id)
        land_zone_json = {
            'owner': str(land_zone.owner),
            'geo_json': json.dumps(land_zone.geo_json)
        }

        extra_context = extra_context or {}
        extra_context['zone_data'] = land_zone_json

        response = super(LandZoneAdmin, self).change_view(request, object_id, form_url, extra_context=extra_context)

        return response

admin.site.register(LandZone, LandZoneAdmin)
