import { Component, Input, OnInit } from '@angular/core';
import { Category, GetCategoryRequest, Wallet } from 'src/app/shared/models';
import { Transaction } from 'src/app/shared/models/transaction.model';
import {
  CategoryService,
  TransactionService,
  WalletService,
} from 'src/app/shared/services';
import * as moment from 'moment';
import { UserHelperService } from 'src/app/shared/helper-service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TransactionHelperService } from 'src/app/shared/helper-service/transaction-helper-service/transaction-helper.service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  categories: Category[] = [];
  category: Category = {
    id: 0,
    userId: 0,
    name: 'Default',
    type: '',
  };
  currentMonth: any;
  currentYear: any;
  currentDay: any;
  currentDate: any;
  userId: number = 0;
  getCategoryRequest: GetCategoryRequest = {
    id: 0,
    userId: 0,
  };
  isEdit: boolean = false;
  transactionDetails: Transaction = {
    userId: 0,
    walletId: 0,
    categoryId: 0,
    notes: '',
    dateTime: '',
    currency: '',
  };
  wallet: Wallet = {
    userId: 0,
    name: '',
    currency: '',
  };
  prevTransactionAmount?: number = 0;
  constructor(
    private categoryService: CategoryService,
    private userHelperService: UserHelperService,
    private transactionHelperService: TransactionHelperService,
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private walletHelperService: WalletHelperService,
    private walletService: WalletService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.userId = userId;
        }
      },
    });

    this.walletHelperService.getWallet().subscribe({
      next: (response: Wallet) => {
        if (response) {
          this.wallet = response;
        }
      },
    });
  }

  ngOnInit(): void {
    this.setDate();
    this.getAllCategories();
  }

  openTransactionDetails = (transaction: Transaction): void => {
    this.isEdit = true;
    this.prevTransactionAmount = transaction.amount;
    this.transactionDetails = {
      id: transaction.id,
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      currency: transaction.currency,
      dateTime: transaction.dateTime,
      userId: transaction.userId,
      walletId: transaction.walletId,
      notes: transaction.notes,
    };
  };

  removeTransaction = (transaction: Transaction): void => {
    this.transactionService
      .removeTransaction(transaction.id as number)
      .pipe(take(1))
      .subscribe({
        next: (response: Transaction) => {
          this.toastr.success(`Transaction has been deleted`, 'Success!');
          this.filterTransactions(response.id as number);
          this.transactionHelperService.setTransactions(this.transactions);
          this.wallet.balance = Number(
            Number(this.wallet.balance) + Number(transaction.amount)
          );
          this.upsertWallet(this.wallet);
          this.back();
        },
        error: () => {
          this.toastr.error(`Transaction unsuccessfully deleted`, 'Error!');
        },
      });
  };

  upsertWallet = (wallet: Wallet): void => {
    this.walletService
      .upsertWallet(wallet)
      .pipe(take(1))
      .subscribe({
        next: (response: Wallet) => {
          this.toastr.success(`Wallet has been updated`, `Success`);
          this.walletHelperService.setWallet(response);
        },
        error: () => {
          this.toastr.warning(`Error updating wallet`, `Error`);
        },
      });
  };

  getAllCategories = (): void => {
    this.categoryService
      .getAllCategoryById(this.userId)
      .pipe(take(1))
      .subscribe({
        next: (response: Category[]) => {
          this.categories = response;
        },
      });
  };

  formatTransactionDate(date: string | number | Date | undefined): string {
    return moment(date).format('MMM DD');
  }

  getCategoryById = (id: number): Category => {
    this.category = this.categories.find((c) => c.id === id) as Category;
    return this.category;
  };

  filterTransactions = (id: number): void => {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id != id
    );
  };

  isEditState = (event: boolean): void => {
    this.isEdit = event;
  };

  back = (): void => {
    this.isEdit = false;
  };

  setDate = (): void => {
    this.currentMonth = moment().format('MMMM');
    this.currentYear = moment().format('YYYY');
    this.currentDate = moment().format('DD');
    this.currentDay = moment().format('dddd');
  };
}
