import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-agendar-hora',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './user-agendar-hora.component.html',
})
export class UserAgendarHoraComponent implements OnInit {
  pacienteId = Number(localStorage.getItem('pacienteId') || 0);
  fecha = this.todayChile();
  horas: string[] = [];
  selected = '';
  loading = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() { this.fetchHoras(); }
  volver() { this.router.navigateByUrl('/user/dashboard'); }

  todayChile(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());
  }

  horaFinal(h: string): string {
    const [hh, mm] = h.split(':').map(Number);
    const d = new Date(); d.setHours(hh, mm + 30, 0, 0);
    return d.toTimeString().slice(0, 5);
  }

  async changeFecha(v: string) {
    this.fecha = v;
    await this.fetchHoras();
  }

  async fetchHoras() {
    this.loading = true;
    try {
      const res = await firstValueFrom(this.api.horasOcupadas(this.fecha));
      const ocupadas = res?.ocupadas ?? [];

      const all: string[] = [];
      for (let h = 8; h < 18; h++) {
        all.push(`${String(h).padStart(2,'0')}:00`);
        all.push(`${String(h).padStart(2,'0')}:30`);
      }
      this.horas = all.filter(x => !ocupadas.includes(`${x}:00`));
      this.selected = '';
    } catch {
      this.horas = [];
    } finally {
      this.loading = false;
    }
  }

  async reservar() {
    if (!this.pacienteId || !this.fecha || !this.selected) return alert('Completa los datos');

    try {
      await firstValueFrom(this.api.agendarHora({
        fecha: this.fecha,
        hora_inicio: this.selected,
        hora_final: this.horaFinal(this.selected),
        paciente_id: this.pacienteId,
      }));
      alert('Hora agendada');
      this.router.navigateByUrl('/user/citas');
    } catch (err: any) {
      alert(err?.error?.detail ?? 'Error agendando');
    }
  }
}
