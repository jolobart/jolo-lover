import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { Transaction } from '../../models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  upsertTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.baseUrl}/transactions`,
      transaction,
      httpOptions
    );
  }

  getAllTransactions = (): Observable<Transaction[]> => {
    return this.http.get<Transaction[]>(`${this.baseUrl}`, httpOptions);
  };

  getTransactionById(id: number): Observable<Transaction> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Transaction>(url);
  }

  getTransactionWalletById(id: number): Observable<Transaction[]> {
    const url = `${this.baseUrl}?walletId=${id}`;
    return this.http.get<Transaction[]>(url);
  }

  getTransactionByCategoryId(id: number): Observable<Transaction[]> {
    const url = `${this.baseUrl}?categoryId=${id}`;
    return this.http.get<Transaction[]>(url);
  }

  deleteTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.baseUrl}/${transaction.id}`;
    return this.http.delete<Transaction>(url);
  }
}
