import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '../../../../../shared/components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-resumen-metas',
  standalone: true,
  imports: [DashboardCardComponent, CommonModule],
  templateUrl: './resumen-metas.component.html',
  styleUrl: './resumen-metas.component.scss'
})
export class ResumenMetasComponent {
  goals: any[] = [
    {name: 'Nuevo Carro', icono: 'fa-solid fa-car', meta: 30000000, ahorrado: 19000000},
    {name: 'Nueva Casa', icono: 'fa-solid fa-home', meta: 300000000, ahorrado: 1000000},
    {name: 'Viaje Santa Marta', icono: 'fa-solid fa-plane', meta: 3000000, ahorrado: 1000000},
  ];

}
