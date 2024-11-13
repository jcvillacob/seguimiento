import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CuentasActions from './cuentas.actions';
import { CuentasService } from '../services/cuentas.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CuentasEffects {
  constructor(
    private actions$: Actions,
    private cuentasService: CuentasService
  ) {}

  // **Bancos Effects**
  loadBancos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CuentasActions.loadBancos),
      mergeMap(() =>
        this.cuentasService.getBancos().pipe(
          map((bancos) => CuentasActions.loadBancosSuccess({ bancos })),
          catchError((error) => of(CuentasActions.loadBancosFailure({ error })))
        )
      )
    )
  );

  // **Cuentas Effects**
  loadCuentas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CuentasActions.loadCuentas),
      mergeMap(() =>
        this.cuentasService.getCuentas().pipe(
          map((cuentas) => CuentasActions.loadCuentasSuccess({ cuentas })),
          catchError((error) => of(CuentasActions.loadCuentasFailure({ error })))
        )
      )
    )
  );

  createCuenta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CuentasActions.createCuenta),
      mergeMap((action) =>
        this.cuentasService.createCuenta(action.cuenta).pipe(
          map((cuenta) => CuentasActions.createCuentaSuccess({ cuenta })),
          catchError((error) => of(CuentasActions.createCuentaFailure({ error })))
        )
      )
    )
  );

  updateCuenta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CuentasActions.updateCuenta),
      mergeMap((action) =>
        this.cuentasService.updateCuenta(action.cuentaId, action.changes).pipe(
          map((cuenta) => CuentasActions.updateCuentaSuccess({ cuenta })),
          catchError((error) => of(CuentasActions.updateCuentaFailure({ error })))
        )
      )
    )
  );

  updateActivo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CuentasActions.updateActivo),
      mergeMap((action) =>
        this.cuentasService.updateActivo(action.cuentaId, action.activo).pipe(
          map((cuenta) => CuentasActions.updateActivoSuccess({ cuenta })),
          catchError((error) => of(CuentasActions.updateActivoFailure({ error })))
        )
      )
    )
  );

  deleteCuenta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CuentasActions.deleteCuenta),
      mergeMap((action) =>
        this.cuentasService.deleteCuenta(action.cuentaId).pipe(
          map(() => CuentasActions.deleteCuentaSuccess({ cuentaId: action.cuentaId })),
          catchError((error) => of(CuentasActions.deleteCuentaFailure({ error })))
        )
      )
    )
  );
}
