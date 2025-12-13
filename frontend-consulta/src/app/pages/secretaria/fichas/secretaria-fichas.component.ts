import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-secretaria-fichas',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './secretaria-fichas.component.html',
})
export class SecretariaFichasComponent implements OnInit {
  fichas: any[] = [];
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
      this.fichas = await firstValueFrom(this.api.fichas());
    } catch {
      alert('No se pudieron cargar fichas.');
      this.fichas = [];
    }
  }

  get filtered() {
    const s = this.search.toLowerCase();
    return this.fichas.filter((f) =>
      `${f.titulo} ${f.nombre_paciente} ${f.apellido_paciente}`.toLowerCase().includes(s)
    );
  }

  ver(id: number) {
    this.router.navigateByUrl(`/secretaria/fichas/${id}`);
  }
}
