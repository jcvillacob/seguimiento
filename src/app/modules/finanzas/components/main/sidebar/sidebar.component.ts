import { Component, HostListener } from '@angular/core';
import { isSidebarExpanded } from '../main.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionsModalComponent, transactionsModal } from './transactions-modal/transactions-modal.component';
import { FinanzasService } from '../../../services/finanzas.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, TransactionsModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarExpanded = isSidebarExpanded;
  transactionsModal = transactionsModal;
  news = false;
  menuItems = [
    { icon: 'OXVih02dFZ53', title: 'Dashboard', href: 'dashboard' },
    { icon: 'T9GUVjFN9Jt6', title: 'Cuentas', href: 'cuentas' },
    { icon: '7232ShL30iuj', title: 'Transacciones', href: 'transacciones' },
    { icon: '0aEdGbZHXkI0', title: 'Tarjetas de Crédito', href: 'credito' },
    { icon: 'VnLQBQNTyMdN', title: 'Presupuesto', href: 'presupuesto' },
    { icon: 'q0lJYalRDd5h', title: 'Reportes', href: 'reportes' },
    { icon: 'RxzGRwYEbiqu', title: 'Más Opciones', href: 'opciones' },
    { icon: 'ybfklM8wYSX1', title: 'Configuraciones', href: 'configuraciones' }
  ];

  constructor(private router: Router, private finanzasService: FinanzasService) {
  }

  ngOnInit() {}

  logout() {
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.isSidebarExpanded.update(expanded => !expanded);
  }

  new() {
    this.news = true;
  }

  transactionsModals(transaction: string) {
    this.transactionsModal.set(transaction);
    setTimeout(() => {
      this.news = false;
    }, 50)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.sidebar__plusbutton')) {
      this.news = false;
    }
  }

  ruta(href: string) {
    this.router.navigate([href], { relativeTo: this.router.routerState.root.firstChild });
  }
}
