import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DepartmentComponent } from './department.component';

const routes: Routes = [
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'department/create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
