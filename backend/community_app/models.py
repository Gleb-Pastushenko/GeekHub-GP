from django.db import models
from django.utils.translation import gettext_lazy as _


class User(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  fathers_name = models.CharField(max_length=50)
  birth_date = models.DateField()
  photo = models.ImageField()
  phone_number = models.CharField(max_length=13)
  email = models.EmailField()
  password = models.CharField(_('password'), max_length=128)

  def __str__(self):
    return f'{self.first_name} {self.last_name}'
  
  
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