import { Material } from './../models/material';
import { Page } from './../models/page';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RootObj } from '../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private apiService: ApiService) { }
  list(page: Page): Observable<RootObj<[Material]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Material]>>
      (`${this.apiService.apiUrl.materials.home}?${queryString}`);
  }
  listByMaterialType(id: number, page: Page): Observable<RootObj<[Material]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Material]>>
      (`${this.apiService.apiUrl.materials.listByMaterialType}/${id}?${queryString}`);
  }
  get(id): Observable<RootObj<Material>> {
    return this.apiService.get<RootObj<Material>>(`${this.apiService.apiUrl.materials.home}/${id}`);
  }

  save(data: Material): Observable<RootObj<Material>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<Material>>(this.apiService.apiUrl.materials.home, data);
    } else {
      return this.apiService.put<RootObj<Material>>(`${this.apiService.apiUrl.materials.home}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<Material>> {
    return this.apiService.delete<RootObj<Material>>(`${this.apiService.apiUrl.materials.home}/${id}`);
  }
}
