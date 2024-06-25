import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent {
  presupuestos: any[] = [
    { categoriaIcono: 'fa-solid fa-home', categoriaNombre: 'Arriendo', presupuesto: 750000, gastado: 650000 },
    { categoriaIcono: 'fa-solid fa-phone', categoriaNombre: 'Comunicaciones', presupuesto: 750000, gastado: 650000 },
    { categoriaIcono: 'fa-solid fa-home', categoriaNombre: 'Arriendo', presupuesto: 750000, gastado: 650000 },
    { categoriaIcono: 'fa-solid fa-home', categoriaNombre: 'Arriendo', presupuesto: 750000, gastado: 650000 },
  ];


  getTranslationPercentage(presupuesto: any): string {
    const percentage = (presupuesto.gastado - presupuesto.presupuesto) * 100 / presupuesto.presupuesto;
    return `${Math.max(-100, Math.min(percentage, 0))}%`;
  }


}
