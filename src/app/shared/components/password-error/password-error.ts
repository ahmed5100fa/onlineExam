import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-error',
  imports: [],
  templateUrl: './password-error.html',
  styleUrl: './password-error.scss',
})
export class PasswordError {
  @Input() formName !: FormGroup ;
}
