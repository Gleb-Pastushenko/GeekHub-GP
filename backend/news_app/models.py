import os

from django.db import models
from django.dispatch import receiver


def upload_path(instance, filename):
  return f"news/{filename}"


class News(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()
  image = models.ImageField(upload_to=upload_path)
  date = models.DateTimeField()

  class Meta:
    verbose_name_plural = "News"

  def __str__(self):
    return self.title


@receiver(models.signals.post_delete, sender=News)
def auto_delete_file_on_delete(sender, instance, **kwargs):
  if instance.image:
    if os.path.isfile(instance.image.path):
      os.remove(instance.image.path)


@receiver(models.signals.pre_save, sender=News)
def auto_delete_file_on_change(sender, instance, **kwargs):
  if not instance.pk:
    return False
  
  try:
    old_file = News.objects.get(pk=instance.pk).image
  except News.DoesNotExist:
    return False
  
  new_file = instance.image

  if not old_file == new_file:
    if os.path.isfile(old_file.path):
      os.remove(old_file.path)