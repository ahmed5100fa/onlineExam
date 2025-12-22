import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService, ForgotPasswordData } from 'auth';
import { NgClass } from '@angular/common';
import { VerfiyCode } from "../verfiy-code/verfiy-code";
import { AlertComponent } from "../../../../shared/components/alert/alert";
import { AuthBtn } from "../../../../shared/components/auth-btn/auth-btn";
import { validat } from '../../../../shared/validators/password-validators';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    VerfiyCode,
    AlertComponent,
    AuthBtn
],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPasswordComponent {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);

  isLoading = signal(false);
  showVerifyCode = signal(false);
  apiError: string = '';

  ForgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(validat.emailPattern)
    ])
  })

  ForgetPassword(data: ForgotPasswordData) {
    this.apiError = '';
    this.isLoading.set(true);
    this._AuthService.forgetPassword(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.showVerifyCode.set(true);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.error?.message) {
          this.apiError = err.error.message;
        } else if (err.status === 0) {
          this.apiError = 'Network error. Please check your connection.';
        } else {
          this.apiError = 'Something went wrong. Please try again.';
        }
      }
    })
  }

  onSubmit() {
    this.apiError = '';
    if (this.ForgetForm.valid) {
      this.ForgetPassword(this.ForgetForm.value)
    } else {
      this.ForgetForm.markAllAsTouched();
    }
  }

    handleBackToForgetPassword() {
    this.showVerifyCode.set(false);
  }

}
