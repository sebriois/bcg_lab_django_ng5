from rest_framework import serializers

from product.models import Product
from provider.models import Provider


class ResellerField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s' % (value.name)


class ProviderSerializer(serializers.ModelSerializer):
    users_in_charge = serializers.StringRelatedField(many=True)
    reseller = ResellerField(read_only = True)

    class Meta:
        model = Provider
        fields = (
            'id', 'users_in_charge', 'name', 'reseller',
            'is_local', 'is_service', 'notes', 'direct_reception'
        )

    def update(self, instance, validated_data):
        """
        Update and return an existing `Provider` instance, given the validated data.
        """
        super(ProviderSerializer, self).update(instance, validated_data)
        if instance.reseller:
            instance.product_set.filter(origin__isnull=True).update(origin=instance.name)
            Product.objects.filter(origin=instance.name).update(provider=instance.reseller)
        else:
            Product.objects.filter(origin=instance.name).update(provider=instance, origin=None)

        return instance
