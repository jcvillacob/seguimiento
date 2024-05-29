import { Component } from '@angular/core';
import { ResumenCardsComponent } from './resumen-cards/resumen-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ResumenCardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
