from django.contrib.humanize.templatetags.humanize import naturaltime, naturalday
from rest_framework import serializers

from attachments.serializers import AttachmentSerializer
from order.models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    item_type = serializers.SerializerMethodField()
    cost_type = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'item_type',
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
            'quantity',
            'delivered',
            'is_confidential'
        )

    def get_item_type(self,obj):
        return obj.get_item_type_display()

    def get_cost_type(self,obj):
        return obj.get_cost_type_display()


class OrderSerializer(serializers.ModelSerializer):
    provider = serializers.StringRelatedField(read_only = True)
    team = serializers.StringRelatedField(read_only = True)
    budget = serializers.StringRelatedField(read_only = True)
    items = OrderItemSerializer(many = True)
    attachments = AttachmentSerializer(many = True)
    status_display = serializers.SerializerMethodField()
    last_change_human = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id', 'number', 'provider', 'budget', 'team', 'status', 'status_display',
            'items', 'notes',
            'is_confidential', 'is_urgent', 'has_problem',
            'date_created', 'date_delivered', 'last_change', 'last_change_human',
            'attachments'
        )

    def get_status_display(self, obj):
        return obj.get_status_display()

    def get_last_change_human(self, obj):
        return naturalday(obj.last_change)
