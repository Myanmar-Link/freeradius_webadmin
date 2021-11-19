import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { department, DeptService } from 'src/app/services/dept.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'department_name', 'created_at', 'updated_at', 'option'];
  dataSource: any = new MatTableDataSource([]);

  constructor(
    private deptService: DeptService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatTable) table: MatTable<department> | any;

  async showtable(){
    let gettable = await this.deptService.getDepartment();
    this.dataSource = gettable;
    this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }

  ngOnInit(): void {
    this.showtable();

  }
}
