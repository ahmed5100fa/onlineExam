import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginCredentials } from 'auth'

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {

  _AuthService = inject(AuthService)
  
  apiError: string = '';
  isLoading: boolean = false;

  LogginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email, 
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ])
  });

  loggin(data: LoginCredentials) {
    this.isLoading = true;
    this.apiError = ''; 

    this._AuthService.Login(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        if (res.token) {
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('authToken', res.token);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        
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