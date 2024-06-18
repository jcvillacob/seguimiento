import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { transaccionesMes } from '../dashboard.component';

@Component({
  selector: 'app-resumen-cumplimiento',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resumen-cumplimiento.component.html',
  styleUrl: './resumen-cumplimiento.component.scss'
})
export class ResumenCumplimientoComponent implements AfterViewInit {
  @ViewChild('chartResumenCumplimiento') chartResumenCumplimiento!: ElementRef<HTMLCanvasElement>;
  chartInstance: Chart<'doughnut'> | null = null;
  transaccionesMes = transaccionesMes;
  cumplimientoData: any = {
    ingresos: 1200000,
    gastos: 900000
  };

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      const data: any = this.transaccionesMes();
      if (data) {
        this.cumplimientoData = data;
        this.createPieChart();
      }
    });
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.cdr.detectChanges();
  }

  createPieChart() {
    const canvas = this.chartResumenCumplimiento.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      const cumplimiento = (this.cumplimientoData.ingresos - this.cumplimientoData.gastos) * 100 / this.cumplimientoData.ingresos;
      const limite = 20;
      const color = cumplimiento < limite ? '#bf0412' : '#10B981';

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(context, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [cumplimiento, 100 - cumplimiento],
              backgroundColor: [color, '#D1D5DB'],
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          circumference: 270,
          rotation: -135,
          cutout: '70%',
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        },
      });
    }
  }
}
