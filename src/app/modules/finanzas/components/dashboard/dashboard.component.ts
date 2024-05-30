import { Component } from '@angular/core';
import { ResumenCardsComponent } from './resumen-cards/resumen-cards.component';
import { ResumenCuentasComponent } from './resumen-cuentas/resumen-cuentas.component';
import { ResumenGastosComponent } from './resumen-gastos/resumen-gastos.component';
import { ResumenIngresosComponent } from './resumen-ingresos/resumen-ingresos.component';
import { ResumenBalanceMesComponent } from './resumen-balance-mes/resumen-balance-mes.component';
import { ResumenBalanceUltimosComponent } from './resumen-balance-ultimos/resumen-balance-ultimos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ResumenCardsComponent, ResumenCuentasComponent, ResumenGastosComponent, ResumenIngresosComponent, ResumenBalanceMesComponent, ResumenBalanceUltimosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
