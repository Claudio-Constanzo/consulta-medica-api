import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  rut: string = '';
  password: string = '';

  errorMsg: string | null = null;
  loading: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMsg = null;

    if (!this.rut || !this.password) {
      this.errorMsg = 'Debes ingresar RUT y contraseña.';
      return;
    }

    this.loading = true;

    this.api.login(this.rut, this.password).subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp.access);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMsg = 'RUT o contraseña incorrectos.';
      }
    });
  }
}
