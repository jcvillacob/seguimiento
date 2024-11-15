import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { WorkingComponent } from '../../shared/components/working/working.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { MetasComponent } from './components/metas/metas.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cuentas', component: CuentasComponent },
      { path: 'transacciones', component: TransaccionesComponent },
      { path: 'credito', component: CreditosComponent },
      { path: 'presupuesto', component: PresupuestoComponent },
      { path: 'metas', component: MetasComponent },
      { path: 'reportes', component: WorkingComponent },
      { path: 'opciones', component: WorkingComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'configuraciones', component: WorkingComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasRoutingModule { }
