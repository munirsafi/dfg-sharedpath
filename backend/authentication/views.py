from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import AuthUserObtainPairSerializer

class AuthUserObtainPairView(TokenObtainPairView):
    """
    Sets the custom serializer class for the custom user model

    :author     Munir Safi
    :since      2020-11-13
    """
    serializer_class = AuthUserObtainPairSerializer

class AuthUserToken(RefreshToken):

    @classmethod
    def for_user(cls, user):
        """
        Returns an authorization token for the given user that will include
        the custom payload data with the user information
        """

        token = cls()
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['phone'] = user.phone_number
        token['community'] = user.community
        token['community_role'] = user.community_role

        return token

class ChangePasswordView(APIView):
    authentication_classes = []

    def post(self, request):
        """
        Validates the current user, then updates their password using the new
        given password

        :author     Munir Safi
        :since      2020-11-14
        :param      {request} the incoming rest_framework http request object
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

class UpdateProfileView(APIView):
    authentication_classes = []

    def post(self, request):
        """
        Validates the current user, then updates their profile using the new
        values provided

        :author     Munir Safi
        :since      2020-11-14
        :param      {request} the incoming rest_framework http request object
        """
        if request.headers.get('Authorization', None) is not None:
            header_token = request.headers['Authorization'].split(' ')[1]
            jwt_object = JWTAuthentication()
            valid_token = jwt_object.get_validated_token(header_token)
            user_email = jwt_object.get_user(valid_token)

            AuthUser = get_user_model()
            user = AuthUser.objects.get(email=user_email)
            editable_fields = user.get_editable_fields()

            print(request.data)
            for field, value in request.data.items():
                if field in editable_fields:
                    setattr(user, field, value)

            user.save()

            refresh = AuthUserToken.for_user(user)

            return Response({'refresh': str(refresh), 'access': str(refresh.access_token) })
        else:
            return Response({ 'message': 'Cannot update profile if no user is active' }, status=status.HTTP_400_BAD_REQUEST)
