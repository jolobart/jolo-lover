import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { Login, Register, User } from '../../models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(request: Register): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/auth/register`,
      request,
      httpOptions
    );
  }

  login(request: Login): Observable<string> {
    console.log(request);
    return this.http.post<string>(
      `${this.baseUrl}/auth/login`,
      request,
      httpOptions
    );
  }

  logout(): void {
    localStorage.clear();
  }

  storeToken(token: any): void {
    localStorage.setItem('bearerToken', token);
  }

  getToken(): string {
    return localStorage.getItem('bearerToken') as string;
  }

  isUserAuthenticated(): boolean {
    return !!this.getToken();
  }
}
