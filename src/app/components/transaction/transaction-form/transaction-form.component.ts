import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserHelperService } from 'src/app/shared/helper-service';
import { TransactionHelperService } from 'src/app/shared/helper-service/transaction-helper-service/transaction-helper.service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import {
  Category,
  GetAllTransactionRequest,
  Transaction,
  Wallet,
} from 'src/app/shared/models';
import {
  CategoryService,
  TransactionService,
  WalletService,
} from 'src/app/shared/services';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {
  @Output() editStateEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() transaction: Transaction = {
    userId: 0,
    walletId: 0,
    categoryId: 0,
    notes: '',
    dateTime: '',
    currency: '',
  };
  @Input() prevTransactionAmount?: number = 0;
  @Input() isEdit: boolean = false;
  transactionList: Transaction[] = [];
  isLoading: boolean = false;
  isAddCategory: boolean = false;
  category: Category = {
    name: '',
    type: '',
  };
  wallet: Wallet = {
    userId: 0,
    name: '',
    currency: '',
  };
  selectedCategoryId: number;
  userId: number = 0;
  categories: Category[] = [];
  isCurrency: boolean = false;
  getAllTransactionRequest: GetAllTransactionRequest = {
    userId: 0,
    walletId: 0,
  };

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
          this.transaction.userId = userId;
          this.getAllCategories(userId);
        }
      },
    });

    this.walletHelperService.getWallet().subscribe({
      next: (response: Wallet) => {
        if (response) {
          this.wallet = response;
          this.transaction.walletId = response.id as number;
        }
      },
    });

    this.transactionHelperService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        if (transactions) {
          this.transactionList = transactions;
        }
      },
    });
  }

  upsertTransaction = (): void => {
    this.isLoading = true;
    this.transaction.dateTime = new Date(this.transaction.dateTime as Date);
    this.transactionService
      .upsertTransaction(this.transaction)
      .pipe(take(1))
      .subscribe({
        next: (response: Transaction) => {
          this.calculateWallet(this.category);
          this.upsertWallet(this.wallet);
          if (this.isEdit) {
            this.editStateEvent.emit(false);
            this.getAllTransactionRequest.userId = this.userId;
            this.getAllTransactionRequest.walletId = this.wallet.id as number;
            this.getAllTransaction();
          } else {
            this.transactionList.push(response);
            this.transactionHelperService.setTransactions(this.transactionList);
            this.setTransactionModel();
          }
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Add transaction unsuccessful', 'Error!');
          this.isLoading = false;
        },
      });
  };

  upsertWallet = (wallet: Wallet): void => {
    this.isLoading = true;
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
          this.isLoading = false;
        },
      });
  };

  getAllTransaction = (): void => {
    this.transactionService
      .getAllTransactions(this.getAllTransactionRequest)
      .subscribe((transactionList) => {
        this.transactionHelperService.setTransactions(transactionList);
      });
  };

  upsertCategory = (): void => {
    this.isLoading = true;
    this.category.userId = this.userId;
    this.categoryService
      .upsertCategory(this.category)
      .pipe(take(1))
      .subscribe({
        next: (response: Category) => {
          this.toastr.success(`${response.name} category added`, 'Success!');
          this.getAllCategories(this.userId);
          this.isLoading = false;
          this.isAddCategory = false;
        },
        error: () => {
          this.toastr.error('Add category unsuccessful', 'Error!');
          this.isLoading = false;
        },
      });
  };

  getAllCategories = (id: number): void => {
    this.categoryService
      .getAllCategoryById(id)
      .pipe(take(1))
      .subscribe({
        next: (response: Category[]) => {
          this.categories = response;
        },
      });
  };

  viewAddCategory = (): void => {
    this.setCategoryModel();
    this.isAddCategory = true;
  };

  cancelCategory = (): void => {
    this.isAddCategory = false;
  };

  viewCategoryDetails = (category: Category): void => {
    this.isAddCategory = true;
    this.category = category;
  };

  setTransactionModel = (): void => {
    this.transaction = {
      userId: 0,
      walletId: 0,
      categoryId: 0,
      notes: '',
      dateTime: '',
      currency: '',
    };
  };

  setCategoryModel = (): void => {
    this.category = {
      name: '',
      type: '',
    };
  };

  selectCategory = (category: Category): void => {
    this.category = category;
    this.transaction.categoryId = category.id as number;
  };

  removeCategory = (category: Category): void => {
    this.categoryService
      .removeCategory(category.id as number)
      .pipe(take(1))
      .subscribe({
        next: (response: Category) => {
          this.toastr.success(`${response.name} category removed`, 'Success!');
          this.filterCategory(response.id as number);
        },
      });
  };

  filterCategory = (id: number): void => {
    this.categories = this.categories.filter((category) => category.id != id);
  };

  calculateWallet(category: Category): void {
    if (!this.isEdit) {
      if (category.type === 'expense') {
        this.wallet.balance = Number(
          (this.wallet.balance as number) - Number(this.transaction.amount)
        );
      } else {
        this.wallet.balance = Number(
          (this.wallet.balance as number) + Number(this.transaction.amount)
        );
      }
    } else {
      if (category.type === 'expense') {
        this.wallet.balance = Number(
          Number(this.wallet.balance) - Number(this.prevTransactionAmount)
        );
        this.wallet.balance = Number(
          Number(this.wallet.balance) - Number(this.transaction.amount)
        );
      } else {
        this.wallet.balance = Number(
          Number(this.wallet.balance) + Number(this.prevTransactionAmount)
        );
        this.wallet.balance = Number(
          Number(this.wallet.balance) + Number(this.transaction.amount)
        );
      }
    }
  }

  selectCurrency = (currency: string): void => {
    this.transaction.currency = currency;
    this.isCurrency = true;
  };
}
