import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

interface TableColumn {
  header: string;
  field: string;
  type: string;
  cellClass?: (row: any) => string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  activeMenuRow: any = null;

  onEdit(row: any): void {
    this.edit.emit(row);
    this.activeMenuRow = null;
  }

  onDelete(row: any): void {
    this.delete.emit(row.TransaccionID);
    this.activeMenuRow = null;
  }

  toggleMenu(row: any): void {
    if (this.activeMenuRow === row) {
      this.activeMenuRow = null;
    } else {
      this.activeMenuRow = row;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.transactions__menu')) {
      this.activeMenuRow = null;
    }
  }
}
