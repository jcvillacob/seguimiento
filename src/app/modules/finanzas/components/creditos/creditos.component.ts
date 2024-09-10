import { Component } from '@angular/core';
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [EncabezadosComponent],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.scss'
})
export class CreditosComponent {

  modal = false;


  /* Modal */
  toggleModal() {
    this.modal = !this.modal;
    if (!this.modal) {
      ;
    }
  }

}
