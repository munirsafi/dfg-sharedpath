from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    """
    Creates a superuser admin account, only if no other accounts exist yet
    """
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            for user in settings.ADMINS:
                print('Creating account for %s (%s)' % (user[0], user[1]))
                password = 'password1'
                admin = User.objects.create_superuser(
                    email=user[0], username=user[1], password=password)
                admin.is_active = True
                admin.is_staff = True
                admin.is_superuser = True
                admin.save()
        else:
            print('Admin account already existing. Not initializing additional admin accounts')
