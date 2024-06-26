import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  /* Categorias */
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  createCategoria(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categorias`, data);
  }

  /* Transacciones */
  getTransaccionByCuenta(cuentaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transacciones/cuenta/${cuentaId}`);
  }

  getTransaccionByUser(): Observable<any[]> {
    const usuarioID = this.authService.getUsuarioID();
    return this.http.get<any[]>(`${this.apiUrl}/transacciones/usuario/${usuarioID}`);
  }

  getTransaccionesMes(monthYear: string): Observable<any[]> {
    const usuarioID = this.authService.getUsuarioID();
    return this.http.get<any[]>(`${this.apiUrl}/transacciones/transaccionesmes/${usuarioID}?${monthYear}`);
  }

  balancesUltimosSeisMeses(): Observable<any[]> {
    const usuarioID = this.authService.getUsuarioID();
    return this.http.get<any[]>(`${this.apiUrl}/transacciones/balancesUltimosSeisMeses/${usuarioID}`);
  }

  createTransaccion(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transacciones`, data);
  }

  updateTransaccion(transaccionId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/transacciones/${transaccionId}`, data);
  }

  deleteTransaccion(transaccionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/transacciones/${transaccionId}`);
  }

  /* Transferencias */
  createTransferencia(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transferencias`, data);
  }

  /* Bancos */
  getBancos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bancos/`);
  }

  /* Cuentas */
  getCuentas(): Observable<any[]> {
    const usuarioID = this.authService.getUsuarioID();
    return this.http.get<any[]>(`${this.apiUrl}/cuentas/usuario/${usuarioID}`);
  }

  createCuenta(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cuentas`, data);
  }

  updateCuenta(cuentaId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cuentas/${cuentaId}`, data);
  }

  updateActivo(cuentaId: number, activo: number): Observable<any> {
    const data = { activo: activo };
    return this.http.put<any>(`${this.apiUrl}/cuentas/archivar/${cuentaId}`, data);
  }

  deleteCuenta(cuentaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cuentas/${cuentaId}`);
  }

  /* Presupuestos */
  getPresupuestos(): Observable<any[]> {
    const usuarioID = this.authService.getUsuarioID();
    return this.http.get<any[]>(`${this.apiUrl}/presupuesto/usuario/${usuarioID}`);
  }

  createPresupuesto(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/presupuesto`, data);
  }

  updatePresupuesto(presupuestoId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/presupuesto/${presupuestoId}`, data);
  }

  deletePresupuesto(presupuestoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/presupuesto/${presupuestoId}`);
  }

}
