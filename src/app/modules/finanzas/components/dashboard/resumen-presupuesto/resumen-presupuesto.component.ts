import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { presupuestoMes } from '../dashboard.component';
import { DashboardCardComponent } from '../../../../../shared/components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-resumen-presupuesto',
  standalone: true,
  imports: [DashboardCardComponent, CommonModule],
  templateUrl: './resumen-presupuesto.component.html',
  styleUrl: './resumen-presupuesto.component.scss'
})
export class ResumenPresupuestoComponent {
  presupuestoMes = presupuestoMes;
  budget: number = 1;
  gastado: number = 0;

  constructor() {
    effect(() => {
      const data: any = this.presupuestoMes();
      if(data.length) {
        this.calculateTotals(data);
      }
    });
  }

  calculateTotals(data: any[]) {
    this.budget = data.reduce((sum, presupuesto) => sum + presupuesto.Monto, 0);
    this.gastado = data.reduce((sum, presupuesto) => sum + presupuesto.Gastado, 0);
  }

  getTranslationPercentage(): string {
    const percentage = (this.gastado - this.budget) * 100 / this.budget;
    return `${Math.max(-100, Math.min(percentage, 0))}%`;
  }

}
