import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FinanzasService } from '../../../services/finanzas.service';

@Component({
  selector: 'app-resumen-cuentas',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resumen-cuentas.component.html',
  styleUrl: './resumen-cuentas.component.scss'
})
export class ResumenCuentasComponent {
  cuentas: any[] = [];

  constructor(private finanzasService: FinanzasService) {
    this.getcuentas();
  }

  /* Cuentas */
  getcuentas() {
    this.finanzasService.getCuentas().subscribe(data => {
      this.cuentas = data;
    });
  }
}
