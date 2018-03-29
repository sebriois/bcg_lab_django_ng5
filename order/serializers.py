from django.contrib.humanize.templatetags.humanize import naturaltime, naturalday
from rest_framework import serializers

from attachments.serializers import AttachmentSerializer
from budget.models import Budget
from order.models import Order, OrderItem
from provider.models import Provider
from team.models import Team


class OrderItemSerializer(serializers.ModelSerializer):
    item_type_display = serializers.SerializerMethodField()
    cost_type_display = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'item_type',
            'item_type_display',
            'username',
            'username_recept',
            'product_id',
            'name',
            'origin',
            'packaging',
            'reference',
            'offer_nb',
            'category',
            'sub_category',
            'nomenclature',
            'price',
            'cost_type',
            'cost_type_display',
            'quantity',
            'delivered',
            'is_confidential'
        )

    def get_item_type_display(self,obj):
        return obj.get_item_type_display()

    def get_cost_type_display(self,obj):
        return obj.get_cost_type_display()


class OrderSerializer(serializers.ModelSerializer):
    provider = serializers.StringRelatedField(read_only = True)
    provider_id = serializers.PrimaryKeyRelatedField(
        queryset = Provider.objects.all(),
        write_only = True
    )

    team = serializers.StringRelatedField(read_only = True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset = Team.objects.all(),
        write_only = True
    )

    budget = serializers.StringRelatedField(read_only = True)
    budget_id = serializers.PrimaryKeyRelatedField(
        queryset = Budget.objects.all(),
        write_only = True,
        required = False
    )

    items = OrderItemSerializer(many = True)
    attachments = AttachmentSerializer(many = True, required = False)
    status_display = serializers.SerializerMethodField()
    last_change_human = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id', 'number',
            'provider', 'provider_id',
            'budget', 'budget_id',
            'team', 'team_id',
            'status', 'status_display',
            'items', 'notes',
            'is_confidential', 'is_urgent', 'has_problem',
            'date_created', 'date_delivered', 'last_change', 'last_change_human',
            'attachments'
        )

    def get_status_display(self, obj):
        return obj.get_status_display()

    def get_last_change_human(self, obj):
        return naturalday(obj.last_change)

    def create(self, validated_data):
        print(validated_data)
        order, created = Order.objects.get_or_create(
            status = validated_data['status'],
            provider = validated_data['provider_id'],
            team = validated_data['team_id']
        )
        for item in validated_data['items']:
            item_obj, created = order.items.get_or_create(
                product_id = item['product_id'],
                defaults = item
            )

            if not created:
                item_obj.quantity += int(item['quantity'])
                item_obj.save()

        return order
