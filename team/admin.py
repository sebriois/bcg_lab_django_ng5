from django.contrib import admin

# Register your models here.
from team.models import Team, TeamMember, TeamNameHistory

admin.site.register(Team)
admin.site.register(TeamMember)
admin.site.register(TeamNameHistory)