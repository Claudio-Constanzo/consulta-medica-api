import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-doctor-pacientes',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './doctor-pacientes.component.html',
})
export class DoctorPacientesComponent implements OnInit {
  pacientes: any[] = [];
  search = '';
  loading = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.cargar();
  }

  volver() {
    this.router.navigateByUrl('/doctor/panel');
  }

  async cargar() {
    this.loading = true;
    try {
      this.pacientes = await firstValueFrom(this.api.pacientes());
    } catch {
      alert('No se pudieron cargar pacientes.');
      this.pacientes = [];
    } finally {
      this.loading = false;
    }
  }

  get filtered() {
    const s = this.search.toLowerCase();
    return this.pacientes.filter((p) =>
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(s)
    );
  }
}
