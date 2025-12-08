from django.shortcuts import render
from .serializer import PacienteSerializer
from .models import Paciente, FichaMedica, Usuario, HoraAgendada, Secretaria
from rest_framework import api_view
from rest_framework.response import Response

# Create your views here.
@api_view({'GET', 'POST'})
def paciente_list(request):
    if request.method == 'GET':
        pacientes = Paciente.objects.all()
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)