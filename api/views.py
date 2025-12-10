from datetime import datetime
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Paciente, FichaMedica, HoraAgendada, Secretaria, Registro
from .serializer import PacienteSerializer, FichaMedicaSerializer, HoraAgendadaSerializer, SecretariaSerializer, RegistroSerializer


@api_view(["GET"])
def listar_pacientes(request):
    pacientes = Paciente.objects.all()
    serializer = PacienteSerializer(pacientes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def buscar_paciente_por_rut(request, rut):
    paciente = get_object_or_404(Paciente, rut=rut)
    serializer = PacienteSerializer(paciente)
    return Response(serializer.data)


@api_view(["POST"])
def crear_paciente(request):
    serializer = PacienteSerializer(data=request.data)

    if serializer.is_valid():
        paciente = serializer.save()
        return Response(
            {
                "message": "Paciente creado correctamente",
                "data": PacienteSerializer(paciente).data,
            }
        )

    return Response(serializer.errors, status=400)


@api_view(["PUT", "PATCH"])
def editar_paciente(request, rut):
    paciente = get_object_or_404(Paciente, rut=rut)
    serializer = PacienteSerializer(paciente, data=request.data, partial=True)
    if serializer.is_valid():
        paciente = serializer.save()
        return Response(
            {
                "message": "Paciente actualizado correctamente",
                "data": PacienteSerializer(paciente).data,
            }
        )

    return Response(serializer.errors, status=400)


@api_view(["GET"])
def listar_fichas(request):
    fichas = FichaMedica.objects.all().order_by("-hora_ficha")
    serializer = FichaMedicaSerializer(fichas, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def obtener_ficha(request, id_ficha):
    ficha = get_object_or_404(FichaMedica, id_ficha=id_ficha)
    serializer = FichaMedicaSerializer(ficha)
    return Response(serializer.data)


@api_view(["POST"])
def crear_ficha_medica(request):
    data = request.data.copy()
    data["hora_ficha"] = datetime.now()

    serializer = FichaMedicaSerializer(data=data)

    if serializer.is_valid():
        ficha = serializer.save()
        return Response(
            {
                "message": "Ficha médica guardada",
                "data": FichaMedicaSerializer(ficha).data,
            }
        )

    return Response(serializer.errors, status=400)


@api_view(["GET"])
def horas_ocupadas(request):
    fecha = request.GET.get("fecha")
    if not fecha:
        return Response({"error": "Debe enviar fecha"}, status=400)

    ocupadas = HoraAgendada.objects.filter(fecha=fecha).values_list(
        "hora_inicio", flat=True
    )

    return Response({"ocupadas": list(ocupadas)})


@api_view(["GET"])
def agenda_doctor(request):
    fecha = request.GET.get("fecha")
    if not fecha:
        return Response({"error": "Debe enviar fecha"}, status=400)

    horas = HoraAgendada.objects.filter(fecha=fecha).order_by("hora_inicio")
    serializer = HoraAgendadaSerializer(horas, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def agendar_hora(request):
    data = request.data.copy()
    if "estado" not in data:
        data["estado"] = "reservada"

    serializer = HoraAgendadaSerializer(data=data)

    if serializer.is_valid():
        hora = serializer.save()
        return Response(
            {
                "message": "Hora agendada correctamente",
                "data": HoraAgendadaSerializer(hora).data,
            }
        )

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def cancelar_hora(request, id):
    hora = get_object_or_404(HoraAgendada, id=id)
    hora.estado = "cancelada"
    hora.save()

    serializer = HoraAgendadaSerializer(hora)
    return Response({"message": "Cita cancelada", "data": serializer.data})


@api_view(["GET"])
def listar_secretarias(request):
    secretarias = Secretaria.objects.all()
    serializer = SecretariaSerializer(secretarias, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def crear_secretaria(request):
    serializer = SecretariaSerializer(data=request.data)

    if serializer.is_valid():
        secretaria = serializer.save()
        return Response(
            {
                "message": "Secretaria creada",
                "data": SecretariaSerializer(secretaria).data,
            }
        )

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def crear_registro(request):
    serializer = RegistroSerializer(data=request.data)

    if serializer.is_valid():
        reg = serializer.save()
        return Response(
            {"message": "Registro guardado", "data": RegistroSerializer(reg).data}
        )

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def registro_usuario(request):
    nombre = request.data.get("nombre")
    apellido = request.data.get("apellido")
    email = request.data.get("email")
    password = request.data.get("password")

    if not all([nombre, apellido, email, password]):
        return Response(
            {"detail": "Faltan datos obligatorios."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if Registro.objects.filter(email=email).exists():
        return Response(
            {"detail": "Ya existe un usuario con ese correo."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    registro = Registro.objects.create(
        nombre=nombre,
        apellido=apellido,
        email=email,
        password_hash=make_password(password),
    )
    paciente = Paciente.objects.create(
        rut="",
        nombre=nombre,
        apellido=apellido,
        email=email,
        direccion="",
        telefono="",
        prevision="",
        usuarios_id_usuario=registro.id,
    )
    return Response(
        {
            "idUsuario": registro.id,
            "pacienteId": paciente.id_paciente,
            "nombre": registro.nombre,
            "apellido": registro.apellido,
            "email": registro.email,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def login_usuario(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not all([email, password]):
        return Response(
            {"detail": "Debe enviar email y contraseña."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        registro = Registro.objects.get(email=email)
    except Registro.DoesNotExist:
        return Response(
            {"detail": "Credenciales inválidas."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not check_password(password, registro.password_hash):
        return Response(
            {"detail": "Credenciales inválidas."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    paciente = Paciente.objects.filter(usuarios_id_usuario=registro.id).first()

    if paciente is None:
        paciente = Paciente.objects.create(
            rut="",
            nombre=registro.nombre,
            apellido=registro.apellido,
            email=registro.email,
            direccion="",
            telefono="",
            prevision="",
            usuarios_id_usuario=registro.id,
        )

    return Response(
        {
            "idUsuario": registro.id,
            "pacienteId": paciente.id_paciente, 
            "nombre": registro.nombre,
            "apellido": registro.apellido,
            "email": registro.email,
        },
        status=status.HTTP_200_OK,
    )

