import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallTeamRoutingModule } from './install-team-routing.module';
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
    InstallTeamRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class InstallTeamModule { }
