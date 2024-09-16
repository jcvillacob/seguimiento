import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-resumen.component.html',
  styleUrl: './dashboard-resumen.component.scss'
})
export class DashboardResumenComponent {
  @Input() data!: any[];

}
