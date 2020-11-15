from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from django.utils.translation import ugettext_lazy as _

from .models import AuthUser

class AuthUserAdmin(UserAdmin):
    """
    Creates the admin dashboard section for the custom auth user model

    :author     Munir Safi
    :since      2020-11-13
    """
    model = AuthUser
    list_display = ('email', 'first_name', 'last_name', 'phone_number')
    ordering = ('email', 'first_name', 'last_name')
    fieldsets = ()
    add_fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone_number')})
    )


admin.site.unregister(Group)
admin.site.register(AuthUser, AuthUserAdmin)
