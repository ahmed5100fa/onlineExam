import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const prevlinkGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('authToken');

    if (token) {
      router.navigate(['/home']);
      return false;
    }
  }

  return true;
};
