from django.db import models
from django.utils import timezone

# Create your models here.
class Paciente(models.Model):
    id_paciente = models.BigAutoField(primary_key=True)
    rut = models.CharField(max_length=15, unique=True, verbose_name="RUT")
    nombre = models.CharField(max_length=50, verbose_name="Nombre")
    apellido = models.CharField(max_length=50, verbose_name="Apellido")
    email = models.EmailField(max_length=100, verbose_name="Correo electrónico")
    direccion = models.CharField(max_length=150, verbose_name="Dirección")
    telefono = models.CharField(max_length=15, verbose_name="Teléfono")
    prevision = models.CharField(max_length=100, verbose_name="Previsión")
    usuarios_id_usuario = models.BigIntegerField(null=True, blank=True, verbose_name="ID de usuario asociado")


class FichaMedica(models.Model):
    id_ficha = models.BigAutoField(primary_key=True)
    titulo = models.CharField(max_length=120)
    notas = models.TextField(blank=True, null=True)
    hora_ficha = models.DateTimeField(blank=True, null=True)
    direccion_paciente = models.CharField(max_length=100, blank=True, null=True)
    telefono_paciente = models.CharField(max_length=15, blank=True, null=True)
    rut_paciente = models.CharField(max_length=15, blank=True, null=True)
    nombre_paciente = models.CharField(max_length=50, blank=True, null=True)
    apellido_paciente = models.CharField(max_length=50, blank=True, null=True)
    prevision_paciente = models.CharField(max_length=100, blank=True, null=True)


class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password_hash = models.CharField(max_length=255)
    fecha_signup = models.DateTimeField(default=timezone.now)


class HoraAgendada(models.Model):
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_final = models.TimeField()
    razon = models.CharField(max_length=300)


class Secretaria(models.Model):
    rut_secretaria = models.CharField(max_length=15, unique=True)
    nombre_secretaria = models.CharField(max_length=50)
    apellido_secretaria = models.CharField(max_length=50)
    email_secretaria = models.EmailField(max_length=100, unique=True)
    password_hash = models.CharField(max_length=255)
    usuarios_id_usuario = models.BigIntegerField(blank=True, null=True)