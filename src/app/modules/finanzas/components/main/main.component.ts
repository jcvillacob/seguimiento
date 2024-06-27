import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

export const isSidebarExpanded = signal(false);
export const monthYear = signal('');

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isSidebarExpanded = isSidebarExpanded;
  monthYear = monthYear;
  new_Date = false;
  year: number;
  month: string;
  months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  constructor() {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = this.months[currentDate.getMonth()];
    this.selectMonth(this.month);
  }

  newDate() {
    this.new_Date = true;
  }

  cYear(number: number) {
    this.year = this.year + number;
  }

  selectMonth(month: string) {
    this.month = month;
    this.monthYear.set(`mes=${this.months.indexOf(month)+1}&year=${this.year}`)
    setTimeout(() => {
      this.new_Date = false;
    }, 50);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.main-content__date')) {
      this.new_Date = false;
    }
  }
}
