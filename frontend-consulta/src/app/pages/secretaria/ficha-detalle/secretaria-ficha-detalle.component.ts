import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-secretaria-ficha-detalle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './secretaria-ficha-detalle.component.html',
})
export class SecretariaFichaDetalleComponent implements OnInit {
  id = '';
  ficha: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargar();
  }

  volver() {
    this.router.navigateByUrl('/secretaria/fichas');
  }

  async cargar() {
    try {
      this.ficha = await firstValueFrom(this.api.ficha(this.id));
    } catch {
      alert('No se pudo cargar la ficha.');
      this.ficha = null;
    }
  }
}
