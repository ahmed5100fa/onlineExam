import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswords( passwordKey: string,confirmPasswordKey: string): ValidatorFn {

  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordKey);
    const confirmPassword = form.get(confirmPasswordKey);

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        ...confirmPassword.errors,
        mismatch: true
      });
      return { mismatch: true };
    }

    if (confirmPassword.errors?.['mismatch']) {
      delete confirmPassword.errors['mismatch'];
      if (!Object.keys(confirmPassword.errors).length) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  };
}
