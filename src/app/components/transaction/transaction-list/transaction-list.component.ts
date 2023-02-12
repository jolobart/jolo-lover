import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Category, GetCategoryRequest } from 'src/app/shared/models';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { CategoryService } from 'src/app/shared/services';
import * as moment from 'moment';
import { UserHelperService } from 'src/app/shared/helper-service';
import { take } from 'rxjs';
@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[] = [];
  sortedTransactions: Transaction[] = [];
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

  constructor(
    private categoryService: CategoryService,
    private userHelperService: UserHelperService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.userId = userId;
        }
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortTransactionsToLatest();
  }

  ngOnInit(): void {
    this.setDate();
    this.getAllCategories();
  }

  openTransactionDetails = (): void => {};

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

  sortTransactionsToLatest = (): void => {
    if (this.transactions.length) {
      this.sortedTransactions = this.transactions.sort((a, b) => {
        const momentA = moment(a.dateTime);
        const momentB = moment(b.dateTime);
        return momentB.diff(momentA);
      });
    }
  };

  formatTransactionDate(date: string | number | Date | undefined): string {
    return moment(date).format('MMM DD');
  }

  getCategoryById = (id: number): Category => {
    this.category = this.categories.find((c) => c.id === id) as Category;
    return this.category;
  };

  setDate = (): void => {
    this.currentMonth = moment().format('MMMM');
    this.currentYear = moment().format('YYYY');
    this.currentDate = moment().format('DD');
    this.currentDay = moment().format('dddd');
  };
}
