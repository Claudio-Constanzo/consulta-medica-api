import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secretaria-registrar-paciente',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './secretaria-registrar-paciente.component.html',
})
export class SecretariaRegistrarPacienteComponent {
  rut = '';
  usuario: any = null;
  pacienteExiste = false;
  error = '';

  form = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    prevision: '',
  };

  constructor(private router: Router, private api: ApiService) {}

  volver() {
    this.router.navigateByUrl('/secretaria/panel');
  }

  private resetForm() {
    this.form = { nombre: '', apellido: '', email: '', telefono: '', direccion: '', prevision: '' };
  }

  async rutChanged(value: string) {
    this.rut = value.replace(/[^\dkK-]/g, '').toUpperCase();
    this.error = '';
    this.usuario = null;
    this.pacienteExiste = false;

    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(this.rut)) return;

    // 1) verificar si paciente ya existe
    try {
      const p = await firstValueFrom(this.api.pacientePorRut(this.rut));
      if (p) {
        this.pacienteExiste = true;
        this.error = 'Este paciente ya está registrado.';
        return;
      }
    } catch {
      // ok, no existe
    }

    // 2) buscar si existe usuario con ese rut (para autocompletar)
    try {
      const u = await firstValueFrom(this.api.usuarioPorRut(this.rut));
      this.usuario = u;

      this.form.nombre = u.nombre ?? '';
      this.form.apellido = u.apellido ?? '';
      this.form.email = u.email ?? '';
    } catch {
      this.usuario = null;
      this.resetForm();
    }
  }

  get lockBasicFields(): boolean {
    return !!this.usuario;
  }

  async submit(e: Event) {
    e.preventDefault();
    if (this.pacienteExiste) return;

    this.error = '';

    try {
      const payload = {
        rut: this.rut,
        nombre: this.form.nombre,
        apellido: this.form.apellido,
        email: this.form.email,
        telefono: this.form.telefono,
        direccion: this.form.direccion,
        prevision: this.form.prevision,
        usuarioId: this.usuario ? this.usuario.idUsuario : null,
      };

      await firstValueFrom(this.api.crearPaciente(payload));
      alert('Paciente registrado correctamente.');
      this.router.navigateByUrl('/secretaria/panel');
    } catch (err: any) {
      this.error = err?.error?.detail ?? 'No se pudo registrar el paciente.';
    }
  }
}
