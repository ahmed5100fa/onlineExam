import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, ChangePasswordData, ResetPasswordData } from 'auth';
import { AlertComponent } from "../../../../shared/components/alert/alert";
import { AuthBtn } from "../../../../shared/components/auth-btn/auth-btn";
import { validat } from '../../../../shared/validators/password-validators';

@Component({
  selector: 'app-change-password',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AlertComponent, AuthBtn],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);

  isLoading = signal(false);
  apiError: string = '';


  changeForm: FormGroup = new FormGroup({
    email: new FormControl('', [
        Validators.required,
        Validators.pattern(validat.emailPattern)
      ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(validat.passPattern)
    ])
  });

ChangePassword(data: ResetPasswordData ){
  this.apiError = '';
  this.isLoading.set(true);
  this._AuthService.restPassword(data).subscribe({
    next: (res)=>{
      this.isLoading.set(false);
      if (res.token) {
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('authToken', res.token);
          }
          this._Router.navigate(['home']);
        }
    },
    error: (err)=>{
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

onsubmit(){
  this.apiError = '';
  if(this.changeForm.valid){
    this.ChangePassword(this.changeForm.value )
  }else{
    this.changeForm.markAllAsTouched();
  }
}
}
