from django.contrib import admin
from django.urls import include, path

from authentication.views import AuthUserObtainPairView, AuthUserRefreshView, ChangePasswordView, UpdateProfileView
from landzones.views import LandZoneView

from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'landzones', LandZoneView, basename='landzones')

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/change-password', ChangePasswordView.as_view(), name='change_password'),
    path('auth/update-profile', UpdateProfileView.as_view(), name='update_profile'),
    path('auth/token/', AuthUserObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', AuthUserRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
]
