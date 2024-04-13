from django.db import models


def upload_path(instance, filename):
  return f"news/{filename}"


class News(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField(null=False)
  image = models.ImageField(upload_to=upload_path)
  date = models.DateTimeField()

  class Meta:
    verbose_name_plural = "News"

  def __str__(self):
    return self.title
