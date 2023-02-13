import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs';
import { CategoryType } from 'src/app/shared/enums';
import { UserHelperService } from 'src/app/shared/helper-service';
import { TransactionHelperService } from 'src/app/shared/helper-service/transaction-helper-service/transaction-helper.service';
import { Category, Transaction } from 'src/app/shared/models';
import { CategoryService } from 'src/app/shared/services';

@Component({
  selector: 'cashflow-statement',
  templateUrl: './cashflow-statement.component.html',
  styleUrls: ['./cashflow-statement.component.scss'],
})
export class CashflowStatementComponent implements OnInit {
  categories: Category[] = [];
  transactionList: Transaction[] = [];
  category: Category = {
    id: 0,
    userId: 0,
    name: 'Default',
    type: '',
  };
  userId: number = 0;
  currentMonthTransactions: Transaction[] = [];
  lastMonthTransactions: Transaction[] = [];
  nextMonthTransactions: Transaction[] = [];
  currentMonthIncome: number = 0;
  currentMonthExpense: number = 0;
  currentMonthStatement: number = 0;
  lastMonthIncome: number = 0;
  lastMonthExpense: number = 0;
  lastMonthStatement: number = 0;
  nextMonthIncome: number = 0;
  nextMonthExpense: number = 0;
  nextMonthStatement: number = 0;

  constructor(
    private categoryService: CategoryService,
    private userHelperService: UserHelperService,
    private transactionHelperService: TransactionHelperService
  ) {
    this.userHelperService.getUserId().subscribe({
      next: (userId: number) => {
        if (userId) {
          this.userId = userId;
          this.getAllCategories();
        }
      },
    });

    this.transactionHelperService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        if (transactions) {
          this.transactionList = transactions;
          this.getCurrentMonthTransactions();
          this.getLastMonthTransactions();
          this.getNextMonthTransactions();
          this.getCurrentMonthIncome();
          this.getCurrentMonthExpense();
          this.getLastMonthIncome();
          this.getLastMonthExpense();
          this.getNextMonthIncome();
          this.getNextMonthExpense();
          this.getTotalCurrentMonthStatement();
          this.getTotalLastMonthStatement();
          this.getTotalNextMonthStatement();
        }
      },
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getTotalCurrentMonthStatement = (): void => {
    this.currentMonthStatement =
      this.currentMonthIncome - this.currentMonthExpense;
  };

  getTotalNextMonthStatement = (): void => {
    this.nextMonthStatement = this.nextMonthIncome - this.nextMonthExpense;
  };

  getTotalLastMonthStatement = (): void => {
    this.lastMonthStatement = this.lastMonthIncome - this.lastMonthExpense;
  };

  getCurrentMonthTransactions = (): void => {
    this.currentMonthTransactions = this.transactionList.filter(
      (transaction) => {
        return moment(transaction.dateTime).isSame(moment(), 'month');
      }
    );
  };

  getLastMonthTransactions = (): void => {
    this.lastMonthTransactions = this.transactionList.filter((transaction) => {
      return moment(transaction.dateTime).isSame(
        moment().subtract(1, 'month'),
        'month'
      );
    });
  };

  getNextMonthTransactions = (): void => {
    this.nextMonthTransactions = this.transactionList.filter((transaction) => {
      return moment(transaction.dateTime).isSame(
        moment().add(1, 'month'),
        'month'
      );
    });
  };

  getCurrentMonthIncome = (): void => {
    this.currentMonthTransactions.forEach((transaction) => {
      if (
        (this.getCategoryById(transaction.categoryId)?.type as string) ===
        'income'
      ) {
        this.currentMonthIncome += Number(transaction.amount);
      }
    });
  };

  getCurrentMonthExpense = (): void => {
    this.currentMonthTransactions.forEach((transaction) => {
      if (
        (this.getCategoryById(transaction.categoryId)?.type as string) ===
        'expense'
      ) {
        this.currentMonthExpense += Number(transaction.amount);
      }
    });
  };

  getNextMonthIncome = (): void => {
    this.nextMonthTransactions.forEach((transaction) => {
      if (
        (this.getCategoryById(transaction.categoryId)?.type as string) ===
        'income'
      ) {
        this.nextMonthIncome += Number(transaction.amount);
      }
    });
  };

  getNextMonthExpense = (): void => {
    this.nextMonthTransactions.forEach((transaction) => {
      if (
        (this.getCategoryById(transaction.categoryId)?.type as string) ===
        'expense'
      ) {
        this.nextMonthExpense += Number(transaction.amount);
      }
    });
  };

  getLastMonthIncome = (): void => {
    this.lastMonthTransactions.forEach((transaction) => {
      if (
        (this.getCategoryById(transaction.categoryId)?.type as string) ===
        'income'
      ) {
        this.lastMonthIncome += Number(transaction.amount);
      }
    });
  };

  getLastMonthExpense = (): void => {
    this.lastMonthTransactions.forEach((transaction) => {
      if (
        (this.getCategoryById(transaction.categoryId)?.type as string) ===
        'expense'
      ) {
        this.lastMonthExpense += Number(transaction.amount);
      }
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

  getCategoryById = (id: number): Category => {
    this.category = this.categories.find((c) => c.id === id) as Category;
    return this.category;
  };
}
