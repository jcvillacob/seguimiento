import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-credito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-crear-credito.component.html',
  styleUrls: ['./modal-crear-credito.component.scss']
})
export class ModalCrearCreditoComponent {
  @Output() botonCerrar: EventEmitter<void> = new EventEmitter();
  creditoForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.creditoForm = this.fb.group({
      entidad: ['', Validators.required],
      observacion: [''],
      montoCapital: [0, [Validators.required, Validators.min(0)]],
      montoIntereses: [0, [Validators.required, Validators.min(0)]],
      tasaInteres: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      tipoCredito: ['', Validators.required],
      fecha: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaUltimoPago: ['', Validators.required],
      estatus: ['', Validators.required],
    });
  }

  cerrar() {
    this.botonCerrar.emit();
  }

  onSubmit() {
    if (this.creditoForm.valid) {
      // Procesa los datos del formulario
      console.log(this.creditoForm.value);
      // Aquí puedes agregar lógica para enviar los datos al servidor o manejar según necesites
      this.cerrar();
    } else {
      // Marca todos los campos como tocados para mostrar validaciones
      this.creditoForm.markAllAsTouched();
    }
  }

  // Métodos para establecer fechas rápidas
  setToday(controlName: string) {
    const today = new Date().toISOString().split('T')[0];
    this.creditoForm.get(controlName)?.setValue(today);
  }

  setYesterday(controlName: string) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    this.creditoForm.get(controlName)?.setValue(yesterday);
  }
}
