import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-encabezados',
  standalone: true,
  imports: [],
  templateUrl: './encabezados.component.html',
  styleUrl: './encabezados.component.scss'
})
export class EncabezadosComponent {
  @Input() nombre!: string;
  @Output() botonMas: EventEmitter<string> = new EventEmitter();
  @Output() botonInfo: EventEmitter<string> = new EventEmitter();

  presionarMas() {
    this.botonMas.emit('Botón mas presionado');
  }

  presionarInfo() {
    this.botonInfo.emit('Botón info presionado');
  }

}
