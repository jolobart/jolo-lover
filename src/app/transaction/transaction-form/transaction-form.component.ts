import { Component } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  isLoading: boolean = false;
  transaction: Transaction = {
    userId: 0,
    walletId: 0,
    amount: 0,
    category: 0,
    notes: '',
    dateTime: ''
  }

}
