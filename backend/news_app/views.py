from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .news import news


@api_view()
def getNewsList(request):
  return Response(news)
