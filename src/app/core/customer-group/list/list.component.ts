import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerGroupService } from 'src/app/services/customer-group.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  customerGroupList: any = new MatTableDataSource([]);
  isLoading: boolean = true;

  displayedColumns: string[] = ['title', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private customerGroupService: CustomerGroupService,
    private dialog: MatDialog
  ) { }

  private async loadingData() {
    const getCustomerGroupList = await this.customerGroupService.getAll();

    this.customerGroupList = new MatTableDataSource(getCustomerGroupList);
    this.customerGroupList.paginator = this.paginator;
    this.customerGroupList.sort = this.sort;

    this.isLoading = false;
  }

  openEditModel(element: any) {
    const dialogRef = this.dialog.open(EditComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  openDelModel(element: any) {
    const dialogRef = this.dialog.open(DeleteComponent, { data: element, width: '400px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingData();
    })
  }

  async ngOnInit() {
    await this.loadingData()
  }

}
