import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Cambia esta URL a la del backend que estés usando
  private baseUrl = 'http://localhost:8000/api';  // Asegúrate de tener la URL correcta

  constructor(private http: HttpClient) {}

  // Método para login
  login(rut: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { rut, password });
  }

  // Helper para obtener el header con el token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // Método para obtener consultas (solo para los que estén logueados)
  getConsultas(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/consultas/`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Método para crear una consulta (cualquier usuario logueado puede crear una)
  createConsulta(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/consultas/`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  // Método para registrar un nuevo usuario
  registerUser(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register/`,
      payload
    );
  }
}

