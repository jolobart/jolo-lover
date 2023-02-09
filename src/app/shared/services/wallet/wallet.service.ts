import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { Wallet } from '../../models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  upsertWallet(request: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(
      `${this.baseUrl}/wallets`,
      request,
      httpOptions
    );
  }
}
