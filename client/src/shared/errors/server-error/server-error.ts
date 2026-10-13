import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-server-error',
  styleUrl: './server-error.css',
  templateUrl: './server-error.html',
})
export class ServerError {
  protected error: any;
  private router = inject(Router);
  protected showDetails: boolean = false;
  protected buttonText: string = 'Show Details';

  constructor() {
    const navigation = this.router.currentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.buttonText = this.showDetails ? 'Hide Details' : 'Show Details';

  }
}
