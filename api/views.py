from datetime import datetime
from zoneinfo import ZoneInfo
from rest_framework import status

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Paciente, FichaMedica, HoraAgendada, Secretaria, Registro, Doctor
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
        email=request.data.get("email"),
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
    data["hora_ficha"] = datetime.now(ZoneInfo("America/Santiago"))

    rut_paciente = data.get("rut_paciente")

    if rut_paciente:
        try:
            paciente = Paciente.objects.get(rut=rut_paciente)

            data["nombre_paciente"] = paciente.nombre
            data["apellido_paciente"] = paciente.apellido
            data["telefono_paciente"] = paciente.telefono
            data["direccion_paciente"] = paciente.direccion
            data["prevision_paciente"] = paciente.prevision

        except Paciente.DoesNotExist:
            return Response(
                {"detail": "Paciente no encontrado."},
                status=400
            )

    serializer = FichaMedicaSerializer(data=data)

    if serializer.is_valid():
        ficha = serializer.save()
        return Response(
            {
                "message": "Ficha médica guardada",
                "data": FichaMedicaSerializer(ficha).data,
            },
            status=201
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

        # Validaciones previas
        if Registro.objects.filter(email=email).exists():
            return Response({"detail": "Correo ya registrado."}, status=400)

        if Registro.objects.filter(rut=rut).exists():
            return Response({"detail": "RUT ya registrado."}, status=400)

        # Intentar crear el registro; envolver en try/except para retornar traza en caso de error (debug temporal)
        try:
            registro = Registro.objects.create(
                nombre=nombre,
                apellido=apellido,
                rut=rut,
                email=email,
                password=password
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
        except Exception as e:
            import traceback
            tb = traceback.format_exc()
            print("Error creando registro:", tb)
            # Devolver detalles mínimos en la respuesta para depuración local
            return Response({"detail": "Internal Server Error", "error": str(e), "trace": tb}, status=500)


@api_view(["POST"])
def login_usuario(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        registro = Registro.objects.get(email=email)
    except Registro.DoesNotExist:
        return Response({"detail": "Credenciales inválidas."}, status=400)

    if password != registro.password:
        return Response({"detail": "Credenciales inválidas."}, status=400)

    if Secretaria.objects.filter(usuarios_id_usuario=registro.id).exists():
        rol = "secretaria"
    elif Doctor.objects.filter(usuarios_id_usuario=registro.id).exists():
        rol = "doctor"
    else:
        rol = "usuario"

    paciente = Paciente.objects.filter(usuarios_id_usuario=registro.id).first()

    return Response({
        "idUsuario": registro.id,
        "pacienteId": getattr(paciente, "id_paciente", None),
        "nombre": registro.nombre,
        "apellido": registro.apellido,
        "email": registro.email,
        "rol": rol,
    }, status=200)


@api_view(["GET"])
def horas_por_usuario(request, usuario_id):
    paciente = Paciente.objects.filter(
        usuarios_id_usuario=usuario_id
    ).first()

    if not paciente:
        return Response([], status=200)

    horas = HoraAgendada.objects.filter(
        paciente=paciente
    ).order_by("fecha", "hora_inicio")

    serializer = HoraAgendadaSerializer(horas, many=True)
    return Response(serializer.data, status=200)


@api_view(["GET"])
def fichas_por_usuario(request, usuario_id):
    paciente = Paciente.objects.filter(
        usuarios_id_usuario=usuario_id
    ).first()

    if not paciente:
        return Response([], status=200)

    fichas = FichaMedica.objects.filter(
        rut_paciente=paciente.rut
    ).order_by("-hora_ficha")

    serializer = FichaMedicaSerializer(fichas, many=True)
    return Response(serializer.data, status=200)


@api_view(["POST"])
def crear_hora_usuario(request):
    fecha = request.data.get("fecha")
    hora_inicio = request.data.get("hora_inicio")
    hora_final = request.data.get("hora_final")
    paciente_id = request.data.get("paciente_id")

    if not all([fecha, hora_inicio, hora_final, paciente_id]):
        return Response(
            {"detail": "Datos incompletos"},
            status=400
        )

    try:
        paciente = Paciente.objects.get(id_paciente=paciente_id)
    except Paciente.DoesNotExist:
        return Response(
            {"detail": "Paciente no existe"},
            status=400
        )

    HoraAgendada.objects.create(
        fecha=fecha,
        hora_inicio=hora_inicio,
        hora_final=hora_final,
        paciente=paciente
    )

    return Response(
        {"detail": "Hora agendada correctamente"},
        status=201
    )


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



