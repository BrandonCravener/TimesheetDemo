import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PunchType } from 'src/app/shared/enums/PunchType';
import { PunchService } from 'src/app/shared/services/punch.service';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { NgIf } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-add-punch',
  templateUrl: './add-punch.component.html',
  styleUrls: ['./add-punch.component.sass'],
  providers: [MessageService],
  standalone: true,
  imports: [MessagesModule, FormsModule, ReactiveFormsModule, DropdownModule, CheckboxModule, NgIf, CalendarModule, InputTextareaModule, ButtonModule]
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
    type: new FormControl(PunchType.In, [Validators.required]),
    useCurrentTime: new FormControl(true, [Validators.required]),
    time: new FormControl(new Date(), [Validators.required]),
    memo: new FormControl('', [Validators.required])
  })

  useCustomTime: boolean = false;
  enableSubmit: boolean = true;
  edit: boolean = false;
  id?: string = undefined;

  valid() {
    const formData = this.addPunchForm.value;
    if (!formData.useCurrentTime && !formData.time) return false
    return true
  }

  constructor(
    private messageService: MessageService,
    private punchService: PunchService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.edit = this.route.snapshot.data['edit']
    this.id = this.route.snapshot.params['punchId']

    this.addPunchForm.valueChanges.subscribe(val => {
      this.useCustomTime = !val.useCurrentTime!
      this.enableSubmit = this.valid()
    })

    if (this.edit && this.id) {
      this.punchService.getPunch(this.id).then(punch => {
        this.addPunchForm.setValue({
          type: punch.type,
          useCurrentTime: false,
          time: punch.time.toDate(),
          memo: punch.memo
        })
      })
    }
  }

  async addPunch() {
    if (this.valid()) {
      const formData = this.addPunchForm.value;
      var time = new Date()
      if (!formData.useCurrentTime && formData.time) time = formData.time

      try {
        console.log(time)
        if (this.edit && this.id) await this.punchService.updatePunch(this.id, formData.type!, formData.memo!, time)
        else await this.punchService.addPunch(formData.type!, time, formData.memo!)

        this.messageService.add({
          severity: 'success',
          summary: this.edit ? 'Punch Updated!' : 'Punch Added!'
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
        time: new Date(),
        memo: ''
      })
    }
  }

}
