from rest_framework import serializers
from .models import SellAd, SellAdImage, ServiceAd


class SellAdImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = SellAdImage
    fields = '__all__'


class SellAdSerializer(serializers.ModelSerializer):
      
  class Meta:
    model = SellAd
    fields = '__all__'


class ServiceAdSerializer(serializers.ModelSerializer):

  class Meta:
    model = ServiceAd
    fields = '__all__'
