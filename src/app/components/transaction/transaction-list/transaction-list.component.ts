import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/models';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { CategoryService } from 'src/app/shared/services';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  category: Category;
  currentDate: Date = new Date(Date.now());

  constructor(private categoryService: CategoryService) {}

  openTransactionDetails = (): void => {

  };

  // getTransactionCategory = (id: number): void => {
  //   this.categoryService.getCategoryById(id).subscribe((response: Category) => {
  //     this.category = response;
  //   });
  // };
}
