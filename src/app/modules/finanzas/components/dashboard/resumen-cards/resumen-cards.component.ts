import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { transaccionesMes } from '../dashboard.component';

@Component({
  selector: 'app-resumen-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-cards.component.html',
  styleUrl: './resumen-cards.component.scss'
})
export class ResumenCardsComponent {
  transaccionesMes = transaccionesMes;
  cards: any = {};

  constructor() {
    effect(() => {
      const data: any = this.transaccionesMes();
      this.cards = data;
      console.log(this.cards);
    });
  }

}
