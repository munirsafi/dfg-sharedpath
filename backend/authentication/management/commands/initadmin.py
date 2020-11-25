from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        Creates a superuser admin account, only if no other accounts exist yet

        :author     Munir Safi
        :since      2020-11-13
        """
        User = get_user_model()

        if User.objects.count() == 0:
            for user in settings.ADMINS:
                print('Creating account for %s' % (user))
                password = 'password1'
                admin = User.objects.create_superuser(email=user, password=password)
                admin.is_active = True
                admin.is_staff = True
                admin.is_superuser = True
                admin.save()
        else:
            print('Admin account already existing. Not initializing additional admin accounts')
