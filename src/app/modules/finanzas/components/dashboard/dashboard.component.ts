import { Component, effect, signal } from '@angular/core';
import { ResumenCardsComponent } from './resumen-cards/resumen-cards.component';
import { ResumenCuentasComponent } from './resumen-cuentas/resumen-cuentas.component';
import { ResumenGastosComponent } from './resumen-gastos/resumen-gastos.component';
import { ResumenIngresosComponent } from './resumen-ingresos/resumen-ingresos.component';
import { ResumenBalanceMesComponent } from './resumen-balance-mes/resumen-balance-mes.component';
import { ResumenBalanceUltimosComponent } from './resumen-balance-ultimos/resumen-balance-ultimos.component';
import { ResumenCumplimientoComponent } from './resumen-cumplimiento/resumen-cumplimiento.component';
import { ResumenMetasComponent } from './resumen-metas/resumen-metas.component';
import { ResumenPresupuestoComponent } from './resumen-presupuesto/resumen-presupuesto.component';
import { FinanzasService } from '../../services/finanzas.service';
import { monthYear } from '../main/main.component';

export const transaccionesMes = signal({});
export const balancesUltimosSeisMeses = signal({});

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ResumenCardsComponent, ResumenCumplimientoComponent, ResumenCuentasComponent, ResumenGastosComponent, ResumenMetasComponent,
    ResumenIngresosComponent, ResumenBalanceMesComponent, ResumenBalanceUltimosComponent, ResumenPresupuestoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  transaccionesMes = transaccionesMes;
  balancesUltimosSeisMeses = balancesUltimosSeisMeses;
  monthYear = monthYear;

  constructor(private finanzasService: FinanzasService) {
    effect(() => {
      const text = this.monthYear();
      this.finanzasService.getTransaccionesMes(text).subscribe((data: any) => {
        this.transaccionesMes.set(data);
        this.finanzasService.balancesUltimosSeisMeses().subscribe(data => {
          this.balancesUltimosSeisMeses.set(data);
        })
      });
    });
  }

  
}
