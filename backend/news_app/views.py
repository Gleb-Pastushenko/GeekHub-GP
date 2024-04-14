from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from datetime import datetime

from .models import News
from .serializers import NewsSerializer


class NewsView(ListCreateAPIView):  
  queryset = News.objects.filter(date__gt=datetime.now()).order_by('date')
  serializer_class = NewsSerializer
