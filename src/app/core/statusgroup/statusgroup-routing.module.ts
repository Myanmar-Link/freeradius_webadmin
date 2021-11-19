import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { StatusgroupComponent } from './statusgroup.component';

const routes: Routes = [
  {
    path: 'statusgroupList',
    component: StatusgroupComponent
  },
  {
    path: 'create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusgroupRoutingModule { }
