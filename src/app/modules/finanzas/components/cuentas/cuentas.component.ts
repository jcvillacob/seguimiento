import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FinanzasService } from '../../services/finanzas.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { toastSignal } from '../../../../shared/components/toast/toast.component';
import { ResumenesComponent } from '../../../../shared/components/resumenes/resumenes.component';
import { EncabezadosComponent } from '../../../../shared/components/encabezados/encabezados.component';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as CuentasActions from '../../store/cuentas.actions';
import { CuentasState } from '../../store/cuentas.reducer';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, FormsModule, ResumenesComponent, EncabezadosComponent],
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss'],
  providers: [FinanzasService],
})
export class CuentasComponent implements OnInit {
  banks$!: Observable<any[]>;
  counts$!: Observable<any[]>;
  private subscriptions = new Subscription();

  toastSignal = toastSignal;
  banks: any[] = [];
  counts: any[] = [];
  balance: number = 0;
  activo = -1;
  actionsActive = false;
  resumenes: any[] = [];

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
  cuentaID: number | null = null; 

  constructor(
    private finanzasService: FinanzasService,
    private authService: AuthService,
    private store: Store<{ cuentas: CuentasState }>
  ) {
    this.banks$ = this.store.pipe(select((state) => state.cuentas.bancos));
    this.counts$ = this.store.pipe(select((state) => state.cuentas.cuentas));
  }

  ngOnInit(): void {
    this.store.dispatch(CuentasActions.loadBancos());
    this.store.dispatch(CuentasActions.loadCuentas());
    this.subscriptions.add(
      this.banks$.subscribe((banks) => {
        this.banks = banks;
        if (banks.length > 0) {
          this.bancoSelected = banks[0];
        }
      })
    );

    this.subscriptions.add(
      this.counts$.subscribe((counts) => {
        this.counts = counts;
        this.resumenes = [{ name: 'Saldo Actual', number: this.counts.reduce((acc, count) => acc + count.Saldo, 0), icon: 'fa-coins'}];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
      this.resetForm();
    }
  }

  verBancos() {
    this.verBanco = !this.verBanco;
  }

  seleccionarBanco(i: number) {
    this.bancoSelected = this.banks[i];
  }

  /* Cuentas */
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
    this.bancoSelected = this.banks.find((bank) => bank.BancoID === cuenta.BancoID) || this.bancoSelected;
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
    });
  }

  action1() {
    console.log('Acción 1 ejecutada');
  }

  action2() {
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
