"""
URL configuration for Api_rest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from api import views

urlpatterns = [
    path("pacientes/<rut>/", views.buscar_paciente_por_rut),
    path("pacientes/crear/", views.crear_paciente),
    path("pacientes/", views.listar_pacientes),
    path("pacientes/editar/<rut>/", views.editar_paciente),

    path("fichas/crear/", views.crear_ficha_medica),
    path("fichas/", views.listar_fichas),
    path("fichas/<int:id_ficha>/", views.obtener_ficha),

    path("horas-ocupadas/", views.horas_ocupadas),
    path("horas/agendar/", views.agendar_hora),
    path("horas/cancelar/<int:id>/", views.cancelar_hora),
    path("horas/agenda-doctor/", views.agenda_doctor),

    path("registro/", views.registro_usuario),
    path("login/", views.login_usuario),

]
