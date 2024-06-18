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
    setTimeout(() => {
      this.display = 'none';
      this.toastSignal.set('');
    }, 3000);
  }
}
