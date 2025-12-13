import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-doctor-crear-ficha',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './doctor-crear-ficha.component.html',
})
export class DoctorCrearFichaComponent {
  rut = '';
  paciente: any = null;

  titulo = '';
  notas = '';
  loading = false;

  constructor(private router: Router, private api: ApiService) {}

  volver() {
    this.router.navigateByUrl('/doctor/fichas');
  }

  async buscarPaciente() {
    if (!this.rut.trim()) return alert('Ingresa un RUT');

    this.loading = true;
    try {
      this.paciente = await firstValueFrom(this.api.pacientePorRut(this.rut));
      alert('Paciente encontrado');
    } catch {
      this.paciente = null;
      alert('Paciente no encontrado');
    } finally {
      this.loading = false;
    }
  }

  async guardarFicha() {
    if (!this.paciente) return alert('Debes buscar un paciente válido');
    if (!this.titulo.trim()) return alert('Debes ingresar un título');

    try {
      await firstValueFrom(this.api.crearFicha({
        rut_paciente: this.paciente.rut,
        titulo: this.titulo,
        notas: this.notas,
      }));

      alert('Ficha creada correctamente');
      this.router.navigateByUrl('/doctor/fichas');
    } catch (err: any) {
      alert(err?.error?.detail ?? 'No se pudo crear la ficha');
    }
  }
}
