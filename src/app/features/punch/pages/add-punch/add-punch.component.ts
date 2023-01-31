import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PunchType } from 'src/app/shared/enums/PunchType';
import { PunchService } from 'src/app/shared/services/punch.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-punch',
  templateUrl: './add-punch.component.html',
  styleUrls: ['./add-punch.component.sass']
})
export class AddPunchComponent implements OnInit {

  readonly types = [
    {
      name: 'In',
      id: PunchType.In
    },
    {
      name: 'Out',
      id: PunchType.Out
    },
    {
      name: 'Break',
      id: PunchType.Break
    },
    {
      name: 'Lunch',
      id: PunchType.Lunch
    },
  ]

  addPunchForm = new FormGroup({
    type: new FormControl(PunchType.In),
    useCurrentTime: new FormControl(true),
    customDateTime: new FormControl('')
  })

  useCustomTime: boolean = false;
  enableSubmit: boolean = true;


  constructor(private punchService: PunchService, private messageService: MessageService, private router: Router) { }

  valid() {
    const formData = this.addPunchForm.value;
    if (!formData.useCurrentTime && !formData.customDateTime) return false
    return true
  }

  ngOnInit(): void {
    this.addPunchForm.valueChanges.subscribe(val => {
      this.useCustomTime = !val.useCurrentTime!
      this.enableSubmit = this.valid()
    })
  }

  async addPunch() {
    if (this.valid()) {
      const formData = this.addPunchForm.value;
      var time = Date.now()
      if (!formData.useCurrentTime) time = Date.parse(formData.customDateTime!)

      try {
        await this.punchService.addPunch(formData.type!, time)
        this.messageService.add({
          severity: 'success',
          summary: 'Punch Added!'
        })
        this.router.navigateByUrl("/punch/viewer")
      } catch (err: any) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Punch Not Added',
          detail: 'Unable to add punch at this time please reload and try again.'
        })
      }

      this.addPunchForm.reset({
        type: PunchType.In,
        useCurrentTime: true,
        customDateTime: ''
      })
    }
  }

}
