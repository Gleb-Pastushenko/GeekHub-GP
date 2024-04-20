from django.urls import path

from . import views


urlpatterns = [
  path('services/', views.ServiceAdView.as_view(), name='service_ad'),
  path('services/<int:pk>', views.ServiceAdView.as_view(), name='service_ad'),
  path('sell-ads/', views.SellAdView.as_view(), name='sell_ad'),
  path('sell-ads/<int:pk>', views.SellAdView.as_view(), name='sell_ad'),
]