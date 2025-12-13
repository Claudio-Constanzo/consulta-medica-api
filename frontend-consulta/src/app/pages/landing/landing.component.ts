import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

type Servicio = { titulo: string; desc: string };

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  servicios: Servicio[] = [
    { titulo: 'Enfermedades del oído', desc: 'Diagnóstico y tratamiento de infecciones, pérdida auditiva, vértigo y tinnitus.' },
    { titulo: 'Patologías nasales y sinusales', desc: 'Atención de rinitis, sinusitis y desviación del tabique.' },
    { titulo: 'Trastornos de la voz y la laringe', desc: 'Manejo de disfonías, nódulos y alteraciones vocales.' },
    { titulo: 'Otorrinolaringología pediátrica', desc: 'Patologías de oídos, adenoides, amígdalas y problemas respiratorios.' },
    { titulo: 'Trastornos del sueño', desc: 'Tratamiento del ronquido y apnea del sueño.' },
  ];

  i = 0;

  constructor(private router: Router) {}

  irLogin() { this.router.navigateByUrl('/login'); }
  next() { this.i = (this.i + 1) % this.servicios.length; }
  prev() { this.i = (this.i - 1 + this.servicios.length) % this.servicios.length; }
  go(k: number) { this.i = k; }

  scrollTo(id: string) {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }
}
