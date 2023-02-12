import { CategoryType } from '../enums';

export interface Category {
  id?: number;
  name?: string;
  type?: CategoryType | string;
  userId?: number;
}

export interface UpsertCategoryRequest {
  id?: number;
  userId: number;
  name: string;
  type?: CategoryType | string;
}

export interface GetCategoryRequest {
  id: number;
  userId: number;
}
