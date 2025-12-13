import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = { email: '', password: '' };
  error = '';
  loading = false;

  constructor(private router: Router, private api: ApiService, private auth: AuthService) {}

  async submit(e: Event): Promise<void> {
    e.preventDefault();
    this.loading = true;
    this.error = '';

    try {
      const data = await firstValueFrom(this.api.login(this.form));
      this.auth.setLoginData(data);

      const rol = String(data.rol ?? '');

      if (rol === 'secretaria') {
        await this.router.navigateByUrl('/secretaria/panel');
      } else if (rol === 'doctor') {
        await this.router.navigateByUrl('/doctor/panel');
      } else {
        await this.router.navigateByUrl('/user/dashboard');
      }
    } catch (err: any) {
      this.error = err?.error?.detail ?? 'No se pudo iniciar sesión.';
    } finally {
      this.loading = false;
    }
  }

  goRegister(): void {
    this.router.navigateByUrl('/register');
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}

