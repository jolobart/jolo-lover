import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Login } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  loginModel: Login = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signIn = (): void => {
    this.isLoading = true;
    this.authService
      .login(this.loginModel)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.authService.storeToken(response.token);
          this.toastr.success('Login success', 'Success!');

          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Login unsuccessful', 'Error!');
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
}
