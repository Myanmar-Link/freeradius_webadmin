import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { CreateComponent } from './create/create.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CreateComponent,
    PageNotFoundComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PermissionModule { }
