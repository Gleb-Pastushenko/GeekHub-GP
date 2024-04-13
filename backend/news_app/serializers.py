from rest_framework import serializers
from .models import News


class NewsSerializer(serializers.ModelSerializer):
  date = serializers.DateTimeField(format="%d.%m.%Y\xa0\xa0%H:%M")

  class Meta:
    model = News
    fields = '__all__'
    