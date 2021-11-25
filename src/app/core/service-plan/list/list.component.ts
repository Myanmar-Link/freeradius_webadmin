import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  servicePlanList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['title', 'download_limit', 'upload_limit', 'total_limit', 'expriry_date', 'balance', 'status', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private servicePlanService: ServicePlanService,
    private dialog: MatDialog
  ) { }

  private async loadingData() {
    const getDepartmentList = await this.servicePlanService.getAll();

    this.servicePlanList = new MatTableDataSource(getDepartmentList);
    this.servicePlanList.paginator = this.paginator;
    this.servicePlanList.sort = this.sort;

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
