from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import News
from .serializers import NewsSerializer


class NewsView(APIView):
  def get(self, request, format=None):
    instances = News.objects.all()
    serializer = NewsSerializer(instances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request, format=None):
      data = request.data
      
      serializer = NewsSerializer(data=data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
