import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-resumen-gastos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-gastos.component.html',
  styleUrls: ['./resumen-gastos.component.scss']
})
export class ResumenGastosComponent implements AfterViewInit {
  @ViewChild('chartResumenGasto') chartResumenGasto!: ElementRef<HTMLCanvasElement>;
  categoriasData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.cdr.detectChanges();
  }

  createPieChart() {
    const canvas = this.chartResumenGasto.nativeElement;
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
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
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