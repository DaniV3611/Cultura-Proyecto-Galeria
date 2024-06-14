from django.http import JsonResponse
from django.shortcuts import render
import json
from .models import *
from unidecode import unidecode
import random

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

def obtenerAfecto(keyword):

    keyword = unidecode(keyword).lower()

    afecto = ''

    dict_afectos = {
        'Melancolia/Tristeza': ['tristeza profunda', 'malpresente', 'dificultad',
                                'dolor', 'afliccion', 'mal importante', 'melancolia',
                                'tristeza'],
        'Nostalgia/Anoranza': ['pesar', 'bien perdido', 'deseo de recuperarlo', 'amor',
                               'lejano', 'anoraza', 'nostalgia'],
        'Duda/Incertidumbre': ['vacilacion', 'escepticismo', 'desconfianza', 'indecision',
                               'inseguridad', 'duda', 'incertidumbre'],
        'Indiferencia/Distanciamiento': ['apatia', 'insensibilidad', 'frialdad',
                                         'desinteres', 'desden', 'indiferencia', 
                                         'distanciamiento'],
        'Desasosiego/Inquietud': ['intranquilidad', 'mal perturbador',
                                  'agitacion', 'zozobra', 'mal inminente',
                                  'anticipacion de dificultades', 'desasosiego',
                                  'inquietud'],
        'Angustia/Ansiedad': ['congoja', 'mal grave', 'inevitable', 'tension',
                              'preocupacion', 'mal futuro', 'amenaza', 'angustia',
                              'ansiedad', 'monichu'],
        'Temor/Miedo': ['mal dificil de evitar', 'deseo de huir', 'protegerse', 'huir',
                        'perturbacion', 'peligro real o imaginario',
                        'activacion defensiva', 'temor', 'miedo'],
        'Ira/Rabia': ['embate impetuoso', 'contrarrestar', 'rechazar mal violento',
                      'ira intensa', 'deseo de agredir', 'amenaza inminente', 'ira',
                      'rabia'],
        'Culpa/Remordimiento': ['remordimiento', 'mal causado', 'falta grave', 'pesar',
                                'arrepentimiento', 'mal realizado', 'desasosiego moral', 
                                'culpa'],
        'Verguenza/Humillacion': ['turbacion', 'pesar', 'accion deshonrosa',
                                  'hiere amor propio', 'ultraje', 'rebajamiento de dignidad',
                                  'dolor', 'rechazo', 'verguenza', 'humillacion'],
        'Desamparo/Abandono': ['abandono', 'desamparo', 'falta de proteccion',
                               'mal sobrepasante', 'soledad', 'carencia de ayuda',
                               'adversidad'],
        'Impotencia/Indefension': ['frustracion', 'imposibilidad', 'falta de medios o recursos',
                                   'desvalimiento', 'vulnerabilidad', 'carencia de proteccion',
                                   'impotencia', 'indefension'],
        'Extañamiento/Disociacion': ['distanciamiento', 'ajeno', 'extrano a la realidad',
                                     'desconexion', 'desapego', 'realidad paralela',
                                     'extranamiento', 'disosociacion'],
        'Rechazo/Repudio' : ['repulsion', 'alejamiento', 'objeto danino', 'indeseable',
                             'aversion', 'negacion total', 'malestar profundo',
                             'rechazo', 'repudio'],
        'Perplejidad/Desconcierto': ['turbacion', 'desconcierto', 'situacion compleja',
                                     'confusion', 'falta de coherencia',
                                     'acontecimientos inesperados', 'perplejidad'],
        'Ambivalencia Emocional': ['coexistencia de emociones opuestas',
                                   'ambivalencia emocional'],
        'SinSabor/Amargura' : ['impresion', 'desagradable', 'amargo', 'dolor intenso',
                               'decepcion', 'sinsabor', 'amargura', 'resentimiento'],
        'Duelo/Pena': ['pesar profundo', 'perdida significativa', 'adaptacion emocional',
                       'pesadumbre', 'congoja', 'afliccion', 'perdida', 'privacion'],
        'Soledad/Aislamiento': ['carencia de compania', 'vinculos afectivos', 
                                'falta de vinculos afectivos', 'aislamiento',
                                'soledad'],
        'Desesperanza/Derrota': ['perdida de esperanza', 'des esperanza', 'desesperanza',
                                 'resignacion', 'imposibilidad', 'derrota'],
        'Sobrecogimiento/Estremecimiento' : ['emocion intensa', 'sacude el animo', 'animo', 
                                             'algo sobrenatural', 'sobrenatural', 
                                             'sacudida emocional viva', 'repentina'
                                             'estremecimientos fisicos', 'sobrecogimiento',
                                             'estremecimiento'],
        'Anhelo/Zozobra': ['deseo vivo e intenso', 'deseo', 'deseo intenso', 
                           'bien apreciado', 'no poseido', 'inquietud', 'desasosiego',
                           'infortunios previstos', 'anhelo', 'zozobra'],
        'Hastio/Fatiga': ['cansancio', 'desgana', 'falta de interes', 'repeticion constante',
                          'agotamiento', 'esfuerzo excesivo', 'preocupacion excesiva', 
                          'esfuerzo o preocupacion excesivos', 'desfallecimiento',
                          'hastio', 'fatiga'],
        'Nada': ['nada', 'el ingrediente secreto de mi sopa de ingrediente secreto', 'vacio']
    }

    for key, item in dict_afectos.items():
        if keyword in item:
            return unidecode(key.replace("/","").upper())

    return None

# Filtra las imagenes a traves de palabras clave
def filter(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        keyword = body['keyword']
        afecto = obtenerAfecto(keyword)
        resultados = []
        if afecto != None:
            objects = Matriz.objects.all()
            for object in objects:
                if afecto.upper() in unidecode(object.afectos.replace('/', '').upper()):
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

