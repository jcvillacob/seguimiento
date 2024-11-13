import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './core/auth/store/auth.reducer';
import { cuentasReducer } from './modules/finanzas/store/cuentas.reducer';
import { AuthEffects } from './core/auth/store/auth.effects';
import { CuentasEffects } from './modules/finanzas/store/cuentas.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es' },
    provideStore({
      auth: authReducer,
      cuentas: cuentasReducer,
    }),
    provideEffects([AuthEffects, CuentasEffects]),
  ],
};
