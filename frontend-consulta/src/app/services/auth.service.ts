// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz para la respuesta esperada de la API (asumiendo JWT)
export interface AuthResponse { 
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1'; 

  constructor(private http: HttpClient) { }

  // 1. Lógica de Registro
  register(userData: any): Observable<AuthResponse> {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post<AuthResponse>(url, userData);
  }

  // 2. Lógica de Login
  login(credentials: any): Observable<AuthResponse> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<AuthResponse>(url, credentials);
  }

  // 3. Almacenar el Token
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // 4. Obtener el Token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // 5. Verificar estado de autenticación
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}