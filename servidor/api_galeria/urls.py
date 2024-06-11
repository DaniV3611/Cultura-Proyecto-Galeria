from django.urls import path
from . import views

urlpatterns = [
    path('', views.all, name = 'All images'),
    path('filter', views.filter, name = 'Filter Images')
]
