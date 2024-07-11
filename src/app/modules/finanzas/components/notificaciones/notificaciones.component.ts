import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss'
})
export class NotificacionesComponent {
  notifications: any[] = [];

  constructor(private finanzasService: FinanzasService) {
    this.finanzasService.getVuelos().subscribe(data => {
      this.notifications = data;
      console.log(data)
    })
  }

}
