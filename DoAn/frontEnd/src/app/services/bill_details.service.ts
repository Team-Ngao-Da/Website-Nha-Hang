import { BillDetails } from './../models/bill_details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Page } from './../models/page';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BillDetailsService {

  constructor(private apiService: ApiService) { }
  list(): Observable<RootObj<[BillDetails]>> {
    return this.apiService.get<RootObj<[BillDetails]>>(this.apiService.apiUrl.billDetails);
  }
  listPage(page: Page): Observable<RootObj<[BillDetails]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[BillDetails]>>
      (`${this.apiService.apiUrl.billDetails}?${queryString}`);
  }
  listByBill(id: number, page: Page): Observable<RootObj<[BillDetails]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[BillDetails]>>
      (`${this.apiService.apiUrl.billDetails}/${id}?${queryString}`);
  }
  get(B_ID): Observable<RootObj<BillDetails>> {
    return this.apiService.get<RootObj<BillDetails>>(`${this.apiService.apiUrl.billDetails}/${B_ID}`);
  }

  save(data: BillDetails): Observable<RootObj<BillDetails>> {
    if (data.B_ID === 0) {
      return this.apiService.post<RootObj<BillDetails>>(this.apiService.apiUrl.billDetails, data);
    } else {
      return this.apiService.put<RootObj<BillDetails>>(`${this.apiService.apiUrl.billDetails}/${data.B_ID}`, data);
    }
  }
  delete(B_ID: number): Observable<RootObj<BillDetails>> {
    return this.apiService.delete<RootObj<BillDetails>>(`${this.apiService.apiUrl.billDetails}/${B_ID}`);
  }
}

