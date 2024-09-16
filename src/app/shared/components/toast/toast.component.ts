import { Component, effect, signal } from '@angular/core';

export const toastSignal = signal('');

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  toastSignal = toastSignal;
  display: string = 'none';
  text: string = '';

  constructor() {
    effect(() => {
      this.text = this.toastSignal();
      if (this.text !== '') {
        this.showToast();
      }
    });
  }

  showToast() {
    this.display = 'flex';
    // Temporizador para cerrar el toast automáticamente después de 3 segundos
    this.autoCloseTimeout = setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  // Variable para almacenar el timeout y poder cancelarlo si se cierra manualmente
  private autoCloseTimeout: any;

  closeToast() {
    this.display = 'none';
    this.text = '';
    this.toastSignal.set('');

    // Limpiar el timeout si existe
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
  }
}
