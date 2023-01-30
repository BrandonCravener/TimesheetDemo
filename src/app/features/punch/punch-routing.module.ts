import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPunchComponent } from './pages/add-punch/add-punch.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddPunchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PunchRoutingModule { }
