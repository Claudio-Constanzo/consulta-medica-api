import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  consultas: any[] = [];
  errorMsg: string | null = null;
  loading: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarConsultas();
  }

  cargarConsultas() {
    this.loading = true;
    this.errorMsg = null;

    this.api.getConsultas().subscribe({
      next: (data) => {
        this.consultas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMsg = 'No se pudieron cargar las consultas (¿API caída o sin token?).';
      }
    });
  }
}
