import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  setLoginData(data: any) {
    localStorage.setItem('idUsuario', String(data.idUsuario ?? ''));
    localStorage.setItem('pacienteId', String(data.pacienteId ?? ''));
    localStorage.setItem('userName', String(data.nombre ?? ''));
    localStorage.setItem('userApellido', String(data.apellido ?? ''));
    localStorage.setItem('userEmail', String(data.email ?? ''));
    localStorage.setItem('rol', String(data.rol ?? ''));
    
  }

  register(userData: any): Observable<any> {
    return this.http.post('/api/auth/register', userData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  setRegisterData(data: any) {
    localStorage.setItem('idUsuario', String(data.idUsuario ?? ''));
    localStorage.setItem('userRut', String(data.rut ?? ''));
    localStorage.setItem('pacienteId', String(data.pacienteId ?? ''));
    localStorage.setItem('userName', String(data.nombre ?? ''));
    localStorage.setItem('userApellido', String(data.apellido ?? ''));
    localStorage.setItem('userEmail', String(data.email ?? ''));
  }

  logout() {
    localStorage.clear();
  }

  get rol(): string {
    return localStorage.getItem('rol') ?? '';
  }
}
