from rest_framework import viewsets

from order.models import Order
from order.serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    pagination_class = None
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
