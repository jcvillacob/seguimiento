import { Component } from '@angular/core';
import { ResumenCardsComponent } from './resumen-cards/resumen-cards.component';
import { ResumenCuentasComponent } from './resumen-cuentas/resumen-cuentas.component';
import { ResumenGastosComponent } from './resumen-gastos/resumen-gastos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ResumenCardsComponent, ResumenCuentasComponent, ResumenGastosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
