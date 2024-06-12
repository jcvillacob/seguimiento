import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resumen-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-cards.component.html',
  styleUrl: './resumen-cards.component.scss'
})
export class ResumenCardsComponent {
  cards: any = {
    balance: 639400,
    ingresos: 1200000,
    gastos: 800000,
    tarjetas: 500000
  }

}
