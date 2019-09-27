import { MaterialComponent } from './views/material/material.component';
import { AppInterceptor } from './app.interceptor';
import { AppGuard } from './app.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTuiCalendarModule } from 'ngx-tui-calendar';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DataTablesModule } from 'angular-datatables';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { CookieService } from 'ngx-cookie-service';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule, TabsModule, ModalModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { UserComponent } from './views/user/user.component';
import { InputComponent } from './controls/input/input.component';
import { FormInputComponent } from './controls/form-input/form-input.component';
import { FormSelectComponent } from './controls/form-select/form-select.component';
import { BillComponent } from './views/bill/bill.component';
import { BillDetailsComponent } from './views/bill-details/bill-details.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { EmployeeComponent } from './views/employee/employee.component';
import { MenuComponent } from './views/menu/menu.component';
import { MenuTypeComponent } from './views/menu-type/menu-type.component';
import { TableDetailComponent } from './views/table-detail/table-detail.component';
import { MaterialTypeComponent } from './views/material-type/material-type.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    AppRoutingModule,
    AppAsideModule,
    NgxTuiCalendarModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    NgxSelectModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DataTablesModule,
    TabsModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    InputComponent,
    FormInputComponent,
    FormSelectComponent,
    BillComponent,
    BillDetailsComponent,
    EmployeeComponent,
    MenuComponent,
    MenuTypeComponent,
    TableDetailComponent,
    MaterialComponent,
    MaterialTypeComponent
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    CookieService,
    AppGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
