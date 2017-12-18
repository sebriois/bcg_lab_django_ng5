from rest_framework import serializers

from product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    provider = serializers.StringRelatedField(read_only = True)
    category = serializers.StringRelatedField(read_only = True)
    sub_category = serializers.StringRelatedField(read_only = True)

    class Meta:
        model = Product
        fields = (
            'id', 'provider', 'origin', 'name', 'packaging', 'reference', 'price', 'offer_nb',
            'nomenclature', 'category', 'sub_category', 'expiry', 'last_change'
        )
