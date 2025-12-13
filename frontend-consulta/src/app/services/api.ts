import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // AUTH
  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.base}/login/`, data);
  }

  register(data: { nombre: string; apellido: string; rut: string; email: string; password: string }) {
    return this.http.post<any>(`${this.base}/registro/`, data);
  }

  // USUARIO
  usuarioPorRut(rut: string) {
    return this.http.get<any>(`${this.base}/usuario/${encodeURIComponent(rut)}/`);
  }

  // PACIENTES
  pacientes() {
    return this.http.get<any[]>(`${this.base}/pacientes/`);
  }

  pacientePorRut(rut: string) {
    return this.http.get<any>(`${this.base}/pacientes/${encodeURIComponent(rut)}/`);
  }

  crearPaciente(data: any) {
    return this.http.post<any>(`${this.base}/pacientes/crear/`, data);
  }

  editarPaciente(rut: string, data: any) {
    return this.http.put<any>(`${this.base}/pacientes/editar/${encodeURIComponent(rut)}/`, data);
  }

  // FICHAS
  fichas() {
    return this.http.get<any[]>(`${this.base}/fichas/`);
  }

  ficha(id: number | string) {
    return this.http.get<any>(`${this.base}/fichas/${id}/`);
  }

  fichasUsuario(usuarioId: number | string) {
    return this.http.get<any[]>(`${this.base}/fichas/usuario/${usuarioId}/`);
  }

  crearFicha(data: { rut_paciente: string; titulo: string; notas?: string }) {
    return this.http.post<any>(`${this.base}/fichas/crear/`, data);
  }

  // HORAS
  horasOcupadas(fecha: string) {
    return this.http.get<{ ocupadas: string[] }>(`${this.base}/horas-ocupadas/?fecha=${fecha}`);
  }

  agendarHora(data: { fecha: string; hora_inicio: string; hora_final: string; paciente_id: number | string }) {
    return this.http.post<any>(`${this.base}/horas/agendar/`, data);
  }

  cancelarHora(idHora: number | string) {
    return this.http.put<any>(`${this.base}/horas/cancelar/${idHora}/`, {});
  }

  agendaDoctor(fecha: string) {
    return this.http.get<any[]>(`${this.base}/horas/agenda-doctor/?fecha=${fecha}`);
  }

  horasUsuario(usuarioId: number | string) {
    return this.http.get<any[]>(`${this.base}/horas/usuario/${usuarioId}/`);
  }
}
