import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';
import { ResumenesComponent } from '../../../../shared/components/resumenes/resumenes.component';
import { ModalCrearCreditoComponent } from './modal-crear-credito/modal-crear-credito.component';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [EncabezadosComponent, ResumenesComponent, ModalCrearCreditoComponent, CommonModule],
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss']
})
export class CreditosComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('chartCredito') chartCreditos!: QueryList<ElementRef<HTMLCanvasElement>>;
  chartInstances: Chart[] = [];
  modalCrearCredito = false;

  debts = [
    {
      name: 'Crédito Bancolombia',
      amount: 2500000,
      labels: ['01-01-2023', '15-01-2023', '01-02-2023', '15-02-2023'],
      data: [2500000, 2400000, 1230000, 1200000]
    },
    {
      name: 'Crédito Davivienda',
      amount: 1500000,
      labels: ['01-01-2023', '15-01-2023', '01-02-2023', '15-02-2023'],
      data: [1500000, 1400000, 1390000, 1050000]
    }
  ];

  resumenes = [
    { name: 'Saldo Actual', number: 5000, icon: 'fa-coins' },
    { name: 'Ingresos', number: 10000, icon: 'fa-angle-up' },
    { name: 'Gastos', number: 5000, icon: 'fa-angle-down' },
  ];

  crearModals() {
    this.modalCrearCredito = !this.modalCrearCredito;
  }

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createLineCharts();
  }

  createLineCharts() {
    this.chartCreditos.forEach((chartElementRef, index) => {
      const canvas = chartElementRef.nativeElement;
      const context = canvas.getContext('2d');

      if (context) {
        const debt = this.debts[index];

        const labels = debt.labels;
        const data = debt.data;

        const chartInstance = new Chart(context, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
              tension: 0.1,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: 'rgb(75, 192, 192)'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
              }
            },
            scales: {
              x: {
                display: false,
                grid: { display: false }
              },
              y: {
                display: false,
                grid: { display: false }
              }
            },
            elements: {
              line: {
                borderWidth: 2
              }
            },
            interaction: {
              mode: 'index',
              intersect: false
            }
          }
        });

        this.chartInstances.push(chartInstance);
      }
    });
  }


  ngOnDestroy() {
    this.chartInstances.forEach(chart => chart.destroy());
  }
}
