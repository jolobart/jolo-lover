import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Register, User } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signUp = (): void => {
    this.isLoading = true;
    this.authService
      .register(this.register)
      .pipe(take(1))
      .subscribe({
        next: (response: User) => {
          this.toastr.success('Registration successful', 'Success!');
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Registration unsuccessful', 'Error!');
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
}
