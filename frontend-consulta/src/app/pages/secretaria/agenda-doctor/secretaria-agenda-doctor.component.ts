import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-secretaria-agenda-doctor',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './secretaria-agenda-doctor.component.html',
})
export class SecretariaAgendaDoctorComponent {
  fecha = '';
  agenda: any[] = [];

  constructor(private router: Router, private api: ApiService) {}

  volver() {
    this.router.navigateByUrl('/secretaria/panel');
  }

  async buscar() {
    if (!this.fecha) return;

    try {
      this.agenda = await firstValueFrom(this.api.agendaDoctor(this.fecha));
    } catch {
      alert('No se pudo cargar la agenda.');
      this.agenda = [];
    }
  }

  async cancelar(idHora: number) {
    if (!confirm('¿Cancelar esta hora?')) return;

    try {
      await firstValueFrom(this.api.cancelarHora(idHora));
      alert('Hora cancelada');
      await this.buscar();
    } catch {
      alert('No se pudo cancelar');
    }
  }
}
