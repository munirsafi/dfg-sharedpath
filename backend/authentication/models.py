from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _

from .managers import AuthUserManager

class AuthUser(AbstractUser):
    """
    SharedPath Map Application's custom user model; includes new attributes
    such as phone number, community, and role, as well as setting the email
    as the primary identifier instead of a username

    :author     Munir Safi
    :since      2020-11-13
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)

    community = models.CharField(max_length=250, blank=True)
    community_role = models.CharField(max_length=125, blank=True)
    community_phone = models.CharField(max_length=125, blank=True)
    community_email = models.CharField(max_length=125, blank=True)
    community_link = models.CharField(max_length=750, blank=True)
    landzones = models.JSONField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AuthUserManager()

    def __str__(self):
        return self.email

    def get_editable_fields(self, **kwargs):
        return ['first_name', 'last_name', 'phone_number', 'community', 'community_role', 'community_phone', 'community_email', 'community_link', 'landzones']
