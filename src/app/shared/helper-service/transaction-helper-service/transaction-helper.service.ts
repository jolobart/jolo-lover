import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TransactionHelperService {
  private transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor() {}

  setTransactions = (transactions: Transaction[]): void => {
    this.transactions$.next(transactions);
  };

  getTransactions = (): Observable<Transaction[]> => {
    return this.transactions$.asObservable();
  };
}
