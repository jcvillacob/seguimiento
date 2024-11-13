import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './core/auth/store/auth.reducer';
import * as AuthActions from './core/auth/store/auth.actions';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private store: Store<{ auth: AuthState }>) { }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
