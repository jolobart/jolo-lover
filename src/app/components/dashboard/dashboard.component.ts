import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ModalTitle } from 'src/app/shared/constants/modal-title.constant';
import { ComponentType } from 'src/app/shared/enums';
import { UserHelperService } from 'src/app/shared/helper-service';
import { ModalWrapperDetails, Transaction, User } from 'src/app/shared/models';
import { AuthService, TransactionService } from 'src/app/shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'expense-tracker-webapp';
  user: User;
  componentName: ComponentType = ComponentType.TransactionForm;
  transactionList: Transaction[] = [];
  modalWrapperDetails: ModalWrapperDetails = {
    title: ModalTitle.Default,
    componentType: ComponentType.Default,
  };

  constructor(
    private userHelperService: UserHelperService,
    private authService: AuthService,
    private transactionService: TransactionService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.getUserById(userId);
        }
      },
    });
  }

  ngOnInit(): void {
    // this.getAllTransaction();
  }

  getUserById = (id: number): void => {
    this.authService
      .getUserById(id)
      .pipe(take(1))
      .subscribe({
        next: (response: User) => {
          this.user = response;
          this.userHelperService.setUser(this.user);
        },
      });
  };

  getAllTransaction = (): void => {
    this.transactionService
      .getAllTransactions()
      .subscribe((transactionList) => {
        this.transactionList = transactionList;
      });
  };

  setComponentName = (modalWrapperDetails: ModalWrapperDetails): void => {
    this.modalWrapperDetails = modalWrapperDetails;
  };
}
