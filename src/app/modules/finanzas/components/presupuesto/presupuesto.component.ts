import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinanzasService } from '../../services/finanzas.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { toastSignal } from '../../../../shared/components/toast/toast.component';
import Swal from 'sweetalert2';
import { findIndex } from 'rxjs';
import { presupuestoMes } from '../dashboard/dashboard.component';
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [CommonModule, FormsModule, EncabezadosComponent],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent {
  presupuestoMes = presupuestoMes;
  presupuestos: any[] = [];

  /* Resumen */
  totalPresupuesto: number = 0;
  totalGastado: number = 0;
  porcentajeCumplimiento: number = 0;

  /* para crear y actualizar Cuenta */
  toastSignal = toastSignal;
  categorias: any[] = [];
  title = 'Nuevo Presupuesto';
  modal = false;
  activePresupuestoMenu = -1;
  categoriaSelected = {
    CategoriaID: 1,
    Nombre: "Arriendo",
    Icono: "fa-solid fa-house"
  }
  verCategory = false;

  /* Form inputs */
  presupuesto!: number;
  descripcion: string = '';
  tipo: string = 'Ahorros';
  incluirEnDashboard: boolean = true;
  presupuestoID: number | null = null;

  constructor(
    private finanzasService: FinanzasService,
    private authService: AuthService
  ) {
    this.getPresupuestos();
  }

  getPresupuestos() {
    this.finanzasService.getPresupuestos().subscribe((data: any) => {
      this.presupuestos = data;
      this.presupuestoMes.set(data);
      this.calculateTotals();
      this.finanzasService.getCategorias().subscribe(data => {
        this.categorias = data.filter(c => c.Tipo == 'Gasto');
        this.categoriaSelected = this.categorias[0];
      });
    });
  }

  calculateTotals() {
    this.totalPresupuesto = this.presupuestos.reduce((sum, presupuesto) => sum + presupuesto.Monto, 0);
    this.totalGastado = this.presupuestos.reduce((sum, presupuesto) => sum + presupuesto.Gastado, 0);
    this.porcentajeCumplimiento = (this.totalGastado / this.totalPresupuesto) * 100;
  }

  getTranslationPercentage(presupuesto: any): string {
    const percentage = (presupuesto.Gastado - presupuesto.Monto) * 100 / presupuesto.Monto;
    return `${Math.max(-100, Math.min(percentage, 0))}%`;
  }

  /* Modal */
  toggleModal() {
    this.modal = !this.modal;
    if (!this.modal) {
      this.resetForm();
    }
  }

  verCategorias() {
    this.verCategory = !this.verCategory;
  }

  seleccionarCategoria(i: number) {
    this.categoriaSelected = this.categorias[i];
  }

  resetForm() {
    this.title = 'Nuevo Presupuesto';
    this.presupuestoID = null;
    this.presupuesto = 0;
    this.categoriaSelected = this.categorias[0];
  }

  menuPresupuesto(presupuestoID: number) {
    this.activePresupuestoMenu = presupuestoID;
  }

  editPresupuesto(presupuesto: any) {
    this.title = 'Editar Presupuesto';
    this.presupuestoID = presupuesto.PresupuestoID;
    this.presupuesto = presupuesto.Monto;
    const findIndex = this.categorias.findIndex(categoria => categoria.CategoriaID === presupuesto.CategoriaID);
    if (findIndex !== -1) {
      this.categoriaSelected = this.categorias[findIndex];
    } else {
      // Manejar el caso donde no se encuentra la categoría
      console.error('Categoría no encontrada');
    }
    this.modal = !this.modal;
  }




  saveCuenta() {
    if (this.presupuestoID === null) {
      this.createPresupuesto();
    } else {
      this.updatePresupuesto();
    }
  }

  createPresupuesto() {
    const presupuestoData = {
      usuarioID: this.authService.getUsuarioID(),
      categoriaID: this.categoriaSelected.CategoriaID,
      monto: this.presupuesto
    };

    this.finanzasService.createPresupuesto(presupuestoData).subscribe(
      (response) => {
        this.toastSignal.set('Presupuesto Creado Correctamente.');
        this.getPresupuestos();
        this.toggleModal();
      },
      (error) => {
        console.error('Error creating budget:', error);
        this.toggleModal();
        Swal.fire({
          title: "Presupuesto no Guardado",
          text: "No se ha podido crear el presupuesto",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        })
      }
    );
  }

  updatePresupuesto() {
    const presupuestoData = {
      categoriaID: this.categoriaSelected.CategoriaID,
      monto: this.presupuesto
    };

    if (this.presupuestoID !== null) {
      this.finanzasService.updatePresupuesto(this.presupuestoID, presupuestoData).subscribe(
        (response) => {
          this.getPresupuestos();
          this.toastSignal.set('Presupuesto Actualizado Correctamente.');
          this.toggleModal();
        },
        (error) => {
          console.error('Error updating budget:', error);
        }
      );
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.lista__selected')) {
      this.verCategory = false;
    }
    if (!clickedElement.closest('.transactions__menu')) {
      this.activePresupuestoMenu = -1;
    }
  }


}
