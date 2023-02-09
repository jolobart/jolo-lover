import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ToasterComponent } from 'src/app/shared/components';
import { Login } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  isLoading = false;
  loginModel: Login = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  signIn = (): void => {
    this.isLoading = true;
    this.authService
      .login(this.loginModel)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.authService.storeToken(response.token);
          this.showToaster('Login Successful', 'success', 2500);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            this.isLoading = false;
          }, 2500);
        },
        error: () => {
          this.showToaster('Login Failed', 'error', 2500);
          this.setLoginModelToEmpty();
          this.isLoading = false;
        },
      });
  };

  setLoginModelToEmpty = (): void => {
    this.loginModel = {
      email: '',
      password: '',
    };
  };

  showToaster(message: string, type: string, duration: number) {
    this.toaster.message = message;
    this.toaster.type = type;
    this.toaster.duration = duration;
    this.toaster.showToaster();
  }
}
