from django.urls import path
from . import views

urlpatterns = [
    path('', views.tabla, name = 'Tabla'),
    path('all', views.all, name = 'All Images'),
    path('filter', views.filter, name = 'Filter Images'),
    path('upload', views.upload, name = 'Subir Informacion'),
    path('delete', views.delete, name = 'Eliminar Informacion')
]
