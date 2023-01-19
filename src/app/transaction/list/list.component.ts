import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';

@Component({
  selector: 'transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() transactions: Transaction[] = [];
}
