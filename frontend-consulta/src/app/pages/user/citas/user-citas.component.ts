import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-citas',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-citas.component.html',
})
export class UserCitasComponent implements OnInit {
  citas: any[] = [];
  usuarioId = Number(localStorage.getItem('idUsuario') || 0);

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() { this.cargar(); }
  volver() { this.router.navigateByUrl('/user/dashboard'); }

  async cargar() {
    try {
      this.citas = await firstValueFrom(this.api.horasUsuario(this.usuarioId));
    } catch {
      alert('No se pudieron cargar las citas.');
    }
  }

  async cancelar(id: number) {
    if (!confirm('¿Cancelar cita?')) return;
    try {
      await firstValueFrom(this.api.cancelarHora(id));
      alert('Cita cancelada');
      await this.cargar();
    } catch {
      alert('Error al cancelar');
    }
  }
}

