import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusGroupRoutingModule } from './status-group-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    StatusGroupRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class StatusGroupModule { }
