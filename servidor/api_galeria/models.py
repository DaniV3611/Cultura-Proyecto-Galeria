from django.db import models

# Create your models here.
class Matriz(models.Model):
    titulo = models.CharField(max_length=200, null=False)
    fecha = models.CharField(max_length=50, null=True)
    ano = models.IntegerField(null=True)
    ubicacion = models.CharField(max_length=200, null=True)
    descripcion = models.TextField(null=False)
    link = models.CharField(max_length=200, null=True)
    afectos = models.CharField(max_length=200)
    autor = models.CharField(max_length=200, null=True)

