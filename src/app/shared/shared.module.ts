import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './services/services/employee.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EmployeeService
  ]
})
export class SharedModule { }
