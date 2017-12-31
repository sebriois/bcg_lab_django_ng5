from rest_framework import serializers

from bcg_lab.user_serializers import UserSerializer
from product.models import Product
from provider.models import Provider


class ResellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = (
            'id', 'name'
        )


class ResellerField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s' % (value.name)


class ProviderSerializer(serializers.ModelSerializer):
    reseller = ResellerField(read_only = True)
    users_in_charge = UserSerializer(many = True)

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
