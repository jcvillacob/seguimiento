import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-resumen-gastos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-gastos.component.html',
  styleUrls: ['./resumen-gastos.component.scss']
})
export class ResumenGastosComponent implements AfterViewInit {
  @ViewChild('chartResumenGasto') chartResumenGasto!: ElementRef<HTMLCanvasElement>;
  categoriasData: any = [
    { name: 'Arriendo', gasto: 650000, color: 'rgb(255, 99, 132)' },
    { name: 'Transporte', gasto: 100000, color: 'rgb((54, 162, 235)' },
    { name: 'Alimentación', gasto: 80000, color: 'rgb(255, 205, 86)' },
    { name: 'Otros', gasto: 400000, color: 'rgb(135, 135, 135)' },
  ];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.cdr.detectChanges();
  }

  processData(data: any) {
    const labels = data.map((item: any) => item.name);
    const gastos = data.map((item: any) => item.gasto);
    const colors = data.map((item: any) => item.color);
    const total = gastos.reduce((acc: number, gasto: number) => acc + gasto, 0);

    return { labels, gastos, colors, total };
  }

  createPieChart() {
    const { labels, gastos, colors, total } = this.processData(this.categoriasData);

    const canvas = this.chartResumenGasto.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      new Chart(context, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Gasto',
            data: gastos,
            backgroundColor: colors,
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
          beforeDraw: function (chart) {
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            const fontSize = (height / 200).toFixed(2);

            ctx.restore();
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            const text1 = "Total:";
            const text2 = `$ ${total.toLocaleString()}`;

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
