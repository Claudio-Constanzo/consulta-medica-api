// src/app/pages/registro/registro.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


// Validador para el RUT
export function rutValidator(control: AbstractControl): ValidationErrors | null {
  const rut = control.value;
  
  if (!rut || rut.length < 8) {
    return { rutInvalido: true };
  }
  
  const regex = /^\d{7,8}-[\dkK]$/; 
  if (!regex.test(rut)) {
    return { rutFormatoInvalido: true };
  }
  return null;
}

// Validador para la Fecha de Nacimiento (Rango de Edad)
export function fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
  const fechaStr = control.value;

  if (!fechaStr) {
    return null; 
  }

  const fechaNacimiento = new Date(fechaStr);
  const hoy = new Date();
  
  // 1. Validar que no sea una fecha futura
  if (fechaNacimiento > hoy) {
    return { fechaFutura: true };
  }

  // 2. Validar edad máxima (No mayor de 120 años)
  const maxAnios = 120;
  const fechaLimite = new Date();
  fechaLimite.setFullYear(hoy.getFullYear() - maxAnios); 
  
  if (fechaNacimiento < fechaLimite) {
    return { edadExcesiva: true };
  }

  return null;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false; 

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService 
  ) {
    this.form = this.fb.group({
      rut: ['', [Validators.required, rutValidator]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', [
        Validators.required, 
        fechaNacimientoValidator 
      ]],
    });
  }

  ngOnInit(): void {
    // Si ya está logueado, redirigir
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.successMsg = '¡Registro exitoso! Redirigiendo...';
          this.loading = false;
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          // Manejo de errores detallado de la API
          this.errorMsg = err.error?.message || 'Error en el registro. Verifique la conexión o intente con otros datos.';
          this.loading = false;
          this.successMsg = '';
        }
      });

    } else {
      this.errorMsg = 'Por favor, completa todos los campos correctamente.';
      this.loading = false;
    }
  }
  
  get f() {
    return this.form.controls;
  }
}