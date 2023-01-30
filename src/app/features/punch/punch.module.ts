// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Local
import { AddPunchComponent } from './pages/add-punch/add-punch.component';
import { PunchRoutingModule } from './punch-routing.module';

// UI
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ViewerComponent } from './pages/viewer/viewer.component';





@NgModule({
  declarations: [
    AddPunchComponent,
    ViewerComponent
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // UI
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    CalendarModule,
    // Local
    PunchRoutingModule,
    SharedModule
  ]
})
export class PunchModule { }
