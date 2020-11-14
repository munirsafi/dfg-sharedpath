from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import AuthUserObtainPairSerializer

class AuthUserObtainPairView(TokenObtainPairView):
    serializer_class = AuthUserObtainPairSerializer

class ChangePasswordView(APIView):
    authentication_classes = []

    def post(self, request):
        """
        Validates the current user, then updates their password using the new
        given password
        """
        if request.headers.get('Authorization', None) is not None:
            header_token = request.headers['Authorization'].split(' ')[1]
            jwt_object = JWTAuthentication()
            valid_token = jwt_object.get_validated_token(header_token)
            user_email = jwt_object.get_user(valid_token)

            AuthUser = get_user_model()
            user = AuthUser.objects.get(email=user_email)
            user.set_password(request.data['password'])
            user.save()

            refresh = RefreshToken.for_user(user)

            return Response({ 'refresh': str(refresh), 'access': str(refresh.access_token) })
        else:
            return Response({ 'message': 'Cannot change user password if no user is active' }, status=status.HTTP_400_BAD_REQUEST)
