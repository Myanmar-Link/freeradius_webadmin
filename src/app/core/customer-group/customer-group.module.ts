import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGroupRoutingModule } from './customer-group-routing.module';
import { CreateComponent } from './create/create.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    CustomerGroupRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomerGroupModule { }
