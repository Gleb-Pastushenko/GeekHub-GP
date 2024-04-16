from django.db import models

from community_app.models import User


def sell_ads_upload_path(instance, filename):
  return f'sell_ads/{filename}'

def service_ads_upload_path(instance, filename):
  return f'service_ads/{filename}'

def vacancy_ads_apload_path(instance, filename):
  return f'vacancy_ads/{filename}'

class SellAd(models.Model):
  user = models.ForeignKey(User, on_delete='cascade')
  title = models.CharField(max_length=100)
  text = models.TextField()
  
class SellAdImage(models.Model):
  sell_ad = models.ForeignKey(SellAd, on_delete='cascade')
  image = models.ImageField(upload_to=sell_ads_upload_path)

class ServiceAd(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()
  image = models.ImageField(upload_to=service_ads_upload_path)

class VacancyAd(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()

class VacancyAdImage(models.Model):
  vacancy_ad = models.ForeignKey(VacancyAd, on_delete='cascade')
  image = models.ImageField(upload_to=vacancy_ads_apload_path)
  