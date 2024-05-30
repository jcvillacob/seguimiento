import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-resumen-ingresos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-ingresos.component.html',
  styleUrl: './resumen-ingresos.component.scss'
})
export class ResumenIngresosComponent implements AfterViewInit {
  @ViewChild('chartResumenIngresos') chartResumenIngresos!: ElementRef<HTMLCanvasElement>;
  categoriasData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.cdr.detectChanges();
  }

  createPieChart() {
    const canvas = this.chartResumenIngresos.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      new Chart(context, {
        type: 'doughnut',
        data: {
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 500, 30],
            backgroundColor: [
              'rgb(66, 135, 245)',
              'rgb(23, 84, 28)',
              'rgb(44, 45, 97)'
            ],
            offset: 10,
            hoverOffset: 20,
            weight: 1,

          }]
        },
        options: {
          cutout: '75%',
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        },
        plugins: [{
          id: 'centerText',
          beforeDraw: function(chart) {
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            const fontSize = (height / 200).toFixed(2);

            ctx.restore();
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            const text1 = "Total:";
            const text2 = "$ 1'584.000";

            const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
            const text1Y = height / 2 - 17;

            const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
            const text2Y = height / 2 + 17;

            ctx.fillText(text1, text1X, text1Y);
            ctx.fillText(text2, text2X, text2Y);

            ctx.save();
          }
        }]
      });
    }
  }
}
