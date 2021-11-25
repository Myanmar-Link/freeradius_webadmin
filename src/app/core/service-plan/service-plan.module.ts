import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePlanRoutingModule } from './service-plan-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ServicePlanRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule
  ]
})
export class ServicePlanModule { }
