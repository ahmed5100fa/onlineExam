import { Component, EventEmitter, inject, Input, Output, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService, VerifyOtpData } from 'auth';
import { ChangePassword } from "../change-password/change-password";
import { AlertComponent } from "../../../../shared/components/alert/alert";
import { AuthBtn } from "../../../../shared/components/auth-btn/auth-btn";

@Component({
  selector: 'app-verfiy-code',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ChangePassword, AlertComponent, AuthBtn],
  templateUrl: './verfiy-code.html',
  styleUrl: './verfiy-code.scss',
})
export class VerfiyCode implements OnInit, OnDestroy {
  @Input() email: string = '';
  @Output() backToForgetPassword = new EventEmitter<void>();
  private _AuthService = inject(AuthService);
  private timerInterval: any;

  timer = signal(60);
  canResend: boolean = false;
  isLoading = signal(false);
  showChangePassword = signal(false);
  apiError: string = '';

  ngOnInit() {
    this.startTimer();
    this.setupAutoFocus();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  goBack() {
    this.backToForgetPassword.emit();
  }

  verifyForm: FormGroup = new FormGroup({
    digit1: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit2: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit3: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit4: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit5: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    digit6: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  });

  validateNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105) ||
      charCode === 8 ||
      charCode === 9 ||
      charCode === 37 ||
      charCode === 39 ||
      charCode === 46 ||
      charCode === 13
    ) {
      return true;
    }

    event.preventDefault();
    return false;
  }

  setupAutoFocus() {
    Object.keys(this.verifyForm.controls).forEach((key, index, array) => {
      this.verifyForm.get(key)?.valueChanges.subscribe(value => {
        if (value && value.length === 1 && index < array.length - 1) {
          setTimeout(() => {
            const nextInput = document.getElementById(`digit${index + 2}`);
            nextInput?.focus();
          }, 10);
        }

        if (value === '' && index > 0) {
          setTimeout(() => {
            const prevInput = document.getElementById(`digit${index}`);
            prevInput?.focus();
          }, 10);
        }
      });
    });

    this.addKeyboardListeners();
  }

  addKeyboardListeners() {
    Object.keys(this.verifyForm.controls).forEach((key, index) => {
      const input = document.getElementById(`digit${index + 1}`) as HTMLInputElement;

      if (input) {
        input.addEventListener('keydown', (event: KeyboardEvent) => {
          this.handleKeyDown(event, index + 1);
        });

        input.addEventListener('input', (event: Event) => {
          this.handleInput(event, index + 1);
        });
      }
    });
  }

  handleKeyDown(event: KeyboardEvent, currentIndex: number) {
    if (event.key === 'ArrowLeft' && currentIndex > 1) {
      event.preventDefault();
      const prevInput = document.getElementById(`digit${currentIndex - 1}`) as HTMLInputElement;
      prevInput?.focus();
      prevInput?.select();
    } else if (event.key === 'ArrowRight' && currentIndex < 6) {
      event.preventDefault();
      const nextInput = document.getElementById(`digit${currentIndex + 1}`) as HTMLInputElement;
      nextInput?.focus();
      nextInput?.select();
    } else if (event.key === 'Backspace') {
      const currentInput = document.getElementById(`digit${currentIndex}`) as HTMLInputElement;
      if (!currentInput.value && currentIndex > 1) {
        event.preventDefault();
        const prevInput = document.getElementById(`digit${currentIndex - 1}`) as HTMLInputElement;
        prevInput?.focus();
        prevInput?.select();
      }
    } else if (event.key === 'Delete') {
      const currentInput = document.getElementById(`digit${currentIndex}`) as HTMLInputElement;
      if (!currentInput.value && currentIndex < 6) {
        event.preventDefault();
        const nextInput = document.getElementById(`digit${currentIndex + 1}`) as HTMLInputElement;
        nextInput?.focus();
        nextInput?.select();
      }
    }
  }

  handleInput(event: Event, currentIndex: number) {
    const input = event.target as HTMLInputElement;

    if (input.value && input.value.length === 1 && currentIndex < 6) {
      setTimeout(() => {
        const nextInput = document.getElementById(`digit${currentIndex + 1}`) as HTMLInputElement;
        nextInput?.focus();
        nextInput?.select();
      }, 10);
    }
  }

  get fullCode(): string {
    return Object.values(this.verifyForm.value).join('');
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  startTimer() {
    this.clearTimer();
    this.timer.set(60);
    this.canResend = false;

    this.timerInterval = setInterval(() => {
      this.timer.update(current => {
        const newTime = current - 1;

        if (newTime <= 0) {
          this.clearTimer();
          this.canResend = true;
          return 0;
        }

        return newTime;
      });
    }, 1000);
  }

  VerfiyCode(data: VerifyOtpData) {
    this.apiError = '';
    this.isLoading.set(true);
    this._AuthService.verifyCode(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.showChangePassword.set(true);
        this.clearTimer();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.showChangePassword.set(false);
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

  resendCode() {
    if (this.canResend && !this.isLoading()) {
      console.log('Resending code to:', this.email);
      this.startTimer();
      this.resetCode();
    }
  }

  resetCode() {
    this.verifyForm.reset();

    setTimeout(() => {
      const firstInput = document.getElementById('digit1') as HTMLInputElement;
      firstInput?.focus();
    }, 100);
  }

  onSubmit() {
    this.apiError = '';
    if (this.verifyForm.valid) {
      const data = {
        resetCode: this.fullCode
      };

      this.VerfiyCode(data);
    }
  }
}
