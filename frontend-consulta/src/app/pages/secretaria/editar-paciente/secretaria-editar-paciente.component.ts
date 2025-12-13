import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-secretaria-editar-paciente',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './secretaria-editar-paciente.component.html',
})
export class SecretariaEditarPacienteComponent implements OnInit {
  rut = '';
  paciente: any = null;


  campos = ['nombre', 'apellido', 'email', 'direccion', 'telefono', 'prevision'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.rut = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargar();
  }

  volver() {
    this.router.navigateByUrl('/secretaria/pacientes');
  }

  async cargar() {
    try {
      this.paciente = await firstValueFrom(this.api.pacientePorRut(this.rut));
    } catch {
      alert('No se pudo cargar el paciente.');
      this.paciente = null;
    }
  }

  async guardar() {
    try {
      await firstValueFrom(this.api.editarPaciente(this.rut, this.paciente));
      alert('Paciente actualizado correctamente');
      this.router.navigateByUrl('/secretaria/pacientes');
    } catch (err: any) {
      alert(err?.error?.detail ?? 'Error actualizando paciente');
    }
  }
}
