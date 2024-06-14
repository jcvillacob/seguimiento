import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { transactionsModal } from '../main/sidebar/transactions-modal/transactions-modal.component';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.scss'
})
export class TransaccionesComponent {
  transactionsModal = transactionsModal;
  counts = [
    {name: 'Efecivo', img: 'banks/efectivo.avif', balance: 25000},
    {name: 'Nequi', img: 'banks/nequi.jpg', balance: 25000},
    {name: 'Bancolombia', img: 'banks/bancolombia.jpg', balance: 25000},
    {name: 'Banco Davivienda', img: 'banks/davivienda.png', balance: 25000},
    {name: 'Daviplata', img: 'banks/daviplata.png', balance: 25000},
  ];

  transactionsModals() {
    this.transactionsModal.set('gasto');
  }

}
