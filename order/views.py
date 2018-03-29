from django.db.models import Q
from rest_framework import viewsets, generics, status, mixins
from rest_framework.decorators import detail_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from bcg_lab.constants import DEBIT
from order.models import Order
from order.serializers import OrderSerializer
from product.models import Product
from provider.serializers import ProviderSerializer
from team.serializers import TeamSerializer


class OrderOwnerFilter():
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(
            Q(items__username = request.user.username) |
            Q(team__in = request.user.teammember_set.only('team_id').values_list('team_id', flat = True))
        )


class ConfidentialOrderFilter():
    def filter_queryset(self, request, queryset, view):
        if not request.user.has_perm('budget.custom_view_budget'):
            queryset = queryset.filter(
                Q(items__is_confidential = False) |
                Q(items__username = request.user.username)
            )

        return queryset


class DistinctOrderFilter():
    def filter_queryset(self, request, queryset, view):
        return queryset.distinct()


class CartViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.filter(status = 0)
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = None
    filter_backends = (OrderOwnerFilter, ConfidentialOrderFilter, DistinctOrderFilter)

    def create(self, request, *args, **kwargs):
        product = request.data.get('product', None)
        if not product:
            return Response({"error": "Product must be provided"}, status = status.HTTP_400_BAD_REQUEST)

        quantity = request.data.get('quantity', None)
        if not quantity:
            return Response({"error": "quantity must be provided"}, status = status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id = product['id'])
        except Product.DoesNotExist:
            return Response({'error': 'Product does not exist'}, status = status.HTTP_400_BAD_REQUEST)

        order = {
            'status': 0,
            'provider_id': product.provider.id,
            'team_id': request.user.teammember_set.first().team.id,
            'items': [
                {
                    'username': request.user.username,
                    'product_id': product.id,
                    'cost_type': DEBIT,
                    'name': product.origin and "%s - %s" % (product.origin, product.name) or product.name,
                    'provider': product.provider.name,
                    'origin': product.origin,
                    'packaging': product.packaging,
                    'reference': product.reference,
                    'price': product.price,
                    'offer_nb': product.offer_nb,
                    'nomenclature': product.nomenclature,
                    'quantity': quantity,
                    'delivered': quantity,
                    'category': product.category and product.category.name or None,
                    'sub_category': product.sub_category and product.sub_category.name or None
                }
            ]
        }

        serializer = self.get_serializer(data = order)
        serializer.is_valid(raise_exception = True)
        # perform_create calls serializer.save() which calls the serializer's create() method
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status = status.HTTP_201_CREATED, headers = headers)


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    pagination_class = None
    queryset = Order.objects.none()
    serializer_class = OrderSerializer
    lookup_field = 'id'

    def get_queryset(self):
        status = int(self.request.GET.get("status", 0))
        if status == 0:
            orders = self.cart()
        elif status == 1:
            orders = self.to_be_validated()
        elif status == 2:
            orders = self.validated()
        elif status == 3:
            orders = self.to_be_sent()
        elif status == 4:
            orders = self.sent()
        else:
            orders = Order.objects.none()

        # Exclude confidential orders
        if not self.request.user.has_perm('budget.custom_view_budget'):
            orders = orders.filter(
                Q(items__is_confidential = False) |
                Q(items__username = self.request.user.username)
            )

        return orders.distinct()

    @detail_route()
    def next_status(self, request, *args, **kwargs):
        """
        Move order to its next status
        """
        order = self.get_object()
        print(order)

        serializer = self.get_serializer(instance = order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status = status.HTTP_200_OK)

    def cart(self):
        orders = Order.objects.filter(status = 0)

        return orders.filter(
            Q(items__username = self.request.user.username) |
            Q(team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True))
        )

    def to_be_validated(self):
        orders = Order.objects.filter(status = 1)
        if self.request.user.is_superuser:
            return orders

        return orders.filter(
            Q(items__username = self.request.user.username) |
            Q(team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True))
        )

    def validated(self):
        orders = Order.objects.filter(status = 2)
        if self.request.user.is_superuser:
            return orders

        # commandes à saisir
        if self.request.user.has_perm('order.custom_goto_status_4'):
            return orders.exclude(provider__is_local = True)

        # commandes en cours - toutes équipes
        if self.request.user.has_perm('team.custom_view_teams'):
            return orders

        # commandes en cours - par équipe
        return orders.filter(
            Q(items__username = self.request.user.username) |
            Q(team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True))
        )

    def to_be_sent(self):
        orders = Order.objects.filter(status = 3)
        if self.request.user.is_superuser:
            return orders

        # commandes à saisir
        if self.request.user.has_perm('order.custom_goto_status_4'):
            return orders.exclude(provider__is_local = True)

        # commandes en cours - toutes équipes
        if self.request.user.has_perm('team.custom_view_teams'):
            return orders

        # commandes en cours - par équipe
        return orders.filter(
            Q(items__username = self.request.user.username) |
            Q(team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True))
        )

    def sent(self):
        orders = Order.objects.filter(status = 4)
        if self.request.user.is_superuser:
            return orders

        # commandes à saisir
        if self.request.user.has_perm('order.custom_goto_status_4'):
            return orders.exclude(provider__is_local = True)

        # commandes en cours - toutes équipes
        if self.request.user.has_perm('team.custom_view_teams'):
            return orders

        # commandes en cours - par équipe
        return orders.filter(
            Q(items__username = self.request.user.username) |
            Q(team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True))
        )

        # Exclude confidential orders
        if not user.has_perm('budget.custom_view_budget'):
            order_list = order_list.filter(
                Q(items__is_confidential = False) |
                Q(items__username = user.username)
            )

        order_ids.update([order.id for order in order_list.only('id')])
        return Order.objects.filter(id__in = order_ids)



