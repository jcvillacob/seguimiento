import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumenes.component.html',
  styleUrl: './resumenes.component.scss'
})
export class ResumenesComponent {
  @Input() resumenes!: any[];



}
