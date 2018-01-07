from rest_framework import viewsets

from provider.models import Provider
from provider.serializers import ProviderSerializer, ResellerSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `order-list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Provider.objects.all()  # is_service = False
    serializer_class = ProviderSerializer


class ResellerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `order-list` and `retrieve` actions.
    """
    queryset = Provider.objects.all().only('id', 'name')
    serializer_class = ResellerSerializer
    pagination_class = None
