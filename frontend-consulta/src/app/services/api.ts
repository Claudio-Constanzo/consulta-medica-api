import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Luego cambiamos esto a la URL real de tu backend
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(rut: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { rut, password });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getConsultas(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/consultas/`,
      { headers: this.getAuthHeaders() }
    );
  }

  createConsulta(payload: any) {
  return this.http.post(
    `${this.baseUrl}/consultas/`,
    payload,
    { headers: this.getAuthHeaders() }
  );
}

  registerUser(payload: any) {
  return this.http.post(
    `${this.baseUrl}/register/`,
    payload
  );
}

}
