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
    rut_normalizado = rut.replace(".", "").replace("-", "").strip().upper()
    pacientes = Paciente.objects.all()

    for p in pacientes:
        rut_bd = p.rut.replace(".", "").replace("-", "").strip().upper()
        if rut_bd == rut_normalizado:
            serializer = PacienteSerializer(p)
            return Response(serializer.data, status=200)

    return Response({"detail": "Paciente no encontrado."}, status=404)


@api_view(['GET', 'POST'])
def crear_paciente(request):
    rut = request.data.get("rut")
    nombre = request.data.get("nombre")
    apellido = request.data.get("apellido")
    telefono = request.data.get("telefono")
    direccion = request.data.get("direccion")
    prevision = request.data.get("prevision")
    usuario_id = request.data.get("usuarioId")

    if usuario_id is None and rut:
        if Registro.objects.filter(rut=rut).exists():
            return Response(
                {"detail": "Este RUT pertenece a un usuario registrado. Use la búsqueda por RUT."},
                status=400
            )

    if rut and Paciente.objects.filter(rut=rut).exists():
        return Response(
            {"detail": "Paciente con este RUT ya existe."},
            status=400
        )

    paciente = Paciente.objects.create(
        rut=rut if rut else None,
        nombre=nombre,
        apellido=apellido,
        telefono=telefono,
        direccion=direccion,
        prevision=prevision,
        usuarios_id_usuario=usuario_id
    )

    return Response({
        "id_paciente": paciente.id_paciente,
        "nombre": paciente.nombre,
        "apellido": paciente.apellido
    }, status=201)



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


@api_view(["GET", "POST"])
def registro_usuario(request):
    if request.method == "GET":
        user_id = request.query_params.get("id", None)

        if user_id:
            try:
                registro = Registro.objects.get(id=user_id)
                return Response({
                    "idUsuario": registro.id,
                    "nombre": registro.nombre,
                    "apellido": registro.apellido,
                    "rut": registro.rut,
                    "email": registro.email,
                })
            except Registro.DoesNotExist:
                return Response({"detail": "Usuario no encontrado."}, status=404)

        registros = Registro.objects.all().values(
            "id", "nombre", "apellido", "rut", "email"
        )
        return Response(list(registros))

    if request.method == "POST":
        nombre = request.data.get("nombre")
        apellido = request.data.get("apellido")
        rut = request.data.get("rut")
        email = request.data.get("email")
        password = request.data.get("password")

        if not all([nombre, apellido, rut, email, password]):
            return Response({"detail": "Faltan datos obligatorios."}, status=400)

        if Registro.objects.filter(email=email).exists():
            return Response({"detail": "Correo ya registrado."}, status=400)

        if Registro.objects.filter(rut=rut).exists():
            return Response({"detail": "RUT ya registrado."}, status=400)

        registro = Registro.objects.create(
            nombre=nombre,
            apellido=apellido,
            rut=rut,
            email=email,
            password_hash=make_password(password)
        )

        return Response(
            {
                "idUsuario": registro.id,
                "nombre": registro.nombre,
                "apellido": registro.apellido,
                "email": registro.email,
                "rut": registro.rut,
                "pacienteId": None,
            },
            status=201,
        )


@api_view(["POST"])
def login_usuario(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        registro = Registro.objects.get(email=email)
    except Registro.DoesNotExist:
        return Response({"detail": "Credenciales inválidas."}, status=400)

    if not check_password(password, registro.password_hash):
        return Response({"detail": "Credenciales inválidas."}, status=400)

    paciente = Paciente.objects.filter(usuarios_id_usuario=registro.id).first()

    return Response({
        "idUsuario": registro.id,
        "pacienteId": getattr(paciente, "id_paciente", None),
        "nombre": registro.nombre,
        "apellido": registro.apellido,
        "email": registro.email,
    }, status=200)


@api_view(["GET"])
def horas_por_usuario(request, usuario_id):
    horas = HoraAgendada.objects.filter(usuario_id=usuario_id).order_by("fecha", "hora_inicio")
    serializer = HoraAgendadaSerializer(horas, many=True)
    return Response(serializer.data, status=200)


@api_view(["GET"])
def fichas_por_usuario(request, usuario_id):
    fichas = FichaMedica.objects.filter(usuarios_id_usuario=usuario_id).order_by("-hora_ficha")
    serializer = FichaMedicaSerializer(fichas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(["POST"])
def crear_hora_usuario(request):
    usuario_id = request.data.get("usuario_id")
    fecha = request.data.get("fecha")
    hora_inicio = request.data.get("hora_inicio")
    hora_final = request.data.get("hora_final")
    estado = "reservada"

    nueva = HoraAgendada.objects.create(
        usuario_id=usuario_id,
        fecha=fecha,
        hora_inicio=hora_inicio,
        hora_final=hora_final,
        estado=estado,
        paciente="",  
    )

    serializer = HoraAgendadaSerializer(nueva)
    return Response(serializer.data, status=201)


@api_view(["PUT"])
def cancelar_hora(request, id_hora):
    try:
        hora = HoraAgendada.objects.get(id=id_hora)
    except HoraAgendada.DoesNotExist:
        return Response({"detail": "Hora no encontrada"}, status=404)

    hora.estado = "cancelada"
    hora.save()
    return Response({"detail": "Cita cancelada"}, status=200)


@api_view(["GET"])
def buscar_usuario_por_rut(request, rut):
    rut_normalizado = rut.replace(".", "").replace("-", "").strip().upper()

    registros = Registro.objects.all()
    registro = None

    for r in registros:
        rut_bd = r.rut.replace(".", "").replace("-", "").strip().upper()
        if rut_bd == rut_normalizado:
            registro = r
            break

    if not registro:
        return Response({"detail": "Usuario no encontrado."}, status=404)

    return Response({
        "idUsuario": registro.id,
        "nombre": registro.nombre,
        "apellido": registro.apellido,
        "email": registro.email,
        "rut": registro.rut,
    })


