import { Component, OnInit } from '@angular/core';
import { ComponentType } from './shared/enums';
import { Transaction } from './shared/models';
import { TransactionService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'expense-tracker-webapp';
  componentName: ComponentType = ComponentType.TransactionForm;
  transactionList: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getAllTransaction();
  }

  getAllTransaction = (): void => {
    this.transactionService
      .getAllTransactions()
      .subscribe((transactionList) => {
        this.transactionList = transactionList;
      });
  };

  setComponentName = (name: ComponentType): void => {
    this.componentName = name;
  };
}
