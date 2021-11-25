import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/services/department.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  departmentList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['department_name', 'status', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  private async loadingData() {
    const getDepartmentList = await this.departmentService.getAll();

    this.departmentList = new MatTableDataSource(getDepartmentList);
    this.departmentList.paginator = this.paginator;
    this.departmentList.sort = this.sort;

    this.isLoading = false;
  }

  openEditModel(element: any) {
    const dialogRef = this.dialog.open(EditComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  async ngOnInit() {
    await this.loadingData()
  }
}
