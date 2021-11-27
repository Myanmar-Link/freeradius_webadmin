import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelTableRoutingModule } from './channel-table-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
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
    ChannelTableRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ChannelTableModule { }
