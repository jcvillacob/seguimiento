import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resumen-presupuesto',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resumen-presupuesto.component.html',
  styleUrl: './resumen-presupuesto.component.scss'
})
export class ResumenPresupuestoComponent {
  presupuesto: any = {
    budget: 1800000,
    gastado: 1000000
  }

}
