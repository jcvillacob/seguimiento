import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { WorkingComponent } from '../../shared/components/working/working.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cuentas', component: CuentasComponent },
      { path: 'transacciones', component: WorkingComponent },
      { path: 'credito', component: WorkingComponent },
      { path: 'presupuesto', component: WorkingComponent },
      { path: 'reportes', component: WorkingComponent },
      { path: 'opciones', component: WorkingComponent },
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
