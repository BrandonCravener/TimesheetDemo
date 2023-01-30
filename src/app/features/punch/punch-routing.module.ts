import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPunchComponent } from './pages/add-punch/add-punch.component';
import { ViewerComponent } from './pages/viewer/viewer.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddPunchComponent
  },
  {
    path: 'viewer',
    component: ViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PunchRoutingModule { }
