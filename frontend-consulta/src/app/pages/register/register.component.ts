import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = { nombre: '', apellido: '', rut: '', email: '', password: '', confirm: '' };
  error = '';
  loading = false;

  constructor(private router: Router, private api: ApiService, private auth: AuthService) {}

  async submit(e: Event) {
    e.preventDefault();
    if (this.form.password !== this.form.confirm) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    this.error = '';
    try {
      const data = await firstValueFrom(this.api.register({
        nombre: this.form.nombre,
        apellido: this.form.apellido,
        rut: this.form.rut,
        email: this.form.email,
        password: this.form.password,
      }));
      this.auth.setRegisterData(data);
      this.router.navigateByUrl('/login');
    } catch (err: any) {
      this.error = err?.error?.detail ?? 'No se pudo registrar.';
    } finally {
      this.loading = false;
    }
  }

  goLogin() { this.router.navigateByUrl('/login'); }
  goHome() { this.router.navigateByUrl('/'); }
}
