import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { DashboardCardComponent } from '../../../../../shared/components/dashboard-card/dashboard-card.component';
import { metas } from '../dashboard.component';

@Component({
  selector: 'app-resumen-metas',
  standalone: true,
  imports: [DashboardCardComponent, CommonModule],
  templateUrl: './resumen-metas.component.html',
  styleUrl: './resumen-metas.component.scss'
})
export class ResumenMetasComponent {
  metas: any = metas;
  goals: any[] = [];

  constructor() {
    effect(() => {
      const data: any = this.metas();
    });
  }
}
