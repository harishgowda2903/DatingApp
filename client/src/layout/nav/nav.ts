import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-servie';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountService = inject(AccountService);
  private toast = inject(ToastService);
  private router = inject(Router);
  protected creds: any ={}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/members']);      
        this.toast.success('Login successful'); 
        this.creds = {};
      },
      error: (error) => {
        this.router.navigate(['/']);
        this.toast.error('Login failed: ' + error.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
    this.toast.info('You have been logged out');
  }
}
