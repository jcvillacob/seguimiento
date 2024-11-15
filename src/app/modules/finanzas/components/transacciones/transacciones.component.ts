import { CommonModule } from '@angular/common';
import { Component, effect, HostListener } from '@angular/core';
import { transactionsModal, transactionsModalEdit } from '../main/sidebar/transactions-modal/transactions-modal.component';
import { FinanzasService } from '../../services/finanzas.service';
import { monthYear } from '../main/main.component';
import { transaccionesMes } from '../dashboard/dashboard.component';
import { toastSignal } from '../../../../shared/components/toast/toast.component';
import Swal from 'sweetalert2'
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';
import { ResumenesComponent } from '../../../../shared/components/resumenes/resumenes.component';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, EncabezadosComponent, ResumenesComponent, TableComponent],
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
  resumenes: any[] = [];
  transactions: any[] = [];
  activeTransactionMenu: number | null = null;

  transactionColumns = [
    { header: 'Fecha', field: 'Fecha', type: 'date' },
    { header: 'Descripción', field: 'Descripcion', type: 'text' },
    { header: 'Categoría', field: 'NombreCategoria', type: 'text' },
    { header: 'Banco', field: 'NombreBanco', type: 'text' },
    {
      header: 'Valor',
      field: 'Monto',
      type: 'number',
      cellClass: (row: any) => {
        return row.Tipo === 'Ingreso' ? 'green-text' : 'red-text';
      },
    },
  ];


  constructor(private finanzasService: FinanzasService) {
    effect(() => {
      const data: any = this.transaccionesMes();
      const monthYear: any = this.monthYear();
      if (this.monthYears != monthYear) {
        this.getTransactions(monthYear);
      }
      if (data.transacciones) {
        this.transactions = data.transacciones;
        if (data.transacciones) {
          // Convierte las fechas a objetos Date si es necesario
          data.transacciones.forEach((transaction: any) => {
            transaction.Fecha = new Date(transaction.Fecha);
          });

          // Ordena las transacciones de más reciente a más antigua
          this.transactions = data.transacciones.sort((a: any, b: any) => b.Fecha.getTime() - a.Fecha.getTime());

          this.resumenes = [
            { name: 'Saldo Actual', number: data.saldoActual, icon: 'fa-coins' },
            { name: 'Ingresos', number: data.ingresos, icon: 'fa-angle-up' },
            { name: 'Gastos', number: data.gastos, icon: 'fa-angle-down' },
            { name: 'Balance Mes', number: data.balance, icon: 'fa-scale-unbalanced-flip' },
          ];
        }

        this.resumenes = [
          { name: 'Saldo Actual', number: data.saldoActual, icon: 'fa-coins' },
          { name: 'Ingresos', number: data.ingresos, icon: 'fa-angle-up' },
          { name: 'Gastos', number: data.gastos, icon: 'fa-angle-down' },
          { name: 'Balance Mes', number: data.balance, icon: 'fa-scale-unbalanced-flip' },
        ];
      }
    });
  }

  getTransactions(monthYear: string) {
    this.finanzasService.getTransaccionesMes(monthYear).subscribe((data: any) => {
      this.transaccionesMes.set(data);
      this.monthYears = monthYear;
    });
  }

  transactionsModals(botonMas: string) {
    this.transactionsModal.set('Gasto');
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
