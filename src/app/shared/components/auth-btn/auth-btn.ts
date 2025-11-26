import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-btn',
  imports: [],
  templateUrl: './auth-btn.html',
  styleUrl: './auth-btn.scss',
})
export class AuthBtn {
  @Input() text: string = '';
  @Input() htmlText: string = '';
  @Input() loading: boolean = false;
  @Input() type: string = 'primary';
}
