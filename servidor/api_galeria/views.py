from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.

# Retorna todas las imagenes de la DB
def all(request):
    return JsonResponse({'message': 'Success'})

# Filtra las imagenes a traves de palabras clave
def filter(request):
    # Glosario de palabras clave
    return JsonResponse({'message': 'Success'})

