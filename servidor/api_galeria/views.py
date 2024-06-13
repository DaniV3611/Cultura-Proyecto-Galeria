from django.http import JsonResponse
from django.shortcuts import render
import json
from .models import *
from unidecode import unidecode
import random

# Create your views here.

# Retorna todas las imagenes de la DB
def all(request):
    images = []
    if request.method == 'GET':
        objects = Matriz.objects.all()
        for object in objects:
            dict = {
                'autor' : object.autor,
                'titulo' : object.titulo,
                'fecha' : object.fecha,
                'ano' : object.ano,
                'ubicacion' : object.ubicacion,
                'descripcion' : object.descripcion,
                'link' : object.link,
                'afectos' : object.afectos
            }
            images.append(dict)
        random.shuffle(images)
        return JsonResponse({
            'message': 'Success',
            'images': images
            })
    return JsonResponse({
        'message': 'Error al cargar la peticion', 
        'images': images
        })

# Filtra las imagenes a traves de palabras clave
def filter(request):
    if request.method == 'GET':
        body = json.loads(request.body)
        keyword = body['keyword']
        objects = Matriz.objects.all()
        resultados = []
        for object in objects:
            if keyword.upper() in unidecode(object.afectos.replace('/', '').upper()):
                dict = {
                'autor' : object.autor,
                'titulo' : object.titulo,
                'fecha' : object.fecha,
                'ano' : object.ano,
                'ubicacion' : object.ubicacion,
                'descripcion' : object.descripcion,
                'link' : object.link,
                'afectos' : object.afectos
                }
                resultados.append(dict)
        random.shuffle(resultados)
    # Glosario de palabras clave
    return JsonResponse({
        'message': 'Imagenes Recopiladas',
        'images': resultados
    })

# Subir informacion de la matriz
def upload(request):
    if request.method == 'POST':
        diccionario = json.loads(request.body)
        for elemento in diccionario:
            objeto = Matriz.objects.create()
            if elemento['autor'] != '-':
                objeto.autor = elemento['autor']
            if elemento['ano'] != '-':
                objeto.ano = elemento['ano']
            objeto.afectos = elemento['afectos']
            objeto.descripcion = elemento['descripcion']
            if elemento['fecha'] != '-':
                objeto.fecha = elemento['fecha']
            if elemento['link'] != '-':
                objeto.link = elemento['link']
            objeto.titulo = elemento['titulo']
            if elemento['ubicacion'] != '-':
                objeto.ubicacion = elemento['ubicacion']
            objeto.save()
    return JsonResponse({'message': 'Datos guardados correctamente'})

def delete(request):
    if request.method == 'DELETE':
        body = json.loads(request.body)
        if body['validation']:
            Matriz.objects.all().delete()
            return JsonResponse({'message': 'Objetos Borrados'})
    return JsonResponse({'message': 'No fue posible borrar los objetos'})

def tabla(request):
    objetos = Matriz.objects.all()
    return render(request, 'tabla.html', {"objetos": objetos})

