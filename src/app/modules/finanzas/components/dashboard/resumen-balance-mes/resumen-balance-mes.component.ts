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
  categoriasData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.cdr.detectChanges();
  }

  createBarChart() {
    const canvas = this.chartResumenBalance.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      new Chart(context, {
        type: 'bar',
        data: {
          labels: [
            'Enero',
            'Febrero',
            'Marzo'
          ],
          datasets: [
            {
              label: 'Ingresos',
              data: [1500000, 1800000, 1350000],
              borderColor: 'rgb(55, 128, 58)',
              backgroundColor: 'rgb(110, 194, 114)',
              borderWidth: 2,
              borderRadius: 25,
              borderSkipped: false,
              maxBarThickness: 35
            },
            {
              label: 'Gastos',
              data: [1500000, 1000000, 1250000],
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
