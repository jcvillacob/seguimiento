import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { transaccionesMes } from '../dashboard.component';
import { DashboardResumenComponent } from '../../../../../shared/components/dashboard-resumen/dashboard-resumen.component';

@Component({
  selector: 'app-resumen-cards',
  standalone: true,
  imports: [CommonModule, DashboardResumenComponent],
  templateUrl: './resumen-cards.component.html',
  styleUrl: './resumen-cards.component.scss'
})
export class ResumenCardsComponent {
  transaccionesMes = transaccionesMes;
  cards: any = {};
  resumenes!: any[];

  constructor() {
    effect(() => {
      const data: any = this.transaccionesMes();
      this.cards = data;
      this.resumenes = [
        {title: 'Balance Actual', number: data.saldoActual, icon: 'fa-building-columns'},
        {title: 'Ingresos', number: data.ingresos, icon: 'fa-chevron-up'},
        {title: 'Gastos', number: data.gastos, icon: 'fa-chevron-down'},
        {title: 'Balance Mes', number: data.balance, icon: 'fa-credit-card'},
      ]
    });
  }

}
