import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CategoryType } from 'src/app/shared/enums';
import { UserHelperService } from 'src/app/shared/helper-service';
import {
  Category,
  Transaction,
  UpsertCategoryRequest,
} from 'src/app/shared/models';
import { CategoryService } from 'src/app/shared/services';

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
    amount: 0,
    categoryId: 0,
    notes: '',
    dateTime: '',
  };
  category: Category = {
    name: '',
    type: '',
  };
  selectedCategoryId: number;
  userId: number = 0;
  categories: Category[] = [];
  upsertCategoryRequest: UpsertCategoryRequest = {
    id: 0,
    userId: 0,
    name: '',
    type: '',
  };

  constructor(
    private categoryService: CategoryService,
    private userHelperService: UserHelperService,
    private toastr: ToastrService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.userId = userId;
          this.getAllCategories(userId);
        }
      },
    });
  }

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
}
