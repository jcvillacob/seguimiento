import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl: string = environment.apiURL;
  public usuarioLogged: any = {};

  constructor(private http: HttpClient, private router: Router) {
    const currentUserL = localStorage.getItem('currentUserL');
    if (currentUserL) {
      const userData = JSON.parse(currentUserL);
      this.usuarioLogged = this.decodeToken(userData.token);
      this.isLoggedIn.next(true);
    } else if (environment.skipLogin) {
      this.isLoggedIn.next(true);
      this.usuarioLogged = {
        "UsuarioID": 1,
        "Nombre": "Juan Camilo Villacob",
        "Email": "jucaviza6@gmail.com",
        "Username": "jvillacob",
        "iat": 1710430791,
        "exp": 1710448791
      };
      console.log(this.usuarioLogged);
    }
  }

  register(data: any) {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('currentUserL', JSON.stringify({ token: res.token }));
          this.usuarioLogged = this.decodeToken(res.token);
          this.isLoggedIn.next(true);
          this.router.navigate(['/finanzas']);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUserL');
    this.usuarioLogged = {};
    this.isLoggedIn.next(false);
    this.router.navigate(['auth/login']);
  }

  isLoggedIn$ = this.isLoggedIn.asObservable();

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decodificando el token', Error);
      return null;
    }
  }

  public getUsuarioID() {
    return this.usuarioLogged.UsuarioID;
  }

  public getUsuarioNombre() {
    return this.usuarioLogged.Nombre;
  }
}
