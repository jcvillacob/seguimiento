import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environments';

@Injectable()
export class AuthEffects {
  // Efecto para manejar el inicio de sesión
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.data).pipe(
          map((response: any) => {
            if (response && response.token) {
              localStorage.setItem('currentUserL', JSON.stringify(response));
              const user = this.decodeToken(response.token);
              return AuthActions.loginSuccess({ user });
            } else {
              return AuthActions.loginFailure({
                error: 'Credenciales inválidas',
              });
            }
          }),
          catchError((error) => {
            return of(
              AuthActions.loginFailure({
                error: error.message || 'Error desconocido',
              })
            );
          })
        )
      )
    )
  );

  // Efecto para manejar el inicio de sesión automático
  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      mergeMap(() => {
        if (environment.skipLogin) {
          const usuarioLogged = {
            UsuarioID: 1,
            Nombre: 'Usuario Test',
            Email: 'test@mail.com',
            Username: 'test',
            iat: 1710430791,
            exp: 1710448791,
          };
          return of(AuthActions.loginSuccess({ user: usuarioLogged }));
        } else {
          const currentUser = localStorage.getItem('currentUserL');
          if (currentUser) {
            const userData = JSON.parse(currentUser);
            const decodedToken = this.decodeToken(userData.token);
            if (decodedToken && this.isTokenValid(decodedToken.exp)) {
              return of(AuthActions.loginSuccess({ user: decodedToken }));
            } else {
              return of(AuthActions.logout());
            }
          } else {
            return of(AuthActions.logout());
          }
        }
      })
    )
  );

  // Efectos para manejar el éxito y fallo de inicio de sesión
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          //this.router.navigate(['home']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('currentUserL');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decodificando el token', Error);
      return null;
    }
  }

  private isTokenValid(exp: number): boolean {
    const now = Date.now().valueOf() / 1000;
    return exp > now;
  }
}
