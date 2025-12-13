import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secretaria-panel',
  standalone: true,
  templateUrl: './secretaria-panel.component.html',
})
export class SecretariaPanelComponent {
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
