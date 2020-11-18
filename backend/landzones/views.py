from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import LandZone


class LandZoneView(APIView):
    authentication_classes = []

    def post(self, request):
        """
        Save the landzones a user submits

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

            for landzone in request.data['landzones']:
                if landzone.get('geoJSON', None) is not None:
                    land_zone = LandZone(geo_json=landzone['geoJSON'], owner=user)
                    land_zone.save()
                else:
                    return Response({'message': 'You must include a \'geoJSON\' property in your array of objects'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You must be logged in to register a new zone!'}, status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request):
        """
        Get all landzones

        :author     Munir Safi
        :since      2020-11-14
        :param      {request} the incoming rest_framework http request object
        """
        land_zones = LandZone.objects.all()
        return Response({'landzones': land_zones})
