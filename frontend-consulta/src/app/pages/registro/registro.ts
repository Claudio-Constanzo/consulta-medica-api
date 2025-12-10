import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

// Validador de RUT (formato + dígito verificador)
export function rutValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value) return null;

  // Limpia puntos y guión
  const rutLimpio = value.replace(/\./g, '').replace(/-/g, '');

  if (rutLimpio.length < 8) {
    return { rutInvalido: true };
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  if (!/^\d+$/.test(cuerpo)) {
    return { rutInvalido: true };
  }

  // Cálculo DV (módulo 11)
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  let dvCalculado: string;

  if (resto === 11) dvCalculado = '0';
  else if (resto === 10) dvCalculado = 'K';
  else dvCalculado = resto.toString();

  return dv === dvCalculado ? null : { rutInvalido: true };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro.html',   
  styleUrls: ['./registro.css'],    
})
export class RegistroComponent {
  form: FormGroup;
  errorMsg: string | null = null;
  successMsg: string | null = null;
  loading = false;

  roles = ['paciente', 'doctor', 'secretaria'];

constructor(private api: ApiService, private router: Router) {
  this.form = new FormGroup({
    rut: new FormControl('', [
      Validators.required,
      rutValidator   
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password2: new FormControl('', [Validators.required]),
    rol: new FormControl('paciente', [Validators.required]),
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

    const payload = { rut, nombre, email, password, rol };

    this.loading = true;

    this.api.registerUser(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg =
          'Usuario creado correctamente. Ahora puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMsg = 'No se pudo registrar el usuario (revisa la API).';
      },
    });
  }
}
