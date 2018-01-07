from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from order.models import Order
from order.serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    pagination_class = None
    queryset = Order.objects.none()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            print(user.username, "(superuser)")
        else:
            print(user.username)

        order_ids = set()  # collect order IDs that can be returned to the user

        user_team_ids = set(user.teammember_set.only('team_id').values_list('team_id', flat = True))
        in_cart = Order.objects.filter(
            Q(status = 0, items__username = user.username) |
            Q(status = 0, team__in = list(user_team_ids))
        )

        if not user.has_perm('budget.custom_view_budget'):
            in_cart = in_cart.filter(
                Q(items__username = user.username) |
                Q(items__is_confidential = False)
            )
        order_ids.update([order.id for order in in_cart.only('id')])
        print(in_cart.count())

        # Commandes à saisir
        if user.has_perm('order.custom_goto_status_4') and not user.is_superuser:
            order_list = Order.objects.exclude(provider__is_local = True)
            order_list = order_list.filter(
                Q(status__in = [2, 3, 4]) |
                Q(status = 1, team__in = user_team_ids) |
                Q(status = 1, items__username = user.username)
            )

        # Commandes en cours - toutes équipes
        elif user.has_perm("team.custom_view_teams") and not user.is_superuser:
            order_list = Order.objects.filter(status__in = [2, 3, 4])

        elif user.is_superuser:
            order_list = Order.objects.filter(status__in = [1, 2, 3, 4])

        # Commandes en cours - par équipe
        else:
            order_list = Order.objects.filter(
                status__in = [1, 2, 3, 4]
            ).filter(
                Q(items__username = user.username) |
                Q(team__in = user_team_ids)
            )

        # Exclude confidential orders
        if not user.has_perm('budget.custom_view_budget'):
            order_list = order_list.filter(
                Q(items__is_confidential = False) |
                Q(items__username = user.username)
            )
        print(order_list.count())
        order_ids.update([order.id for order in order_list.only('id')])
        return Order.objects.filter(id__in = order_ids)
