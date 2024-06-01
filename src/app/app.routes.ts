import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { AuthComponent } from './core/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'finanzas', pathMatch: 'full'},
  {
    path: 'auth', component: AuthComponent, children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'finanzas', loadChildren: () => import('./modules/finanzas/finanzas.module').then(m => m.FinanzasModule)
  },
  { path: '**', redirectTo: 'finanzas', pathMatch: 'full' },
];
