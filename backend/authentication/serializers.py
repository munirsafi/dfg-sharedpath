from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
        token['phone'] = user.phone_number
        token['community'] = user.community
        token['community_role'] = user.community_role

        return token
