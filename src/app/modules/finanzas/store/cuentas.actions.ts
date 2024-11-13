import { createAction, props } from '@ngrx/store';

// **Bancos Actions**
export const loadBancos = createAction('[Cuentas] Load Bancos');

export const loadBancosSuccess = createAction(
  '[Cuentas] Load Bancos Success',
  props<{ bancos: any[] }>()
);

export const loadBancosFailure = createAction(
  '[Cuentas] Load Bancos Failure',
  props<{ error: any }>()
);

// **Cuentas Actions**
export const loadCuentas = createAction('[Cuentas] Load Cuentas');

export const loadCuentasSuccess = createAction(
  '[Cuentas] Load Cuentas Success',
  props<{ cuentas: any[] }>()
);

export const loadCuentasFailure = createAction(
  '[Cuentas] Load Cuentas Failure',
  props<{ error: any }>()
);

export const createCuenta = createAction(
  '[Cuentas] Create Cuenta',
  props<{ cuenta: any }>()
);

export const createCuentaSuccess = createAction(
  '[Cuentas] Create Cuenta Success',
  props<{ cuenta: any }>()
);

export const createCuentaFailure = createAction(
  '[Cuentas] Create Cuenta Failure',
  props<{ error: any }>()
);

export const updateCuenta = createAction(
  '[Cuentas] Update Cuenta',
  props<{ cuentaId: number; changes: any }>()
);

export const updateCuentaSuccess = createAction(
  '[Cuentas] Update Cuenta Success',
  props<{ cuenta: any }>()
);

export const updateCuentaFailure = createAction(
  '[Cuentas] Update Cuenta Failure',
  props<{ error: any }>()
);

export const deleteCuenta = createAction(
  '[Cuentas] Delete Cuenta',
  props<{ cuentaId: number }>()
);

export const deleteCuentaSuccess = createAction(
  '[Cuentas] Delete Cuenta Success',
  props<{ cuentaId: number }>()
);

export const deleteCuentaFailure = createAction(
  '[Cuentas] Delete Cuenta Failure',
  props<{ error: any }>()
);

export const updateActivo = createAction(
  '[Cuentas] Update Activo',
  props<{ cuentaId: number; activo: number }>()
);

export const updateActivoSuccess = createAction(
  '[Cuentas] Update Activo Success',
  props<{ cuenta: any }>()
);

export const updateActivoFailure = createAction(
  '[Cuentas] Update Activo Failure',
  props<{ error: any }>()
);
