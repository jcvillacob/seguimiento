import { CommonModule } from '@angular/common';
import { Component, HostListener, Signal, computed, effect, signal } from '@angular/core';
import { FinanzasService } from '../../../../services/finanzas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export const transactionsModal = signal('close');

@Component({
  selector: 'app-transactions-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions-modal.component.html',
  styleUrl: './transactions-modal.component.scss'
})
export class TransactionsModalComponent {
  transactionsModal = transactionsModal;
  banks: any[] = [];
  categorias: any[] = [];
  Todascategorias: any[] = [];
  activo = -1;

  /* para crear Cuenta */
  bancoSelected: any = { "BancoIcono": "banks/efectivo.avif" };
  categorySelected: any = { Icono: '' };
  verBanco = false;
  verCategory = false;

  transactionForm: FormGroup;


  constructor(private finanzasService: FinanzasService, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      saldo: [0, Validators.required],
      fecha: ['', Validators.required],
      descripcion: [''],
      recurrente: [false]
    });

    this.finanzasService.getCategorias().subscribe(data => {
      this.Todascategorias = data;
      this.categorySelected = this.Todascategorias[0];
      this.finanzasService.getCuentas().subscribe(data => {
        this.banks = data;
        this.bancoSelected = this.banks[0];
      });
    });
    effect(() => {
      const text = this.transactionsModal();
      this.categorias= this.Todascategorias.filter(d => d.Tipo == text);
      if(this.categorias.length) {
        this.categorySelected = this.categorias[0];
      }
    });
  }

  toggleModal() {
    this.transactionsModal.set('close');
    this.verBanco = false;
    this.verCategory = false;
  }

  verBancos() {
    this.verBanco = !this.verBanco;
  }

  verCategories() {
    this.verCategory = !this.verCategory;
  }

  seleccionarBanco(i: number) {
    this.bancoSelected = this.banks[i];
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
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formData = {
        cuentaID: this.bancoSelected.CuentaID,
        categoriaID: this.categorySelected.CategoriaID,
        tipo: this.transactionsModal(),
        monto: this.transactionForm.value.saldo,
        fecha: this.transactionForm.value.fecha,
        descripcion: this.transactionForm.value.descripcion,
        recurrente: this.transactionForm.value.recurrente
      };

      this.finanzasService.createTransaccion(formData).subscribe(
        response => {
          console.log('Transacción creada con éxito:', response);
          this.toggleModal();
          this.transactionForm.reset();
          this.transactionForm.patchValue({ saldo: 0, recurrente: false });
        },
        error => {
          console.error('Error al crear la transacción:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  setTodayDate() {
    this.transactionForm.controls['fecha'].setValue(new Date().toISOString().substring(0, 10));
  }

  setYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.transactionForm.controls['fecha'].setValue(yesterday.toISOString().substring(0, 10));
  }
}
