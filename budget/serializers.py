from rest_framework import serializers

from budget.models import Budget, BudgetLine


class BudgetLineSerializer(serializers.ModelSerializer):
    credit = serializers.FloatField()
    debit = serializers.FloatField()

    class Meta:
        model = BudgetLine
        fields = (
            'number',
            'date',
            'origin',
            'provider',
            'offer',
            'product',
            'reference',
            'quantity',
            'product_price',
            'credit',
            'debit',
            'confidential',
        )


class BudgetSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField(read_only = True)
    budget_type = serializers.SerializerMethodField()
    budgetlines = BudgetLineSerializer(many = True, source = 'get_budgetlines')

    class Meta:
        model = Budget
        fields = (
            'team',
            'name',
            'default_origin',
            'budget_type',
            'default_nature',
            'tva_code',
            'domain',
            'is_active',
            'budgetlines'
        )

    def get_budget_type(self,obj):
        return obj.get_budget_type_display()
