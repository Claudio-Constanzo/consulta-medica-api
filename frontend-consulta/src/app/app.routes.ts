import { Routes } from '@angular/router';

// Public
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// User
import { UserDashboardComponent } from './pages/user/dashboard/user-dashboard.component';
import { UserCitasComponent } from './pages/user/citas/user-citas.component';
import { UserAgendarHoraComponent } from './pages/user/agendar/user-agendar-hora.component';
import { UserFichaMedicaComponent } from './pages/user/ficha-medica/user-ficha-medica.component';

// Secretaria
import { SecretariaPanelComponent } from './pages/secretaria/panel/secretaria-panel.component';
import { SecretariaPacientesComponent } from './pages/secretaria/pacientes/secretaria-pacientes.component';
import { SecretariaEditarPacienteComponent } from './pages/secretaria/editar-paciente/secretaria-editar-paciente.component';
import { SecretariaRegistrarPacienteComponent } from './pages/secretaria/registrar/secretaria-registrar-paciente.component';
import { SecretariaFichasComponent } from './pages/secretaria/fichas/secretaria-fichas.component';
import { SecretariaFichaDetalleComponent } from './pages/secretaria/ficha-detalle/secretaria-ficha-detalle.component';
import { SecretariaAgendarHoraComponent } from './pages/secretaria/agendar/secretaria-agendar-hora.component';
import { SecretariaAgendaDoctorComponent } from './pages/secretaria/agenda-doctor/secretaria-agenda-doctor.component';

// Doctor
import { DoctorPanelComponent } from './pages/doctor/panel/doctor-panel.component';
import { DoctorAgendaComponent } from './pages/doctor/agenda/doctor-agenda.component';
import { DoctorFichasComponent } from './pages/doctor/fichas/doctor-fichas.component';
import { DoctorCrearFichaComponent } from './pages/doctor/crear-ficha/doctor-crear-ficha.component';
import { DoctorPacientesComponent } from './pages/doctor/pacientes/doctor-pacientes.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'user/dashboard', component: UserDashboardComponent },
  { path: 'user/citas', component: UserCitasComponent },
  { path: 'user/agendar', component: UserAgendarHoraComponent },
  { path: 'user/ficha-medica', component: UserFichaMedicaComponent },

  { path: 'secretaria/panel', component: SecretariaPanelComponent },
  { path: 'secretaria/pacientes', component: SecretariaPacientesComponent },
  { path: 'secretaria/pacientes/:id', component: SecretariaEditarPacienteComponent },
  { path: 'secretaria/registrar', component: SecretariaRegistrarPacienteComponent },
  { path: 'secretaria/fichas', component: SecretariaFichasComponent },
  { path: 'secretaria/fichas/:id', component: SecretariaFichaDetalleComponent },
  { path: 'secretaria/agendar', component: SecretariaAgendarHoraComponent },
  { path: 'secretaria/agenda-doctor', component: SecretariaAgendaDoctorComponent },

  { path: 'doctor/panel', component: DoctorPanelComponent },
  { path: 'doctor/agenda', component: DoctorAgendaComponent },
  { path: 'doctor/fichas', component: DoctorFichasComponent },
  { path: 'doctor/fichas/crear', component: DoctorCrearFichaComponent },
  { path: 'doctor/pacientes', component: DoctorPacientesComponent },

  { path: '**', redirectTo: '' },
];

