from datetime import datetime, timedelta

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.db.models.signals import pre_save

from attachments.models import Attachment
from provider.models import Provider


class ProductType(models.Model):
    name = models.CharField(u"Type", max_length=200)

    class Meta:
        db_table = "product_type"
        verbose_name = u"Type de produit"
        verbose_name_plural = u"Types de produit"

    def __str__(self):
        return self.name


class ProductSubType(models.Model):
    category = models.ForeignKey(ProductType, verbose_name="Type")
    name = models.CharField(u"Sous-type", max_length=200)

    class Meta:
        db_table = "product_subtype"
        verbose_name = u"Sous-type de produit"
        verbose_name_plural = u"Sous-types de produit"

    def __str__(self):
        return self.name


class ProductCode(models.Model):
    code = models.CharField(u"Code", max_length=10)
    title = models.CharField(u"Libellé", max_length=250)

    class Meta:
        db_table = "product_code"
        verbose_name = u"Nomenclature"
        ordering = ('code',)

    def __str__(self):
        return "%s - %s" % (self.code, self.title)


class Product(models.Model):
    provider = models.ForeignKey(Provider, verbose_name='Fournisseur')
    origin = models.CharField(u"Fournisseur d'origine", max_length=100, null=True, blank=True)
    name = models.CharField(u'Désignation', max_length=500)
    packaging = models.CharField(u'Conditionnement', blank=True, null=True, max_length=100)
    reference = models.CharField(u'Référence', max_length=100)
    price = models.DecimalField(u'Prix', max_digits=12, decimal_places=2)
    offer_nb = models.CharField(u'N° Offre', blank=True, null=True, max_length=100)
    nomenclature = models.CharField(u'Nomenclature', blank=True, null=True, max_length=100)
    category = models.ForeignKey(ProductType, verbose_name="Type", blank=True, null=True)
    sub_category = models.ForeignKey(ProductSubType, verbose_name="Sous-type", blank=True, null=True)
    expiry = models.DateTimeField(
        u"Date d'expiration",
        help_text = u"Format jj/mm/aaaa",
        default = datetime(datetime.now().year, 12, 31),
        blank=True, null=True
    )
    last_change = models.DateTimeField(u'Dernière modification', auto_now=True)
    attachments = GenericRelation(Attachment)

    class Meta:
        db_table = "product"
        verbose_name = "Produit"
        verbose_name_plural = "Produits"
        ordering = ('provider', 'name')
        # unique_together = ('provider', 'reference')

    class Admin:
        pass

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

    def has_expired(self):
        return (self.expiry and self.expiry < datetime.now())

    def soon_expired(self):
        delta = timedelta(days=10)
        return (self.expiry - delta <= datetime.now())

    def clean_packaging(self):
        unit_mapping = {
            'ul': 'µL',
            'uL': 'µL',
            'µl': 'µL',
            'ug': 'µg',
            'ml': 'mL',
            'ML': 'mL'
        }
        for old_unit, new_unit in unit_mapping.items():
            self.packaging = self.packaging(k, v)
            self.packaging = self.packaging(" %s" % k, v)
        self.save()
