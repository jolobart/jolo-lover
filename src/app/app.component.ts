import { Component } from '@angular/core';
import { Transaction } from './shared/models/transaction.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-tracker-webapp';
  componentName: string = "";
  transactionList: Transaction[] = [
    {
      id: 1,
      userId: 1,
      walletId: 1,
      amount: 13,
      category: 1,
      notes: 'BGC bus ticket fare.',
      dateTime: ''
    },
    {
      id: 2,
      userId: 1,
      walletId: 2,
      amount: 190,
      category: 2,
      notes: 'Starbucks coffee.',
      dateTime: ''
    },
    {
      id: 2,
      userId: 1,
      walletId: 2,
      amount: 500,
      category: 4,
      notes: 'Salary.',
      dateTime: ''
    }
  ]

  setComponentName = (name: string): void => {
    this.componentName = name;
  }
}
