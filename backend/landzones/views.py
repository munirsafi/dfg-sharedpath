from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication


class LandZoneView(APIView):
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
            setattr(user, 'landzones', request.data['landzones'])

            user.save()

            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Cannot save landzones'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """
        Validates the current user, then updates their password using the new
        given password

        :author     Munir Safi
        :since      2020-11-14
        :param      {request} the incoming rest_framework http request object
        """
        if request.headers.get('Authorization', None) is not None:
            AuthUser = get_user_model()
            users = AuthUser.objects.all()

            return Response(users)
        else:
            return Response({'message': 'Cannot save landzones'}, status=status.HTTP_400_BAD_REQUEST)
