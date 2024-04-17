from django.urls import path

from . import views


urlpatterns = [
  path('api/services/', views.ServiceAdView.as_view(), name='service_ad'),
  path('api/services/<int:pk>', views.ServiceAdView.as_view(), name='service_ad'),
  path('api/sell-ads/', views.SellAdView.as_view(), name='sell_ad'),
  path('api/sell-ads/<int:pk>', views.SellAdView.as_view(), name='sell_ad'),
]