import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FinanzasService } from '../../services/finanzas.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { toastSignal } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss'],
  providers: [FinanzasService],
})
export class CuentasComponent {
  toastSignal = toastSignal;
  banks: any[] = [];
  counts: any[] = [];
  balance: number = 0;
  activo = -1;
  actionsActive = false;

  /* para crear y actualizar Cuenta */
  title = 'Nueva Cuenta';
  modal = false;
  bancoSelected = {
    BancoID: 1,
    Nombre: 'Efecivo',
    Tipo: 'Efectivo',
    Icono: 'banks/efectivo.avif',
  };
  verBanco = false;

  /* Form inputs */
  saldo!: number;
  descripcion: string = '';
  tipo: string = 'Ahorros';
  incluirEnDashboard: boolean = true;
  cuentaID: number | null = null; // Para manejar la actualización

  constructor(
    private finanzasService: FinanzasService,
    private authService: AuthService
  ) {
    this.getcuentas();
  }

  /* Modales */
  menuSetting(i: number) {
    this.activo = i;
  }

  menuSettingActions() {
    this.actionsActive = !this.actionsActive;
  }

  toggleModal() {
    this.modal = !this.modal;
    if (!this.modal) {
      this.resetForm(); // Resetear el formulario cuando se cierra el modal
    }
  }

  verBancos() {
    this.verBanco = !this.verBanco;
  }

  seleccionarBanco(i: number) {
    this.bancoSelected = this.banks[i];
  }

  /* Cuentas */
  getcuentas() {
    this.finanzasService.getBancos().subscribe((data) => {
      this.bancoSelected = data[0];
      this.banks = data;
      this.finanzasService.getCuentas().subscribe((data) => {
        this.counts = data;
        this.balance = this.counts.reduce((acc, count) => acc + count.Saldo, 0);
      });
    });
  }

  saveCuenta() {
    if (this.cuentaID === null) {
      this.createCuenta();
    } else {
      this.updateCuenta();
    }
  }

  createCuenta() {
    const cuentaData = {
      usuarioID: this.authService.getUsuarioID(),
      bancoID: this.bancoSelected.BancoID,
      saldo: this.saldo,
      descripcion: this.descripcion,
      tipo: this.tipo,
      activo: this.incluirEnDashboard,
    };

    this.finanzasService.createCuenta(cuentaData).subscribe(
      (response) => {
        this.toastSignal.set('Cuenta Creada Correctamente.');
        this.toggleModal();
        this.getcuentas();
      },
      (error) => {
        console.error('Error creating account:', error);
      }
    );
  }

  updateCuenta() {
    const cuentaData = {
      bancoID: this.bancoSelected.BancoID,
      saldo: this.saldo,
      descripcion: this.descripcion,
      tipo: this.tipo,
      activo: this.incluirEnDashboard,
    };

    if (this.cuentaID !== null) {
      this.finanzasService.updateCuenta(this.cuentaID, cuentaData).subscribe(
        (response) => {
          this.toastSignal.set('Cuenta Actualizada Correctamente.');
          this.toggleModal();
          this.getcuentas();
        },
        (error) => {
          console.error('Error updating account:', error);
        }
      );
    }
  }

  editCuenta(cuenta: any) {
    this.title = 'Editar Cuenta';
    this.cuentaID = cuenta.CuentaID;
    this.saldo = cuenta.Saldo;
    this.descripcion = cuenta.Descripcion;
    this.incluirEnDashboard = cuenta.Activo;
    this.bancoSelected =
      this.banks.find((bank) => bank.BancoID === cuenta.BancoID) ||
      this.bancoSelected;
    this.toggleModal();
  }

  resetForm() {
    this.title = 'Nueva Cuenta';
    this.cuentaID = null;
    this.saldo = 0;
    this.descripcion = '';
    this.incluirEnDashboard = true;
    this.bancoSelected = this.banks[0];
  }

  archivarCuenta(cuentaID: number, inactivo: number) {
    this.finanzasService.updateActivo(cuentaID, inactivo).subscribe((data) => {
      this.toastSignal.set('Cuenta Archivada Correctamente.');
      this.getcuentas();
    });
  }

  action1() {
    // Acción 1
    console.log('Acción 1 ejecutada');
  }

  action2() {
    // Acción 2
    console.log('Acción 2 ejecutada');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.title__setting')) {
      this.activo = -1;
    }
    if (!clickedElement.closest('.lista__selected')) {
      this.verBanco = false;
    }
    if (!clickedElement.closest('.actions__action')) {
      this.actionsActive = false;
    }
  }
}
