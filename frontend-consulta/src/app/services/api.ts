import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/** ===== Tipos (ajustar segun  API) ===== */

export interface LoginResponse {
  access: string;
  refresh?: string;
  user?: any;        // aquí después puedes definir una interfaz User
}

export interface RegisterPayload {
  rut: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;       // 'paciente' | 'doctor' | 'secretaria' (definir bien luego)
}

export interface ConsultaPayload {
  fecha: string;     // ISO string: new Date(...).toISOString()
  motivo: string;
  // paciente?: number;  // cuando sepas cómo manda el backend estos IDs
  // doctor?: number;
}

/** ===== Servicio principal de API ===== */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * URL base del backend.
   * Ajustar esto cuando se suba a un servidor (Railway, Render, etc.)
   * Ejemplo producción: 'https://tudominio.com/api'
   */
  private readonly baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  /** ================== AUTENTICACIÓN ================== */

  /**
   * Login con RUT + password.
   * Esperar que el backend devuelva un JSON con al menos { access: 'JWT...' }.
   */
  login(rut: string, password: string): Observable<LoginResponse> {
    const body = { rut, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login/`, body);
    // Si se usa otra ruta (ej: /token/), cambiar solo la URL.
  }

  /**
   * Registro de usuario.
   * payload: { rut, nombre, email, password, rol }
   */
  registerUser(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, payload);
    // Igual que arriba: ajustar la ruta a lo que el backend defina, por ejemplo:
    // `${this.baseUrl}/usuarios/`
  }

  /** ================== CONSULTAS MÉDICAS ================== */

  /**
   * Devuelve todas las consultas visibles para el usuario logeado.
   * (Paciente: sus horas; Doctor: horas asignadas; Secretaria: todas, etc.)
   */
  getConsultas(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/consultas/`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Crea una nueva consulta (agendar hora).
   * payload mínimo: { fecha: ISOString, motivo: string, ... }
   */
  createConsulta(payload: ConsultaPayload): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/consultas/`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  /** ================== HELPERS ================== */

  /**
   * Construye los headers con el token almacenado en localStorage.
   * Úsalo en cualquier endpoint que requiera autenticación.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
