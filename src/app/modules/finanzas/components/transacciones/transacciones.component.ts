import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { transactionsModal } from '../main/sidebar/transactions-modal/transactions-modal.component';
import { FinanzasService } from '../../services/finanzas.service';
import { monthYear } from '../main/main.component';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent {
  transactionsModal = transactionsModal;
  monthYear = monthYear;
  balanceMes!: number;
  gastosMes!: number;
  ingresosMes!: number;
  transactions: any[] = [];
  transactionsGroupedByDate: { date: string, transactions: any[], subtotal: number }[] = [];

  constructor(private finanzasService: FinanzasService) {
    effect(() => {
      const text = this.monthYear();
      this.getTransactions(text);
    });
  }

  getTransactions(monthYear: string) {
    this.finanzasService.getTransaccionesMes(monthYear).subscribe((data: any) => {
      console.log(data);
      this.transactions = data.transacciones;
      this.gastosMes = data.gastos;
      this.ingresosMes = data.ingresos;
      this.balanceMes = data.balance;
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
      const subtotal = transactions.reduce((sum: any, transaction: any) => {
        let monto;
        monto = transaction.Tipo == 'Ingreso' ? transaction.Monto : -transaction.Monto;
        return sum + monto
      }, 0);
      return { date, transactions, subtotal };
    });
  }

/* 
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
 */
  
  getMontoColor(transaction: any): string {
    return transaction.Tipo === 'Ingreso' ? 'green' : 'red';
  }
}
