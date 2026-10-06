import { inject } from '@angular/core/primitives/di';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { ToastService } from '../services/toast-servie';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toastService = inject(ToastService);

  if(accountService.currentUser()) {
    return true;
  } else {
    toastService.error('You are not authorized to access this page.');
    return false;
  }
};
