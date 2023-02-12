import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, UpsertCategoryRequest } from '../../models';
import { environment } from '../../../../../environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCategoryById(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/${id}`);
  }

  upsertCategory(request: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.baseUrl}/categories`,
      request,
      httpOptions
    );
  }

  removeCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(
      `${this.baseUrl}/categories/${id}`,
      httpOptions
    );
  }
}
