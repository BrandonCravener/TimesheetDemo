// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Local
import { AddPunchComponent } from './pages/add-punch/add-punch.component';
import { PunchRoutingModule } from './punch-routing.module';

// UI
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPunchComponent
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // UI
    DropdownModule,
    // Local
    PunchRoutingModule,
    SharedModule
  ]
})
export class PunchModule { }
