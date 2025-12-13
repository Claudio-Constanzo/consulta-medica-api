import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agendar.html',
  styleUrls: ['./agendar.css']
})
export class AgendarComponent implements OnInit {

  form!: FormGroup;
  minDate!: string;              // fecha mínima (hoy) para el input date
  availableSlots: string[] = []; // HH:mm para el select de horas
  validationMsg: string | null = null;
  successMsg: string | null = null;
  errorMsg: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fecha: new FormControl<string>('', Validators.required),
      hora: new FormControl<string>('', Validators.required),
      motivo: new FormControl<string>('', [Validators.required, Validators.minLength(5)])
    });

    // Establecer fecha mínima (hoy)
    const today = new Date();
    this.minDate = this.toDateInputValue(today);
  }

  // Convertir Date a formato 'YYYY-MM-DD' para input[type=date]
  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Cuando cambia la fecha seleccionada
  onDateChange(event: any) {
    const fechaStr = event.target.value as string;
    this.form.patchValue({ hora: '' }); // Limpiar hora
    this.availableSlots = [];
    this.validationMsg = null;

    if (!fechaStr) return;

    const selected = new Date(fechaStr + 'T00:00:00');

    // No permitir días pasados
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      this.validationMsg = 'No se pueden agendar horas en fechas pasadas.';
      return;
    }

    const day = selected.getDay(); // 0=Dom, 1=Lun, ..., 5=Vie, 6=Sáb

    // No permitir fines de semana
    if (day === 0 || day === 6) {
      this.validationMsg = 'No se atiende sábados ni domingos.';
      return;
    }

    // Generar slots según el día
    if (day === 5) {
      // Viernes: solo 09:00–13:00
      this.availableSlots = this.generateSlots(9, 13);
    } else {
      // Lunes–Jueves: 09:00–12:00 y 15:00–18:00
      const morning = this.generateSlots(9, 12);
      const afternoon = this.generateSlots(15, 18);
      this.availableSlots = [...morning, ...afternoon];
    }
  }

  // Generar slots de hora (ejemplo: 09:00, 10:00, ...)
  private generateSlots(startHour: number, endHour: number): string[] {
    const slots: string[] = [];
    for (let h = startHour; h < endHour; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }

  // Método de submit (al hacer click en "Agendar")
  onSubmit() {
    this.successMsg = null;
    this.errorMsg = null;

    if (this.form.invalid) {
      this.errorMsg = 'Completa todos los campos correctamente.';
      this.form.markAllAsTouched();
      return;
    }

    const { fecha, hora, motivo } = this.form.value;

    // Unir fecha y hora en un único string ISO
    const fechaHora = new Date(`${fecha}T${hora}:00`);
    const horaFinal = new Date(fechaHora.getTime() + 60 * 60 * 1000); // +1 hora

    // Payload que se enviará
    const payload = {
      fecha: fecha,
      hora_inicio: hora,
      hora_final: horaFinal.getHours().toString().padStart(2, '0') + ':00',
      paciente_id: 1, // TODO: Obtener desde autenticación
      motivo: motivo,
    };

    // Llamada al backend para crear la consulta
    this.api.agendarHora(payload).subscribe({
      next: () => {
        this.successMsg = 'Hora agendada correctamente.';
        this.form.patchValue({ hora: '', motivo: '' });
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Ocurrió un error al agendar la hora.';
      }
    });
  }
}
