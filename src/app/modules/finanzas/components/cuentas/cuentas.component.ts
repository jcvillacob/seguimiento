import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export class CuentasComponent {
  counts = [
    {name: 'Nequi', img: 'banks/nequi.jpg', balance: 25000},
    {name: 'Bancolombia', img: 'banks/bancolombia.jpg', balance: 25000},
    {name: 'Banco de Occidente', img: 'banks/occidente.jpg', balance: 25000},
    {name: 'Banco de Bogotá', img: 'banks/bogota.png', balance: 25000},
    {name: 'Banco Davivienda', img: 'banks/davivienda.png', balance: 25000},
    {name: 'Daviplata', img: 'banks/daviplata.png', balance: 25000},
    {name: 'Banco Popular', img: 'banks/popular.png', balance: 25000},
    {name: 'Banco BBVA', img: 'banks/bbva.png', balance: 25000}
  ];
  activo = -1;

  menuSetting(i: number) {
    this.activo = i;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.title__setting')) {
      this.activo = -1;
    }
  }

  
}
