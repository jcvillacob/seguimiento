import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { transactionsModal } from '../main/sidebar/transactions-modal/transactions-modal.component';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent {
  transactionsModal = transactionsModal;
  transactions: any[] = [];
  transactionsGroupedByDate: { date: string, transactions: any[], subtotal: number }[] = [];
  counts = [
    { name: 'Efectivo', img: 'banks/efectivo.avif', balance: 25000 },
    { name: 'Nequi', img: 'banks/nequi.jpg', balance: 25000 },
    { name: 'Bancolombia', img: 'banks/bancolombia.jpg', balance: 25000 },
    { name: 'Banco Davivienda', img: 'banks/davivienda.png', balance: 25000 },
    { name: 'Daviplata', img: 'banks/daviplata.png', balance: 25000 },
  ];

  constructor(private finanzasService: FinanzasService) {
    this.finanzasService.getTransaccionByUser().subscribe(data => {
      this.transactions = data;
      this.groupTransactionsByDate();
    });
  }

  transactionsModals() {
    this.transactionsModal.set('Gasto');
  }

  groupTransactionsByDate() {
    const grouped = this.transactions.reduce((acc, transaction) => {
      const date = transaction.Fecha.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});

    this.transactionsGroupedByDate = Object.keys(grouped).map(date => {
      const transactions = grouped[date];
      const subtotal = transactions.reduce((sum: any, transaction: any) => sum + transaction.Monto, 0);
      return { date, transactions, subtotal };
    });
  }

  calculateIngresos(): number {
    return this.transactions
      .filter(transaction => transaction.Tipo === 'Ingreso')
      .reduce((acc, transaction) => acc + transaction.Monto, 0);
  }

  calculateGastos(): number {
    return this.transactions
      .filter(transaction => transaction.Tipo === 'Gasto')
      .reduce((acc, transaction) => acc + transaction.Monto, 0);
  }

  calculateBalance(): number {
    return this.calculateIngresos() - this.calculateGastos();
  }

  calculateBalanceMes(): number {
    const ingresosMes = this.transactions
      .filter(transaction => transaction.Tipo === 'Ingreso' && new Date(transaction.Fecha).getMonth() === new Date().getMonth())
      .reduce((acc, transaction) => acc + transaction.Monto, 0);

    const gastosMes = this.transactions
      .filter(transaction => transaction.Tipo === 'Gasto' && new Date(transaction.Fecha).getMonth() === new Date().getMonth())
      .reduce((acc, transaction) => acc + transaction.Monto, 0);

    return ingresosMes - gastosMes;
  }

  getMontoColor(transaction: any): string {
    return transaction.Tipo === 'Ingreso' ? 'green' : 'red';
  }
}
