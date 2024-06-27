import { CommonModule } from '@angular/common';
import { Component, effect, HostListener } from '@angular/core';
import { transactionsModal, transactionsModalEdit } from '../main/sidebar/transactions-modal/transactions-modal.component';
import { FinanzasService } from '../../services/finanzas.service';
import { monthYear } from '../main/main.component';
import { transaccionesMes } from '../dashboard/dashboard.component';
import { toastSignal } from '../../../../shared/components/toast/toast.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent {
  transactionsModal = transactionsModal;
  transaccionesMes = transaccionesMes;
  transactionsModalEdit = transactionsModalEdit;
  monthYear = monthYear;
  monthYears = '';
  toastSignal = toastSignal;
  balanceMes!: number;
  gastosMes!: number;
  ingresosMes!: number;
  saldoActual!: number;
  transactions: any[] = [];
  transactionsGroupedByDate: { date: string, transactions: any[], subtotal: number }[] = [];
  activeTransactionMenu: number | null = null;

  constructor(private finanzasService: FinanzasService) {
    effect(() => {
      const data: any = this.transaccionesMes();
      const monthYear: any = this.monthYear();
      if(this.monthYears != monthYear) {
        this.getTransactions(monthYear);
      }
      if (data.transacciones) {
        this.transactions = data.transacciones;
        this.gastosMes = data.gastos;
        this.ingresosMes = data.ingresos;
        this.balanceMes = data.balance;
        this.saldoActual = data.saldoActual;
        this.groupTransactionsByDate();
      }
    });
  }

  getTransactions(monthYear: string) {
    this.finanzasService.getTransaccionesMes(monthYear).subscribe((data: any) => {
      this.transaccionesMes.set(data);
      this.monthYears = monthYear;
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
  }

  editTransaction(transaction: any) {
    this.transactionsModalEdit.set(transaction);
    this.transactionsModal.set(transaction.Tipo);
  }

  deleteTransaction(transaccionID: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se eliminará completamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.finanzasService.deleteTransaccion(transaccionID).subscribe(data => {
          this.toastSignal.set('Transferencia Eliminada Correctamente.');
          const text = this.monthYear();
          this.finanzasService.getTransaccionesMes(text).subscribe((data: any) => {
            this.transaccionesMes.set(data);
          })
        })
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.transactions__menu')) {
      this.activeTransactionMenu = null;
    }
  }
}
