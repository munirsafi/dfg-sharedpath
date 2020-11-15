from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class LandZoneView(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)
