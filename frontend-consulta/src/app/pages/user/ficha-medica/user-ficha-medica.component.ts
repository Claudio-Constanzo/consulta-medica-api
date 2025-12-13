import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-ficha-medica',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-ficha-medica.component.html',
})
export class UserFichaMedicaComponent implements OnInit {
  usuarioId = Number(localStorage.getItem('idUsuario') || 0);
  fichas: any[] = [];

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() { this.cargar(); }
  volver() { this.router.navigateByUrl('/user/dashboard'); }

  async cargar() {
    try {
      this.fichas = await firstValueFrom(this.api.fichasUsuario(this.usuarioId));
    } catch {
      alert('No se pudieron cargar las fichas.');
    }
  }
}
