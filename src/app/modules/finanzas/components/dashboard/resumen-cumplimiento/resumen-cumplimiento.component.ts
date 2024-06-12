import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-resumen-cumplimiento',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resumen-cumplimiento.component.html',
  styleUrl: './resumen-cumplimiento.component.scss'
})
export class ResumenCumplimientoComponent implements AfterViewInit {
  @ViewChild('chartResumenCumplimiento') chartResumenCumplimiento!: ElementRef<HTMLCanvasElement>;
  cumplimientoData: any = {
    ingreso: 1200000,
    gasto: 900000
  };

  constructor(private cdr: ChangeDetectorRef) {
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
      const cumplimiento = (this.cumplimientoData.ingreso - this.cumplimientoData.gasto) * 100 / this.cumplimientoData.ingreso;
      const limite = 20;
      const color = cumplimiento < limite ? '#bf0412' : '#10B981';

      new Chart(context, {
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
