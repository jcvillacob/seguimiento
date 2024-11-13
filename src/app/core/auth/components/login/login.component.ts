import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
/*     private authService: AuthService,
    private router: Router, */
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;

      this.store.dispatch(AuthActions.login({ data: data }));

      /* this.authService.login(data).subscribe(
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
      ); */
    }
  }
}
