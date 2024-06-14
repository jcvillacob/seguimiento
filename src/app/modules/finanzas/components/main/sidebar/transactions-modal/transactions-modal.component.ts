import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal } from '@angular/core';
import { FinanzasService } from '../../../../services/finanzas.service';

export const transactionsModal = signal('close');

@Component({
  selector: 'app-transactions-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-modal.component.html',
  styleUrl: './transactions-modal.component.scss'
})
export class TransactionsModalComponent {
  transactionsModal = transactionsModal;
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
  activo = -1;

  /* para crear Cuenta */
  bancoSelected = this.banks[0];
  verBanco = false;


  constructor(private finanzasService: FinanzasService) {
  }

  toggleModal() {
    this.transactionsModal.set('close');
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
