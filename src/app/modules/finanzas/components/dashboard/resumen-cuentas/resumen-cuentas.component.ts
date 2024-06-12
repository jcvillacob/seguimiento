import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resumen-cuentas',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resumen-cuentas.component.html',
  styleUrl: './resumen-cuentas.component.scss'
})
export class ResumenCuentasComponent {
  cuentas: any[] = [
    {name: 'Efectivo', balance: 15000, img: 'banks/efectivo.avif'},
    {name: 'Nequi', balance: 25000, img: 'banks/nequi.jpg'},
    {name: 'Davivienda', balance: 35000, img: 'banks/davivienda.png'},
  ]

}
