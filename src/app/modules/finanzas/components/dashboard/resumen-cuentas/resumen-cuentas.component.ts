import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FinanzasService } from '../../../services/finanzas.service';
import { transaccionesMes } from '../dashboard.component';
import { DashboardCardComponent } from '../../../../../shared/components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-resumen-cuentas',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent],
  templateUrl: './resumen-cuentas.component.html',
  styleUrl: './resumen-cuentas.component.scss'
})
export class ResumenCuentasComponent {
  transaccionesMes = transaccionesMes;
  cuentas: any[] = [];

  constructor(private finanzasService: FinanzasService) {
    effect(() => {
      const data: any = this.transaccionesMes();
      this.getcuentas();
    });
  }

  /* Cuentas */
  getcuentas() {
    this.finanzasService.getCuentas().subscribe(data => {
      this.cuentas = data;
    });
  }
}
