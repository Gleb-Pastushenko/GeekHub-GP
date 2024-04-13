from django.db import models


class News(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField(null=False)
  image = models.ImageField()
  date = models.DateField()

  def __str__(self):
    return self.title
