from rest_framework import viewsets

from provider.models import Provider
from provider.serializers import ProviderSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()  # is_service = False
    serializer_class = ProviderSerializer
