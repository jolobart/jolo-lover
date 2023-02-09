import { Component } from '@angular/core';
import { Register } from 'src/app/shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading: boolean = false;
  register: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  signUp = (): void => {
    this.isLoading = true;
  };
}
