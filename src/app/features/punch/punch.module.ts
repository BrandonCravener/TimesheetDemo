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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';




@NgModule({
  declarations: [
    AddPunchComponent,
    ViewerComponent
  ],
  providers: [
    ConfirmationService
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
    InputTextareaModule,
    CalendarModule,
    TableModule,
    ToolbarModule,

    ConfirmDialogModule,
    MessagesModule,
    // Local
    PunchRoutingModule,
    SharedModule
  ]
})
export class PunchModule { }
