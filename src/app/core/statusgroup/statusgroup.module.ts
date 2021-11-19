import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusgroupRoutingModule } from './statusgroup-routing.module';
import { CreateComponent } from './create/create.component';
import { StatusgroupComponent } from './statusgroup.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    CreateComponent,
    StatusgroupComponent
  ],
  imports: [
    CommonModule,
    StatusgroupRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class StatusgroupModule { }
