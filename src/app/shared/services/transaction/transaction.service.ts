import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getAllTransactions = (): Observable<Transaction[]> => {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`, httpOptions);
  }
}
