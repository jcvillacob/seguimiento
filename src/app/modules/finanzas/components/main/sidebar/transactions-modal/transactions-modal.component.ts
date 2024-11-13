import { CommonModule } from '@angular/common';
import { Component, HostListener, effect, signal } from '@angular/core';
import { FinanzasService } from '../../../../services/finanzas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { balancesUltimosSeisMeses, transaccionesMes } from '../../../dashboard/dashboard.component';
import { monthYear } from '../../main.component';
import { toastSignal } from '../../../../../../shared/components/toast/toast.component';
import { select, Store } from '@ngrx/store';
import { CuentasState } from '../../../../store/cuentas.reducer';
import { Observable, Subscription } from 'rxjs';
import * as CuentasActions from '../../../../store/cuentas.actions';


export const transactionsModal = signal('close');
export const transactionsModalEdit = signal({});

@Component({
  selector: 'app-transactions-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions-modal.component.html',
  styleUrl: './transactions-modal.component.scss',
})
export class TransactionsModalComponent {
  counts$!: Observable<any[]>;
  private subscriptions = new Subscription();

  transactionsModal = transactionsModal;
  transaccionesMes = transaccionesMes;
  transactionsModalEdit = transactionsModalEdit;
  balancesUltimosSeisMeses = balancesUltimosSeisMeses;
  toastSignal = toastSignal;
  monthYear = monthYear;
  banks: any[] = [];
  destinationBanks: any[] = [];
  categorias: any[] = [];
  Todascategorias: any[] = [];
  activo = -1;

  /* para crear Transaccion */
  bancoSelected: any = { BancoIcono: 'banks/efectivo.avif' };
  destinationBankSelected: any = { BancoIcono: '' };
  categorySelected: any = { Icono: '' };
  verBanco = false;
  verDestinationBank = false;
  verCategory = false;
  type = 'Registrar ';

  transactionForm: FormGroup;

