from django.contrib.auth.models import User
from rest_framework import viewsets

from bcg_lab.user_serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset provides `order-list` and `retrieve` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None

