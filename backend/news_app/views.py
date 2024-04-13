from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import datetime

from .models import News
from .serializers import NewsSerializer


@api_view()
def getNewsList(request):  
  news = News.objects.filter(date__gt=datetime.now()).order_by('date')
  serializer = NewsSerializer(news, many=True)

  return Response(serializer.data)
