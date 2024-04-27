from django.db import models

class TelegramUser(models.Model):
    user_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    username = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username or f'{self.first_name} {self.last_name}'