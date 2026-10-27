import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private readonly router = inject(Router);

  username = '';
  password = '';
  rememberMe = false;
  passwordVisible = false;
  statusMessage = '';
  statusKind: 'error' | 'info' = 'error';

  submitLogin(): void {
    const usernameMatches = this.username.trim().toLowerCase() === 'admin';
    const passwordMatches = this.password === 'admin@123';

    if (usernameMatches && passwordMatches) {
      void this.router.navigateByUrl('/admin/dashboard');
      return;
    }

    this.statusKind = 'error';
    this.statusMessage = 'The username or password is incorrect.';
  }

  showPasswordHelp(): void {
    this.statusKind = 'info';
    this.statusMessage = 'Password recovery is not configured for this demo account.';
  }
}
