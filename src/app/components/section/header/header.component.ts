import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterComponent } from 'src/app/shared/components';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  signOut = (): void => {
    this.isLoading = true;
    this.authService.logout();
    this.showToaster('Logout Successful', 'success', 2500);
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.isLoading = false;
    }, 2500);
  };

  showToaster(message: string, type: string, duration: number) {
    this.toaster.message = message;
    this.toaster.type = type;
    this.toaster.duration = duration;
    this.toaster.showToaster();
  }
}
