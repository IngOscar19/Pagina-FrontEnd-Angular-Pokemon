import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorage = inject(LocalstorageService);
  if (localStorage.getItem('accessToken')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
