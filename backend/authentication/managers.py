from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _

class AuthUserManager(BaseUserManager):
    """
    Auth user manager that utlizes an email as the primary means of creating
    new user objects
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a normal user with the given email and password

        :email {str} user email address
        :password {str} user account password
        """
        if email is None:
            raise ValueError(_('An email must be set!'))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password

        :email {str} user email address
        :password {str} user account password
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)
