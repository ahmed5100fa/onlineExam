import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ChangePasswordData } from 'auth';
import { AlertComponent } from "../../../../../../shared/components/alert/alert";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changeprofilepass',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './changeprofilepass.html',
  styleUrl: './changeprofilepass.scss',
})
export class Changeprofilepass {
  private _Auth = inject(AuthService);
  private _Route = inject(Router);
  public token : string = localStorage.getItem("authToken") || '';
  apiError: string = '';

  matchPasswords(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (password !== rePassword) {
      return { mismatch: true };
    }
    return null;
  }

  changePass : FormGroup = new FormGroup({
    oldPassword : new FormControl('' , [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  ]) ,
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  ]),
  rePassword: new FormControl('', [Validators.required])
  }, { validators: this.matchPasswords });

  ChangePassword() {
  this.apiError = '';
  const data: ChangePasswordData = this.changePass.value;

  this._Auth.changePassword(data, this.token).subscribe({
    next: res => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password changed successfully. Please login again.',
        timer: 2500,
        showConfirmButton: false
      }).then(() => {
        localStorage.removeItem("authToken");
        this._Route.navigate(['/login']);
      });
    },
    error: (err) => {
      let errorMessage = 'Something went wrong. Please try again.';

      if (err.error?.message) {
        errorMessage = err.error.message;
      } else if (err.status === 0) {
        errorMessage = 'Network error. Please check your connection.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  });
}

}
