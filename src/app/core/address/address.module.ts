import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateComponent } from './state/state.component';
import { EditComponent } from './state/edit/edit.component';
import { TownshipComponent } from './township/township.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    StateComponent,
    EditComponent,
    TownshipComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddressModule { }
