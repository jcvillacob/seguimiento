import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';


declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/finanzas']);
        },
        error => {
          Swal.fire({
            title: "Usuario o Contraseña Incorrectos",
            text: "No se ha podido Iniciar Sesión",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          })
        }
      );
    }
  }

  /* loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      // Aquí recibes el usuario autenticado por Google
      console.log('Google User:', user);

      // Como no tienes backend, simula un error
      Swal.fire({
        title: "Error al iniciar sesión",
        text: "No se ha podido iniciar sesión. Por favor, inténtalo más tarde.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });

      // Opcional: cerrar sesión para limpiar el estado
      this.socialAuthService.signOut();
    }).catch((error) => {
      console.error('Error en el inicio de sesión con Google:', error);
    });
  } */


  loginWithApple() {
    // Implementaremos esto en el siguiente apartado
    this.simulateAppleLogin();
  }

  private simulateAppleLogin() {
    // Simular el flujo de inicio de sesión con Apple
    Swal.fire({
      title: "Iniciando sesión con Apple...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      Swal.close();
      Swal.fire({
        title: "Error al iniciar sesión con Apple",
        text: "No se ha podido iniciar sesión. Por favor, inténtalo más tarde.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }, 2000); // Simula una espera de 2 segundos
  }
}
