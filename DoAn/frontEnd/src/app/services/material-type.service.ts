import { MaterialType } from './../models/material-type';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RootObj } from '../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class MaterialTypeService {
  constructor(private apiService: ApiService) { }

  list(): Observable<RootObj<[MaterialType]>> {
    return this.apiService.get<RootObj<[MaterialType]>>(this.apiService.apiUrl.matetialTypes);
  }
  get(id): Observable<RootObj<MaterialType>> {
    return this.apiService.get<RootObj<MaterialType>>(`${this.apiService.apiUrl.matetialTypes}/${id}`);
  }
  save(data: MaterialType): Observable<RootObj<MaterialType>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<MaterialType>>(this.apiService.apiUrl.matetialTypes, data);
    } else {
      return this.apiService.put<RootObj<MaterialType>>(`${this.apiService.apiUrl.matetialTypes}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<MaterialType>> {
    return this.apiService.delete<RootObj<MaterialType>>(`${this.apiService.apiUrl.matetialTypes}/${id}`);
  }
}
