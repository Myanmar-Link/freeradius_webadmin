import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { DetailComponent } from '../detail/detail.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employeeList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['employee_name', 'nrc', 'phone_number', 'email_address', 'position', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private servicePlanService: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  private async loadingData() {
    const getEmployeeList = await this.servicePlanService.getAll();
    console.log(getEmployeeList);

    this.employeeList = new MatTableDataSource(getEmployeeList);
    this.employeeList.paginator = this.paginator;
    this.employeeList.sort = this.sort;

    this.isLoading = false;
  }

  openEditModel(element: any) {
    const dialogRef = this.dialog.open(EditComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  openDetialModel(element: any) {
    this.router.navigate([`/employee/detail/${element.id}`]);
  }

  async ngOnInit() {
    await this.loadingData()
  }
}
