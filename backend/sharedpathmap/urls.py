from django.contrib import admin
from django.urls import include, path

from authentication.views import AuthUserObtainPairView, change_password
from landzones.views import LandZoneView

from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'landzones', LandZoneView, basename='landzones')

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/change-password', change_password, name='change_password'),
    path('auth/token/', AuthUserObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
