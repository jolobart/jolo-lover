import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserHelperService {
  private userId$ = new BehaviorSubject<number>(0);
  private user$ = new BehaviorSubject<User>({
    id: 0,
    name: '',
    email: '',
    selectedWalletId: 0,
  });

  constructor() {
    const storedUserId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');
    if (storedUserId) {
      this.userId$.next(Number(storedUserId));
    }

    if (storedUser) {
      this.user$.next(JSON.parse(storedUser));
    }
  }

  setUser = (user: User): void => {
    this.user$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  getUser = (): Observable<User> => {
    return this.user$.asObservable();
  };

  setUserId = (id: number): void => {
    this.userId$.next(id);
    localStorage.setItem('userId', id.toString());
  };

  getUserId = (): Observable<number> => {
    return this.userId$.asObservable();
  };
}
