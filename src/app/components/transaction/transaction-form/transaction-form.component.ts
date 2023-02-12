import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserHelperService } from 'src/app/shared/helper-service';
import { WalletHelperService } from 'src/app/shared/helper-service/wallet-helper-service/wallet-helper.service';
import { Category, Transaction, Wallet } from 'src/app/shared/models';
import { CategoryService, TransactionService } from 'src/app/shared/services';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {
  isLoading: boolean = false;
  isAddCategory: boolean = false;
  transaction: Transaction = {
    userId: 0,
    walletId: 0,
    categoryId: 0,
    notes: '',
    dateTime: '',
    currency: '',
  };
  category: Category = {
    name: '',
    type: '',
  };
  selectedCategoryId: number;
  userId: number = 0;
  categories: Category[] = [];
  isCurrency: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private userHelperService: UserHelperService,
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private walletHelperService: WalletHelperService
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
          this.transaction.walletId = response.id as number;
        }
      },
    });
  }

  upsertTransaction = (): void => {
    this.isLoading = true;
    this.transaction.dateTime = new Date(
      this.transaction.dateTime as Date
    ).getTime();

    this.transactionService
      .upsertTransaction(this.transaction)
      .pipe(take(1))
      .subscribe({
        next: (response: Transaction) => {
          this.toastr.success(`Transaction added`, 'Success!');
          this.isLoading = false;
        },
        error: () => {
          this.toastr.error('Add transaction unsuccessful', 'Error!');
          this.isLoading = false;
        },
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

  selectCurrency = (currency: string): void => {
    this.transaction.currency = currency;
    this.isCurrency = true;
  };
}
