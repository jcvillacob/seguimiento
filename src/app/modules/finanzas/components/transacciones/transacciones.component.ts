import { CommonModule } from '@angular/common';
import { Component, effect, HostListener } from '@angular/core';
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
  saldoActual!: number;
  transactions: any[] = [];
  transactionsGroupedByDate: { date: string, transactions: any[], subtotal: number }[] = [];
  activeTransactionMenu: number | null = null;

  constructor(private finanzasService: FinanzasService) {
    effect(() => {
      const text = this.monthYear();
      this.getTransactions(text);
    });
  }

  getTransactions(monthYear: string) {
    this.finanzasService.getTransaccionesMes(monthYear).subscribe((data: any) => {
      this.transactions = data.transacciones;
      this.gastosMes = data.gastos;
      this.ingresosMes = data.ingresos;
      this.balanceMes = data.balance;
      this.saldoActual = data.saldoActual;
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

  getMontoColor(transaction: any): string {
    return transaction.Tipo === 'Ingreso' ? 'green' : 'red';
  }

  toggleTransactionMenu(transaccionID: number) {
    this.activeTransactionMenu = this.activeTransactionMenu === transaccionID ? null : transaccionID;
    console.log('activeTransactionMenu:', this.activeTransactionMenu);
  }

  editTransaction(transaction: any) {
    console.log('Edit transaction:', transaction);
    // Lógica para editar la transacción
  }

  deleteTransaction(transaccionID: number) {
    console.log('Delete transaction:', transaccionID);
    // Lógica para eliminar la transacción
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.transactions__menu')) {
      this.activeTransactionMenu = null;
    }
  }
}
