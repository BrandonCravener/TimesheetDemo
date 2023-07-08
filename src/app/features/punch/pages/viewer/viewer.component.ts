import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { Punch } from 'src/app/shared/models/Punch';
import { PunchService } from 'src/app/shared/services/punch.service';
import { PunchTypePipe } from '../../../../shared/pipes/punch-type.pipe';
import { TimestampPipe } from '../../../../shared/pipes/timestamp.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PrimeTableColumn } from 'src/app/shared/models/PrimeTableColumn';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.sass'],
  standalone: true,
  imports: [ToolbarModule, SharedModule, ButtonModule, RouterLink, TableModule, ConfirmDialogModule, SkeletonModule, DatePipe, TimestampPipe, PunchTypePipe, CommonModule],
  providers: [ConfirmationService]
})
export class ViewerComponent implements OnInit {

  loading = true;
  punches: Punch[] = []
  selectedPunches: Punch[] = []

  readonly columns: PrimeTableColumn<Punch>[] = [
    {
      key: 'time',
      header: 'Time'
    },
    {
      key: 'type',
      header: 'Type'
    }
  ]

  constructor(private punchSerice: PunchService, private confirmationService: ConfirmationService, private router: Router) { }

  sortPunches(list: Punch[]) {
    return list.sort((a, b) => {
      return a.time.seconds - b.time.seconds
    })
  }

  async ngOnInit(): Promise<void> {
    this.punches = this.sortPunches(await this.punchSerice.getPunches())
    this.loading = false;
  }

  numberArray(n: number): number[] {
    return Array(n)
  }

  editSelected() {
    this.router.navigate(['punch/edit', this.selectedPunches[0].id])
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