  constructor(private finanzasService: FinanzasService, private fb: FormBuilder, private store: Store<{ cuentas: CuentasState }>) {
    this.counts$ = this.store.pipe(select((state) => state.cuentas.cuentas));
    this.transactionForm = this.fb.group({
      saldo: [0, Validators.required],
      fecha: ['', Validators.required],
      descripcion: [''],
      recurrente: [false],
    });

    this.finanzasService.getCategorias().subscribe((data) => {
      this.Todascategorias = data;
      this.categorySelected = this.Todascategorias[0];
    });
    
    effect(() => {
      const text = this.transactionsModal();
      const transaccion: any = this.transactionsModalEdit();

      this.categorias = this.Todascategorias.filter((d) => d.Tipo == text);
      if (this.categorias.length) {
        this.categorySelected = this.categorias[0];
      }

      if (transaccion.TransaccionID) {
        this.type = 'Editar ';

        // Formatear la fecha utilizando la función
        const fechaFormateada = this.formatFecha(transaccion.Fecha);

        // Actualizar los campos del formulario con los datos de la transacción a editar
        this.transactionForm.patchValue({
          saldo: transaccion.Monto,
          fecha: fechaFormateada,
          descripcion: transaccion.Descripcion,
          recurrente: transaccion.Recurrente || false,
        });

        // Seleccionar banco y categoría basados en los datos de la transacción a editar
        this.bancoSelected = this.banks.find(bank => bank.CuentaID === transaccion.CuentaID) || this.banks[0];
        this.categorySelected = this.Todascategorias.find(cat => cat.CategoriaID === transaccion.CategoriaID) || this.Todascategorias[0];

        if (transaccion.Tipo === 'transferencia') {
          this.destinationBankSelected = this.destinationBanks.find(bank => bank.CuentaID === transaccion.CuentaDestinoID) || this.destinationBanks[0];
        }
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CuentasActions.loadCuentas());
    this.subscriptions.add(
      this.counts$.subscribe((counts) => {
        this.banks = counts;
        this.destinationBanks = counts;
        this.bancoSelected = this.banks[0];
        this.destinationBankSelected = this.destinationBanks[0];
      })
    );
  }

  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    date.setHours(date.getHours() + 5);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

  toggleModal() {
    this.transactionsModal.set('close');
    this.transactionsModalEdit.set({});
    this.type = 'Registrar ';
    this.verBanco = false;
    this.verDestinationBank = false;
    this.verCategory = false;
    this.transactionForm = this.fb.group({
      saldo: [0, Validators.required],
      fecha: ['', Validators.required],
      descripcion: [''],
      recurrente: [false],
    });
    this.bancoSelected = this.banks[0];
  }

  verBancos() {
    this.verBanco = !this.verBanco;
  }

  verDestinationBanks() {
    this.verDestinationBank = !this.verDestinationBank;
  }

  verCategories() {
    this.verCategory = !this.verCategory;
  }

  seleccionarBanco(i: number) {
    this.bancoSelected = this.banks[i];
  }

  seleccionarDestinationBank(i: number) {
    this.destinationBankSelected = this.destinationBanks[i];
  }

  seleccionarCategoria(i: number) {
    this.categorySelected = this.categorias[i];
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
    if (!clickedElement.closest('.categorias')) {
      this.verCategory = false;
    }
    if (!clickedElement.closest('.transferencia')) {
      this.verDestinationBank = false;
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaccion: any = this.transactionsModalEdit();
      const formData = {
        cuentaID: this.bancoSelected.CuentaID,
        categoriaID: this.categorySelected.CategoriaID,
        tipo: this.transactionsModal(),
        monto: this.transactionForm.value.saldo,
        fecha: this.transactionForm.value.fecha,
        descripcion: this.transactionForm.value.descripcion,
        recurrente: this.transactionForm.value.recurrente,
      };

      if (transaccion.TransaccionID) {
        // Lógica para editar una transacción existente
        this.finanzasService.updateTransaccion(transaccion.TransaccionID, formData).subscribe(
          (response) => {
            this.toastSignal.set('Transacción Actualizada Correctamente.');
            this.toggleModal();
            this.transactionForm.reset();
            this.transactionForm.patchValue({ saldo: 0, recurrente: false });
            const text = this.monthYear();
            this.finanzasService.getTransaccionesMes(text).subscribe((data: any) => {
              this.transaccionesMes.set(data);
              this.finanzasService.balancesUltimosSeisMeses().subscribe((data) => {
                this.balancesUltimosSeisMeses.set(data);
              });
            });
          },
          (error) => {
            console.error('Error al actualizar la transacción:', error);
          }
        );
      } else {
        if (this.transactionsModal() === 'transferencia') {
          // Lógica para crear transferencia
          const transferData = {
            cuentaOrigenID: this.bancoSelected.CuentaID,
            cuentaDestinoID: this.destinationBankSelected.CuentaID,
            monto: this.transactionForm.value.saldo,
            fecha: this.transactionForm.value.fecha,
            descripcion: this.transactionForm.value.descripcion,
          };
          this.finanzasService.createTransferencia(transferData).subscribe(
            (response) => {
              this.toastSignal.set('Transferencia Creada Correctamente.');
              this.toggleModal();
              this.transactionForm.reset();
              this.transactionForm.patchValue({ saldo: 0, recurrente: false });
              const text = this.monthYear();
              this.finanzasService.getTransaccionesMes(text).subscribe((data: any) => {
                this.transaccionesMes.set(data);
                this.finanzasService.balancesUltimosSeisMeses().subscribe((data) => {
                  this.balancesUltimosSeisMeses.set(data);
                });
              });
            },
            (error) => {
              console.error('Error al crear la transferencia:', error);
            }
          );
        } else {
          // Lógica para crear transacción normal
          this.finanzasService.createTransaccion(formData).subscribe(
            (response) => {
              this.toastSignal.set('Transacción Creada Correctamente.');
              this.toggleModal();
              this.transactionForm.reset();
              this.transactionForm.patchValue({ saldo: 0, recurrente: false });
              const text = this.monthYear();
              this.finanzasService.getTransaccionesMes(text).subscribe((data: any) => {
                this.transaccionesMes.set(data);
                this.finanzasService.balancesUltimosSeisMeses().subscribe((data) => {
                  this.balancesUltimosSeisMeses.set(data);
                });
              });
            },
            (error) => {
              console.error('Error al crear la transacción:', error);
            }
          );
        }
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  setTodayDate() {
    this.transactionForm.controls['fecha'].setValue(
      new Date().toISOString().substring(0, 10)
    );
  }

  setYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.transactionForm.controls['fecha'].setValue(
      yesterday.toISOString().substring(0, 10)
    );
  }
}
