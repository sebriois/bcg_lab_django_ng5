from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from order.models import Order
from order.serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    pagination_class = None
    queryset = Order.objects.none()
    serializer_class = OrderSerializer

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
