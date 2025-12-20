import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ChangePasswordData } from 'auth';
import { AlertComponent } from "../../../../../../shared/components/alert/alert";
import Swal from 'sweetalert2';
import { PasswordError } from "../../../../../../shared/components/password-error/password-error";
import { RepasswordError } from "../../../../../../shared/components/repassword-error/repassword-error";
import { matchPasswords } from '../../../../../../shared/validators/match-passwords.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-changeprofilepass',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, AlertComponent, PasswordError, RepasswordError],
  templateUrl: './changeprofilepass.html',
  styleUrl: './changeprofilepass.scss',
})
export class Changeprofilepass implements OnDestroy {
  private _Auth = inject(AuthService);
  private _Route = inject(Router);
  public token: string = localStorage.getItem("authToken") || '';
  apiError: string = '';

  private changePassSubscription?: Subscription;

  changePass: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]),
    rePassword: new FormControl('', [Validators.required])
  }, {
    validators: matchPasswords('password', 'rePassword')
  });

  ChangePassword() {
    this.apiError = '';
    const data: ChangePasswordData = this.changePass.value;

    // Unsubscribe before creating new subscription to avoid multiple subscriptions
    if (this.changePassSubscription) {
      this.changePassSubscription.unsubscribe();
    }

    this.changePassSubscription = this._Auth.changePassword(data).subscribe({
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

  ngOnDestroy() {
    if (this.changePassSubscription) {
      this.changePassSubscription.unsubscribe();
    }
  }
}
