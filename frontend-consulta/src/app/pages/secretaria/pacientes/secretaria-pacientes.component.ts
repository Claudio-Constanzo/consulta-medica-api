import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-secretaria-pacientes',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './secretaria-pacientes.component.html',
})
export class SecretariaPacientesComponent implements OnInit {
  pacientes: any[] = [];
  search = '';

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.cargar();
  }

  volver() {
    this.router.navigateByUrl('/secretaria/panel');
  }

  async cargar() {
    try {
      this.pacientes = await firstValueFrom(this.api.pacientes());
    } catch {
      alert('No se pudieron cargar pacientes.');
      this.pacientes = [];
    }
  }

  get filtered() {
    const s = this.search.toLowerCase();
    return this.pacientes.filter((p) =>
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(s)
    );
  }

  editar(rut: string) {
    this.router.navigateByUrl(`/secretaria/pacientes/${rut}`);
  }
}
