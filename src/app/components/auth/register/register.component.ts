import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';
import { Register, User } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services';
import { ToasterComponent } from '../../../shared/components/toaster/toaster.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  isLoading: boolean = false;
  register: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  signUp = (): void => {
    this.isLoading = true;
    this.authService
      .register(this.register)
      .pipe(take(1))
      .subscribe({
        next: (res: User) => {
          this.showToaster('Registration Successful', 'success', 2500);
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.isLoading = false;
          }, 2500);
        },
        error: (errorMessage) => {
          this.showToaster('Registration Failed', 'error', 2500);
          this.setRegisterModelToEmpty();
          this.isLoading = false;
        },
      });
  };

  setRegisterModelToEmpty = (): void => {
    this.register = {
      firstName: '',
      lastName: '',
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
