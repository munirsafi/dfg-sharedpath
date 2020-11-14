from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import AuthUserObtainPairSerializer

class AuthUserObtainPairView(TokenObtainPairView):
    serializer_class = AuthUserObtainPairSerializer