from rest_framework import serializers
from .models import ServiceAd


class SellAdSerializer(serializers.ModelSerializer):
      
  class Meta:
    model = ''
    fields = '__all__'


class SellAdImage(serializers.ModelSerializer):
  sell_ad = SellAdSerializer()

  class Meta:
    model = ''
    fields = '__all__'


class ServiceAdSerializer(serializers.ModelSerializer):

  class Meta:
    model = ServiceAd
    fields = '__all__'
