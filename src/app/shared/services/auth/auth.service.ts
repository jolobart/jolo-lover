import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { Login, Register, User } from '../../models';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  private userIdPayload: number;

  constructor(private http: HttpClient) {
    this.userIdPayload = this.decodeToken();
  }

  register(request: Register): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/auth/register`,
      request,
      httpOptions
    );
  }

  login(request: Login): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/auth/login`,
      request,
      httpOptions
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/${id}`, httpOptions);
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

  decodeToken(): number {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token).id as number;
  }

  getUserFromToken(): number | null {
    return this.userIdPayload ? this.userIdPayload : null;
  }
}
