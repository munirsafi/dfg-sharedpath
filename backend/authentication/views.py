from django.views import View
from django.http import JsonResponse

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import AuthUserObtainPairSerializer

class AuthUserObtainPairView(TokenObtainPairView):
    serializer_class = AuthUserObtainPairSerializer

def change_password(request):
    print(request.headers['Authorization'])
    return JsonResponse({ 'hello': 'world' })
