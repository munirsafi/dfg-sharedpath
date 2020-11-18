from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class AuthUserObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer to change the contents of the JWT in order
    to include email, first/last names, phone, community, and role

    :author     Munir Safi
    :since      2020-11-13
    :param      {user} user class object
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['phone_number'] = user.phone_number

        token['community'] = user.community
        token['community_role'] = user.community_role
        token['community_phone'] = user.community_phone
        token['community_email'] = user.community_email
        token['community_link'] = user.community_link

        return token
