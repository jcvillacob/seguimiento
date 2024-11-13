import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private authService: AuthService) { }

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
}
