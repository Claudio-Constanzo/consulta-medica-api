import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent {
  nombre = localStorage.getItem('userName') || 'Paciente';
  apellido = localStorage.getItem('userApellido') || '';

  constructor(private router: Router) {}

  go(path: string) { this.router.navigateByUrl(path); }
  logout() { localStorage.clear(); this.router.navigateByUrl('/login'); }
}
