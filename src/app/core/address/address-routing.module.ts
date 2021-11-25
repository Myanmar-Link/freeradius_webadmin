import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateComponent } from './state/state.component';
import { TownshipComponent } from './township/township.component';

const routes: Routes = [
  {
    path: 'state',
    component: StateComponent
  },
  {
    path: 'township',
    component: TownshipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
