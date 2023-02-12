import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ModalTitle } from 'src/app/shared/constants/modal-title.constant';
import { ComponentType } from 'src/app/shared/enums';
import { UserHelperService } from 'src/app/shared/helper-service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import {
  GetWalletByIdRequest,
  ModalWrapperDetails,
  Transaction,
  User,
  Wallet,
} from 'src/app/shared/models';
import {
  AuthService,
  TransactionService,
  WalletService,
} from 'src/app/shared/services';

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
  getWalletByIdRequest: GetWalletByIdRequest = {
    id: 0,
    userId: 0,
  };

  constructor(
    private userHelperService: UserHelperService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private walletService: WalletService,
    private walletHelperService: WalletHelperService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.getUserById(userId);
          this.getWalletById();
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
          this.getWalletByIdRequest.id = this.user.selectedWalletId;
          this.getWalletByIdRequest.userId = this.user.id;
          this.userHelperService.setUser(this.user);
        },
      });
  };

  getWalletById = () => {
    this.walletService
      .getWalletById(this.getWalletByIdRequest)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet) => {
          this.walletHelperService.setWallet(response);
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
