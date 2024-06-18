import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { transaccionesMes } from '../dashboard.component';

@Component({
  selector: 'app-resumen-ingresos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-ingresos.component.html',
  styleUrls: ['./resumen-ingresos.component.scss']
})
export class ResumenIngresosComponent implements AfterViewInit {
  @ViewChild('chartResumenIngresos') chartResumenIngresos!: ElementRef<HTMLCanvasElement>;
  transaccionesMes = transaccionesMes;
  chartInstance: Chart<'doughnut'> | null = null;
  categoriasData: any = [];

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      const data: any = this.transaccionesMes();
      if (data.transacciones) {
        this.categoriasData = data.transacciones.filter((d: any) => d.Tipo == 'Ingreso');
        this.createPieChart();
      }
    });
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.cdr.detectChanges();
  }

  processData(data: any) {
    // Agrupar las transacciones por categoría
    const groupedData = data.reduce((acc: any, item: any) => {
      const existingCategory = acc.find((cat: any) => cat.NombreCategoria === item.NombreCategoria);
      if (existingCategory) {
        existingCategory.Monto += item.Monto;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    // Ordenar las categorías por monto de mayor a menor
    groupedData.sort((a: any, b: any) => b.Monto - a.Monto);

    // Agrupar las categorías adicionales en "Otros" si hay más de tres categorías
    let labels = [];
    let ingresos = [];
    let colors = [];
    let total = 0;

    if (groupedData.length > 3) {
      const topThree = groupedData.slice(0, 3);
      const others = groupedData.slice(3);

      labels = topThree.map((item: any) => item.NombreCategoria);
      ingresos = topThree.map((item: any) => item.Monto);
      colors = topThree.map((item: any) => item.ColorCategoria);
      total = ingresos.reduce((acc: number, Monto: number) => acc + Monto, 0);

      const othersTotal = others.reduce((acc: number, item: any) => acc + item.Monto, 0);
      labels.push('Otros');
      ingresos.push(othersTotal);
      colors.push('rgb(135, 135, 135)');
      total += othersTotal;
    } else {
      labels = groupedData.map((item: any) => item.NombreCategoria);
      ingresos = groupedData.map((item: any) => item.Monto);
      colors = groupedData.map((item: any) => item.ColorCategoria);
      total = ingresos.reduce((acc: number, Monto: number) => acc + Monto, 0);
    }

    return { labels, ingresos, colors, total };
  }

  createPieChart() {
    const { labels, ingresos, colors, total } = this.processData(this.categoriasData);

    const canvas = this.chartResumenIngresos.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart<'doughnut'>(context, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ingreso',
            data: ingresos,
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
