import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { map, Observable } from 'rxjs';
import { RemoveWalletRequest, SelectWalletRequest, Wallet } from '../../models';

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

  getWalletList(id: number): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(
      `${this.baseUrl}/wallets/${id}`,
      httpOptions
    );
  }

  selectWallet(request: SelectWalletRequest): Observable<Wallet> {
    return this.http.put<Wallet>(
      `${this.baseUrl}/wallets`,
      request,
      httpOptions
    );
  }

  removeWallet(id: number): Observable<Wallet> {
    return this.http.delete<Wallet>(
      `${this.baseUrl}/wallets/${id}`,
      httpOptions
    );
  }
}
