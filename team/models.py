from django.contrib.auth.models import User
from django.db import models


class Team(models.Model):
    name = models.CharField(u"Nom", max_length=100)
    fullname = models.CharField(u"Nom complet", max_length=100)
    shortname = models.CharField(u"Abréviation", max_length=10)
    is_active = models.BooleanField(u"Actif?", default=True)

    class Meta:
        verbose_name = u'Equipe'
        verbose_name_plural = u'Equipes'
        ordering = ('name',)

    def __str__(self):
        return u"%s" % (self.fullname and self.fullname or self.name)

    @property
    def members(self):
        return self.teammember_set


class TeamMember(models.Model):
    team = models.ForeignKey(Team, verbose_name="Equipe", null=True, blank=True, on_delete = models.SET_NULL)
    user = models.ForeignKey(User, verbose_name="Utilisateur", on_delete = models.CASCADE)
    member_type = models.IntegerField(u"Type d'utilisateur", default=0)

    send_on_validation = models.BooleanField(u"Email quand commande validée ?", default=False)
    send_on_edit = models.BooleanField(u"Email quand commande supprimée ?", default=True)
    send_on_sent = models.BooleanField(u"Email quand commande envoyée ?", default=False)

    class Meta:
        verbose_name = u'Membre équipe'
        verbose_name_plural = u'Membres équipe'
        ordering = ('team', 'user__username')

    def __str__(self):
        return self.user

    def __repr__(self):
        return self.user

    def get_full_name(self):
        if (self.user.get_full_name()):
            return self.user.get_full_name()
        return self.user.username


class TeamNameHistory(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    name = models.CharField(u"Nom", max_length = 100)
    fullname = models.CharField(u"Nom", max_length = 100)

    class Meta:
        db_table = 'team_name_history'
        verbose_name = "Historique nom d'équipe"
        verbose_name_plural = "Historique nom d'équipe"
        ordering = ('team', 'name')

