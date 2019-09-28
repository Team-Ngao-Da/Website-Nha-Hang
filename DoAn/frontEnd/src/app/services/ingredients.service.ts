import { Ingredients } from './../models/ingredients';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Page } from './../models/page';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private apiService: ApiService) { }
  list(): Observable<RootObj<[Ingredients]>> {
    return this.apiService.get<RootObj<[Ingredients]>>(this.apiService.apiUrl.Ingredients);
  }
  listPage(page: Page): Observable<RootObj<[Ingredients]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Ingredients]>>
      (`${this.apiService.apiUrl.Ingredients}?${queryString}`);
  }
  listByBill(id: number, page: Page): Observable<RootObj<[Ingredients]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Ingredients]>>
      (`${this.apiService.apiUrl.Ingredients}/${id}?${queryString}`);
  }
  get(B_ID): Observable<RootObj<Ingredients>> {
    return this.apiService.get<RootObj<Ingredients>>(`${this.apiService.apiUrl.Ingredients}/${B_ID}`);
  }

  save(data: Ingredients): Observable<RootObj<Ingredients>> {
    if (data.MA_ID === 0) {
      return this.apiService.post<RootObj<Ingredients>>(this.apiService.apiUrl.Ingredients, data);
    } else {
      return this.apiService.put<RootObj<Ingredients>>(`${this.apiService.apiUrl.Ingredients}/${data.MA_ID}`, data);
    }
  }
  delete(B_ID: number): Observable<RootObj<Ingredients>> {
    return this.apiService.delete<RootObj<Ingredients>>(`${this.apiService.apiUrl.Ingredients}/${B_ID}`);
  }
}

