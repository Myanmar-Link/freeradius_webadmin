import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderFormRoutingModule } from './order-form-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    OrderFormRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ]
})
export class OrderFormModule { }
