import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (token && user.userType) {
    // Déterminez si l'utilisateur a accès à la route
    const expectedUserType = route.data['userType'];
    if (expectedUserType && expectedUserType.includes(user.userType)) {
      return true;
    } else {
      // Redirigez vers une page d'accès refusé ou autre page appropriée
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
