import { Component, OnInit } from '@angular/core';
import { EMPLOYEE } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employeeList: EMPLOYEE[] = [];
  
  employee: EMPLOYEE = {
    employee_name: null,
    nrc: null,
  }

  displayedColumns: string[] = ['department_name', 'status', 'created_at', 'updated_at', 'action'];

  constructor(
    private employeeService: EmployeeService
  ) {
  }

  private async loadingData() {
    this.employeeList = await this.employeeService.getAllEmployee();
  }

  ngOnInit() {
    this.loadingData();
  }

}
