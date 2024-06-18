import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toastSignal } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  toastSignal = toastSignal;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.authService.register(data).subscribe(
        () => {
          this.toastSignal.set('Usuario Registrado Correctamente.')
          this.router.navigate(['/auth/login']);
        },
        error => {
          console.error('Error al registrar', error);
        }
      );
    }
  }
}
