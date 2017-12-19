# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-07 19:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, verbose_name='Utilisateur')),
                ('title', models.CharField(max_length=100, verbose_name='Titre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('issue_type', models.IntegerField(choices=[(0, 'Bug'), (1, 'Amélioration')], default=0, verbose_name='Type')),
                ('severity', models.IntegerField(choices=[(0, 'Bloquant'), (1, 'Majeur'), (2, 'Normal'), (3, 'Mineur')], default=1, verbose_name='Sévérité')),
                ('status', models.IntegerField(choices=[(0, 'En attente'), (1, 'En cours'), (2, 'Doublon'), (3, 'Déjà résolu'), (4, 'Résolu'), (5, 'Ne sera pas résolu')], default=0, verbose_name='Statut')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date ouverture')),
                ('date_closed', models.DateTimeField(blank=True, null=True, verbose_name='Date fermeture')),
            ],
            options={
                'verbose_name': 'Bug',
                'verbose_name_plural': 'Bugs',
                'db_table': 'issue',
                'ordering': ('severity', 'issue_type', 'title'),
            },
        ),
    ]
