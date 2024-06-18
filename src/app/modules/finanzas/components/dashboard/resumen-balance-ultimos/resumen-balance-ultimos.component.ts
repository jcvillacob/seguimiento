import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { balancesUltimosSeisMeses } from '../dashboard.component';

@Component({
  selector: 'app-resumen-balance-ultimos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-balance-ultimos.component.html',
  styleUrls: ['./resumen-balance-ultimos.component.scss']
})
export class ResumenBalanceUltimosComponent implements AfterViewInit {
  @ViewChild('chartResumenUltimos') chartResumenUltimos!: ElementRef<HTMLCanvasElement>;
  chartInstance: Chart | null = null;
  balancesUltimosSeisMeses = balancesUltimosSeisMeses;
  balanceData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      const data: any = this.balancesUltimosSeisMeses();
      if (data) {
        this.balanceData = Array.isArray(data) ? data : [];
        this.createLineChart();
      }
    });
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createLineChart();
    this.cdr.detectChanges();
  }

  processData(data: any) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentDate = new Date();
    const result = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthName = months[month - 1];

      const record = data.find((item: any) => item.Año === year && item.Mes === month) || { Ingresos: 0, Gastos: 0 };
      result.push({
        mes: monthName,
        ingreso: record.Ingresos,
        gasto: record.Gastos
      });
    }

    const labels = result.map((item: any) => item.mes);
    const balances = result.map((item: any) => item.ingreso - item.gasto);

    return { labels, balances };
  }

  createLineChart() {
    const { labels, balances } = this.processData(this.balanceData);

    const canvas = this.chartResumenUltimos.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(context, {
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
