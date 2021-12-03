import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownshipRoutingModule } from './township-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DeleteComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TownshipRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class TownshipModule { }
