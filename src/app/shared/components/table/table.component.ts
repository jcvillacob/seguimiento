import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
}
