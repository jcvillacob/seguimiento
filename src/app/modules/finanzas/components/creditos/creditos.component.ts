import { Component } from '@angular/core';
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';
import { ResumenesComponent } from '../../../../shared/components/resumenes/resumenes.component';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [EncabezadosComponent, ResumenesComponent],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.scss'
})
export class CreditosComponent {
  modal = false;

  resumenes = [
    { name: 'Saldo Actual', number: 5000, icon: 'fa-coins' },
    { name: 'Ingresos', number: 10000, icon: 'fa-angle-up' },
    { name: 'Gastos', number: 5000, icon: 'fa-angle-down' },
    { name: 'Balance Mes', number: 5000, icon: 'fa-scale-unbalanced-flip' },
  ];


  /* Modal */
  crearModals() {
    this.modal = true;
  }

}
