import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RootObj } from '../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService) { }
  list(): Observable<RootObj<[Employee]>> {
    return this.apiService.get<RootObj<[Employee]>>(this.apiService.apiUrl.employees);
  }
  get(id): Observable<RootObj<Employee>> {
    return this.apiService.get<RootObj<Employee>>(`${this.apiService.apiUrl.employees}/${id}`);
  }
  save(data: Employee): Observable<RootObj<Employee>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<Employee>>(this.apiService.apiUrl.employees, data);
    } else {
      return this.apiService.put<RootObj<Employee>>(`${this.apiService.apiUrl.employees}/${data.id}`, data);
    }
  }
  delete(id: number): Observable<RootObj<Employee>> {
    return this.apiService.delete<RootObj<Employee>>(`${this.apiService.apiUrl.employees}/${id}`);
  }
}


