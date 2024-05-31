import { Component, HostListener } from '@angular/core';
import { isSidebarExpanded } from '../main.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarExpanded = isSidebarExpanded;
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

  constructor(private router: Router) {
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // Aquí verificas si el clic fue dentro del botón o en uno de sus hijos
    if (!clickedElement.closest('.sidebar__plusbutton')) {
      this.news = false;
    }
  }

  ruta(href: string) {
    this.router.navigate([href], { relativeTo: this.router.routerState.root.firstChild });
  }
}
