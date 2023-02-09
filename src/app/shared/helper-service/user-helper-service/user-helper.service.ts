import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHelperService {
  private userId$ = new BehaviorSubject<number>(0);

  constructor() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId$.next(Number(storedUserId));
    }
  }

  setUserId = (id: number): void => {
    this.userId$.next(id);
    localStorage.setItem('userId', id.toString());
  };

  getUserId = (): Observable<number> => {
    return this.userId$.asObservable();
  };
}
