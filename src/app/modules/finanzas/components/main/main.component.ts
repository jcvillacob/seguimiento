import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

export const isSidebarExpanded = signal(true);

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isSidebarExpanded = isSidebarExpanded;
  new_Date = false;
  year = 2024;

  newDate() {
    this.new_Date = true;
  }

  cYear(number: number) {
    this.year = this.year + number;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.main-content__date')) {
      this.new_Date = false;
    }
  }
}
