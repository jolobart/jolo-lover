import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserHelperService {
  private userSubject$ = new BehaviorSubject<User>({
    id: 0,
    name: '',
    email: '',
  });

  constructor() {}

  setUser = (user: User): void => {
    this.userSubject$.next(user);
  };

  getUser = (): Observable<User> => {
    return this.userSubject$.asObservable();
  };
}
