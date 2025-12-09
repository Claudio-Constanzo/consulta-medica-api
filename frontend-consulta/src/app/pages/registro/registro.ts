import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  form: FormGroup;
  errorMsg: string | null = null;
  successMsg: string | null = null;
  loading = false;

  roles = ['paciente', 'doctor', 'secretaria'];

  constructor(private api: ApiService, private router: Router) {
    this.form = new FormGroup({
      rut: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required]),
      rol: new FormControl('paciente', [Validators.required])
    });
  }

  onSubmit() {
    this.errorMsg = null;
    this.successMsg = null;

    if (this.form.invalid) {
      this.errorMsg = 'Revisa los campos del formulario.';
      this.form.markAllAsTouched();
      return;
    }

    const { rut, nombre, email, password, password2, rol } = this.form.value;

    if (password !== password2) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    const payload = {
      rut,
      nombre,
      email,
      password,
      rol
    };

    this.loading = true;

    this.api.registerUser(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Usuario creado correctamente. Ahora puedes iniciar sesión.';
        // opcional: redirigir al login después de unos segundos
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMsg = 'No se pudo registrar el usuario (revisa la API).';
      }
    });
  }
}
