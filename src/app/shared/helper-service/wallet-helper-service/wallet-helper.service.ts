import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wallet } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class WalletHelperService {
  private selectedWallet$ = new BehaviorSubject<Wallet>({
    id: 0,
    userId: 0,
    name: '',
    balance: 0,
    currency: '',
  });

  constructor() {
    const storedselectedWallet = localStorage.getItem('selectedWallet');
    if (storedselectedWallet) {
      this.selectedWallet$.next(JSON.parse(storedselectedWallet));
    }
  }

  setWallet = (wallet: Wallet): void => {
    this.selectedWallet$.next(wallet);
    localStorage.setItem('selectedWallet', JSON.stringify(wallet));
  };

  getWallet = (): Observable<Wallet> => {
    return this.selectedWallet$.asObservable();
  };
}
