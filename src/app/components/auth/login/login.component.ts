import { Component } from '@angular/core';
import { Login } from 'src/app/shared/models';

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

  signIn = (): void => {
    this.isLoading = true;
  };
}
