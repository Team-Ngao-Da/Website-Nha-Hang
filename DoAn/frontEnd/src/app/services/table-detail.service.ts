import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RootObj } from '../models/root-obj';
import { TableDetail } from './../models/table-detail';

@Injectable({
  providedIn: 'root'
})
export class TableDetailService {
  constructor(private apiService: ApiService) { }

  list(): Observable<RootObj<[TableDetail]>> {
    return this.apiService.get<RootObj<[TableDetail]>>(this.apiService.apiUrl.tableDetails);
  }
  get(id): Observable<RootObj<TableDetail>> {
    return this.apiService.get<RootObj<TableDetail>>(`${this.apiService.apiUrl.tableDetails}/${id}`);
  }
  save(data: TableDetail): Observable<RootObj<TableDetail>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<TableDetail>>(this.apiService.apiUrl.tableDetails, data);
    } else {
      return this.apiService.put<RootObj<TableDetail>>(`${this.apiService.apiUrl.tableDetails}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<TableDetail>> {
    return this.apiService.delete<RootObj<TableDetail>>(`${this.apiService.apiUrl.tableDetails}/${id}`);
  }
}
