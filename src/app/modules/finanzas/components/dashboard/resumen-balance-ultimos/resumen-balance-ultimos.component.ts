import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-resumen-balance-ultimos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-balance-ultimos.component.html',
  styleUrl: './resumen-balance-ultimos.component.scss'
})
export class ResumenBalanceUltimosComponent implements AfterViewInit {
  @ViewChild('chartResumenUltimos') chartResumenUltimos!: ElementRef<HTMLCanvasElement>;
  balanceData: any[] = [
    { mes: 'Enero', ingreso: 400000, gasto: 50000},
    { mes: 'Febrero', ingreso: 400000, gasto: 400000},
    { mes: 'Marzo', ingreso: 450000, gasto: 300000},
    { mes: 'Abril', ingreso: 400000, gasto: 90000},
    { mes: 'Mayo', ingreso: 200000, gasto: 50000},
    { mes: 'Junio', ingreso: 300000, gasto: 100000},
  ];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createLineChart();
    this.cdr.detectChanges();
  }

  processData(data: any) {
    const labels = data.map((item: any) => item.mes);
    const balances = data.map((item: any) => item.ingreso - item.gasto);

    return { labels, balances };
  }

  createLineChart() {
    const { labels, balances } = this.processData(this.balanceData);

    const canvas = this.chartResumenUltimos.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      new Chart(context, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Balance',
              data: balances,
              borderColor: '#6515dd',
              pointRadius: 5,
              pointHoverRadius: 10,
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
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

