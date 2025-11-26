import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginCredentials } from 'auth'
import { Router } from '@angular/router';
import { AlertComponent } from "../../../../shared/components/alert/alert";
import { AuthBtn } from "../../../../shared/components/auth-btn/auth-btn";

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AlertComponent, AuthBtn],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {

  private _AuthService = inject(AuthService);
  private _Router = inject(Router)

  apiError: string = '';
  isLoading = signal(false);

  LogginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ])
  });

  loggin(data: LoginCredentials) {
    this.isLoading.set(true);
    this.apiError = '';

    this._AuthService.Login(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.token) {
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('authToken', res.token);
          }
          this._Router.navigate(['home']);
        }
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
    });
  }

  onSubmit() {
    this.apiError = '';

    if (this.LogginForm.valid) {
      this.loggin(this.LogginForm.value);
    } else {
      this.LogginForm.markAllAsTouched();
    }
  }
}
