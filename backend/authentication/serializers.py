from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AuthUserObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['phone'] = user.phone_number

        return token
