import { Component, effect, HostListener } from '@angular/core';
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';
import { ResumenesComponent } from '../../../../shared/components/resumenes/resumenes.component';
import { CommonModule } from '@angular/common';
import { metas } from '../dashboard/dashboard.component';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss'],
  standalone: true,
  imports: [CommonModule, EncabezadosComponent, ResumenesComponent],
})
export class MetasComponent {
  metas: any[] = [];
  metasDashboard = metas;

  resumenes: any[] = [
    { name: 'Total Objetivo', number: 50000, icon: 'fa-bullseye' },
    { name: 'Total Ahorrado', number: 10000, icon: 'fa-piggy-bank' },
  ];

  constructor(private finanzasService: FinanzasService) {
    this.finanzasService.getMetas().subscribe((data: any) => {
      this.metas = data;
    })

    effect(() => {
      const data: any = this.metasDashboard();
      if(data.length) {
        this.metas = data;
      }
    });
  }

  activeMenuMeta: any = null;

  metasModals(event: any) {
    // Lógica para abrir el modal de creación de metas
  }

  editMeta(meta: any) {
    // Implementa la lógica para editar la meta
    console.log('Editar meta:', meta);
  }

  deleteMeta(metaId: number) {
    // Implementa la lógica para eliminar la meta
    console.log('Eliminar meta con ID:', metaId);
    // Elimina la meta del array
    this.metas = this.metas.filter(meta => meta.MetaAhorroID !== metaId);
    // Actualiza los totales
    this.updateResumenes();
  }

  // Métodos para calcular totales
  getTotalObjetivo(): number {
    return this.metas.reduce((sum, meta) => sum + meta.MontoObjetivo, 0);
  }

  getTotalAhorrado(): number {
    return this.metas.reduce((sum, meta) => sum + meta.MontoAhorrado, 0);
  }

  // Método para calcular el progreso de una meta
  getProgress(meta: any): number {
    return (meta.MontoAhorrado / meta.MontoObjetivo) * 100;
  }

  toggleMenu(meta: any): void {
    if (this.activeMenuMeta === meta) {
      this.activeMenuMeta = null;
    } else {
      this.activeMenuMeta = meta;
    }
  }

  updateResumenes() {
    this.resumenes = [
      { name: 'Total Objetivo', number: this.getTotalObjetivo(), icon: 'fa-bullseye' },
      { name: 'Total Ahorrado', number: this.getTotalAhorrado(), icon: 'fa-piggy-bank' },
    ];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.metas__menu')) {
      this.activeMenuMeta = null;
    }
  }
}
