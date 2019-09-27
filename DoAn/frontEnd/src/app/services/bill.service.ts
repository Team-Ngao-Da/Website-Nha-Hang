import { Bill } from './../models/bill';
import { Injectable } from '@angular/core';
import { Page } from './../models/page';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private apiService: ApiService) { }
  list(page: Page): Observable<RootObj<[Bill]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Bill]>>
      (`${this.apiService.apiUrl.bills.home}?${queryString}`);
  }
  listByCustomerType(id: number, page: Page): Observable<RootObj<[Bill]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[Bill]>>
      (`${this.apiService.apiUrl.bills.listByEmployee}/${id}?${queryString}`);
  }
  get(id): Observable<RootObj<Bill>> {
    return this.apiService.get<RootObj<Bill>>(`${this.apiService.apiUrl.bills.home}/${id}`);
  }

  save(data: Bill): Observable<RootObj<Bill>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<Bill>>(this.apiService.apiUrl.bills.home, data);
    } else {
      return this.apiService.put<RootObj<Bill>>(`${this.apiService.apiUrl.bills.home}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<Bill>> {
    return this.apiService.delete<RootObj<Bill>>(`${this.apiService.apiUrl.bills.home}/${id}`);
  }
}


