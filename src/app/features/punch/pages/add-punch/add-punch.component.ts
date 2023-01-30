import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/services/employee.service';

@Component({
  selector: 'app-add-punch',
  templateUrl: './add-punch.component.html',
  styleUrls: ['./add-punch.component.sass']
})
export class AddPunchComponent implements OnInit {

  loading: boolean = true;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: ref => {
        console.log(ref)
      },
      error: err => console.error,
      complete: () => {
        this.loading = false
        console.log("complete")
      }
    })
  }

}
