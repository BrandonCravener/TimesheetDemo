import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { PunchService } from './services/punch.service';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { PunchTypePipe } from './pipes/punch-type.pipe';



@NgModule({
  declarations: [
    TimestampPipe,
    PunchTypePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    PunchService
  ],
  exports: [
    TimestampPipe,
    PunchTypePipe
  ]
})
export class SharedModule { }
