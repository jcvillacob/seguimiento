import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinanzasService } from '../../services/finanzas.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { toastSignal } from '../../../../shared/components/toast/toast.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent {
  presupuestos: any[] = [
    { categoriaIcono: 'fa-solid fa-home', categoriaNombre: 'Arriendo', presupuesto: 750000, gastado: 650000 },
    { categoriaIcono: 'fa-solid fa-phone', categoriaNombre: 'Comunicaciones', presupuesto: 750000, gastado: 650000 },
    { categoriaIcono: 'fa-solid fa-home', categoriaNombre: 'Arriendo', presupuesto: 750000, gastado: 650000 },
    { categoriaIcono: 'fa-solid fa-home', categoriaNombre: 'Arriendo', presupuesto: 750000, gastado: 650000 },
  ];

  /* para crear y actualizar Cuenta */
  toastSignal = toastSignal;
  categorias: any[] = [];
  title = 'Nuevo Presupuesto';
  modal = false;
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
  presupuestoID: number | null = null; // Para manejar la actualización

  constructor(
    private finanzasService: FinanzasService,
    private authService: AuthService
  ) {
    this.getPresupuestos();
  }

  getPresupuestos() {
    this.finanzasService.getPresupuestos().subscribe(data => {
      this.presupuestos = data;
      console.log(this.presupuestos)
      this.finanzasService.getCategorias().subscribe(data => {
        this.categorias = data.filter(c => c.Tipo == 'Gasto');
        this.categoriaSelected = this.categorias[0];
        console.log(this.categorias);
      })
    })
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
  }


}
