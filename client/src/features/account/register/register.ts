import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/User';
import { AccountService } from '../../../core/services/account-service';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds= {} as RegisterCreds;

  register() {
    this.accountService.register(this.creds).subscribe({
      next: (user: User) => {
        console.log('Registration successful:', user);
        this.cancel();
  },
      error: (error) => {
      console.error('Registration failed:', error);
      }
    });
  };  

  cancel() {
    console.log('Registration cancelled');
    this.cancelRegister.emit(false);
  }
}
