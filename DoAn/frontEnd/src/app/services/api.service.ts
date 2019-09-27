import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  baseUrl = 'http://localhost:8081/';
  apiUrl = {
    users: {
      home: `${this.baseUrl}users`,
      login: `${this.baseUrl}users/login`
    },
    bills: {
      home: `${this.baseUrl}bills`,
      listByEmployee: `${this.baseUrl}bills/getByEmployee`
    },
    billDetails: `${this.baseUrl}billDetails`,
    employees: `${this.baseUrl}employees`,
    tableDetails: `${this.baseUrl}tableDetails`,
    menuTypes: `${this.baseUrl}menuTypes`,
    menus: {
      home: `${this.baseUrl}menus`,
      listByMenuType: `${this.baseUrl}menus/getByMenuType`
    },
    matetialTypes: `${this.baseUrl}materialTypes`,
    materials: {
      home: `${this.baseUrl}materials`,
      listByMaterialType: `${this.baseUrl}materials/getByMaterialType`
    }
  };

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  post<T>(url: string, data: Object): Observable<T> {

    return this.http.post<T>(url, data);
  }
  put<T>(url: string, data: Object): Observable<T> {
    return this.http.put<T>(url, data);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
