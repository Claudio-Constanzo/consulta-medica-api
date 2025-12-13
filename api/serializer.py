from rest_framework import serializers
from .models import Paciente, FichaMedica, HoraAgendada, Secretaria, Registro

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class FichaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaMedica
        fields = '__all__'

class HoraAgendadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoraAgendada
        fields = "__all__"

class SecretariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secretaria
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = '__all__'