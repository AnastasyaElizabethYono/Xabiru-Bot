from django.db import models


# Create your models here.
class FactNewCustomerRegion(models.Model):
    # inner_group = models.CharField(max_length=4000, blank=True, null=True, db_column= 'inner group') 
    # region = models.CharField(max_length=255, blank=True, null=True, db_column= 'region')
    # subgroup = models.CharField(max_length=255, blank=True, null=True, db_column= 'subgroup')
    # the_group = models.CharField(max_length=4000, blank=True, null=True,db_column= 'group')
    # type_group = models.CharField(max_length=255, blank=True, null=True, db_column= 'tipe')
    # amount = models.FloatField(blank=True, null=True,db_column= 'pendapatan')
    # date_key = models.CharField(max_length=255, blank=True, null=True,db_column= 'datekey')
    # budget = models.FloatField(blank=True, null=True, db_column= 'target')
    # type = models.CharField(max_length=3)
    # date = models.CharField(max_length=24)
    # currency = models.CharField(max_length=3)
    datekey = models.CharField(max_length=255, blank=True, null=True)
    tahun = models.CharField(max_length=3,blank=True, null=True)
    bulan = models.CharField(max_length=3,blank=True, null=True)
    inner_group = models.CharField(max_length=4000, blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    subgroup = models.CharField(max_length=255, blank=True, null=True)
    group = models.CharField(max_length=4000, blank=True, null=True)
    tipe_group = models.CharField(max_length=255, blank=True, null=True)
    pendapatan = models.FloatField(blank=True, null=True)
    periode = models.FloatField(blank=True, null=True)
    target = models.FloatField(blank=True, null=True)
    date = models.CharField(max_length=24)
    kurs = models.CharField(max_length=3,blank=True, null=True)
    


class FactTopCDN(models.Model):
    service_number = models.CharField(max_length=255, blank=True, null=True)
    customer_name = models.CharField(max_length=255, blank=True, null=True)
    date_key = models.CharField(max_length=6)
    amount = models.FloatField(blank=True, null=True)
    kurs = models.CharField(max_length=3)
    inner_group = models.CharField(max_length=4000, blank=True, null=True)
    subgroup = models.CharField(max_length=255, blank=True, null=True)
    subgroup1 = models.CharField(max_length=255, blank=True, null=True)
    product_name = models.CharField(max_length=255, blank=True, null=True)
    partner = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=5, blank=True, null=True)


class FactTopTraffic(models.Model):
    date_key = models.CharField(max_length=6)
    customer = models.CharField(max_length=255, blank=True, null=True)
    bandwidth = models.FloatField(blank=True, null=True)
    subgroup = models.CharField(max_length=255, blank=True, null=True)
    subgroup1 = models.CharField(max_length=255, blank=True, null=True)
    the_group = models.CharField(max_length=4000, blank=True, null=True)
    inner_group = models.CharField(max_length=4000, blank=True, null=True)
    inex = models.CharField(max_length=255, blank=True, null=True)
    currency = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=3)
    date = models.DateTimeField(blank=True, null=True)


class FactTrafficCDN(models.Model):
    dim_month = models.FloatField(blank=True, null=True)
    customer_name = models.TextField(
        blank=True, null=True
    )  # nvarchar(max) translates to TextField
    product_name = models.CharField(max_length=255, blank=True, null=True)
    usage_value = models.FloatField(blank=True, null=True)
    usage_unit = models.TextField(
        blank=True, null=True
    )  # nvarchar(4000) could also be a TextField for simplicity
    partner = models.CharField(max_length=20, blank=True, null=True)
    type = models.CharField(max_length=3)
