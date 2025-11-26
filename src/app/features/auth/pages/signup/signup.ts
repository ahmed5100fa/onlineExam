import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterCredentials } from 'auth';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../../../../shared/components/alert/alert";
import { AuthBtn } from "../../../../shared/components/auth-btn/auth-btn";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AlertComponent, AuthBtn],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {

  private _AuthService = inject(AuthService);
  private _Router = inject(Router)

  isLoading = signal(false);
  apiError: string = '';



matchPasswords(form: AbstractControl) {
  const password = form.get('password')?.value;
  const rePassword = form.get('rePassword')?.value;

  if (password !== rePassword) {
    return { mismatch: true };
  }
  return null;
}

RegisterForm: FormGroup = new FormGroup({
  firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]),
  email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
  phone: new FormControl('', [
  Validators.required,
  Validators.pattern(/^01[0125][0-9]{8}$/)
]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  ]),
  rePassword: new FormControl('', [Validators.required])
}, { validators: this.matchPasswords });


Register(data : RegisterCredentials){
  this.apiError = '';
  this.isLoading.set(true)
  this._AuthService.Register(data).subscribe({
   next :  res => {
      this.isLoading.set(false);
      this._Router.navigate(['home']);
      if(res.token){
        if(typeof localStorage !== 'undefined'){
          localStorage.setItem('authToken' , res.token);
        }
      }
    },
    error : err => {
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

SubmitRegister(){
  this.apiError = '';
  if(this.RegisterForm.valid){
    this.Register(this.RegisterForm.value)
  }else{
     this.RegisterForm.markAllAsTouched();
  }
}
}
