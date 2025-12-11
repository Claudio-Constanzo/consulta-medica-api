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

    path("pacientes/crear/", views.crear_paciente),
    path("pacientes/<str:rut>/", views.buscar_paciente_por_rut),   
    path("pacientes/", views.listar_pacientes),
    path("pacientes/editar/<rut>/", views.editar_paciente),

    path("fichas/crear/", views.crear_ficha_medica),
    path("fichas/", views.listar_fichas),
    path("fichas/<int:id_ficha>/", views.obtener_ficha),
    path("fichas/usuario/<int:usuario_id>/", views.fichas_por_usuario),

    path("horas-ocupadas/", views.horas_ocupadas),
    path("horas/agendar/", views.crear_hora_usuario),
    path("horas/cancelar/<int:id_hora>/", views.cancelar_hora),
    path("horas/agenda-doctor/", views.agenda_doctor),
    path("horas/usuario/<int:usuario_id>/", views.horas_por_usuario),

    path("usuario/<str:rut>/", views.buscar_usuario_por_rut),

    path("registro/", views.registro_usuario),
    path("login/", views.login_usuario),
]
