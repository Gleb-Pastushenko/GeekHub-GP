from django.db import models
from django.contrib.auth.models import User


def user_photos(instance, filename):
  return f'user_photos/{filename}'


class LandPlot(models.Model):
  user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
  address_number = models.IntegerField()
  well = models.BinaryField()
  electricity = models.BinaryField()
  fence = models.BinaryField()
  location = models.TextField(blank=True)
  hectare_area = models.DecimalField(max_digits=4, decimal_places=3)

  def __str__(self):
    return f'{self.address_number}'
  

class UserExt(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  photo = models.ImageField(upload_to=user_photos)
