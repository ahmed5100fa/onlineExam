import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repassword-error',
  imports: [],
  templateUrl: './repassword-error.html',
  styleUrl: './repassword-error.scss',
})
export class RepasswordError {
  @Input() formName !: FormGroup;
}
