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
  banks = [
    {name: 'Efecivo', img: 'banks/efectivo.avif'},
    {name: 'Nequi', img: 'banks/nequi.jpg'},
    {name: 'Bancolombia', img: 'banks/bancolombia.jpg'},
    {name: 'Banco de Occidente', img: 'banks/occidente.jpg'},
    {name: 'Banco de Bogotá', img: 'banks/bogota.png'},
    {name: 'Banco Davivienda', img: 'banks/davivienda.png'},
    {name: 'Daviplata', img: 'banks/daviplata.png'},
    {name: 'Banco Popular', img: 'banks/popular.png'},
    {name: 'Banco BBVA', img: 'banks/bbva.png'},
    {name: 'Banco AV Villas', img: 'banks/av villas.jpg'},
    {name: 'Colpatria', img: 'banks/colpatria.jpg'},
    {name: 'RappiPay', img: 'banks/rappi.jpg'},
    {name: 'MOVII', img: 'banks/movii.png'}
  ];
  counts = [
    {name: 'Efecivo', img: 'banks/efectivo.avif', balance: 25000},
    {name: 'Nequi', img: 'banks/nequi.jpg', balance: 25000},
    {name: 'Bancolombia', img: 'banks/bancolombia.jpg', balance: 25000},
    {name: 'Banco Davivienda', img: 'banks/davivienda.png', balance: 25000},
    {name: 'Daviplata', img: 'banks/daviplata.png', balance: 25000},
  ];
  activo = -1;

  /* para crear Cuenta */
  modal = false;
  bancoSelected = this.banks[0];
  verBanco = false;

  menuSetting(i: number) {
    this.activo = i;
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  verBancos() {
    this.verBanco = !this.verBanco;
  }

  seleccionarBanco(i: number) {
    this.bancoSelected = this.banks[i];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.title__setting')) {
      this.activo = -1;
    }
    if (!clickedElement.closest('.lista__selected')) {
      this.verBanco = false;
    }
  }


}
