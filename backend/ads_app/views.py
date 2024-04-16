from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ServiceAd
from .serializers import ServiceAdSerializer


class ServiceAdView(APIView):
  def get(self, request, format=None):
    instances = ServiceAd.objects.all()
    serializer = ServiceAdSerializer(instances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request, format=None):
    serializer = ServiceAdSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def patch(self, request, pk):
    try:
      instance = ServiceAd.objects.get(pk=pk)
    except ServiceAd.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = ServiceAdSerializer(instance, data=request.data, partial=True)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
     
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def get_object(self, pk):
    try:
      return ServiceAd.objects.get(pk=pk)
    except ServiceAd.DoesNotExist:
      raise Http404

  def delete(self, request, pk):
    instance = self.get_object(pk)
    instance.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
