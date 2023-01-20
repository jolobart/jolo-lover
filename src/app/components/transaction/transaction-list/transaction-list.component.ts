import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];

  openTransactionDetails = (): void => { };
}
