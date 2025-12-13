import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-doctor-fichas',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './doctor-fichas.component.html',
})
export class DoctorFichasComponent implements OnInit {
  fichas: any[] = [];
  search = '';
  loading = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.cargar();
  }

  volver() {
    this.router.navigateByUrl('/doctor/panel');
  }

  crear() {
    this.router.navigateByUrl('/doctor/fichas/crear');
  }

  async cargar() {
    this.loading = true;
    try {
      this.fichas = await firstValueFrom(this.api.fichas());
    } catch {
      alert('No se pudieron cargar fichas.');
      this.fichas = [];
    } finally {
      this.loading = false;
    }
  }

  get filtered() {
    const s = this.search.toLowerCase();
    return this.fichas.filter((f) =>
      `${f.nombre_paciente} ${f.apellido_paciente}`.toLowerCase().includes(s)
    );
  }
}
