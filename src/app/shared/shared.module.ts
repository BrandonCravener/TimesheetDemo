import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { PunchService } from './services/punch.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    PunchService
  ]
})
export class SharedModule { }
