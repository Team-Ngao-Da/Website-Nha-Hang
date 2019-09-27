import { Injectable } from '@angular/core';
import { Page } from './../models/page';
import { RootObj } from './../models/root-obj';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { MenuType } from './../models/menu-type';

@Injectable({
  providedIn: 'root'
})
export class MenuTypeService {
  constructor(private apiService: ApiService) { }
  list(): Observable<RootObj<[MenuType]>> {
    return this.apiService.get<RootObj<[MenuType]>>(this.apiService.apiUrl.menuTypes);
  }
  get(id): Observable<RootObj<MenuType>> {
    return this.apiService.get<RootObj<MenuType>>(`${this.apiService.apiUrl.menuTypes}/${id}`);
  }
  save(data: MenuType): Observable<RootObj<MenuType>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<MenuType>>(this.apiService.apiUrl.menuTypes, data);
    } else {
      return this.apiService.put<RootObj<MenuType>>(`${this.apiService.apiUrl.menuTypes}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<MenuType>> {
    return this.apiService.delete<RootObj<MenuType>>(`${this.apiService.apiUrl.menuTypes}/${id}`);
  }
}
