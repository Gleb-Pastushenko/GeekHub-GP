from django.urls import path
from . import views

urlpatterns = [
  path('news/', views.getNewsList, name="news")
]
