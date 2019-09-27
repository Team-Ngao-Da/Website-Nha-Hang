import { EmployeeComponent } from './views/employee/employee.component';
import { Employee } from './models/employee';
import { MaterialTypeComponent } from './views/material-type/material-type.component';
import { MenuComponent } from './views/menu/menu.component';
import { TableDetailComponent } from './views/table-detail/table-detail.component';
import { BillComponent } from './views/bill/bill.component';
import { BillDetailsComponent } from './views/bill-details/bill-details.component';
import { AppGuard } from './app.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserComponent } from './views/user/user.component';
import { MenuTypeComponent } from './views/menu-type/menu-type.component';
import { MaterialComponent } from './views/material/material.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    /*canActivate: [AppGuard],*/
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User'
        }
      },
      {
        path: 'bill',
        component: BillComponent,
        data: {
          title: 'Bill'
        }
      },
      {
        path: 'bill-details',
        component: BillDetailsComponent,
        data: {
          title: 'Bill Details'
        }
      },
      {
        path: 'table-detail',
        component: TableDetailComponent,
        data: {
          title: 'Table Detail'
        }
      },
      {
        path: 'menu/menu-item',
        component: MenuComponent,
        data: {
          title: 'Menu'
        }
      },
      {
        path: 'menu/menu-type',
        component: MenuTypeComponent,
        data: {
          title: 'Menu Type'
        }
      },
      {
        path: 'material/material-item',
        component: MaterialComponent,
        data: {
          title: 'Material '
        }
      },
      {
        path: 'material/material-type',
        component: MaterialTypeComponent,
        data: {
          title: 'Material Type'
        }
      },
      {
        path: 'account/employee',
        component: EmployeeComponent,
        data: {
          title: 'Employee'
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
