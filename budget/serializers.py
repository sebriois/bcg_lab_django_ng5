class BudgetSerializer(serializers.Serializer):
    fields = (
        'team',
        'name',
        'default_origin',
        'budget_type',
        'default_nature',
        'tva_code',
        'domain',
        'is_active'
    )