from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from budget.models import Budget, BudgetLine
from budget.serializers import BudgetSerializer, BudgetLineSerializer


class BudgetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Budget.objects.none()
    serializer_class = BudgetSerializer

    def get_queryset(self):
        if self.request.user.has_perms(['team.custom_view_teams', 'budget.custom_view_budget']):
            return Budget.objects.filter(is_active = True)

        if self.request.user.has_perm("budget.custom_view_budget"):
            return Budget.objects.filter(
                is_active = True,
                team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True)
            )

        return Budget.objects.none()


class BudgetLineViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = BudgetLine.objects.none()
    serializer_class = BudgetLineSerializer

    def get_queryset(self):
        if self.request.user.has_perms(['team.custom_view_teams', 'budget.custom_view_budget']):
            queryset = BudgetLine.objects.filter(is_active = True)
        elif self.request.user.has_perm("budget.custom_view_budget"):
            queryset = BudgetLine.objects.filter(
                is_active = True,
                team__in = self.request.user.teammember_set.only('team_id').values_list('team_id', flat = True)
            )
        else:
            return BudgetLine.objects.none()

        get_params = self.request.GET.copy()
        get_params.pop('page', None)

        q = Q()
        q.children = list(get_params.items())

        return queryset.filter(q)
