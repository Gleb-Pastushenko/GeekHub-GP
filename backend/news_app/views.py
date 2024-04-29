from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import News
from .serializers import NewsSerializer
from tbot.services.telegram_broadcast import send_news_to_users

class NewsView(APIView):
  def get(self, request, format=None):
    instances = News.objects.all().order_by('date')
    serializer = NewsSerializer(instances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request, format=None):
    serializer = NewsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        news_id = serializer.instance.id
        send_news_to_users.delay(news_id)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def patch(self, request, pk):
    try:
      instance = News.objects.get(pk=pk)
    except News.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = NewsSerializer(instance, data=request.data, partial=True)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
     
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def get_object(self, pk):
    try:
      return News.objects.get(pk=pk)
    except News.DoesNotExist:
      raise Http404

  def delete(self, request, pk):
    instance = self.get_object(pk)
    instance.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  