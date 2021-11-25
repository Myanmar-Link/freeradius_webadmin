import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'permission',
    loadChildren: () => import('./core/permission/permission.module').then(m => m.PermissionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'department',
    loadChildren: () => import('./core/department/department.module').then(m => m.DepartmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'address',
    loadChildren: () => import('./core/address/address.module').then(m => m.AddressModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./core/employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'service-plan',
    loadChildren: () => import('./core/service-plan/service-plan.module').then(m => m.ServicePlanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-group',
    loadChildren: () => import('./core/customer-group/customer-group.module').then(m => m.CustomerGroupModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'company',
    loadChildren: () => import('./core/company/company.module').then(m => m.CompanyModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
