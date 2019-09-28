import { Menu } from './../models/menu';
import { Injectable } from '@angular/core';
import { Page } from './../models/page';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private apiService: ApiService) { }
  list(page: Page): Observable<RootObj<[Menu]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Menu]>>
      (`${this.apiService.apiUrl.menus.home}?${queryString}`);
  }
  listByMenuType(id: number, page: Page): Observable<RootObj<[Menu]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Menu]>>
      (`${this.apiService.apiUrl.menus.listByMenuType}/${id}?${queryString}`);
  }
  get(id): Observable<RootObj<Menu>> {
    return this.apiService.get<RootObj<Menu>>(`${this.apiService.apiUrl.menus.home}/${id}`);
  }
    search(keyword: string): Observable<RootObj<[Menu]>> {
return this.apiService.get<RootObj<[Menu]>> (`${this.apiService.apiUrl.menus.home}?q=${keyword}`);
  }

  save(data: Menu): Observable<RootObj<Menu>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<Menu>>(this.apiService.apiUrl.menus.home, data);
    } else {
      return this.apiService.put<RootObj<Menu>>(`${this.apiService.apiUrl.menus.home}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<Menu>> {
    return this.apiService.delete<RootObj<Menu>>(`${this.apiService.apiUrl.menus.home}/${id}`);
  }
}


