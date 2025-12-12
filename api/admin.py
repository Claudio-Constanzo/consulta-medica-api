from django.contrib import admin
from .models import Registro, Secretaria, Doctor, Paciente

# Register your models here.

admin.site.register(Registro)
admin.site.register(Secretaria)
admin.site.register(Doctor)
admin.site.register(Paciente)
