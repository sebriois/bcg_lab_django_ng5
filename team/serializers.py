from rest_framework import serializers

from bcg_lab.user_serializers import UserSerializer
from team.models import Team, TeamMember


class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)

    class Meta:
        model = TeamMember
        fields = ('id', 'user')


class TeamSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many = True)

    class Meta:
        model = Team
        fields = (
            'id',
            'name',
            'fullname',
            'shortname',
            'is_active',
            'members'
        )
