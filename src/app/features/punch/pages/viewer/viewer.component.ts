import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Punch } from 'src/app/shared/models/Punch';
import { PunchService } from 'src/app/shared/services/punch.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.sass']
})
export class ViewerComponent implements OnInit {

  punches: Punch[] = []
  selectedPunches: Punch[] = []

  constructor(private punchSerice: PunchService, private confirmationService: ConfirmationService) { }

  sortPunches(list: Punch[]) {
    return list.sort((a, b) => {
      return a.time.seconds - b.time.seconds
    })
  }

  async ngOnInit(): Promise<void> {
    this.punches = this.sortPunches(await this.punchSerice.getPunches())
  }


  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the punches?',
      accept: async () => {
        try {
          await this.punchSerice.deletePunches(this.selectedPunches)

          const ids: string[] = this.selectedPunches.map(punch => {
            return punch.id!
          })

          this.punches = this.punches.filter(punch => {
            return ids.indexOf(punch.id!) < 0
          })

        } catch (err) {

        }
      }
    });
  }
}
