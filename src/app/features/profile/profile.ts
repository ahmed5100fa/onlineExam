import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse, AuthService, UpdateProfileData } from 'auth';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { validat } from '../../shared/validators/password-validators';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnDestroy {

  private _Auth = inject(AuthService);
  private _Route = inject(Router);
  public token : string = localStorage.getItem("authToken") || '';
  info !: AuthResponse;

  private subscriptions: Subscription = new Subscription();

  ProfileForm : FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.pattern(validat.emailPattern)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ])
  })

  getlogged(){
    const sub = this._Auth.getLoggedUserInfo().subscribe({
      next: res => {
        this.info = res;

        this.ProfileForm.patchValue({
          username: res.user.username,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          email: res.user.email,
          phone: res.user.phone
        });
      }
    });
    this.subscriptions.add(sub);
  }

  deleteAccount() {
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      text: 'This action is permanent and cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#d1d5db'
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = this._Auth.deleteAccount().subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Your account has been deleted.',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              localStorage.removeItem("authToken");
              this._Route.navigate(['/login']);
            });
          },

          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete your account.'
            });
          }
        });
        this.subscriptions.add(sub);
      }
    });
  }

  saveChanges() {
    if (this.ProfileForm.valid) {
      const data: UpdateProfileData = this.ProfileForm.value;
      const sub = this._Auth.updateProfile(data).subscribe({
        next: res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Profile updated successfully',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update profile',
          });
        }
      });
      this.subscriptions.add(sub);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill all fields correctly',
      });
    }
  }

  ngOnInit(){
    this.getlogged();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
