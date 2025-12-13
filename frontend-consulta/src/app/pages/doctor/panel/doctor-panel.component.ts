import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-panel',
  standalone: true,
  templateUrl: './doctor-panel.component.html',
})
export class DoctorPanelComponent {
  nombre = localStorage.getItem('userName') || '';
  apellido = localStorage.getItem('userApellido') || '';

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}
