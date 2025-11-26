import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl : './alert.scss'
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: AlertType = 'danger';

  getIconClass(): string {
    switch (this.type) {
      case 'success':
        return 'fa-circle-check';
      case 'warning':
        return 'fa-triangle-exclamation';
      case 'info':
        return 'fa-circle-info';
      case 'danger':
      default:
        return 'fa-circle-xmark';
    }
  }
}
