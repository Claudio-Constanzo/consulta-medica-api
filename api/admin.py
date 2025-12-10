from django.contrib import admin

# Register your models here.

class RegistrarSecretariaAdmin(admin.ModelAdmin):
    list_display = ('nombre_secretaria', 'apellido_secretaria', 'rut_secretaria', 'email_secretaria', 'contraseña_secretaria')