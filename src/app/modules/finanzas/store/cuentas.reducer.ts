import { createReducer, on } from '@ngrx/store';
import * as CuentasActions from './cuentas.actions';

export interface CuentasState {
  bancos: any[];
  cuentas: any[];
  loading: boolean;
  error: any;
}

export const initialState: CuentasState = {
  bancos: [],
  cuentas: [],
  loading: false,
  error: null,
};

export const cuentasReducer = createReducer(
  initialState,

  // **Load Bancos**
  on(CuentasActions.loadBancos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CuentasActions.loadBancosSuccess, (state, { bancos }) => ({
    ...state,
    bancos,
    loading: false,
  })),
  on(CuentasActions.loadBancosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // **Load Cuentas**
  on(CuentasActions.loadCuentas, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CuentasActions.loadCuentasSuccess, (state, { cuentas }) => ({
    ...state,
    cuentas,
    loading: false,
  })),
  on(CuentasActions.loadCuentasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // **Create Cuenta**
  on(CuentasActions.createCuenta, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CuentasActions.createCuentaSuccess, (state, { cuenta }) => ({
    ...state,
    cuentas: [...state.cuentas, cuenta],
    loading: false,
  })),
  on(CuentasActions.createCuentaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // **Update Cuenta**
  on(CuentasActions.updateCuenta, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CuentasActions.updateCuentaSuccess, (state, { cuenta }) => ({
    ...state,
    cuentas: state.cuentas.map((c) => (c.id === cuenta.id ? cuenta : c)),
    loading: false,
  })),
  on(CuentasActions.updateCuentaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // **Update Activo**
  on(CuentasActions.updateActivo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CuentasActions.updateActivoSuccess, (state, { cuenta }) => ({
    ...state,
    cuentas: state.cuentas.map((c) => (c.id === cuenta.id ? cuenta : c)),
    loading: false,
  })),
  on(CuentasActions.updateActivoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // **Delete Cuenta**
  on(CuentasActions.deleteCuenta, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CuentasActions.deleteCuentaSuccess, (state, { cuentaId }) => ({
    ...state,
    cuentas: state.cuentas.filter((c) => c.id !== cuentaId),
    loading: false,
  })),
  on(CuentasActions.deleteCuentaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
