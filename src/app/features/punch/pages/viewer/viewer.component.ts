import { Component, OnInit } from '@angular/core';
import { PunchService } from 'src/app/shared/services/punch.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.sass']
})
export class ViewerComponent implements OnInit {

  constructor(private punchSerice: PunchService) { }

  async ngOnInit(): Promise<void> {
    await this.punchSerice.getPunches()
  }
}
