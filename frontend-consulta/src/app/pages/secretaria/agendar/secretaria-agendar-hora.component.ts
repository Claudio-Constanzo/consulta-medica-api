import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-secretaria-agendar-hora',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './secretaria-agendar-hora.component.html',
})
export class SecretariaAgendarHoraComponent {
  rut = '';
  paciente: any = null;

  fecha = '';
  horasDisponibles: string[] = [];
  horaSeleccionada = '';

  constructor(private router: Router, private api: ApiService) {}

  volver() {
    this.router.navigateByUrl('/secretaria/panel');
  }

  minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private bloques30(inicio: Date, fin: Date): string[] {
    const out: string[] = [];
    let t = new Date(inicio);
    while (t < fin) {
      out.push(t.toTimeString().slice(0, 5));
      t = new Date(t.getTime() + 30 * 60000);
    }
    return out;
  }

  private generarHoras(fechaStr: string): string[] {
    const d = new Date(`${fechaStr}T00:00`);
    const dia = d.getDay(); // 0 dom ... 6 sáb

    if (dia === 0 || dia === 6) return [];

    if (dia >= 1 && dia <= 4) {
      return [
        ...this.bloques30(new Date(`${fechaStr}T10:30`), new Date(`${fechaStr}T13:00`)),
        ...this.bloques30(new Date(`${fechaStr}T15:00`), new Date(`${fechaStr}T19:00`)),
      ];
    }

    // viernes
    return this.bloques30(new Date(`${fechaStr}T10:30`), new Date(`${fechaStr}T13:00`));
  }

  horaFinal(h: string): string {
    const [hh, mm] = h.split(':').map(Number);
    const d = new Date();
    d.setHours(hh, mm + 30, 0, 0);
    return d.toTimeString().slice(0, 5);
  }

  async buscarPaciente() {
    try {
      this.paciente = await firstValueFrom(this.api.pacientePorRut(this.rut));
      alert('Paciente encontrado');
    } catch {
      this.paciente = null;
      alert('Paciente no encontrado');
    }
  }

  async changeFecha(v: string) {
    this.fecha = v;
    this.horaSeleccionada = '';
    await this.cargarHoras();
  }

  async cargarHoras() {
    if (!this.fecha) return;

    const bloques = this.generarHoras(this.fecha);
    if (bloques.length === 0) {
      this.horasDisponibles = [];
      return;
    }

    try {
      const agenda = await firstValueFrom(this.api.agendaDoctor(this.fecha));

      const disponibles = bloques.filter((b) => {
        return !(agenda ?? []).some((c: any) => String(c.hora_inicio ?? '').startsWith(b));
      });

      this.horasDisponibles = disponibles;
    } catch {
      // si falla la agenda, al menos mostramos bloques
      this.horasDisponibles = bloques;
    }
  }

  async guardarCita() {
    if (!this.paciente || !this.fecha || !this.horaSeleccionada) {
      return alert('Debe completar todos los campos');
    }

    try {
      await firstValueFrom(this.api.agendarHora({
        paciente_id: this.paciente.id_paciente,
        fecha: this.fecha,
        hora_inicio: this.horaSeleccionada,
        hora_final: this.horaFinal(this.horaSeleccionada),
      }));

      alert('Cita agendada correctamente');
      this.router.navigateByUrl('/secretaria/agenda-doctor');
    } catch (err: any) {
      alert(err?.error?.detail ?? 'Error al agendar cita');
    }
  }
}
