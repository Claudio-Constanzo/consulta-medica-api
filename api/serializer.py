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
    paciente_nombre = serializers.CharField(
        source="paciente.nombre",
        read_only=True
    )
    paciente_apellido = serializers.CharField(
        source="paciente.apellido",
        read_only=True
    )
    paciente_rut = serializers.CharField(
        source="paciente.rut",
        read_only=True
    )

    class Meta:
        model = HoraAgendada
        fields = [
            "id",
            "fecha",
            "hora_inicio",
            "hora_final",
            "estado",
            "paciente_nombre",
            "paciente_apellido",
            "paciente_rut",
        ]



class SecretariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secretaria
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = '__all__'