import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { balancesUltimosSeisMeses } from '../dashboard.component';
import { DashboardCardComponent } from '../../../../../shared/components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-resumen-balance-mes',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './resumen-balance-mes.component.html',
  styleUrls: ['./resumen-balance-mes.component.scss']
})
export class ResumenBalanceMesComponent implements AfterViewInit {
  @ViewChild('chartResumenBalance') chartResumenBalance!: ElementRef<HTMLCanvasElement>;
  chartInstance: Chart | null = null;
  balancesUltimosSeisMeses = balancesUltimosSeisMeses;
  balanceData: { mes: string, ingreso: number, gasto: number }[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      const data: any = this.balancesUltimosSeisMeses();
      if (Array.isArray(data)) {
        this.balanceData = this.getLastThreeMonthsData(data);
        this.createBarChart();
      }
    });
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.cdr.detectChanges();
  }

  getLastThreeMonthsData(data: any[]): { mes: string, ingreso: number, gasto: number }[] {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentDate = new Date();
    const result: { mes: string, ingreso: number, gasto: number }[] = [];

    for (let i = 2; i >= 0; i--) {
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

    return result;
  }

  createBarChart() {
    const labels = this.balanceData.map((item: any) => item.mes);
    const ingresos = this.balanceData.map((item: any) => item.ingreso);
    const gastos = this.balanceData.map((item: any) => item.gasto);

    const canvas = this.chartResumenBalance.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(context, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ingresos',
              data: ingresos,
              borderColor: 'rgb(55, 128, 58)',
              backgroundColor: 'rgb(110, 194, 114)',
              borderWidth: 2,
              borderRadius: 25,
              borderSkipped: false,
              maxBarThickness: 35
            },
            {
              label: 'Gastos',
              data: gastos,
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
