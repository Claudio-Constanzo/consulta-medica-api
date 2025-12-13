import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

function todayChile(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());
}

@Component({
  selector: 'app-doctor-agenda',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './doctor-agenda.component.html',
})
export class DoctorAgendaComponent {
  fecha = todayChile();
  agenda: any[] = [];
  loading = false;

  constructor(private router: Router, private api: ApiService) {
    this.buscar();
  }

  volver() {
    this.router.navigateByUrl('/doctor/panel');
  }

  async buscar() {
    if (!this.fecha) return;

    this.loading = true;
    try {
      this.agenda = await firstValueFrom(this.api.agendaDoctor(this.fecha));
    } catch {
      alert('No se pudo cargar la agenda.');
      this.agenda = [];
    } finally {
      this.loading = false;
    }
  }
}
