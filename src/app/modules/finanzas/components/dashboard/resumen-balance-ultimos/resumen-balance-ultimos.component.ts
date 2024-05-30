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
  categoriasData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createLineChart();
    this.cdr.detectChanges();
  }

  createLineChart() {
    const canvas = this.chartResumenUltimos.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      new Chart(context, {
        type: 'line',
        data: {
          labels: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio'
          ],
          datasets: [
            {
              label: 'Balance',
              data: [10, 20, 30, 15, 20, 35],
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

