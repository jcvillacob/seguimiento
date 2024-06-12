import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-resumen-balance-mes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-balance-mes.component.html',
  styleUrl: './resumen-balance-mes.component.scss'
})
export class ResumenBalanceMesComponent implements AfterViewInit {
  @ViewChild('chartResumenBalance') chartResumenBalance!: ElementRef<HTMLCanvasElement>;
  balanceData: any[] = [
    { mes: 'Abril', ingreso: 400000, gasto: 300000},
    { mes: 'Mayo', ingreso: 200000, gasto: 200000},
    { mes: 'Junio', ingreso: 300000, gasto: 100000},
  ];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.cdr.detectChanges();
  }

  processData(data: any) {
    const labels = data.map((item: any) => item.mes);
    const ingresos = data.map((item: any) => item.ingreso);
    const gastos = data.map((item: any) => item.gasto);

    return { labels,  ingresos, gastos };
  }

  createBarChart() {
    const { labels, ingresos, gastos } = this.processData(this.balanceData);

    const canvas = this.chartResumenBalance.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      new Chart(context, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ingresos',
              data: ingresos,
              borderColor: 'rgb(55, 128, 58)',
              backgroundColor: 'rgb(110, 194, 114)',
              borderWidth: 2,
              borderRadius: 25,
              borderSkipped: false,
              maxBarThickness: 35
            },
            {
              label: 'Gastos',
              data: gastos,
              borderColor: 'rgb(244, 67, 54)',
              backgroundColor: 'rgb(235, 145, 138)',
              borderWidth: 2,
              borderRadius: 25,
              borderSkipped: false,
              maxBarThickness: 35,

            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        },
      });
    }
  }

}
