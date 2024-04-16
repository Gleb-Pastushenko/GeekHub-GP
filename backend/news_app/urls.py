from django.urls import path

from . import views

urlpatterns = [
  path('api/news/', views.NewsView.as_view(), name="news"),
  path('api/news/<int:pk>', views.NewsView.as_view(), name="news"),
  
]
