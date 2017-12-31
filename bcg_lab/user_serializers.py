from django.contrib.auth.models import User, Permission, Group
from rest_framework import serializers


class PermissionSerializer(serializers.ModelSerializer):
    queryset = Permission.objects.filter(codename__startswith = "custom_")

    class Meta:
        model = Permission
        fields = (
            'name',
            'codename'
        )


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many = True, read_only = True)

    class Meta:
        model = Group
        fields = (
            'name',
            'permissions'
        )


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many = True, read_only = True)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_superuser',
            'is_active',
            'last_login',
            'date_joined',
            'groups'
        )
