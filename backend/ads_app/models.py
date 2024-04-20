from django.db import models
from django.dispatch import receiver
import os

from community_app.models import User


def sell_ads_upload_path(instance, filename):
  return f'sell_ads/{filename}'


def service_ads_upload_path(instance, filename):
  return f'service_ads/{filename}'


def vacancy_ads_apload_path(instance, filename):
  return f'vacancy_ads/{filename}'
  

class SellAd(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  text = models.TextField()
  

class SellAdImage(models.Model):
  sell_ad = models.ForeignKey(SellAd, on_delete=models.CASCADE)
  image = models.ImageField(upload_to=sell_ads_upload_path)


@receiver(models.signals.post_delete, sender=SellAdImage)
def auto_delete_file_on_delete(sender, instance, **kwargs):
  if instance.image:
    if os.path.isfile(instance.image.path):
      os.remove(instance.image.path)


class ServiceAd(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()
  image = models.ImageField(upload_to=service_ads_upload_path)


@receiver(models.signals.post_delete, sender=ServiceAd)
def auto_delete_file_on_delete(sender, instance, **kwargs):
  if instance.image:
    if os.path.isfile(instance.image.path):
      os.remove(instance.image.path)


@receiver(models.signals.pre_save, sender=ServiceAd)
def auto_delete_file_on_change(sender, instance, **kwargs):
  if not instance.pk:
    return False
  
  try:
    old_file = ServiceAd.objects.get(pk=instance.pk).image
  except ServiceAd.DoesNotExist:
    return False
  
  new_file = instance.image

  if not old_file == new_file:
    if os.path.isfile(old_file.path):
      os.remove(old_file.path)


class VacancyAd(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()


class VacancyAdImage(models.Model):
  vacancy_ad = models.ForeignKey(VacancyAd, on_delete=models.CASCADE)
  image = models.ImageField(upload_to=vacancy_ads_apload_path)
  